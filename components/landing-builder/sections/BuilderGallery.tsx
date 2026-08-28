import Image from "next/image";
import { GallerySection } from "@/lib/landing-page/types";

type Props = {
  section: GallerySection;
};

export default function BuilderGallery({ section }: Props) {
  const { colors } = section;

  return (
    <section id="gallery" dir="rtl" className="py-20" style={{ backgroundColor: colors.surface }}>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl" style={{ color: colors.text }}>
          {section.title}
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {section.items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-2xl border"
              style={{ borderColor: colors.border }}
            >
              <Image
                src={item.image}
                alt={item.caption || section.title}
                width={720}
                height={720}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              {item.caption ? (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10">
                  <p className="text-sm font-bold text-white">{item.caption}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}