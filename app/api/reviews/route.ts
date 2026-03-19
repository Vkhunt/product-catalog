// ============================================================
// app/api/reviews/route.ts
// Review list API matching specific spec validations
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { MOCK_REVIEWS, getProductById } from "@/lib/data";
import { Review } from "@/types/catalog";

const reviews: Review[] = MOCK_REVIEWS;

// ─────────────────────────────────────────────
// GET /api/reviews?productId=...
// ─────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json(
      { error: "productId is required" },
      { status: 400 }
    );
  }

  const productReviews = reviews.filter((r) => r.productId === productId);

  // Returns Review[] for the given product, newest first
  productReviews.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return NextResponse.json(productReviews);
}

// ─────────────────────────────────────────────
// POST /api/reviews
// ─────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, reviewerName, rating, title, body: reviewBody } = body;

    // Spec Validations:
    // 1. productId exists and is active
    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }
    const product = getProductById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    if (product.status !== "active") {
      return NextResponse.json({ error: "Cannot review inactive products" }, { status: 400 });
    }

    // 2. rating is 1-5 integer
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be an integer between 1 and 5" }, { status: 400 });
    }

    // 3. all text fields non-empty
    if (!reviewerName?.trim() || !title?.trim() || !reviewBody?.trim()) {
      return NextResponse.json({ error: "All text fields are required" }, { status: 400 });
    }

    // Server sets verified: false, generates id and createdAt
    const newReview: Review = {
      id: uuidv4(),
      productId,
      reviewerName: reviewerName.trim(),
      rating,
      title: title.trim(),
      body: reviewBody.trim(),
      verified: false,
      createdAt: new Date().toISOString(),
    };

    reviews.unshift(newReview);

    return NextResponse.json(newReview, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
