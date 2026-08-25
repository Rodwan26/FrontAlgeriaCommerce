"use client";

import { imageUrl } from "../../lib/images";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  category_id: number | null;
  category: Category | null;
};
type Props = {
  product: Product;
  onDelete: (productId: number) => void;
  deleting: boolean;
};
export default function ProductRow({
  product,
  onDelete,
  deleting,
}: Props)  {
  const router = useRouter();
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
        <p className="font-semibold text-gray-900">
          {product.name}
        </p>

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

      {/* Status */}
      <td className="px-6 py-4">
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          Active
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button
  type="button"
  onClick={() =>
    router.push(`/admin/products/edit/${product.id}`)
  }
  className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50"
>
  <Pencil size={18} />
</button>

         <button
  type="button"
  onClick={() => onDelete(product.id)}
  disabled={deleting}
  className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
>
  <Trash2 size={18} />
</button>
        </div>
      </td>
    </tr>
  );
}

