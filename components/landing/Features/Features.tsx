import { product } from "../../data/product";
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section
      id="features"
      className="bg-[#080a0b] px-4 py-8 md:py-16"
    >
      <div className="mx-auto max-w-6xl">

        <div className="mb-6 text-center">
          <span className="text-sm font-bold text-red-500">
            اكتشف الفرق
          </span>

          <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">
            لماذا تختار HOKA؟
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {product.features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}