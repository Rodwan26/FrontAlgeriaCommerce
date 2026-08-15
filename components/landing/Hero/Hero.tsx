"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { product } from "../../data/product";

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
       {/* Product Visual */}
<div className="relative order-1 w-full md:order-2 md:w-1/2">
  <div className="relative mx-auto flex aspect-square w-full max-w-[390px] items-center justify-center">

    {/* Main ambient glow */}
    <div
      className="
        absolute
        left-1/2
        top-1/2
        h-[65%]
        w-[65%]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-red-600/30
        blur-[90px]
      "
    />

    {/* Secondary glow */}
    <div
      className="
        absolute
        left-[42%]
        top-[48%]
        h-[35%]
        w-[55%]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-orange-500/10
        blur-[70px]
      "
    />

    {/* Ground shadow */}
    <div
      className="
        absolute
        bottom-[17%]
        left-1/2
        h-8
        w-[55%]
        -translate-x-1/2
        rounded-[50%]
        bg-black/70
        blur-2xl
      "
    />

    {/* Shoe */}
    <div className="relative z-10 w-[105%]">
      <Image
        src={product.heroImage}
        alt={product.name}
        width={800}
        height={700}
        priority
        className="
          h-auto
          w-full
          object-contain
          drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)]
        "
      />
    </div>

    {/* Small decorative light */}
    <div
      className="
        pointer-events-none
        absolute
        bottom-[22%]
        left-[20%]
        h-2
        w-20
        rounded-full
        bg-red-500/40
        blur-xl
      "
    />

  </div>

  {/* Carousel indicators */}
  <div className="relative z-20 mt-1 flex justify-center gap-2">
    <span className="h-2 w-8 rounded-full bg-red-500" />
    <span className="h-2 w-2 rounded-full bg-white/20" />
    <span className="h-2 w-2 rounded-full bg-white/20" />
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