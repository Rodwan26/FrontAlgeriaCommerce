"use client";

import { useState } from "react";
import { Copy, LayoutTemplate, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { DEMO_PRODUCTS, DemoProduct } from "@/lib/demo-products";

export default function DemoProductsTable() {
  const router = useRouter();
  const [products, setProducts] = useState<DemoProduct[]>(DEMO_PRODUCTS);

  function toggleStatus(id: number) {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? {
              ...product,
              status: product.status === "active" ? "draft" : "active",
            }
          : product
      )
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left text-gray-600">
            <th className="px-6 py-4">Image</th>
            <th className="px-6 py-4">Product</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Stock</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const lowStock = product.stock <= 5;

            return (
              <tr
                key={product.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="h-16 w-16 overflow-hidden rounded-xl bg-gray-100">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => router.push(`/admin/products/${product.id}`)}
                    className="text-right font-semibold text-gray-900 hover:text-indigo-600"
                  >
                    {product.name}
                  </button>

                  <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                    {product.description}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                    {product.category}
                  </span>
                </td>

                <td className="px-6 py-4 font-semibold text-gray-900">
                  {product.price.toLocaleString("en-US")} DA
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      lowStock
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {product.stock}
                    {lowStock ? (
                      <span className="mr-1">· Low stock</span>
                    ) : null}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => toggleStatus(product.id)}
                    className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition ${
                      product.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-current" />
                    {product.status === "active" ? "Active" : "Draft"}
                  </button>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        router.push(`/admin/products/${product.id}/landing`)
                      }
                      title="صفحة الهبوط"
                      className="rounded-lg p-2 text-green-600 transition hover:bg-green-50"
                    >
                      <LayoutTemplate size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        router.push(`/admin/products/edit/${product.id}`)
                      }
                      title="تعديل المنتج"
                      className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        router.push(`/admin/products/duplicate/${product.id}`)
                      }
                      title="نسخ المنتج"
                      className="rounded-lg p-2 text-sky-600 transition hover:bg-sky-50"
                    >
                      <Copy size={18} />
                    </button>

                    <button
                      type="button"
                      disabled
                      title="Demo only"
                      className="rounded-lg p-2 text-gray-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}