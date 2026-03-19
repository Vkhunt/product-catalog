import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Review } from "@/types/catalog";
interface ReviewState {
  reviews: Review[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  status: "idle",
  error: null,
};


export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (productId: string) => {
    const res = await fetch(`/api/reviews?productId=${productId}`);
    if (!res.ok) throw new Error("Failed to fetch reviews");
    return (await res.json()) as Review[];
  }
);

export const submitReview = createAsyncThunk(
  "reviews/submitReview",
  async (reviewData: Omit<Review, "id" | "createdAt" | "verified">) => {
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to submit review");
    }
    return (await res.json()) as Review;
  }
);


export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId: string) => {
    const res = await fetch(`/api/reviews/${reviewId}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete review");
    return reviewId;
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews(state, action: PayloadAction<Review[]>) {
      state.reviews = action.payload;
    },
    addReview(state, action: PayloadAction<Review>) {
      state.reviews.unshift(action.payload);
    },
    removeReview(state, action: PayloadAction<string>) {
      state.reviews = state.reviews.filter((r) => r.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    
    builder.addCase(fetchReviews.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.reviews = action.payload;
    });
    builder.addCase(fetchReviews.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to fetch";
    });


    builder.addCase(submitReview.fulfilled, (state, action) => {
      state.reviews.unshift(action.payload);
    });

  
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.reviews = state.reviews.filter((r) => r.id !== action.payload);
    });
  },
});

export const { setReviews, addReview, removeReview } = reviewSlice.actions;

export default reviewSlice.reducer;
