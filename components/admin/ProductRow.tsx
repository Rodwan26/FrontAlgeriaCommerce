"use client";

import { Pencil, Trash2 } from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
};

type Props = {
  product: Product;
};

export default function ProductRow({ product }: Props) {
  return (
    <tr className="border-b last:border-0 hover:bg-gray-50 transition">
      <td className="px-6 py-4">
        <div className="h-14 w-14 overflow-hidden rounded-lg bg-gray-100">
          {product.image ? (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/${product.image}`}
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
        <p className="font-semibold">{product.name}</p>

        <p className="mt-1 text-sm text-gray-500 line-clamp-1">
          {product.description}
        </p>
      </td>

      <td className="px-6 py-4 font-semibold">
        {product.price} DA
      </td>

      <td className="px-6 py-4">
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          Active
        </span>
      </td>

      <td className="px-6 py-4">
      <div className="flex gap-2">
  <button className="rounded-lg border border-gray-200 p-2 text-indigo-600 transition hover:bg-indigo-50 hover:border-indigo-200">
<Pencil size={18} className="text-indigo-600" />
  </button>

  <button className="rounded-lg border border-gray-200 p-2 text-red-600 transition hover:bg-red-50 hover:border-red-200">
<Trash2 size={18} className="text-red-600" />  </button>
</div>
      </td>
    </tr>
  );
}