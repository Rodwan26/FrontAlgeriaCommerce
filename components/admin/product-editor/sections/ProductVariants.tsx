"use client";

import { Check, Image as ImageIcon } from "lucide-react";

import type { ProductOption } from "./ProductOptions";

export type ProductVariant = {
id: string;
dbId?: number;
values: Record<string, string>;
price: string;
stock: string;
image: string;
};

type ProductVariantsProps = {
variants: ProductVariant[];
options: ProductOption[];
onChange: (variants: ProductVariant[]) => void;
};

function isColorOption(name: string) {
const normalized = name.trim().toLowerCase();

return (
normalized === "color" ||
normalized === "colour" ||
normalized === "couleur" ||
normalized === "اللون"
);
}

export default function ProductVariants({
variants,
options,
onChange,
}: ProductVariantsProps) {
if (variants.length === 0) {
return (
<section className="rounded-xl border border-gray-200 bg-white shadow-sm">
<div className="border-b border-gray-200 px-5 py-4">
<h2 className="text-base font-semibold text-gray-900">
Variants
</h2>

      <p className="mt-1 text-xs text-gray-500">
        Variants will appear here when you add product options.
      </p>
    </div>

    <div className="p-8 text-center">
      <p className="text-sm font-medium text-gray-700">
        No variants yet
      </p>

      <p className="mt-1 text-xs text-gray-500">
        Add options such as Color or Size to generate variants.
      </p>
    </div>
  </section>
);

}

const optionNames = Object.keys(variants[0].values);

function getColorHex(
optionName: string,
valueName: string
) {
const option = options.find(
(item) =>
item.name.trim().toLowerCase() ===
optionName.trim().toLowerCase()
);

if (!option || !isColorOption(option.name)) {
  return "#E5E7EB";
}

const colorValue = option.colorValues?.find(
  (color) =>
    color.name.trim().toLowerCase() ===
    valueName.trim().toLowerCase()
);

return colorValue?.hex || "#E5E7EB";

}

function updateField(
variantId: string,
field: "price" | "stock",
value: string
) {
onChange(
variants.map((variant) =>
variant.id === variantId
? {
...variant,
[field]: value,
}
: variant
)
);
}

return (
<section className="rounded-xl border border-gray-200 bg-white shadow-sm">
<div className="border-b border-gray-200 px-5 py-4">
<div className="flex items-center justify-between gap-4">
<div>
<h2 className="text-base font-semibold text-gray-900">
Variants
</h2>

        <p className="mt-1 text-xs text-gray-500">
          Manage price, inventory, and other details for each
          product variant.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
        <Check size={15} className="text-green-600" />

        <span className="text-xs font-medium text-gray-600">
          {variants.length}{" "}
          {variants.length === 1
            ? "variant"
            : "variants"}
        </span>
      </div>
    </div>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full min-w-[760px] text-left text-sm">
      <thead>
        <tr className="border-b border-gray-200 bg-gray-50">
          {optionNames.map((name, index) => (
            <th
              key={`${name}-${index}`}
              className="whitespace-nowrap px-5 py-3 font-semibold text-gray-700"
            >
              {name || "Option"}
            </th>
          ))}

          <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-700">
            Price
          </th>

          <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-700">
            Inventory
          </th>

          <th className="whitespace-nowrap px-5 py-3 font-semibold text-gray-700">
            Media
          </th>
        </tr>
      </thead>

      <tbody>
        {variants.map((variant, variantIndex) => (
          <tr
            key={`${variant.id}-${variantIndex}`}
            className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70"
          >
            {optionNames.map((name, optionIndex) => {
              const value = variant.values[name];
              const color = isColorOption(name);
              const colorHex = color
                ? getColorHex(name, value)
                : "";

              return (
                <td
                  key={`${variant.id}-${name}-${optionIndex}`}
                  className="px-5 py-4"
                >
                  <div className="flex items-center gap-2">
                    {color && (
                      <span
                        className="h-7 w-7 shrink-0 rounded-full border border-gray-300 shadow-sm"
                        style={{
                          backgroundColor: colorHex,
                        }}
                        title={`${value} — ${colorHex}`}
                      />
                    )}

                    <span className="font-medium text-gray-900">
                      {value}
                    </span>
                  </div>
                </td>
              );
            })}

            <td className="px-5 py-4">
              <input
                type="number"
                min="0"
                value={variant.price}
                onChange={(e) =>
                  updateField(
                    variant.id,
                    "price",
                    e.target.value
                  )
                }
                placeholder="0.00"
                className="w-28 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </td>

            <td className="px-5 py-4">
              <input
                type="number"
                min="0"
                value={variant.stock}
                onChange={(e) =>
                  updateField(
                    variant.id,
                    "stock",
                    e.target.value
                  )
                }
                placeholder="0"
                className="w-24 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </td>

            <td className="px-5 py-4">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <ImageIcon size={14} />
                Add image
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="border-t border-gray-200 bg-gray-50 px-5 py-3">
    <p className="text-xs text-gray-500">
      Each combination of your product options is automatically
      represented as a variant. SKU is generated automatically by
      the system.
    </p>
  </div>
</section>

);
}