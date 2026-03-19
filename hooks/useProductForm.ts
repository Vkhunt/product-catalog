"use client";

import { useState, useCallback, useMemo } from "react";
import { Product, ProductVariant } from "@/types/catalog";

interface UseProductFormReturn {
  values: Partial<Product>;
  handleChange: <K extends keyof Product>(field: K, value: Product[K]) => void;
  errors: Record<string, string>;
  handleSubmit: (onSubmit: (data: Partial<Product>) => Promise<void>) => (e: React.FormEvent) => void;
  reset: () => void;
  isDirty: boolean;
  addVariant: () => void;
  updateVariant: <K extends keyof ProductVariant>(index: number, field: K, value: ProductVariant[K]) => void;
  removeVariant: (index: number) => void;
  submitFormWithOverride: (onSubmitAction: (data: Partial<Product>) => Promise<void>, overrideVals: Partial<Product>) => Promise<void>;
}

const defaultVariant: Omit<ProductVariant, "id"> = {
  label: "",
  sku: "",
  price: 0,
  stock: 0,
  attributes: {},
};

export function useProductForm(initialValues?: Partial<Product>): UseProductFormReturn {
  const baseValues = useMemo(() => {
    return initialValues || {
      name: "",
      description: "",
      brand: "",
      category: "",
      tags: [],
      status: "draft" as Product["status"],
      condition: "new" as Product["condition"],
      variants: [{ ...defaultVariant, id: Math.random().toString(36).substring(2, 9) }],
      imageUrls: [],
      featured: false,
    };
  }, [initialValues]);

  const [values, setValues] = useState<Partial<Product>>(baseValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isDirty = useMemo(() => {
    return JSON.stringify(baseValues) !== JSON.stringify(values);
  }, [baseValues, values]);

  const reset = useCallback(() => {
    setValues(baseValues);
    setErrors({});
  }, [baseValues]);

  const handleChange = useCallback((field: keyof Product, value: unknown) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const addVariant = useCallback(() => {
    setValues((prev) => ({
      ...prev,
      variants: [...(prev.variants || []), { ...defaultVariant, id: Math.random().toString(36).substring(2, 9) }],
    }));
  }, []);

  const updateVariant = useCallback((index: number, field: keyof ProductVariant, value: unknown) => {
    setValues((prev) => {
      const newVariants = [...(prev.variants || [])];
      newVariants[index] = { ...newVariants[index], [field]: value };
      return { ...prev, variants: newVariants };
    });
    
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`variant_${index}_${String(field)}`];
      delete next["variants"];
      return next;
    });
  }, []);

  const removeVariant = useCallback((index: number) => {
    setValues((prev) => {
      const newVariants = [...(prev.variants || [])];
      if (newVariants.length <= 1) return prev; 
      newVariants.splice(index, 1);
      return { ...prev, variants: newVariants };
    });
  }, []);

  const validate = useCallback((dataToValidate = values) => {
    const newErrors: Record<string, string> = {};

    if (!dataToValidate.name || dataToValidate.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }

    if (!dataToValidate.brand || dataToValidate.brand.trim() === "") {
      newErrors.brand = "Brand is required";
    }
    
    const variants = dataToValidate.variants || [];
    if (variants.length === 0) {
      newErrors.variants = "At least one variant is required";
    } else {
      let hasValidVariant = false;
      variants.forEach((v, idx) => {
        let isVariantValid = true;

        if (!v.sku || v.sku.trim() === "") {
          newErrors[`variant_${idx}_sku`] = "SKU is required";
          isVariantValid = false;
        }

        if (v.price <= 0) {
          newErrors[`variant_${idx}_price`] = "Price must be greater than 0";
          isVariantValid = false;
        }

        if (v.compareAtPrice !== undefined && v.compareAtPrice !== null && v.compareAtPrice > 0) {
          if (v.compareAtPrice <= v.price) {
            newErrors[`variant_${idx}_compareAtPrice`] = "Compare-at price must be greater than normal price";
            isVariantValid = false;
          }
        }

        if (isVariantValid) hasValidVariant = true;
      });

      if (!hasValidVariant && variants.length > 0) {
        newErrors.variants = "At least one valid variant (SKU and price > 0) is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const handleSubmit = useCallback(
    (onSubmit: (data: Partial<Product>) => Promise<void>) => async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate(values)) return;
      await onSubmit(values);
    },
    [validate, values]
  );
  
  const submitFormWithOverride = useCallback(
    async (onSubmitAction: (data: Partial<Product>) => Promise<void>, overrideVals: Partial<Product>) => {
      const finalValues = { ...values, ...overrideVals };
      if (!validate(finalValues)) return;
      await onSubmitAction(finalValues);
    },
    [validate, values]
  );

  return {
    values,
    handleChange,
    errors,
    handleSubmit,
    reset,
    isDirty,
    addVariant,
    updateVariant,
    removeVariant,
    submitFormWithOverride,
  };
}
