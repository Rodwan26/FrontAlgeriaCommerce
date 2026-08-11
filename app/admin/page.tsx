"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  FolderOpen,
  ShoppingBag,
  TrendingUp,
  Clock3,
  Plus,
  Package,
} from "lucide-react";

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
      setLoading(true);

      const [productsRes, categoriesRes, statsRes] =
        await Promise.all([
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

      const [productsData, categoriesData, statsData] =
        await Promise.all([
          productsRes.json(),
          categoriesRes.json(),
          statsRes.json(),
        ]);

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

  const totalProducts =
    stats?.total_products ?? products.length;

  const totalCategories = categories.length;

  const averagePrice =
    products.length > 0
      ? products.reduce(
          (total, product) => total + product.price,
          0
        ) / products.length
      : 0;

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-8 w-56 animate-pulse rounded-lg bg-gray-200" />
          <div className="mt-3 h-4 w-80 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-36 animate-pulse rounded-2xl bg-gray-200"
            />
          ))}
        </div>

        <div className="h-96 animate-pulse rounded-2xl bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Overview
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Monitor your store performance and manage your business.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg"
          >
            <Plus size={17} />
            Add product
          </Link>

          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
          >
            View orders
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main statistics */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {/* Sales */}
        <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <TrendingUp size={21} />
            </div>

            <span className="text-xs font-medium text-gray-400">
              Revenue
            </span>
          </div>

          <p className="mt-6 text-sm font-medium text-gray-500">
            Total sales
          </p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
            {(stats?.total_sales ?? 0).toLocaleString()} DA
          </p>

          <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-green-50 transition group-hover:scale-125" />
        </div>

        {/* Orders */}
        <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ShoppingBag size={21} />
            </div>

            <span className="text-xs font-medium text-gray-400">
              Orders
            </span>
          </div>

          <p className="mt-6 text-sm font-medium text-gray-500">
            Total orders
          </p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
            {stats?.total_orders ?? 0}
          </p>

          <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-blue-50 transition group-hover:scale-125" />
        </div>

        {/* Pending */}
        <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
              <Clock3 size={21} />
            </div>

            <span className="text-xs font-medium text-gray-400">
              Attention
            </span>
          </div>

          <p className="mt-6 text-sm font-medium text-gray-500">
            Pending orders
          </p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
            {stats?.pending_orders ?? 0}
          </p>

          <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-yellow-50 transition group-hover:scale-125" />
        </div>

        {/* Products */}
        <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Box size={21} />
            </div>

            <span className="text-xs font-medium text-gray-400">
              Catalog
            </span>
          </div>

          <p className="mt-6 text-sm font-medium text-gray-500">
            Total products
          </p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
            {totalProducts}
          </p>

          <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-purple-50 transition group-hover:scale-125" />
        </div>
      </div>

      {/* Secondary statistics */}
      <div className="grid gap-5 md:grid-cols-2">

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <FolderOpen size={19} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Categories
              </p>

              <p className="text-xl font-bold text-gray-900">
                {totalCategories}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <Package size={19} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Average product price
              </p>

              <p className="text-xl font-bold text-gray-900">
                {Math.round(averagePrice).toLocaleString()} DA
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
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

      {/* Quick actions */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        <Link
          href="/admin/products/new"
          className="group rounded-2xl border border-black/5 bg-black p-6 text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <Plus
            size={22}
            className="transition-transform duration-300 group-hover:rotate-90"
          />

          <p className="mt-5 text-lg font-bold">
            Add product
          </p>

          <p className="mt-1 text-sm text-white/60">
            Add a new product to your store.
          </p>
        </Link>

        <Link
          href="/admin/categories/new"
          className="group rounded-2xl border border-black/5 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <FolderOpen
            size={22}
            className="text-gray-700"
          />

          <p className="mt-5 text-lg font-bold text-gray-900">
            Add category
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Organize your products into categories.
          </p>
        </Link>

        <Link
          href="/admin/orders"
          className="group rounded-2xl border border-black/5 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <ShoppingBag
            size={22}
            className="text-gray-700"
          />

          <p className="mt-5 text-lg font-bold text-gray-900">
            Manage orders
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Review and update customer orders.
          </p>
        </Link>

      </div>
    </div>
  );
}

