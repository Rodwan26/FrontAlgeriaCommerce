"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { HeroSection } from "@/lib/landing-page/types";
import { hexWithAlpha } from "./BuilderHeader";

type Props = {
  section: HeroSection;
};

export default function BuilderHero({ section }: Props) {
  const [activeSlide, setActiveSlide] = useState(0);
  const { colors } = section;

  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const currentSlide = section.slides[activeSlide] ?? section.slides[0];

  return (
    <section id="hero" dir="rtl" className="relative overflow-hidden" style={{ backgroundColor: colors.bg }}>
      <div
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full blur-[130px]"
        style={{ backgroundColor: hexWithAlpha(colors.primary, 0.15) }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full blur-[140px]"
        style={{ backgroundColor: hexWithAlpha(colors.primary, 0.1) }}
      />

      <div className="relative mx-auto flex min-h-[calc(100svh-70px)] max-w-6xl flex-col px-4 py-8 md:flex-row md:items-center md:gap-10 md:py-10">
        <div className="order-1 flex w-full flex-col items-center md:order-2 md:w-[55%]">
          <div className="relative flex h-[400px] w-full items-center justify-center sm:h-[460px] md:h-[560px]">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
              style={{ backgroundColor: hexWithAlpha(colors.primary, 0.2) }}
            />
            <div className="pointer-events-none absolute bottom-[8%] left-1/2 h-8 w-[55%] -translate-x-1/2 rounded-full bg-black/80 blur-2xl" />

            <Image
              key={currentSlide.image}
              src={currentSlide.image}
              alt={currentSlide.title}
              width={900}
              height={700}
              priority={activeSlide === 0}
              sizes="(max-width: 768px) 100vw, 55vw"
              className="relative z-10 h-full w-full object-contain p-3 drop-shadow-[0_30px_50px_rgba(0,0,0,0.65)]"
            />
          </div>

          <div className="w-full max-w-[540px] px-4 text-center">
            <h3 className="text-lg font-black sm:text-xl" style={{ color: colors.text }}>
              {currentSlide.title}
            </h3>
            <p className="mx-auto mt-1 max-w-md text-sm leading-6" style={{ color: colors.mutedText }}>
              {currentSlide.description}
            </p>

            <div className="mt-4 flex justify-center gap-2">
              {section.slides.map((slide, index) => (
                <button
                  key={`${slide.image}-${index}`}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`عرض الصورة ${index + 1}`}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: index === activeSlide ? 32 : 6,
                    backgroundColor: index === activeSlide ? colors.primary : hexWithAlpha(colors.text, 0.2),
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="order-2 mt-8 w-full text-center md:order-1 md:w-[45%] md:text-right">
          <p className="text-sm font-bold tracking-[0.2em] md:text-base" style={{ color: colors.primary }}>
            {section.brand}
          </p>

          <h1
            className="mt-2 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
            style={{ color: colors.text }}
          >
            {section.title}{" "}
            <span style={{ color: colors.primary }}>{section.highlightedTitle}</span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 sm:text-base md:mx-0 md:text-lg" style={{ color: colors.mutedText }}>
            {section.description}
          </p>

          <div className="mt-5 flex items-baseline justify-center gap-2 md:justify-start">
            <span className="text-4xl font-black sm:text-5xl" style={{ color: colors.text }}>
              {section.price.toLocaleString("ar-DZ")}
            </span>
            <span className="text-lg font-bold" style={{ color: colors.primary }}>
              {section.currency}
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToOrder}
            className="group relative mt-6 inline-flex w-full max-w-sm items-center justify-center gap-3 overflow-hidden rounded-2xl px-7 py-4 text-base font-black text-white shadow-xl transition duration-300 active:scale-[0.97] md:w-auto"
            style={{
              backgroundColor: colors.primary,
              boxShadow: `0 10px 35px ${hexWithAlpha(colors.primary, 0.25)}`,
            }}
          >
            <span
              className="pointer-events-none absolute inset-y-0 -left-[70%] w-[45%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/35 to-transparent blur-[2px]"
            />
            <span className="relative z-10">{section.buttonText}</span>
            <ArrowDown size={19} className="relative z-10 transition-transform duration-300 group-hover:translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
}