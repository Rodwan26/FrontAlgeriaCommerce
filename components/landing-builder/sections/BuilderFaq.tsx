"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaqSection } from "@/lib/landing-page/types";
import { hexWithAlpha } from "./BuilderHeader";

type Props = {
  section: FaqSection;
};

export default function BuilderFaq({ section }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { colors } = section;

  return (
    <section id="faq" dir="rtl" className="py-20" style={{ backgroundColor: colors.surface }}>
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl" style={{ color: colors.text }}>
          {section.title}
        </h2>

        <div className="mt-10 space-y-3">
          {section.items.map((item, index) => {
            const open = openIndex === index;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border transition"
                style={{
                  backgroundColor: colors.bg,
                  borderColor: open ? colors.primary : colors.border,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
                >
                  <span className="text-base font-bold" style={{ color: colors.text }}>
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    style={{ color: open ? colors.primary : colors.mutedText }}
                  />
                </button>
                {open ? (
                  <p className="border-t px-5 pb-5 pt-3 text-sm leading-7" style={{ borderColor: colors.border, color: colors.mutedText }}>
                    {item.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}