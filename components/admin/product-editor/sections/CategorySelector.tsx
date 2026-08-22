"use client";

import { prototypeCategories } from "../../../../lib/product-prototype/categories";
import { ProductCategory } from "../../../../lib/product-prototype/types";

type CategorySelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CategorySelector({
  value,
  onChange,
}: CategorySelectorProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-800">
        Category
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      >
        <option value="">
          Select category
        </option>

        {prototypeCategories.map((category: ProductCategory) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
