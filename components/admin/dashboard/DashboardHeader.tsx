import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

export default function DashboardHeader() {
  return (
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
  );
}
