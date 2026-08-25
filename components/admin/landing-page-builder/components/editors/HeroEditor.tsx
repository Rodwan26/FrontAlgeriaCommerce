"use client";

import type { LandingSection } from "../../types";

type HeroEditorProps = {
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

export default function HeroEditor({
  section,
  updateSectionSetting,
}: HeroEditorProps) {
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Eyebrow
        </label>

        <input
          value={getStringSetting(
            section,
            "eyebrow",
            "New collection"
          )}
          onChange={(event) =>
            updateSectionSetting(
              section.id,
              "eyebrow",
              event.target.value
            )
          }
          placeholder="New collection"
          className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Title
        </label>

        <textarea
          value={getStringSetting(
            section,
            "title",
            "Your product deserves a great first impression."
          )}
          onChange={(event) =>
            updateSectionSetting(
              section.id,
              "title",
              event.target.value
            )
          }
          className="min-h-24 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Subtitle
        </label>

        <textarea
          value={getStringSetting(
            section,
            "subtitle",
            "Create a powerful shopping experience designed to convert visitors into customers."
          )}
          onChange={(event) =>
            updateSectionSetting(
              section.id,
              "subtitle",
              event.target.value
            )
          }
          className="min-h-28 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Button text
        </label>

        <input
          value={getStringSetting(
            section,
            "buttonText",
            "Order now"
          )}
          onChange={(event) =>
            updateSectionSetting(
              section.id,
              "buttonText",
              event.target.value
            )
          }
          placeholder="Order now"
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
