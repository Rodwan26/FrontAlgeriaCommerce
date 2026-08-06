"use client";

import { Search, SlidersHorizontal } from "lucide-react";

export default function ProductsToolbar() {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search products..."
          className="w-full rounded-xl border py-3 pl-10 pr-4 outline-none focus:border-indigo-500"
        />
      </div>

      <button className="flex items-center gap-2 rounded-xl border px-4 py-3 transition hover:bg-gray-50">
        <SlidersHorizontal size={18} />

        Filter
      </button>
    </div>
  );
}