"use client"

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { product } from "../data/product";

export default function Hero() {
  const scrollToOrder = () => {
    document
      .getElementById("order")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="why-hoka"
      className="relative overflow-hidden bg-[#080a0b]"
    >
      {/* Red ambient glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-red-600/20 blur-[120px]" />

      <div className="mx-auto flex max-w-6xl flex-col px-4 pb-8 pt-8 md:flex-row md:items-center md:gap-12 md:py-16">

        {/* Product Image */}
        <div className="relative order-1 w-full md:order-2 md:w-1/2">

          <div className="absolute inset-10 rounded-full bg-red-600/20 blur-[70px]" />

          <div className="relative">
            <img
  src={product.heroImage}
  alt={product.name}
  className="relative z-10 mx-auto w-full max-w-[370px] object-contain"
/>
          </div>

          {/* Carousel indicators */}
          <div className="relative z-20 mt-2 flex justify-center gap-2">
            <span className="h-2.5 w-7 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-500" />
          </div>
        </div>

        {/* Content */}
        <div className="order-2 mt-6 w-full text-right md:order-1 md:w-1/2">

          <p className="mb-3 text-base font-bold text-red-500 md:text-xl">
            {product.badge}
          </p>

          <div className="mb-4">
            <h1 className="text-5xl font-black tracking-tight text-white md:text-7xl">
              {product.brand}
            </h1>

            <h2 className="mt-2 text-4xl font-black leading-tight text-white md:text-6xl">
              {product.title}{" "}
              <span className="text-red-500">
                {product.highlightedTitle}
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-base leading-8 text-gray-300 md:text-xl">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-6 flex items-end justify-end gap-3">
            <span className="text-sm text-gray-400">
              السعر
            </span>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-red-500 md:text-5xl">
                {product.price.toLocaleString("ar-DZ")}
              </span>

              <span className="text-xl font-bold text-white">
                {product.currency}
              </span>
            </div>
          </div>

          <button
            onClick={scrollToOrder}
            className="mt-7 inline-flex items-center gap-3 rounded-xl bg-red-600 px-7 py-4 text-lg font-black text-white shadow-xl shadow-red-600/20 transition hover:bg-red-500 active:scale-95"
          >
            اطلب الآن
            <ArrowDown size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}