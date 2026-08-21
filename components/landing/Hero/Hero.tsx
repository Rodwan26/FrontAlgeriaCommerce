"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import { product } from "../data/product";

const slides = [
  {
    image: "/products/hero.jpg",
    title: "راحة تبدأ من أول خطوة",
    description:
      "تصميم مريح يمنح قدميك دعماً استثنائياً طوال اليوم.",
  },
  {
    image: "/products/feature-1.webp",
    title: "دعم وراحة متواصلة",
    description:
      "وسادة مريحة ودعم مثالي لتجربة أكثر راحة أثناء الحركة.",
  },
  {
    image: "/products/feature-2.webp",
    title: "خفيفة في كل خطوة",
    description:
      "تصميم رياضي خفيف يساعدك على التحرك بحرية وسهولة.",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const currentSlide = slides[activeSlide];

  return (
    <section
      id="hero"
      dir="rtl"
      className="relative overflow-hidden bg-[#080a0b]"
    >
      {/* =========================
          AMBIENT LIGHT
      ========================== */}

      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-red-600/15 blur-[130px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-red-600/10 blur-[140px]" />

      {/* =========================
          CONTAINER
      ========================== */}

      <div
        className="
          relative
          mx-auto
          flex
          min-h-[calc(100svh-70px)]
          max-w-6xl
          flex-col
          px-4
          py-8
          md:flex-row
          md:items-center
          md:gap-10
          md:py-10
        "
      >
        {/* =================================================
            PRODUCT VISUAL
        ================================================= */}

        <div
          className="
            order-1
            flex
            w-full
            flex-col
            items-center
            md:order-2
            md:w-[55%]
          "
        >
          {/* =========================
              FIXED IMAGE AREA
          ========================== */}

          <div
            className="
              relative
              flex
              h-[400px]
              w-full
              items-center
              justify-center
              sm:h-[460px]
              md:h-[560px]
            "
          >
            {/* Glow */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[55%]
                w-[70%]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-red-600/20
                blur-[100px]
              "
            />

            {/* Ground shadow */}

            <div
              className="
                pointer-events-none
                absolute
                bottom-[8%]
                left-1/2
                h-8
                w-[55%]
                -translate-x-1/2
                rounded-full
                bg-black/80
                blur-2xl
              "
            />

            {/* =========================
                IMAGE
            ========================== */}

            <Image
              key={currentSlide.image}
              src={currentSlide.image}
              alt={currentSlide.title}
              width={900}
              height={700}
              priority={activeSlide === 0}
              sizes="(max-width: 768px) 100vw, 55vw"
              className="
                relative
                z-10
                h-full
                w-full
                object-contain
                p-3
                drop-shadow-[0_30px_50px_rgba(0,0,0,0.65)]
                animate-[heroImageIn_0.6s_ease-out]
              "
            />
          </div>

          {/* =========================
              IMAGE DESCRIPTION
          ========================== */}

          <div className="w-full max-w-[540px] px-4 text-center">

            <h3
              key={`title-${activeSlide}`}
              className="
                text-lg
                font-black
                text-white
                animate-[heroTextIn_0.5s_ease-out]
                sm:text-xl
              "
            >
              {currentSlide.title}
            </h3>

            <p
              key={`description-${activeSlide}`}
              className="
                mx-auto
                mt-1
                max-w-md
                text-sm
                leading-6
                text-gray-400
                animate-[heroTextIn_0.5s_ease-out]
              "
            >
              {currentSlide.description}
            </p>

            {/* =========================
                SLIDE INDICATORS
            ========================== */}

            <div className="mt-4 flex justify-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`عرض الصورة ${index + 1}`}
                  className={`
                    h-1.5
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      index === activeSlide
                        ? "w-8 bg-red-500"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </div>

        {/* =================================================
            PRODUCT INFORMATION
        ================================================= */}

        <div
          className="
            order-2
            mt-8
            w-full
            text-center
            md:order-1
            md:w-[45%]
            md:text-right
          "
        >
          {/* Brand */}

          <p
            className="
              text-sm
              font-bold
              tracking-[0.2em]
              text-red-500
              md:text-base
            "
          >
            HOKA
          </p>

          {/* Title */}

          <h1
            className="
              mt-2
              text-4xl
              font-black
              leading-[1.05]
              tracking-tight
              text-white
              sm:text-5xl
              md:text-6xl
            "
          >
            خطوة نحو{" "}
            <span className="text-red-500">
              التميز
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-4
              max-w-lg
              text-sm
              leading-7
              text-gray-400
              sm:text-base
              md:mx-0
              md:text-lg
            "
          >
            راحة استثنائية وأداء مميز في كل خطوة،
            بتصميم رياضي عصري يناسب أسلوب حياتك.
          </p>

          {/* Price */}

          <div
            className="
              mt-5
              flex
              items-baseline
              justify-center
              gap-2
              md:justify-start
            "
          >
            <span
              className="
                text-4xl
                font-black
                text-white
                sm:text-5xl
              "
            >
              {product.price.toLocaleString("ar-DZ")}
            </span>

            <span className="text-lg font-bold text-red-500">
              دج
            </span>
          </div>

          {/* CTA */}

          <button
            type="button"
            onClick={scrollToOrder}
            className="
              group
              relative
              mt-6
              inline-flex
              w-full
              max-w-sm
              items-center
              justify-center
              gap-3
              overflow-hidden
              rounded-2xl
              bg-red-600
              px-7
              py-4
              text-base
              font-black
              text-white
              shadow-xl
              shadow-red-600/20
              transition
              duration-300
              hover:bg-red-500
              hover:shadow-red-600/30
              active:scale-[0.97]
              md:w-auto
            "
          >
            {/* Shine */}

            <span
              className="
                pointer-events-none
                absolute
                inset-y-0
                -left-[70%]
                w-[45%]
                rotate-[18deg]
                bg-gradient-to-r
                from-transparent
                via-white/35
                to-transparent
                blur-[2px]
                animate-[ctaShine_3s_ease-in-out_infinite]
              "
            />

            <span className="relative z-10">
              اطلب الآن
            </span>

            <ArrowDown
              size={19}
              className="
                relative
                z-10
                transition-transform
                duration-300
                group-hover:translate-y-1
              "
            />
          </button>
        </div>
      </div>
    </section>
  );
}