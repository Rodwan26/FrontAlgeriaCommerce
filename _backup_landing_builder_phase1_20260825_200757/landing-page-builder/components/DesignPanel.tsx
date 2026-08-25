"use client";

import { Palette } from "lucide-react";

import type { LandingSettings } from "../types";

type DesignPanelProps = {
  settings: LandingSettings;
  onUpdateSetting: (
    key: keyof LandingSettings,
    value: string
  ) => void;
};

type ColorFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function ColorField({
  label,
  value,
  onChange,
}: ColorFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </label>

      <div className="flex gap-2">
        <input
          type="color"
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="
            h-10 w-12
            shrink-0 cursor-pointer
            rounded-lg
            border border-gray-300
            bg-white p-1
            outline-none
            focus:outline-none
          "
          aria-label={`${label} color`}
        />

        <input
          type="text"
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          spellCheck={false}
          className="
            min-w-0 flex-1
            rounded-lg
            border border-gray-300
            bg-white
            px-3 py-2
            text-sm font-mono
            text-gray-900
            caret-gray-900
            placeholder:text-gray-400
            outline-none
            focus:border-indigo-500
            focus:ring-1
            focus:ring-indigo-500
          "
          aria-label={`${label} hex value`}
        />
      </div>
    </div>
  );
}

export default function DesignPanel({
  settings,
  onUpdateSetting,
}: DesignPanelProps) {
  return (
    <aside
      className="
        flex h-full min-h-0
        w-60 shrink-0
        flex-col overflow-hidden
        border-l border-gray-200
        bg-white
      "
    >
      <div className="shrink-0 border-b border-gray-200 p-5">
        <div className="flex items-center gap-2">
          <Palette
            size={17}
            className="text-gray-500"
          />

          <h2 className="text-sm font-semibold text-gray-900">
            Design
          </h2>
        </div>
      </div>

      <div
        className="
          min-h-0 flex-1
          overflow-y-auto landing-builder-scrollbar
          overscroll-contain
          space-y-6
          p-4
          text-gray-900
        "
      >
        <ColorField
          label="Primary color"
          value={settings.primaryColor}
          onChange={(value) =>
            onUpdateSetting(
              "primaryColor",
              value
            )
          }
        />

        <ColorField
          label="Secondary color"
          value={settings.secondaryColor}
          onChange={(value) =>
            onUpdateSetting(
              "secondaryColor",
              value
            )
          }
        />

        <ColorField
          label="Background color"
          value={settings.backgroundColor}
          onChange={(value) =>
            onUpdateSetting(
              "backgroundColor",
              value
            )
          }
        />

        <ColorField
          label="Text color"
          value={settings.textColor}
          onChange={(value) =>
            onUpdateSetting(
              "textColor",
              value
            )
          }
        />

        <div>
          <label
            htmlFor="design-button-text"
            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500"
          >
            Button text
          </label>

          <input
            id="design-button-text"
            type="text"
            value={settings.buttonText}
            onChange={(event) =>
              onUpdateSetting(
                "buttonText",
                event.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border border-gray-300
              bg-white
              px-3 py-2
              text-sm
              text-gray-900
              caret-gray-900
              outline-none
              focus:border-indigo-500
              focus:ring-1
              focus:ring-indigo-500
            "
          />
        </div>

        <div>
          <label
            htmlFor="design-font-family"
            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500"
          >
            Font family
          </label>

          <select
            id="design-font-family"
            value={settings.fontFamily}
            onChange={(event) =>
              onUpdateSetting(
                "fontFamily",
                event.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border border-gray-300
              bg-white
              px-3 py-2
              text-sm
              text-gray-900
              outline-none
              focus:border-indigo-500
              focus:ring-1
              focus:ring-indigo-500
            "
          >
            <option value="Inter">
              Inter
            </option>

            <option value="Arial">
              Arial
            </option>

            <option value="system-ui">
              System UI
            </option>

            <option value="Georgia">
              Georgia
            </option>
          </select>
        </div>
      </div>
    </aside>
  );
}


