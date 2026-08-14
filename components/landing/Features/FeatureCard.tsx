import Image from "next/image";
import { ProductFeature } from "../../types/product";

type FeatureCardProps = {
  feature: ProductFeature;
  index: number;
};

export default function FeatureCard({
  feature,
  index,
}: FeatureCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111315]">

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          sizes="(max-width: 768px) 90vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-transparent to-transparent" />

        {/* Number */}
        <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-sm font-black text-white shadow-lg">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-5 pt-2 text-right">

        <h3 className="text-xl font-black text-white">
          {feature.title}
        </h3>

        <p className="mt-2 text-sm leading-7 text-gray-400">
          {feature.description}
        </p>

        <div className="mt-4 h-1 w-12 rounded-full bg-red-500" />
      </div>
    </article>
  );
}