"use client";

import { useRef } from "react";
import { ImagePlus, Trash2, Upload } from "lucide-react";

export type ColorValue = {
  id: string;
  name: string;
  hex: string;
  image: string;
};

type ColorValueEditorProps = {
  values: ColorValue[];
  onChange: (values: ColorValue[]) => void;
};

function normalizeHex(value: string) {
  if (!value) return "";

  let hex = value.trim();

  if (!hex.startsWith("#")) {
    hex = `#${hex}`;
  }

  return hex.toUpperCase();
}

export default function ColorValueEditor({
  values,
  onChange,
}: ColorValueEditorProps) {
  const fileInputs = useRef<
    Record<string, HTMLInputElement | null>
  >({});

  function updateValue(
    id: string,
    changes: Partial<ColorValue>
  ) {
    onChange(
      values.map((value) =>
        value.id === id
          ? {
              ...value,
              ...changes,
            }
          : value
      )
    );
  }

  function removeValue(id: string) {
    onChange(
      values.filter((value) => value.id !== id)
    );
  }

  function handleImage(
    id: string,
    file: File | undefined
  ) {
    if (!file) return;

    const url = URL.createObjectURL(file);

    updateValue(id, {
      image: url,
    });
  }

  return (
    <div className="space-y-3">
      {values.map((value) => (
        <div
          key={value.id}
          className="rounded-xl border border-gray-200 bg-white p-4"
        >
          <div className="flex items-start gap-4">
            {/* Color preview */}
            <div className="shrink-0">
              <div
                className="h-12 w-12 rounded-full border border-gray-300 shadow-sm"
                style={{
                  backgroundColor:
                    value.hex || "#FFFFFF",
                }}
              />
            </div>

            {/* Main fields */}
            <div className="min-w-0 flex-1">
              <div className="grid gap-3 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    Color name
                  </label>

                  <input
                    type="text"
                    value={value.name}
                    onChange={(e) =>
                      updateValue(value.id, {
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g. Black"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* Hex */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    Color code
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={value.hex}
                      onChange={(e) =>
                        updateValue(value.id, {
                          hex: normalizeHex(
                            e.target.value
                          ),
                        })
                      }
                      placeholder="#000000"
                      className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                    <input
                      type="color"
                      value={
                        /^#[0-9A-Fa-f]{6}$/.test(
                          value.hex
                        )
                          ? value.hex
                          : "#000000"
                      }
                      onChange={(e) =>
                        updateValue(value.id, {
                          hex: e.target.value.toUpperCase(),
                        })
                      }
                      className="h-10 w-12 cursor-pointer rounded-lg border border-gray-300 bg-white p-1"
                      title="Choose color"
                    />
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                  Image for this color
                </label>

                <div className="flex items-center gap-3">
                  {value.image ? (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                      <img
                        src={value.image}
                        alt={value.name || "Color"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                      <ImagePlus
                        size={20}
                        className="text-gray-400"
                      />
                    </div>
                  )}

                  <input
                    ref={(element) => {
                      fileInputs.current[value.id] =
                        element;
                    }}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleImage(
                        value.id,
                        e.target.files?.[0]
                      )
                    }
                  />

                  <button
                    type="button"
                    onClick={() =>
                      fileInputs.current[
                        value.id
                      ]?.click()
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <Upload size={15} />

                    {value.image
                      ? "Change image"
                      : "Add image"}
                  </button>
                </div>
              </div>
            </div>

            {/* Delete */}
            <button
              type="button"
              onClick={() =>
                removeValue(value.id)
              }
              className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
              aria-label="Remove color"
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
