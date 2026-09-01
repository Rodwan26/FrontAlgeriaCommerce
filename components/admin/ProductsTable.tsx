"use client";

import ProductRow from "./ProductRow";
import type { Product } from "./ProductRow";

export type { Product } from "./ProductRow";

type Props = {
  products: Product[];
  onDelete: (productId: number) => void;
  deletingId: number | null;
  togglingId: number | null;
  onToggleStatus: (productId: number) => void;
  onDuplicate: (productId: number) => void;
};

export default function ProductsTable({
  products,
  onDelete,
  deletingId,
  togglingId,
  onToggleStatus,
  onDuplicate,
}: Props) {
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
          {products.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                No matching products
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onDelete={onDelete}
                deleting={deletingId === product.id}
                toggling={togglingId === product.id}
                onToggleStatus={onToggleStatus}
                onDuplicate={onDuplicate}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}