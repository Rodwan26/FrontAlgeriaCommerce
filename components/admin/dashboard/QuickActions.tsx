import Link from "next/link";
import { Plus, FolderOpen, ShoppingBag } from "lucide-react";

export default function QuickActions() {
  return (
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
  );
}
