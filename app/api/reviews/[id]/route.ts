// ============================================================
// app/api/reviews/[id]/route.ts
// Handles: DELETE (remove a review by ID)
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { MOCK_REVIEWS } from "@/lib/data";
import { Review } from "@/types/catalog";

// In-memory mutable review store
const reviews: Review[] = [...MOCK_REVIEWS];

// ─────────────────────────────────────────────
// DELETE /api/reviews/[id]
// Removes a review by its ID
// ─────────────────────────────────────────────
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = reviews.findIndex((r) => r.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  // Remove the review from the list
  reviews.splice(index, 1);

  return NextResponse.json({ message: "Review deleted successfully" });
}
