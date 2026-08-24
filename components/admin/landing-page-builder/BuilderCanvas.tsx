"use client";

import type { LandingSection, LandingSettings } from "./types";

type BuilderCanvasProps = {
  sections: LandingSection[];
  theme: LandingSettings;
  selectedId: string | null;
  onSelect: (id: string) => void;
};

function SectionWrapper({
  section,
  selected,
  onSelect,
  children,
}: {
  section: LandingSection;
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  if (!section.enabled) return null;

  return (
    <section
      onClick={onSelect}
      className={`relative cursor-pointer ${
        selected
          ? "ring-2 ring-indigo-500 ring-inset"
          : "hover:ring-1 hover:ring-indigo-300"
      }`}
    >
      {selected && (
        <div className="absolute left-3 top-3 z-20 rounded-md bg-indigo-600 px-2 py-1 text-[10px] font-semibold text-white">
          Selected
        </div>
      )}

      {children}
    </section>
  );
}

export default function BuilderCanvas({
  sections,
  theme,
  selectedId,
  onSelect,
}: BuilderCanvasProps) {
  return (
    <div
      className="min-h-full overflow-hidden"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      {sections.map((section) => (
        <SectionWrapper
          key={section.id}
          section={section}
          selected={selectedId === section.id}
          onSelect={() => onSelect(section.id)}
        >
          {section.type === "hero" && (
            <div className="grid min-h-[520px] items-center gap-10 px-8 py-16 md:grid-cols-2 md:px-14">
              <div>
                <p
                  className="mb-4 text-sm font-bold uppercase tracking-widest"
                  style={{ color: theme.primaryColor }}
                >
                  {String(section.settings.eyebrow)}
                </p>

                <h1 className="text-4xl font-black leading-tight md:text-6xl">
                  {String(section.settings.title)}
                </h1>

                <p className="mt-6 max-w-xl text-base leading-7 opacity-70">
                  {String(section.settings.subtitle)}
                </p>

                <button
                  type="button"
                  className="mt-8 rounded-xl px-7 py-3.5 text-sm font-bold"
                  style={{
                    backgroundColor: theme.primaryColor,
                    color: theme.buttonText,
                  }}
                >
                  {String(section.settings.buttonText)}
                </button>
              </div>

              <div className="flex min-h-[330px] items-center justify-center rounded-3xl bg-gray-100">
                <span className="text-sm text-gray-400">
                  Product image
                </span>
              </div>
            </div>
          )}

          {section.type === "product" && (
            <div className="grid items-center gap-10 px-8 py-20 md:grid-cols-2 md:px-14">
              <div className="flex min-h-[360px] items-center justify-center rounded-3xl bg-gray-100">
                <span className="text-sm text-gray-400">
                  Product image
                </span>
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  {String(section.settings.title)}
                </h2>

                <p className="mt-4 leading-7 opacity-70">
                  {String(section.settings.description)}
                </p>

                <p
                  className="mt-6 text-3xl font-black"
                  style={{ color: theme.primaryColor }}
                >
                  {String(section.settings.price)}
                </p>
              </div>
            </div>
          )}

          {section.type === "gallery" && (
            <div className="px-8 py-16 md:px-14">
              <div className="flex min-h-[350px] items-center justify-center rounded-3xl bg-gray-100">
                <span className="text-sm text-gray-400">
                  Gallery section
                </span>
              </div>
            </div>
          )}

          {section.type === "features" && (
            <div className="px-8 py-20 md:px-14">
              <h2 className="text-center text-3xl font-bold">
                {String(section.settings.title)}
              </h2>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {(section.settings.items as string[]).map(
                  (item, index) => (
                    <div
                      key={`${section.id}-feature-${index}`}
                      className="rounded-2xl border border-gray-200 p-6"
                    >
                      <div
                        className="mb-4 flex h-10 w-10 items-center justify-center rounded-full font-bold"
                        style={{
                          backgroundColor: `${theme.primaryColor}18`,
                          color: theme.primaryColor,
                        }}
                      >
                        {index + 1}
                      </div>

                      <h3 className="font-bold">{item}</h3>

                      <p className="mt-2 text-sm leading-6 opacity-60">
                        A short explanation of this benefit.
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {section.type === "testimonials" && (
            <div className="bg-gray-50 px-8 py-20 md:px-14">
              <h2 className="text-center text-3xl font-bold">
                {String(section.settings.title)}
              </h2>

              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {(
                  section.settings.items as {
                    name: string;
                    text: string;
                  }[]
                ).map((item, index) => (
                  <div
                    key={`${section.id}-testimonial-${index}`}
                    className="rounded-2xl bg-white p-7 shadow-sm"
                  >
                    <div
                      className="text-3xl"
                      style={{ color: theme.primaryColor }}
                    >
                      “
                    </div>

                    <p className="mt-2 leading-7 opacity-70">
                      {item.text}
                    </p>

                    <p className="mt-5 text-sm font-bold">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section.type === "faq" && (
            <div className="px-8 py-20 md:px-14">
              <h2 className="text-center text-3xl font-bold">
                {String(section.settings.title)}
              </h2>

              <div className="mx-auto mt-10 max-w-3xl space-y-3">
                {(
                  section.settings.items as {
                    question: string;
                    answer: string;
                  }[]
                ).map((item, index) => (
                  <div
                    key={`${section.id}-faq-${index}`}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <p className="font-bold">{item.question}</p>
                    <p className="mt-2 text-sm leading-6 opacity-60">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section.type === "order" && (
            <div className="px-8 py-20 md:px-14">
              <div className="mx-auto max-w-xl">
                <h2 className="text-center text-3xl font-bold">
                  {String(section.settings.title)}
                </h2>

                <p className="mt-3 text-center text-sm opacity-60">
                  {String(section.settings.subtitle)}
                </p>

                <div className="mt-8 space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <input
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
                    placeholder="Full name"
                  />

                  <input
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
                    placeholder="Phone number"
                  />

                  <select className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm">
                    <option>Wilaya</option>
                  </select>

                  <select className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm">
                    <option>Commune</option>
                  </select>

                  <button
                    type="button"
                    className="w-full rounded-lg px-4 py-3 text-sm font-bold"
                    style={{
                      backgroundColor: theme.primaryColor,
                      color: theme.buttonText,
                    }}
                  >
                    {String(section.settings.buttonText)}
                  </button>
                </div>
              </div>
            </div>
          )}
        </SectionWrapper>
      ))}
    </div>
  );
}






