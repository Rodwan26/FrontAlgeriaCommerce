"use client";

import { ProductCategory } from "../../../lib/product-prototype/types";

type CategorySelectorProps = {
  categories: ProductCategory[];
  selectedCategoryId: string;
  onChange: (categoryId: string) => void;
};

export default function CategorySelector({
  categories,
  selectedCategoryId,
  onChange,
}: CategorySelectorProps) {
  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">
          Category
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Choose the type of product you are adding.
        </p>
      </div>

      <select
        value={selectedCategoryId}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
      >
        <option value="">
          Select a category
        </option>

        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>

      {selectedCategory?.description && (
        <p className="mt-3 text-sm text-gray-500">
          {selectedCategory.description}
        </p>
      )}

      <button
        type="button"
        className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        onClick={() => {
          alert(
            "Merchant-created categories will be implemented in a later prototype step."
          );
        }}
      >
        + Don't see your category?
      </button>
    </section>
  );
}