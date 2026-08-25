"use client";

import type { LandingSection } from "../../types";

type ProductEditorProps = {
  section: LandingSection;
  updateSectionSetting: (
    sectionId: string,
    key: string,
    value: unknown
  ) => void;
};

function getStringSetting(
  section: LandingSection,
  key: string,
  fallback: string
): string {
  const value = section.settings[key];

  return typeof value === "string"
    ? value
    : fallback;
}

export default function ProductEditor({
  section,
  updateSectionSetting,
}: ProductEditorProps) {
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Title
        </label>

        <input
          value={getStringSetting(
            section,
            "title",
            "Designed for you"
          )}
          onChange={(event) =>
            updateSectionSetting(
              section.id,
              "title",
              event.target.value
            )
          }
          placeholder="Product title"
          className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Description
        </label>

        <textarea
          value={getStringSetting(
            section,
            "description",
            "Showcase your product with the information your customers need."
          )}
          onChange={(event) =>
            updateSectionSetting(
              section.id,
              "description",
              event.target.value
            )
          }
          className="min-h-28 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Price
        </label>

        <input
          value={getStringSetting(
            section,
            "price",
            "29,900 DA"
          )}
          onChange={(event) =>
            updateSectionSetting(
              section.id,
              "price",
              event.target.value
            )
          }
          placeholder="29,900 DA"
          className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Image URL
        </label>

        <input
          value={getStringSetting(
            section,
            "image",
            ""
          )}
          onChange={(event) =>
            updateSectionSetting(
              section.id,
              "image",
              event.target.value
            )
          }
          placeholder="/products/hero.webp"
          className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
        />

        <p className="mt-1.5 text-xs text-gray-400">
          Optional image path or URL.
        </p>
      </div>
    </div>
  );
}
