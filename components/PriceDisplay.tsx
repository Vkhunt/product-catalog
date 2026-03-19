
"use client";

import { useStorefront } from "@/context/StorefrontContext";

interface PriceDisplayProps {
  amountInCents: number;
  className?: string;
  prefix?: string;
}

export default function PriceDisplay({
  amountInCents,
  className = "",
  prefix = "",
}: PriceDisplayProps) {
  const { formatPrice } = useStorefront();

  return (
    <span className={className}>
      {prefix}
      {formatPrice(amountInCents)}
    </span>
  );
}
