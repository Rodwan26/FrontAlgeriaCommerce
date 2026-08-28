import { Quote, Star } from "lucide-react";
import { TestimonialsSection } from "@/lib/landing-page/types";
import { hexWithAlpha } from "./BuilderHeader";

type Props = {
  section: TestimonialsSection;
};

export default function BuilderTestimonials({ section }: Props) {
  const { colors } = section;

  return (
    <section id="testimonials" dir="rtl" className="py-20" style={{ backgroundColor: colors.bg }}>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl" style={{ color: colors.text }}>
          {section.title}
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {section.items.map((item) => (
            <div
              key={item.id}
              className="relative rounded-3xl border p-6"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              <Quote
                size={28}
                className="absolute left-5 top-5"
                style={{ color: hexWithAlpha(colors.primary, 0.35) }}
              />

              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < item.rating ? "fill-current" : "opacity-25"}
                    style={{ color: colors.primary }}
                  />
                ))}
              </div>

              <p className="mt-4 text-sm leading-7" style={{ color: colors.mutedText }}>
                {item.text}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-base font-black text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: colors.text }}>
                    {item.name}
                  </p>
                  <p className="text-xs" style={{ color: colors.mutedText }}>
                    عميل موثوق
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}