"use client";

import { useState } from "react";
import {
  SpecificationDefinition,
  SpecificationType,
} from "../../../lib/product-prototype/types";

type Props = {
  onClose: () => void;
  onAdd: (specification: SpecificationDefinition) => void;
};

export default function AddSpecificationModal({
  onClose,
  onAdd,
}: Props) {
  const [name, setName] = useState("");
  const [type, setType] =
    useState<SpecificationType>("text");
  const [required, setRequired] = useState(false);

  const [options, setOptions] = useState<string[]>([""]);

  function addOption() {
    setOptions((current) => [...current, ""]);
  }

  function updateOption(index: number, value: string) {
    setOptions((current) =>
      current.map((option, i) =>
        i === index ? value : option
      )
    );
  }

  function removeOption(index: number) {
    setOptions((current) =>
      current.filter((_, i) => i !== index)
    );
  }

  function handleSubmit() {
    const cleanName = name.trim();

    if (!cleanName) {
      return;
    }

    if (type === "select") {
      const cleanOptions = options
        .map((option) => option.trim())
        .filter(Boolean);

      if (cleanOptions.length === 0) {
        return;
      }

      onAdd({
        id: `merchant-${Date.now()}`,
        name: cleanName,
        type,
        options: cleanOptions,
        required,
      });

      return;
    }

    onAdd({
      id: `merchant-${Date.now()}`,
      name: cleanName,
      type,
      required,
    });
  }

 return (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
    <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
      
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b px-6 py-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Add specification
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add a custom property to your product.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
        >
          ✕
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="prototype-scroll min-h-0 flex-1 overflow-y-auto p-6">
        <div className="space-y-5">

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Specification name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sole Type"
              autoFocus
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Type */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Field type
            </label>

            <select
              value={type}
              onChange={(e) =>
                setType(
                  e.target.value as SpecificationType
                )
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-indigo-600"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="select">Select</option>
              <option value="boolean">Yes / No</option>
            </select>
          </div>

          {/* Options */}
          {type === "select" && (
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-800">
                  Options
                </label>

                <button
                  type="button"
                  onClick={addOption}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  + Add option
                </button>
              </div>

              <div className="space-y-2">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        updateOption(
                          index,
                          e.target.value
                        )
                      }
                      placeholder={`Option ${index + 1}`}
                      className="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-indigo-600"
                    />

                    {options.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeOption(index)
                        }
                        className="shrink-0 rounded-xl px-3 text-gray-400 hover:bg-red-50 hover:text-red-500"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Required */}
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4">
            <input
              type="checkbox"
              checked={required}
              onChange={(e) =>
                setRequired(e.target.checked)
              }
              className="h-4 w-4"
            />

            <div>
              <p className="text-sm font-semibold text-gray-800">
                Required field
              </p>

              <p className="text-xs text-gray-500">
                The merchant must provide this value.
              </p>
            </div>
          </label>

        </div>
      </div>

      {/* Fixed Footer */}
      <div className="flex shrink-0 justify-end gap-3 border-t bg-white px-6 py-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!name.trim()}
          className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add specification
        </button>
      </div>
    </div>
  </div>
);
}