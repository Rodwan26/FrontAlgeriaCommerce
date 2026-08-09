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
  Check,
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
  const [added, setAdded] = useState(false);

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

      setAdded(true);

      setTimeout(() => {
        setAdded(false);
      }, 2500);
    } catch (err) {
      console.error("Failed to add product to cart:", err);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f8f6]">
        <header className="border-b border-black/5 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-xl bg-gray-200" />

              <div>
                <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
                <div className="mt-2 h-3 w-24 animate-pulse rounded bg-gray-200" />
              </div>
            </div>

            <div className="h-10 w-24 animate-pulse rounded-full bg-gray-200" />
          </div>
        </header>

        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />

          <div className="mt-10 grid gap-14 lg:grid-cols-2">
            <div className="aspect-square animate-pulse rounded-[2rem] bg-gray-200" />

            <div className="space-y-6 py-8">
              <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
              <div className="h-14 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-10 w-36 animate-pulse rounded bg-gray-200" />
              <div className="h-px w-full bg-gray-200" />
              <div className="h-24 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-12 w-32 animate-pulse rounded-full bg-gray-200" />
              <div className="h-14 w-full animate-pulse rounded-full bg-gray-200" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f8f6] px-6">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-xl font-bold text-white">
            AC
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
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

  const imageUrl = product.image
    ? `${process.env.NEXT_PUBLIC_API_URL}${product.image}`
    : null;

  const totalPrice = product.price * quantity;

  return (
    <main className="min-h-screen bg-[#f8f8f6] text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-sm font-bold text-white transition-transform duration-300 group-hover:rotate-6">
              AC
            </div>

            <div>
              <p className="font-bold tracking-tight">
                Algeria Commerce
              </p>

              <p className="text-xs text-gray-500">
                Shop with confidence
              </p>
            </div>
          </Link>

          <Link
            href="/cart"
            className="group flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-lg"
          >
            <ShoppingCart
              size={17}
              className="transition-transform duration-300 group-hover:-rotate-12"
            />

            <span className="hidden sm:inline">
              Cart
            </span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* Back */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          Back to products
        </Link>

        <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Image */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-sm">
            <div className="absolute left-5 top-5 z-10 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white">
              Featured
            </div>

            <div className="aspect-square overflow-hidden bg-gray-100">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Information */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
              Algeria Commerce
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            <div className="mt-6 flex items-end gap-3">
              <p className="text-3xl font-bold tracking-tight">
                {product.price.toLocaleString()} DA
              </p>

              <span className="mb-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Available
              </span>
            </div>

            <div className="mt-8 h-px bg-black/10" />

            <p className="mt-8 text-base leading-8 text-gray-600">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">
                  Quantity
                </p>

                <p className="text-sm text-gray-400">
                  {totalPrice.toLocaleString()} DA
                </p>
              </div>

              <div className="mt-3 inline-flex items-center rounded-full border border-black/10 bg-white p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) =>
                      Math.max(1, current - 1)
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>

                <span className="w-12 text-center text-sm font-bold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => current + 1)
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
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
              className={`group mt-8 flex w-full items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-semibold transition-all duration-300 ${
                added
                  ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                  : "bg-black text-white hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl"
              }`}
            >
              {added ? (
                <>
                  <Check size={18} />
                  Added to cart
                </>
              ) : (
                <>
                  <ShoppingCart
                    size={18}
                    className="transition-transform duration-300 group-hover:-rotate-12"
                  />

                  Add to cart

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>

            {/* Trust */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="group rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 transition group-hover:bg-black group-hover:text-white">
                  <Truck size={19} />
                </div>

                <p className="mt-4 text-sm font-semibold">
                  Fast delivery
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Delivery across Algeria.
                </p>
              </div>

              <div className="group rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 transition group-hover:bg-black group-hover:text-white">
                  <ShieldCheck size={19} />
                </div>

                <p className="mt-4 text-sm font-semibold">
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

      {/* Bottom information */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold">
              Secure shopping
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              A simple and secure shopping experience.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">
              Delivery across Algeria
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              We deliver your order to your address.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">
              Easy ordering
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Choose your quantity and add the product to your cart.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-gray-900">
            Algeria Commerce
          </p>

          <p className="text-gray-400">
            © {new Date().getFullYear()} Algeria Commerce
          </p>
        </div>
      </footer>
    </main>
  );
}