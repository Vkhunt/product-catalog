import { useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { RootState, AppDispatch } from "@/store";
import { CatalogFilters } from "@/types/catalog";
import {
  setFilters as setReduxFilters,
  clearFilters as clearReduxFilters,
  setAdminMode as setReduxAdminMode,
  fetchProducts,
} from "@/store/catalogSlice";

export function useCatalog(isAdminMode = false) {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const initialSyncDone = useRef(false);

  const { products, filters, status, error, adminMode } = useSelector(
    (state: RootState) => state.catalog
  );

   useEffect(() => {
    if (initialSyncDone.current) return;
    
    const urlCategory = searchParams.get("category");
    const urlSearch = searchParams.get("search");
    const urlWishlist = searchParams.get("wishlist");
    
    if (urlCategory || urlSearch || urlWishlist) {
      dispatch(setReduxFilters({ 
        category: urlCategory || "",
        search: urlSearch || "",
        wishlistOnly: urlWishlist === "true"
      }));
    }
    initialSyncDone.current = true;
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (isAdminMode !== adminMode) {
      dispatch(setReduxAdminMode(isAdminMode));
    }
  }, [isAdminMode, adminMode, dispatch]);

  const loading = status === "loading";

  useEffect(() => {
    dispatch(fetchProducts({ filters, adminMode: isAdminMode }));
  }, [dispatch, filters, isAdminMode]);


  const setFilter = useCallback(
    (updates: Partial<CatalogFilters>) => {
      dispatch(setReduxFilters(updates));
    },
    [dispatch]
  );

  const clearFilters = useCallback(() => {
    dispatch(clearReduxFilters());
  }, [dispatch]);

  return {
    products,
    filters,
    loading,
    error,
    setFilter,
    clearFilters,
  };
}
