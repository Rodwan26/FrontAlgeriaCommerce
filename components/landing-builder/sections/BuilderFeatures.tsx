import Image from "next/image";
import { FeaturesSection } from "@/lib/landing-page/types";
import { hexWithAlpha } from "./BuilderHeader";

type Props = {
  section: FeaturesSection;
};

export default function BuilderFeatures({ section }: Props) {
  const { colors } = section;

  return (
    <section id="features" dir="rtl" className="py-20" style={{ backgroundColor: colors.bg }}>
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl" style={{ color: colors.text }}>
          {section.title}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 sm:text-base" style={{ color: colors.mutedText }}>
          {section.subtitle}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {section.items.map((feature) => (
            <div
              key={feature.id}
              className="group overflow-hidden rounded-3xl border p-4 text-right transition duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                boxShadow: `0 15px 40px ${hexWithAlpha(colors.primary, 0.06)}`,
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={640}
                  height={480}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-lg font-black" style={{ color: colors.text }}>
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6" style={{ color: colors.mutedText }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}