"use client";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function ProductsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <p className="mt-1 text-gray-500">
          Manage all products in your store.
        </p>
      </div>

     <Link
  href="/admin/products/new"
  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
>
  <Plus size={18} />

  Add Product
</Link>
    </div>
  );
}