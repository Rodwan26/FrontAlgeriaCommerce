"use client";

import {
  SpecificationDefinition,
} from "../../../lib/product-prototype/types";

type SpecificationsProps = {
  specifications: SpecificationDefinition[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
  onAddSpecification: () => void;
};

export default function Specifications({
  specifications,
  values,
  onChange,
  onAddSpecification,
}: SpecificationsProps) {
  if (specifications.length === 0) {
    return (
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Specifications
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Select a category to see product specifications.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Specifications
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add the details that describe this product.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {specifications.map((specification) => (
          <div key={specification.id}>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              {specification.name}

              {specification.required && (
                <span className="ml-1 text-red-500">
                  *
                </span>
              )}
            </label>

            {specification.type === "select" ? (
              <select
                value={values[specification.id] ?? ""}
                onChange={(e) =>
                  onChange(
                    specification.id,
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">
                  Select {specification.name}
                </option>

                {specification.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <div className="relative">
                <input
                  type={
                    specification.type === "number"
                      ? "number"
                      : "text"
                  }
                  value={values[specification.id] ?? ""}
                  onChange={(e) =>
                    onChange(
                      specification.id,
                      e.target.value
                    )
                  }
                  placeholder={`Enter ${specification.name.toLowerCase()}`}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-16 text-gray-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                />

                {specification.unit && (
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    {specification.unit}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAddSpecification}
        className="mt-6 rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600"
      >
        + Add specification
      </button>
    </section>
  );
}