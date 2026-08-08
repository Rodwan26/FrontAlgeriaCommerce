"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CategoryForm from "../../../../../components/admin/category/CategoryForm";

type Category = {
  id: number;
  name: string;
};

export default function EditCategoryPage() {
  const { id } = useParams();

  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    async function loadCategory() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
      );

      if (!res.ok) return;

      const data = await res.json();

      setCategory(data);
    }

    loadCategory();
  }, [id]);

  if (!category) {
    return (
      <div className="rounded-xl bg-white p-8 shadow-sm">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Category
        </h1>

        <p className="mt-2 text-gray-500">
          Update category information.
        </p>
      </div>

      <CategoryForm
        categoryId={category.id}
        initialName={category.name}
      />
    </div>
  );
}