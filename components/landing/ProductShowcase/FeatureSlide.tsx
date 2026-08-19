"use client";

import Image from "next/image";
import { ProductFeature } from "../../types/product";

type FeatureSlideProps = {
  feature: ProductFeature;
};

export default function FeatureSlide({
  feature,
}: FeatureSlideProps) {
  return (
    <article
      key={feature.id}
      className="mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-white/10 bg-[#101214]"
    >
      <div className="grid md:grid-cols-2">

        {/* Image */}
        <div className="relative aspect-[4/3] min-h-[230px] overflow-hidden md:aspect-auto">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
            ميزة المنتج
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-6 text-right md:p-8">

          <span className="text-xs font-bold uppercase tracking-widest text-red-500">
            HOKA PERFORMANCE
          </span>

          <h2 className="mt-2 text-2xl font-black text-white md:text-3xl">
            {feature.title}
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-400 md:text-base">
            {feature.description}
          </p>

          <div className="mt-5 h-1 w-12 rounded-full bg-red-500" />
        </div>

      </div>
    </article>
  );
}