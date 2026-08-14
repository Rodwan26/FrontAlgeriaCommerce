"use client";

import { ShoppingCart } from "lucide-react";

export default function Header() {
  const scrollToOrder = () => {
    document
      .getElementById("order")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#080a0b]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] max-w-6xl items-center justify-between px-4">

        {/* Logo */}
        <div className="text-2xl font-black tracking-tight text-white">
          H<span className="text-red-500">O</span>KA
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
          <a
            href="#features"
            className="transition hover:text-red-500"
          >
            المميزات
          </a>

          <a
            href="#why-hoka"
            className="transition hover:text-red-500"
          >
            لماذا HOKA؟
          </a>

          <a
            href="#reviews"
            className="transition hover:text-red-500"
          >
            تقييمات العملاء
          </a>
        </nav>

        {/* CTA */}
        <button
          onClick={scrollToOrder}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500 active:scale-95"
        >
          <ShoppingCart size={17} />
          اطلب الآن
        </button>
      </div>
    </header>
  );
}