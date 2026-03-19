"use client";

import { useState } from "react";
import { useReviews } from "@/hooks/useReviews";
import StarRating from "@/components/StarRating";
import { Review } from "@/types/catalog";

interface ReviewSectionProps {
  productId: string;
  initialReviews: Review[];
}

export default function ReviewSection({
  productId,
  initialReviews,
}: ReviewSectionProps) {
  const { reviews, loading, submitReview, deleteReview } =
    useReviews(productId);

  const displayReviews = reviews.length > 0 ? reviews : initialReviews;

  const [showForm, setShowForm] = useState(false);
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !title || !body) return;
    setSubmitting(true);
    try {
      await submitReview({ reviewerName, rating, title, body });
      setReviewerName("");
      setTitle("");
      setBody("");
      setRating(5);
      setShowForm(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const inputClass =
    "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500";

  return (
    <section className="border-t border-gray-200 pt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Reviews{" "}
          <span className="text-gray-400 font-normal text-lg">
            ({displayReviews.length})
          </span>
        </h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setShowSuccess(false);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-indigo-700"
        >
          {showForm ? "Cancel" : "Write a review"}
        </button>
      </div>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
          <span>✓</span> Your review has been submitted successfully!
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-indigo-50 border border-gray-300 p-6 mb-8 space-y-4"
        >
          <h3 className="font-semibold text-gray-800">Your Review</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Your name *
              </label>
              <input
                className={inputClass}
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="Jane D."
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Rating *
              </label>
              <div className="flex items-center gap-2 pt-1 h-8">
                <StarRating
                  rating={rating}
                  interactive
                  onRate={setRating}
                  size="lg"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Title *
            </label>
            <input
              className={inputClass}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Review *
            </label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tell others what you think..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 text-white px-5 py-2 rounded text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      {loading && reviews.length === 0 ? (
        <p className="text-gray-400 py-8 text-center">Loading reviews...</p>
      ) : displayReviews.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-3xl mb-2">💬</p>
          <p>No reviews yet. Be the first to review this product!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-300 p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800">
                      {review.reviewerName}
                    </span>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">
                    {formatDate(review.createdAt)}
                  </span>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="text-xs text-red-400 hover:text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <h4 className="font-semibold text-gray-800 mt-3 mb-1">
                {review.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">{review.body}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
