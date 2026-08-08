
"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
};

type Category = {
  id: number;
  name: string;
};

type DashboardStats = {
  total_sales: number;
  total_orders: number;
  pending_orders: number;
  total_products: number;
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    try {
      const [productsRes, categoriesRes, statsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`),
      ]);

      if (
        !productsRes.ok ||
        !categoriesRes.ok ||
        !statsRes.ok
      ) {
        throw new Error("Failed to load dashboard data");
      }

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      const statsData = await statsRes.json();

      setProducts(productsData);
      setCategories(categoriesData);
      setStats(statsData);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const totalProducts = products.length;
  const totalCategories = categories.length;

  const totalValue = products.reduce(
    (total, product) => total + product.price,
    0
  );

  const averagePrice =
    totalProducts > 0 ? totalValue / totalProducts : 0;

  if (loading) {
    return (
      <div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Admin Dashboard
          </h1>

          <p className="mt-1 text-gray-600">
            Welcome to your store dashboard.
          </p>
        </div>

        <div className="mt-6 rounded-xl border bg-white p-6 text-gray-500">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-gray-600">
          Welcome to your store dashboard.
        </p>
      </div>

      {/* Main Statistics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Sales */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Sales
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {stats
              ? stats.total_sales.toLocaleString()
              : 0}{" "}
            DA
          </p>
        </div>

        {/* Total Orders */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Orders
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {stats?.total_orders ?? 0}
          </p>
        </div>

        {/* Pending Orders */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Pending Orders
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {stats?.pending_orders ?? 0}
          </p>
        </div>

        {/* Total Products */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Products
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {stats?.total_products ?? totalProducts}
          </p>
        </div>
      </div>

      {/* Store Statistics */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Categories */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Categories
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {totalCategories}
          </p>
        </div>

        {/* Average Product Price */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Average Product Price
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {Math.round(averagePrice).toLocaleString()} DA
          </p>
        </div>
      </div>

      {/* Recent Products */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Recently added products in your store.
          </p>
        </div>

        <div className="divide-y">
          {products.length === 0 ? (
            <div className="px-6 py-10 text-center text-gray-500">
              No products available.
            </div>
          ) : (
            products.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4 px-6 py-4"
              >
                <div className="flex min-w-0 items-center gap-4">
                  {product.image ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
                      alt={product.name}
                      className="h-14 w-14 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400">
                      No Image
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-900">
                      {product.name}
                    </p>

                    <p className="mt-1 truncate text-sm text-gray-500">
                      {product.description}
                    </p>
                  </div>
                </div>

                <p className="shrink-0 font-semibold text-gray-900">
                  {product.price.toLocaleString()} DA
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

