"use client";

import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type DemoProduct = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string | null;
};

const DEMO_PRODUCTS: DemoProduct[] = [
  {
    id: 1,
    name: "HOKA Running Shoe",
    description: "Premium running shoes designed for comfort and performance.",
    category: "Shoes",
    price: 29900,
    image: "/products/hero.webp",
  },
  {
    id: 2,
    name: "Premium Sport Shoes",
    description: "Lightweight sport shoes for everyday training.",
    category: "Shoes",
    price: 24900,
    image: "/products/hero.webp",
  },
  {
    id: 3,
    name: "Urban Running Shoes",
    description: "Modern running shoes with a comfortable lightweight design.",
    category: "Sports",
    price: 27900,
    image: "/products/hero.webp",
  },
];

export default function DemoProductsTable() {
  const router = useRouter();

  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left text-gray-600">
            <th className="px-6 py-4">Image</th>
            <th className="px-6 py-4">Product</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {DEMO_PRODUCTS.map((product) => (
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
                <p className="font-semibold text-gray-900">
                  {product.name}
                </p>

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
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  Active
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        `/admin/products/${product.id}/landing-page`
                      )
                    }
                    title="Create Landing Page"
                    className="inline-flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-2 text-sm font-semibold text-purple-600 transition hover:bg-purple-100"
                  >
                    <ExternalLink size={17} />

                    Landing Page
                  </button>

                  <button
                    type="button"
                    disabled
                    title="Demo only"
                    className="rounded-lg p-2 text-gray-300"
                  >
                    <Pencil size={18} />
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
