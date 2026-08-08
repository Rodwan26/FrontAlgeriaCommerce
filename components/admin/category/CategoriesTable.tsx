"use client";

import { useEffect, useState } from "react";
import CategoriesHeader from "./CategoriesHeader";
import CategoryRow from "./CategoryRow";

type Category = {
  id: number;
  name: string;
};

export default function CategoriesTable() {
  const [categories, setCategories] = useState<Category[]>([]);

  async function loadCategories() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`
    );

    const data = await res.json();

    setCategories(data);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <CategoriesHeader />

      <div className="mt-6 overflow-hidden rounded-xl border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">
                ID
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <CategoryRow
                key={category.id}
                category={category}
                refresh={loadCategories}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}