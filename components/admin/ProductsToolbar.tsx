"use client";

import { Search } from "lucide-react";

import AdminSelect from "./ui/AdminSelect";

export type ProductSort = "name-asc" | "name-desc" | "price-asc" | "price-desc";

type Props = {
  search?: string;
  onSearchChange?: (value: string) => void;
  categories?: string[];
  category?: string;
  onCategoryChange?: (value: string) => void;
  sort?: ProductSort;
  onSortChange?: (value: ProductSort) => void;
};

export default function ProductsToolbar({
  search = "",
  onSearchChange = () => {},
  categories = [],
  category = "",
  onCategoryChange = () => {},
  sort = "name-asc",
  onSortChange = () => {},
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm">
      <div className="relative min-w-0 flex-1 sm:max-w-xs">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-xl border py-3 pl-10 pr-4 outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-wrap items-end gap-2">
        <AdminSelect
          label="Category"
          value={category}
          onChange={onCategoryChange}
          options={[
            { value: "", label: "All categories" },
            ...categories.map((name) => ({ value: name, label: name })),
          ]}
          className="w-full sm:w-48"
        />

        <AdminSelect
          label={
            sort === "name-desc" || sort === "price-desc"
              ? "Sort · Z-A"
              : "Sort · A-Z"
          }
          value={sort}
          onChange={(v) => onSortChange(v as ProductSort)}
          options={[
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
            { value: "price-asc", label: "Price (low to high)" },
            { value: "price-desc", label: "Price (high to low)" },
          ]}
          className="w-full sm:w-52"
        />
      </div>
    </div>
  );
}