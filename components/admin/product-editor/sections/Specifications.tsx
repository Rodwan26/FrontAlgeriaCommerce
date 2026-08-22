"use client";

import { ProductCategory, ProductSpecificationValue } from "../../../../lib/product-prototype/types";

type SpecificationsProps = {
  category: ProductCategory | undefined;
  values: ProductSpecificationValue[];
  onChange: (values: ProductSpecificationValue[]) => void;
};

export default function Specifications({
  category,
  values,
  onChange,
}: SpecificationsProps) {
  if (!category || category.specifications.length === 0) {
    return null;
  }

  function getValue(
    specificationId: string
  ) {
    return values.find(
      (item) =>
        item.specificationId === specificationId
    )?.value ?? "";
  }

  function updateValue(
    specificationId: string,
    value: string | number | boolean
  ) {
    const existing = values.find(
      (item) =>
        item.specificationId === specificationId
    );

    if (existing) {
      onChange(
        values.map((item) =>
          item.specificationId === specificationId
            ? {
                ...item,
                value,
              }
            : item
        )
      );
    } else {
      onChange([
        ...values,
        {
          specificationId,
          value,
        },
      ]);
    }
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900">
          Specifications
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Add information specific to this product category.
        </p>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-2">
        {category.specifications.map(
          (specification) => {
            const currentValue = getValue(
              specification.id
            );

            return (
              <div
                key={specification.id}
              >
                <label className="mb-2 block text-sm font-medium text-gray-800">
                  {specification.name}

                  {specification.required && (
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  )}
                </label>

                {specification.type === "select" ? (
                  <select
                    value={String(currentValue)}
                    onChange={(e) =>
                      updateValue(
                        specification.id,
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="">
                      Select {specification.name}
                    </option>

                    {specification.options?.map(
                      (option: string) => (
                        <option
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      )
                    )}
                  </select>
                ) : specification.type === "boolean" ? (
                  <label className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-3 py-2.5">
                    <input
                      type="checkbox"
                      checked={Boolean(currentValue)}
                      onChange={(e) =>
                        updateValue(
                          specification.id,
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />

                    <span className="text-sm text-gray-700">
                      Yes
                    </span>
                  </label>
                ) : (
                  <div className="relative">
                    <input
                      type={
                        specification.type === "number"
                          ? "number"
                          : "text"
                      }
                      value={String(currentValue)}
                      onChange={(e) => {
                        const value =
                          specification.type === "number"
                            ? e.target.value === ""
                              ? ""
                              : Number(e.target.value)
                            : e.target.value;

                        updateValue(
                          specification.id,
                          value
                        );
                      }}
                      placeholder={
                        specification.unit
                          ? `Enter value in ${specification.unit}`
                          : `Enter ${specification.name}`
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                    {specification.unit && (
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        {specification.unit}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}
