"use client";

import { Plus, X } from "lucide-react";

import ColorValueEditor, {
  ColorValue,
} from "./ColorValueEditor";

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
  colorValues?: ColorValue[];
};

type ProductOptionsProps = {
  options: ProductOption[];
  onChange: (options: ProductOption[]) => void;
};

function isColorOption(name: string) {
  const normalized = name
    .trim()
    .toLowerCase();

  return (
    normalized === "color" ||
    normalized === "colour" ||
    normalized === "couleur" ||
    normalized === "اللون"
  );
}

export default function ProductOptions({
  options,
  onChange,
}: ProductOptionsProps) {
  function updateOptionName(
    optionId: string,
    name: string
  ) {
    onChange(
      options.map((option) => {
        if (option.id !== optionId) {
          return option;
        }

        const becomesColor =
          isColorOption(name);

        const wasColor =
          isColorOption(option.name);

        let colorValues =
          option.colorValues;

        if (becomesColor && !wasColor) {
          colorValues = option.values.map(
            (value) => ({
              id: crypto.randomUUID(),
              name: value,
              hex: "#000000",
              image: "",
            })
          );
        }

        return {
          ...option,
          name,
          colorValues,
        };
      })
    );
  }

  function addValue(optionId: string) {
    onChange(
      options.map((option) => {
        if (option.id !== optionId) {
          return option;
        }

        const newValue = "";

        return {
          ...option,
          values: [
            ...option.values,
            newValue,
          ],
          colorValues: isColorOption(
            option.name
          )
            ? [
                ...(option.colorValues ?? []),
                {
                  id: crypto.randomUUID(),
                  name: "",
                  hex: "#000000",
                  image: "",
                },
              ]
            : option.colorValues,
        };
      })
    );
  }

  function updateValue(
    optionId: string,
    valueIndex: number,
    value: string
  ) {
    onChange(
      options.map((option) => {
        if (option.id !== optionId) {
          return option;
        }

        const updatedValues =
          option.values.map(
            (current, index) =>
              index === valueIndex
                ? value
                : current
          );

        let colorValues =
          option.colorValues;

        if (isColorOption(option.name)) {
          colorValues = (
            option.colorValues ?? []
          ).map((color, index) =>
            index === valueIndex
              ? {
                  ...color,
                  name: value,
                }
              : color
          );
        }

        return {
          ...option,
          values: updatedValues,
          colorValues,
        };
      })
    );
  }

  function removeValue(
    optionId: string,
    valueIndex: number
  ) {
    onChange(
      options.map((option) => {
        if (option.id !== optionId) {
          return option;
        }

        return {
          ...option,
          values: option.values.filter(
            (_, index) =>
              index !== valueIndex
          ),
          colorValues: option.colorValues?.filter(
            (_, index) =>
              index !== valueIndex
          ),
        };
      })
    );
  }

  function updateColorValues(
    optionId: string,
    colorValues: ColorValue[]
  ) {
    onChange(
      options.map((option) => {
        if (option.id !== optionId) {
          return option;
        }

        return {
          ...option,
          colorValues,
          values: colorValues.map(
            (color) => color.name
          ),
        };
      })
    );
  }

  function addOption() {
    onChange([
      ...options,
      {
        id: crypto.randomUUID(),
        name: "",
        values: [""],
      },
    ]);
  }

  function removeOption(
    optionId: string
  ) {
    onChange(
      options.filter(
        (option) =>
          option.id !== optionId
      )
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Options
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Add options such as size, color,
              material, or other product
              variations.
            </p>
          </div>

          <button
            type="button"
            onClick={addOption}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <Plus size={16} />

            Add option
          </button>
        </div>
      </div>

      <div className="space-y-6 p-5">
        {options.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
            <p className="text-sm font-medium text-gray-800">
              No options added
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Add options when your product
              has different versions.
            </p>

            <button
              type="button"
              onClick={addOption}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Plus size={16} />

              Add option
            </button>
          </div>
        ) : (
          options.map(
            (option, optionIndex) => {
              const colorMode =
                isColorOption(
                  option.name
                );

              return (
                <div
                  key={option.id}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Option{" "}
                      {optionIndex + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeOption(
                          option.id
                        )
                      }
                      className="rounded-md p-1.5 text-gray-400 hover:bg-white hover:text-red-600"
                      aria-label="Remove option"
                    >
                      <X size={17} />
                    </button>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-800">
                      Option name
                    </label>

                    <input
                      type="text"
                      value={option.name}
                      onChange={(e) =>
                        updateOptionName(
                          option.id,
                          e.target.value
                        )
                      }
                      placeholder="e.g. Size, Color, Material"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  {colorMode ? (
                    <div className="mt-5">
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-800">
                          Colors
                        </label>

                        <p className="mt-1 text-xs text-gray-500">
                          Choose a color, enter its
                          HEX code, and optionally
                          attach an image for this
                          color.
                        </p>
                      </div>

                      <ColorValueEditor
                        values={
                          option.colorValues ??
                          []
                        }
                        onChange={(
                          values
                        ) =>
                          updateColorValues(
                            option.id,
                            values
                          )
                        }
                      />

                      <button
                        type="button"
                        onClick={() =>
                          addValue(
                            option.id
                          )
                        }
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                      >
                        <Plus size={15} />

                        Add color
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <label className="mb-2 block text-sm font-medium text-gray-800">
                        Values
                      </label>

                      <div className="space-y-2">
                        {option.values.map(
                          (
                            value,
                            valueIndex
                          ) => (
                            <div
                              key={
                                valueIndex
                              }
                              className="flex items-center gap-2"
                            >
                              <input
                                type="text"
                                value={
                                  value
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateValue(
                                    option.id,
                                    valueIndex,
                                    e.target
                                      .value
                                  )
                                }
                                placeholder={`Value ${
                                  valueIndex +
                                  1
                                }`}
                                className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                              />

                              {option
                                .values
                                .length >
                                1 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeValue(
                                      option.id,
                                      valueIndex
                                    )
                                  }
                                  className="rounded-md p-2 text-gray-400 hover:bg-white hover:text-red-600"
                                  aria-label="Remove value"
                                >
                                  <X
                                    size={
                                      16
                                    }
                                  />
                                </button>
                              )}
                            </div>
                          )
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          addValue(
                            option.id
                          )
                        }
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                      >
                        <Plus size={15} />

                        Add value
                      </button>
                    </div>
                  )}
                </div>
              );
            }
          )
        )}
      </div>
    </section>
  );
}
