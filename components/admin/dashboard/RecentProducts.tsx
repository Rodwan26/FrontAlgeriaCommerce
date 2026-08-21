import Link from "next/link";
import { ArrowRight, Plus, Package } from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
};

type RecentProductsProps = {
  products: Product[];
};

export default function RecentProducts({
  products,
}: RecentProductsProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">

      <div className="flex flex-col justify-between gap-3 border-b border-black/5 px-6 py-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Recent products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Products currently available in your catalog.
          </p>
        </div>

        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 transition hover:gap-2"
        >
          View all
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="divide-y divide-black/5">

        {products.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <Package
              size={36}
              className="mx-auto text-gray-300"
            />

            <p className="mt-4 font-medium text-gray-700">
              No products available
            </p>

            <Link
              href="/admin/products/new"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white"
            >
              <Plus size={16} />
              Add your first product
            </Link>
          </div>
        ) : (
          products.slice(0, 5).map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-gray-50"
            >
              <div className="flex min-w-0 items-center gap-4">

                {product.image ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
                    alt={product.name}
                    className="h-14 w-14 shrink-0 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                    <Package
                      size={18}
                      className="text-gray-400"
                    />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate font-semibold text-gray-900">
                    {product.name}
                  </p>

                  <p className="mt-1 max-w-xl truncate text-sm text-gray-500">
                    {product.description}
                  </p>
                </div>
              </div>

              <p className="shrink-0 text-sm font-bold text-gray-900">
                {product.price.toLocaleString()} DA
              </p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}
