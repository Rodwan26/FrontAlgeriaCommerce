"use client";

import { ShoppingCart } from "lucide-react";

export default function Header() {
  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#080a0b]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        
        {/* Logo */}
        <div className="text-2xl font-black tracking-tight text-white">
          H<span className="text-red-500">O</span>KA
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={scrollToOrder}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-red-600
            px-4
            py-2.5
            text-sm
            font-black
            text-white
            shadow-lg
            shadow-red-600/20
            transition
            hover:bg-red-500
            active:scale-95
          "
        >
          <ShoppingCart size={17} />
          <span>اطلب الآن</span>
        </button>
      </div>
    </header>
  );
}