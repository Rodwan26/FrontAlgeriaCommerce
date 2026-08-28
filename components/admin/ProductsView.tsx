"use client";

import { useEffect, useState } from "react";
import ProductsToolbar, { ProductSort } from "./ProductsToolbar";
import ProductsTable, {
  Product,
} from "./ProductsTable";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const PAGE_SIZE = 8;

export default function ProductsView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<ProductSort>("name-asc");
  const [page, setPage] = useState(1);

  async function loadProducts() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );

      if (!res.ok) {
        throw new Error("Failed to load products");
      }

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const categories = Array.from(
    new Set(
      products
        .map((product) => product.category?.name)
        .filter((name): name is string => Boolean(name))
    )
  ).sort((a, b) => a.localeCompare(b));

  const filtered = products.filter((product) => {
    const matchesSearch =
      !search ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !category || product.category?.name === category;

    return matchesSearch && matchesCategory;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const paginated = sorted.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleCategoryChange(value: string) {
    setCategory(value);
    setPage(1);
  }

  function handleSortChange(value: ProductSort) {
    setSort(value);
    setPage(1);
  }

  function handleToggleStatus(productId: number) {
    setProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? {
              ...product,
              status:
                (product.status ?? "active") === "active"
                  ? "draft"
                  : "active",
            }
          : product
      )
    );
  }

  async function handleDelete(productId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(productId);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts((current) =>
        current.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-4">
      <ProductsToolbar
        search={search}
        onSearchChange={handleSearchChange}
        categories={categories}
        category={category}
        onCategoryChange={handleCategoryChange}
        sort={sort}
        onSortChange={handleSortChange}
      />

      {loading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl bg-white shadow-sm">
          <Loader2 size={28} className="animate-spin text-gray-400" />
        </div>
      ) : (
        <>
          <ProductsTable
            products={paginated}
            onDelete={handleDelete}
            deletingId={deletingId}
            onToggleStatus={handleToggleStatus}
            onDuplicate={(id) =>
              (window.location.href = `/admin/products/duplicate/${id}`)
            }
          />

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <p className="text-sm text-gray-500">
              {sorted.length === 0
                ? "No matching products"
                : `${sorted.length} products · Page ${safePage} of ${pageCount}`}
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex h-9 items-center gap-1 rounded-lg border px-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronLeft size={15} />
                Prev
              </button>

              {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPage(num)}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold transition ${
                      num === safePage
                        ? "bg-indigo-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {num}
                  </button>
                )
              )}

              <button
                type="button"
                disabled={safePage >= pageCount}
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                className="flex h-9 items-center gap-1 rounded-lg border px-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-40"
              >
                Next
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}