"use client";

import { imageUrl } from "../../lib/images";
import { Copy, LayoutTemplate, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Category = {
  id: number;
  name: string;
};

export type ProductStatus = "active" | "draft";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  category_id: number | null;
  category: Category | null;
  stock?: number;
  status?: ProductStatus;
};

type Props = {
  product: Product;
  onDelete: (productId: number) => void;
  deleting: boolean;
  toggling: boolean;
  onToggleStatus: (productId: number) => void;
  onDuplicate: (productId: number) => void;
};

export default function ProductRow({
  product,
  onDelete,
  deleting,
  toggling,
  onToggleStatus,
  onDuplicate,
}: Props) {
  const router = useRouter();
  const stock = product.stock ?? null;
  const lowStock = stock !== null && stock <= 5;
  const status = product.status ?? "active";

  return (
    <tr className="border-b hover:bg-gray-50">
      {/* Image */}
      <td className="px-6 py-4">
        <div className="h-16 w-16 overflow-hidden rounded-xl bg-gray-100">
          {product.image ? (
            <img
              src={imageUrl(product.image)}
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

      {/* Product */}
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

      {/* Category */}
      <td className="px-6 py-4">
        {product.category ? (
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
            {product.category.name}
          </span>
        ) : (
          <span className="text-sm text-gray-400">
            No Category
          </span>
        )}
      </td>

      {/* Price */}
      <td className="px-6 py-4 font-semibold text-gray-900">
        {product.price} DA
      </td>

      {/* Stock */}
      <td className="px-6 py-4">
        {stock === null ? (
          <span className="text-sm text-gray-400">—</span>
        ) : (
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              lowStock
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {stock}
            {lowStock ? (
              <span className="mr-1">· Low stock</span>
            ) : null}
          </span>
        )}
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <button
          type="button"
          onClick={() => onToggleStatus(product.id)}
          disabled={toggling}
          title={status === "active" ? "Switch to draft" : "Publish product"}
          className={`group flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
            status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-current" />
          {status === "active" ? "Active" : "Draft"}
        </button>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.push(`/admin/products/${product.id}/landing`)}
            className="rounded-lg p-2 text-green-600 transition hover:bg-green-50"
            title="صفحة الهبوط"
          >
            <LayoutTemplate size={18} />
          </button>

          <button
            type="button"
            onClick={() => router.push(`/admin/products/edit/${product.id}`)}
            className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50"
            title="تعديل المنتج"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={() => onDuplicate(product.id)}
            className="rounded-lg p-2 text-sky-600 transition hover:bg-sky-50"
            title="نسخ المنتج"
          >
            <Copy size={18} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(product.id)}
            disabled={deleting}
            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            title="حذف المنتج"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}