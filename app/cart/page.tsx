"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  ShieldCheck,
  Truck,
} from "lucide-react";

import {
  CartItem,
  getCart,
  getCartTotal,
  removeFromCart,
  updateCartQuantity,
} from "../lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  function refreshCart() {
    setCart(getCart());
  }

  useEffect(() => {
    setMounted(true);
    refreshCart();

    window.addEventListener("cart-updated", refreshCart);

    return () => {
      window.removeEventListener("cart-updated", refreshCart);
    };
  }, []);

  function increase(item: CartItem) {
    updateCartQuantity(item.id, item.quantity + 1);
    refreshCart();
  }

  function decrease(item: CartItem) {
    updateCartQuantity(item.id, item.quantity - 1);
    refreshCart();
  }

  function remove(item: CartItem) {
    removeFromCart(item.id);
    refreshCart();
  }

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#f8f8f6]" />
    );
  }

  const total = getCartTotal();

  return (
    <main className="min-h-screen bg-[#f8f8f6] text-gray-900">

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link
            href="/"
            className="flex items-center gap-3"
          >
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

          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition-all hover:bg-black hover:text-white"
          >
            <ArrowLeft size={16} />
            Continue shopping
          </Link>

        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
            Your selection
          </p>

          <h2 className="mt-2 text-4xl font-bold tracking-tight">
            Shopping Cart
          </h2>

          <p className="mt-2 text-gray-500">
            Review your products before checkout.
          </p>
        </div>

        {cart.length === 0 ? (

          /* Empty cart */
          <div className="rounded-3xl border border-black/5 bg-white px-6 py-24 text-center shadow-sm">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <ShoppingCart
                size={32}
                className="text-gray-400"
              />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Your cart is empty
            </h3>

            <p className="mx-auto mt-3 max-w-md text-gray-500">
              You haven't added any products yet.
              Explore our collection and find something you like.
            </p>

            <Link
              href="/#products"
              className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-gray-800 hover:shadow-lg"
            >
              Explore products
              <ArrowRight size={16} />
            </Link>

          </div>

        ) : (

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* Products */}
            <div className="space-y-4">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="flex gap-5">

                    {/* Image */}
                    <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:h-36 sm:w-36">

                      {item.image ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}

                    </div>

                    {/* Content */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between py-1">

                      <div>

                        <h3 className="truncate text-lg font-semibold">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {item.price.toLocaleString()} DA
                        </p>

                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">

                        {/* Quantity */}
                        <div className="flex items-center rounded-full border border-black/10">

                          <button
                            type="button"
                            onClick={() => decrease(item)}
                            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="w-8 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increase(item)}
                            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>

                        </div>

                        {/* Item total */}
                        <p className="font-bold">
                          {(item.price * item.quantity).toLocaleString()} DA
                        </p>

                      </div>

                    </div>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => remove(item)}
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* Summary */}
            <aside className="h-fit lg:sticky lg:top-28">

              <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">

                <h3 className="text-xl font-bold">
                  Order summary
                </h3>

                <div className="mt-6 space-y-4">

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Products
                    </span>

                    <span className="font-medium">
                      {cart.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      )}{" "}
                      items
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Subtotal
                    </span>

                    <span className="font-semibold">
                      {total.toLocaleString()} DA
                    </span>
                  </div>

                  <div className="border-t border-black/5 pt-4">

                    <div className="flex items-center justify-between">

                      <span className="text-base font-semibold">
                        Total
                      </span>

                      <span className="text-2xl font-bold">
                        {total.toLocaleString()} DA
                      </span>

                    </div>

                  </div>

                </div>

                <Link
                  href="/checkout"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl"
                >
                  Continue to checkout
                  <ArrowRight size={17} />
                </Link>

                {/* Trust */}
                <div className="mt-6 space-y-4 border-t border-black/5 pt-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100">
                      <ShieldCheck size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        Secure checkout
                      </p>

                      <p className="text-xs text-gray-500">
                        Your information is protected
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100">
                      <Truck size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        Cash on delivery
                      </p>

                      <p className="text-xs text-gray-500">
                        Available across Algeria
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </aside>

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

