


import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchReviews, submitReview as submitThunk, deleteReview as deleteThunk } from "@/store/reviewSlice";
import { Review } from "@/types/catalog";

export function useReviews(productId: string) {
  const dispatch = useDispatch<AppDispatch>();
  
  
  const { reviews, status, error } = useSelector(
    (state: RootState) => state.reviews
  );
  
  const loading = status === "loading";

  useEffect(() => {
    if (productId) {
      dispatch(fetchReviews(productId));
    }
  }, [productId, dispatch]);

  const submitReview = async (
    reviewData: Omit<Review, "id" | "createdAt" | "verified" | "productId">
  ) => {
    try {
     
      const resultAction = await dispatch(submitThunk({ ...reviewData, productId }));
      if (submitThunk.rejected.match(resultAction)) {
        throw new Error(resultAction.error.message || "Failed to submit review");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      const resultAction = await dispatch(deleteThunk(reviewId));
      if (deleteThunk.rejected.match(resultAction)) {
       
        console.error(resultAction.error.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    reviews: reviews.filter((r) => r.productId === productId),
    loading,
    error,
    submitReview,
    deleteReview,
  };
}
