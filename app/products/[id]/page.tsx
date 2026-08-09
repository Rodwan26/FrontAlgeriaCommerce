"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingCart,
  ShieldCheck,
  Truck,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  category_id?: number;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
};

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const { id } = await params;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data: Product = await response.json();

        setProduct(data);
      } catch (err) {
        console.error("Failed to load product:", err);
        setError("Unable to load this product.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [params]);

  function addToCart() {
    if (!product) return;

    try {
      const storedCart = localStorage.getItem("cart");

      const cart: CartItem[] = storedCart
        ? JSON.parse(storedCart)
        : [];

      const existingProduct = cart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      window.dispatchEvent(new Event("cartUpdated"));

      alert("Product added to cart");
    } catch (err) {
      console.error("Failed to add product to cart:", err);
    }
  }

  /*
   * --------------------------------------------------
   * Loading state
   * --------------------------------------------------
   */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f8f6] text-gray-900">
        <header className="border-b border-black/5 bg-white">
          <div className="mx-auto flex max-w-7xl items-center px-6 py-4">
            <div className="h-10 w-10 animate-pulse rounded-xl bg-gray-200" />

            <div className="ml-3">
              <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
              <div className="mt-2 h-3 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="animate-pulse">
            <div className="h-5 w-32 rounded bg-gray-200" />

            <div className="mt-10 grid gap-12 lg:grid-cols-2">
              <div className="aspect-square rounded-3xl bg-gray-200" />

              <div className="space-y-6 py-8">
                <div className="h-4 w-40 rounded bg-gray-200" />

                <div className="h-12 w-3/4 rounded bg-gray-200" />

                <div className="h-8 w-32 rounded bg-gray-200" />

                <div className="h-px w-full bg-gray-200" />

                <div className="h-24 w-full rounded bg-gray-200" />

                <div className="h-12 w-32 rounded bg-gray-200" />

                <div className="h-14 w-full rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /*
   * --------------------------------------------------
   * Error state
   * --------------------------------------------------
   */

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f8f6] px-6 text-gray-900">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-xl font-bold text-white">
            AC
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            Product not found
          </h1>

          <p className="mt-3 text-gray-500">
            This product may have been removed or does not exist.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-gray-800"
          >
            <ArrowLeft size={16} />
            Back to store
          </Link>
        </div>
      </main>
    );
  }

  /*
   * --------------------------------------------------
   * Product image
   * --------------------------------------------------
   */

  const imageUrl = product.image
    ? `${process.env.NEXT_PUBLIC_API_URL}${product.image}`
    : null;

  /*
   * --------------------------------------------------
   * Main page
   * --------------------------------------------------
   */

  return (
    <main className="min-h-screen bg-[#f8f8f6] text-gray-900">

      {/* Header */}

      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link
            href="/"
            className="flex items-center gap-3 transition hover:opacity-70"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
              AC
            </div>

            <div>
              <p className="font-bold">
                Algeria Commerce
              </p>

              <p className="text-xs text-gray-500">
                Shop with confidence
              </p>
            </div>
          </Link>

          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            <ShoppingCart size={17} />
            Cart
          </Link>

        </div>
      </header>

      {/* Product section */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to products
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* Product image */}

          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
            <div className="aspect-square">

              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

            </div>
          </div>

          {/* Product information */}

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Algeria Commerce
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-6 text-3xl font-bold">
              {product.price.toLocaleString()} DA
            </p>

            <div className="mt-8 h-px bg-black/10" />

            <p className="mt-8 text-base leading-8 text-gray-600">
              {product.description}
            </p>

            {/* Quantity */}

            <div className="mt-10">

              <p className="mb-3 text-sm font-semibold">
                Quantity
              </p>

              <div className="inline-flex items-center rounded-full border border-black/10 bg-white">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) =>
                      Math.max(1, current - 1)
                    )
                  }
                  className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>

                <span className="w-12 text-center font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => current + 1)
                  }
                  className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>

              </div>
            </div>

            {/* Add to cart */}

            <button
              type="button"
              onClick={addToCart}
              className="group mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl"
            >
              <ShoppingCart
                size={18}
                className="transition-transform group-hover:-rotate-12"
              />

              Add to cart

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            {/* Trust cards */}

            <div className="mt-10 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-black/5 bg-white p-5">
                <Truck size={20} />

                <p className="mt-3 text-sm font-semibold">
                  Fast delivery
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Delivery across Algeria.
                </p>
              </div>

              <div className="rounded-2xl border border-black/5 bg-white p-5">
                <ShieldCheck size={20} />

                <p className="mt-3 text-sm font-semibold">
                  Cash on delivery
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Pay when your order arrives.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="mt-10 border-t border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-gray-400">
          © {new Date().getFullYear()} Algeria Commerce
        </div>
      </footer>

    </main>
  );
}