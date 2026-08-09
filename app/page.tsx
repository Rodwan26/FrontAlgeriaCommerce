"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  ArrowRight,
  Sparkles,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  category_id?: number;
};

type Category = {
  id: number;
  name: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadStore() {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
      ]);

      if (!productsRes.ok || !categoriesRes.ok) {
        throw new Error("Failed to load store data");
      }

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Failed to load store:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStore();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === null ||
      product.category_id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#f8f8f6] text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
              AC
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Algeria Commerce
              </h1>

              <p className="text-xs text-gray-500">
                Shop with confidence
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#products"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              Products
            </a>

            <a
              href="#categories"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              Categories
            </a>

            <Link
              href="/cart"
              className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
            >
              <ShoppingCart size={17} />
              Cart
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.12),transparent_35%)]" />

        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-6 py-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <Sparkles size={16} />
              Premium shopping experience
            </div>

            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Everything you need.
              <span className="block text-gray-400">
                All in one place.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Discover carefully selected products at Algeria
              Commerce. Simple shopping, great products, and a
              seamless experience.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#products"
                className="flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                Explore products
                <ArrowRight size={17} />
              </a>

              <a
                href="#categories"
                className="rounded-full border border-white/20 px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Browse categories
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        id="categories"
        className="mx-auto max-w-7xl px-6 py-16"
      >
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Explore
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Shop by category
          </h2>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-3">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${
              selectedCategory === null
                ? "bg-black text-white"
                : "border border-black/10 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Products
          </button>

          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                selectedCategory === category.id
                  ? "bg-black text-white"
                  : "border border-black/10 bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section
        id="products"
        className="mx-auto max-w-7xl px-6 pb-24"
      >
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
              Collection
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Featured products
            </h2>
          </div>

          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-black/10 bg-white py-3 pl-11 pr-5 text-sm outline-none transition focus:border-black"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-black/5 bg-white px-6 py-20 text-center">
            <p className="text-gray-500">
              No products found.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group overflow-hidden rounded-2xl border border-black/5 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  {product.image ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                      No Image
                    </div>
                  )}

                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur">
                    New
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-gray-900">
                    {product.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                    {product.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-900">
                      {product.price.toLocaleString()} DA
                    </p>

                    <span className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition group-hover:bg-gray-800">
                      View
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-bold">
              Algeria Commerce
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Your trusted online shopping destination.
            </p>
          </div>

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Algeria Commerce
          </p>
        </div>
      </footer>
    </main>
  );
}