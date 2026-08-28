import { Headphones, ShieldCheck, Truck, Banknote } from "lucide-react";
import { FooterSection } from "@/lib/landing-page/types";
import { hexWithAlpha } from "./BuilderHeader";

const FALLBACK_ICONS = [Headphones, ShieldCheck, Truck, Banknote];

type Props = {
  section: FooterSection;
};

export default function BuilderFooter({ section }: Props) {
  const { colors } = section;

  return (
    <footer
      className="border-t px-4 py-8"
      style={{ backgroundColor: colors.surface, borderColor: hexWithAlpha(colors.text, 0.1) }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {section.benefits.map((benefit, i) => {
            const Icon = FALLBACK_ICONS[i % FALLBACK_ICONS.length];
            return (
              <div key={benefit.id} className="text-center">
                <Icon size={30} className="mx-auto" style={{ color: colors.primary }} />
                <h3 className="mt-2 text-sm font-bold" style={{ color: colors.text }}>
                  {benefit.title}
                </h3>
                <p className="mt-1 text-xs leading-5" style={{ color: colors.mutedText }}>
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        <div
          className="mt-8 border-t pt-5 pb-2 text-center text-xs"
          style={{ borderColor: hexWithAlpha(colors.text, 0.1), color: colors.mutedText }}
        >
          {section.copyright}
        </div>
      </div>
    </footer>
  );
}