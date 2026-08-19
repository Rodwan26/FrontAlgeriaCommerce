"use client";

import { ShoppingCart } from "lucide-react";

export default function StickyOrderButton() {
  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <button
        type="button"
        onClick={scrollToOrder}
        className="
          group
          relative
          flex
          h-14
          w-full
          items-center
          justify-center
          gap-2
          overflow-hidden
          rounded-2xl
          bg-red-600
          text-base
          font-black
          text-white
          shadow-2xl
          shadow-red-600/30
          transition
          duration-200
          hover:bg-red-500
          active:scale-[0.98]
        "
      >
        {/* Shine */}
        <span
          className="
            pointer-events-none
            absolute
            top-[-60%]
            h-[220%]
            w-16
            -skew-x-[20deg]
            bg-gradient-to-r
            from-transparent
            via-white/45
            to-transparent
            blur-[2px]
            animate-cta-shine
          "
        />

        {/* Button content */}
        <span className="relative z-10 flex items-center gap-2">
          <ShoppingCart size={19} />

          <span>اطلب الآن</span>
        </span>
      </button>
    </div>
  );
}