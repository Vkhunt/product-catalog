

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, CatalogFilters } from "@/types/catalog";
import { fetchClientProducts, createClientProduct, updateClientProduct, deleteClientProduct } from "@/lib/clientProductStore";



interface CatalogState {
  products: Product[];
  filters: CatalogFilters;
  selectedProduct: Product | null;
  adminMode: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialFilters: CatalogFilters = {
  status: "all",
  category: "",
  brand: "",
  search: "",
  featured: null,
  condition: "all",
  minPrice: null,
  maxPrice: null,
  wishlistOnly: false,
};

const initialState: CatalogState = {
  products: [],
  filters: initialFilters,
  selectedProduct: null,
  adminMode: false,
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "catalog/fetchProducts",
  async (params: { filters: CatalogFilters; adminMode: boolean }) => {
    return await fetchClientProducts(params.filters, params.adminMode);
  }
);

export const createProduct = createAsyncThunk(
  "catalog/createProduct",
  async (newProduct: Partial<Product>, { rejectWithValue }) => {
    try {
      return await createClientProduct(newProduct);
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : String(err));
    }
  }
);

export const editProduct = createAsyncThunk(
  "catalog/editProduct",
  async ({ id, updates }: { id: string; updates: Partial<Product> }, { rejectWithValue }) => {
    try {
      return await updateClientProduct(id, updates);
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : String(err));
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "catalog/deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      return await deleteClientProduct(id);
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : String(err));
    }
  }
);


const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.unshift(action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.products[index] = action.payload;
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    setFilters(state, action: PayloadAction<Partial<CatalogFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters(state) {
      state.filters = initialFilters;
    },
    setSelectedProduct(state, action: PayloadAction<Product | null>) {
      state.selectedProduct = action.payload;
    },
    setAdminMode(state, action: PayloadAction<boolean>) {
      state.adminMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action.payload as string) || action.error.message || "Failed to fetch";
    });

    builder.addCase(createProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action.payload as string) || action.error.message || "Failed to create product";
    });

    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products.unshift(action.payload);
    });

    builder.addCase(editProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action.payload as string) || action.error.message || "Failed to update product";
    });

    builder.addCase(editProduct.fulfilled, (state, action) => {
      const idx = state.products.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) state.products[idx] = action.payload;
      if (state.selectedProduct?.id === action.payload.id) {
        state.selectedProduct = action.payload;
      }
    });

    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action.payload as string) || action.error.message || "Failed to delete product";
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      if (state.selectedProduct?.id === action.payload) {
        state.selectedProduct = null;
      }
    });
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  removeProduct,
  setFilters,
  clearFilters,
  setSelectedProduct,
  setAdminMode,
} = catalogSlice.actions;

export default catalogSlice.reducer;
