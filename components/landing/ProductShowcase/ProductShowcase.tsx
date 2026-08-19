"use client";

import { useState } from "react";
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { product } from "../../data/product";
import ProductVisual from "./ProductVisual";
import FeatureSlide from "./FeatureSlide";

export default function ProductShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);

  const currentFeature = product.features[activeFeature];

  const nextFeature = () => {
    setActiveFeature((current) =>
      current === product.features.length - 1
        ? 0
        : current + 1
    );
  };

  const previousFeature = () => {
    setActiveFeature((current) =>
      current === 0
        ? product.features.length - 1
        : current - 1
    );
  };

  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="showcase"
      dir="rtl"
      className="
        relative
        overflow-hidden
        bg-[#080a0b]
        py-20
        sm:py-24
        lg:py-32
      "
    >
      {/* Background */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            right-[-180px]
            top-[10%]
            h-[400px]
            w-[400px]
            rounded-full
            bg-red-600/[0.07]
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            bottom-[-200px]
            left-[-150px]
            h-[400px]
            w-[400px]
            rounded-full
            bg-red-950/20
            blur-[140px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ==================================================
            SECTION INTRO
        ================================================== */}

        <div className="mx-auto max-w-2xl text-center">
          <span
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-red-500
            "
          >
            HOKA PERFORMANCE
          </span>

          <h2
            className="
              mt-4
              text-3xl
              font-black
              tracking-tight
              text-white
              sm:text-4xl
              lg:text-5xl
            "
          >
            أكثر من مجرد حذاء
          </h2>

          <p
            className="
              mt-4
              text-sm
              leading-7
              text-white/45
              sm:text-base
            "
          >
            صُمم ليمنحك الراحة والثبات والأداء الذي تحتاجه
            في كل خطوة.
          </p>
        </div>

        {/* ==================================================
            PRODUCT
        ================================================== */}

        <div
          className="
            mt-14
            grid
            items-center
            gap-12
            lg:grid-cols-2
            lg:gap-20
          "
        >
          {/* Product visual */}

          <div className="relative">
            <ProductVisual />

            {/* Product number */}

            <div
              className="
                absolute
                right-4
                top-4
                flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-black/30
                px-3
                py-2
                backdrop-blur-xl
              "
            >
              <span className="text-xs font-bold text-red-500">
                01
              </span>

              <span className="text-[10px] text-white/30">
                HOKA
              </span>
            </div>
          </div>

          {/* Content */}

          <div className="text-right">

            {/* Small label */}

            <div className="flex items-center justify-end gap-3">
              <span className="text-xs font-bold tracking-[0.18em] text-white/30">
                BUILT FOR MOVEMENT
              </span>

              <span className="h-px w-8 bg-red-500/60" />
            </div>

            <h3
              className="
                mt-5
                text-3xl
                font-black
                leading-tight
                text-white
                sm:text-4xl
                lg:text-5xl
              "
            >
              راحة تشعر بها
              <br />
              <span className="text-red-500">
                في كل خطوة
              </span>
            </h3>

            <p
              className="
                mt-5
                max-w-lg
                text-sm
                leading-8
                text-white/50
                sm:text-base
              "
            >
              تجربة مصممة لتمنح قدميك دعماً أفضل وحركة أكثر
              سلاسة، سواء كنت تمارس الرياضة أو تتحرك خلال
              يومك.
            </p>

            {/* Feature pills */}

            <div className="mt-7 grid grid-cols-3 gap-2">
              {product.features.map((feature, index) => (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => setActiveFeature(index)}
                  className={`
                    rounded-xl
                    border
                    px-3
                    py-3
                    text-xs
                    font-bold
                    transition-all
                    duration-300
                    ${
                      activeFeature === index
                        ? "border-red-500/40 bg-red-500/10 text-red-400"
                        : "border-white/[0.07] bg-white/[0.02] text-white/40 hover:bg-white/[0.05] hover:text-white/70"
                    }
                  `}
                >
                  {feature.title}
                </button>
              ))}
            </div>

            {/* Feature description */}

            <div
              className="
                mt-5
                min-h-[170px]
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.025]
                p-5
                sm:p-6
              "
            >
              {currentFeature && (
                <FeatureSlide feature={currentFeature} />
              )}
            </div>

            {/* Controls */}

            <div className="mt-5 flex items-center justify-between">

              <button
                type="button"
                onClick={scrollToOrder}
                className="
                  group
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:text-red-400
                "
              >
                اطلب المنتج

                <ArrowDown
                  size={16}
                  className="
                    transition-transform
                    group-hover:translate-y-1
                  "
                />
              </button>

              <div className="flex items-center gap-3">

                <button
                  type="button"
                  onClick={nextFeature}
                  aria-label="الميزة التالية"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.03]
                    text-white/60
                    transition
                    hover:border-red-500/30
                    hover:bg-red-500/10
                    hover:text-white
                  "
                >
                  <ChevronRight size={18} />
                </button>

                <div className="flex items-center gap-1.5">
                  {product.features.map(
                    (feature, index) => (
                      <button
                        key={feature.id}
                        type="button"
                        onClick={() =>
                          setActiveFeature(index)
                        }
                        aria-label={`الميزة ${index + 1}`}
                        className={`
                          h-1.5
                          rounded-full
                          transition-all
                          duration-300
                          ${
                            activeFeature === index
                              ? "w-7 bg-red-500"
                              : "w-1.5 bg-white/20"
                          }
                        `}
                      />
                    )
                  )}
                </div>

                <button
                  type="button"
                  onClick={previousFeature}
                  aria-label="الميزة السابقة"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.03]
                    text-white/60
                    transition
                    hover:border-red-500/30
                    hover:bg-red-500/10
                    hover:text-white
                  "
                >
                  <ChevronLeft size={18} />
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}