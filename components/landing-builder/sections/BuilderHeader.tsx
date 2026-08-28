"use client";

import { ShoppingCart } from "lucide-react";
import { LandingColors } from "@/lib/landing-page/types";

type Props = {
  brand: string;
  colors: LandingColors;
  ctaText?: string;
};

export default function BuilderHeader({ brand, colors, ctaText = "اطلب الآن" }: Props) {
  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  const letters = brand.split("");

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        backgroundColor: hexWithAlpha(colors.bg, 0.8),
        borderColor: hexWithAlpha(colors.primary, 0.1),
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="text-2xl font-black tracking-tight" style={{ color: colors.text }}>
        {letters.map((letter, i) =>
          i % 2 === 1 ? (
            <span key={i} style={{ color: colors.primary }}>
              {letter}
            </span>
          ) : (
            <span key={i}>{letter}</span>
          )
        )}
        </div>

        <button
          type="button"
          onClick={scrollToOrder}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black text-white shadow-lg transition active:scale-95"
          style={{
            backgroundColor: colors.primary,
            boxShadow: `0 4px 25px ${hexWithAlpha(colors.primary, 0.25)}`,
            border: `1px solid ${hexWithAlpha(colors.primary, 0.3)}`,
          }}
        >
          <ShoppingCart size={17} />
          <span>{ctaText}</span>
        </button>
      </div>
    </header>
  );
}

export function hexWithAlpha(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const full = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean;
  const num = parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}