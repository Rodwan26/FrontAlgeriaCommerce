"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

export default function CategoriesHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Categories
        </h1>

        <p className="mt-2 text-gray-500">
          Manage all product categories.
        </p>
      </div>

      <Link
        href="/admin/categories/new"
        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
      >
        <Plus size={18} />

        Add Category
      </Link>
    </div>
  );
}