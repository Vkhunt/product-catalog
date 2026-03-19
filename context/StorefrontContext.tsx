

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface StorefrontContextValue {
  currency: "USD" | "EUR" | "GBP" | "INR";
  setCurrency: (c: StorefrontContextValue["currency"]) => void;
  formatPrice: (cents: number) => string;
  viewMode: "grid" | "list";
  setViewMode: (m: "grid" | "list") => void;
  wishlist: string[];
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}

const StorefrontContext = createContext<StorefrontContextValue | undefined>(undefined);

export function StorefrontProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<StorefrontContextValue["currency"]>("USD");
  const [viewMode, setViewModeState] = useState<"grid" | "list">("grid");
  const [wishlist, setWishlistState] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedCurrency = localStorage.getItem("storefront_currency");
    const savedViewMode = localStorage.getItem("storefront_viewMode");
    const savedWishlist = localStorage.getItem("storefront_wishlist");

    if (savedCurrency === "USD" || savedCurrency === "EUR" || savedCurrency === "GBP" || savedCurrency === "INR") {
      setCurrencyState(savedCurrency);
    }
    if (savedViewMode === "grid" || savedViewMode === "list") {
      setViewModeState(savedViewMode);
    }
    if (savedWishlist) {
      try {
        setWishlistState(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist from local storage");
      }
    }
  }, []);

  const setCurrency = (c: StorefrontContextValue["currency"]) => {
    setCurrencyState(c);
    localStorage.setItem("storefront_currency", c);
  };

  const setViewMode = (m: "grid" | "list") => {
    setViewModeState(m);
    localStorage.setItem("storefront_viewMode", m);
  };

  const addToWishlist = (id: string) => {
    setWishlistState((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem("storefront_wishlist", JSON.stringify(next));
      return next;
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistState((prev) => {
      const next = prev.filter((item) => item !== id);
      localStorage.setItem("storefront_wishlist", JSON.stringify(next));
      return next;
    });
  };

  const isWishlisted = (id: string) => wishlist.includes(id);

  const formatPrice = (cents: number) => {
    const activeCurrency = mounted ? currency : "USD";
    const amount = cents / 100;
    
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: activeCurrency,
    }).format(amount);
  };

  return (
    <StorefrontContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        viewMode,
        setViewMode,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
      }}
    >
      {children}
    </StorefrontContext.Provider>
  );
}

export function useStorefront() {
  const context = useContext(StorefrontContext);
  if (context === undefined) {
    throw new Error("useStorefront must be used within a StorefrontProvider");
  }
  return context;
}
