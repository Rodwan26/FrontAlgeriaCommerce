"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShoppingCart,
  ShieldCheck,
  Truck,
} from "lucide-react";

import {
  CartItem,
  getCart,
  getCartTotal,
  clearCart,
} from "../../lib/cart";

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
    setCart(getCart());
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#f8f8f6]" />
    );
  }

  const total = getCartTotal();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_name: customerName.trim(),
            customer_phone: customerPhone.trim(),
            customer_address: customerAddress.trim(),
            items: cart.map((item) => ({
              product_id: item.id,
              quantity: item.quantity,
            })),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail || "Failed to create order."
        );
      }

      setOrderId(data.id);
      setSuccess(true);

      clearCart();
      setCart([]);
    } catch (err) {
      console.error("Checkout error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#f8f8f6] text-gray-900">
        <header className="border-b border-black/5 bg-white">
          <div className="mx-auto flex max-w-7xl items-center px-6 py-4">
            <Link
              href="/"
              className="flex items-center gap-3"
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
          </div>
        </header>

        <section className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-6 py-16">
          <div className="w-full rounded-3xl border border-black/5 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2
                size={42}
                className="text-green-600"
              />
            </div>

            <h1 className="mt-6 text-3xl font-bold">
              Order confirmed!
            </h1>

            <p className="mx-auto mt-3 max-w-md leading-7 text-gray-500">
              Thank you for your order. We will contact you
              soon to confirm the delivery details.
            </p>

            {orderId && (
              <div className="mx-auto mt-6 w-fit rounded-full bg-gray-100 px-5 py-2 text-sm font-semibold">
                Order #{orderId}
              </div>
            )}

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-gray-800"
              >
                Continue shopping
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/admin/orders"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-6 py-3 text-sm font-semibold transition hover:bg-gray-100"
              >
                View orders
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#f8f8f6] text-gray-900">
        <header className="border-b border-black/5 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
                AC
              </div>

              <p className="font-bold">
                Algeria Commerce
              </p>
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
            >
              <ShoppingCart size={16} />
              Cart
            </Link>
          </div>
        </header>

        <section className="mx-auto max-w-2xl px-6 py-20">
          <div className="rounded-3xl border border-black/5 bg-white px-6 py-20 text-center shadow-sm">
            <ShoppingCart
              size={40}
              className="mx-auto text-gray-300"
            />

            <h1 className="mt-6 text-2xl font-bold">
              Your cart is empty
            </h1>

            <p className="mt-3 text-gray-500">
              Add some products before checking out.
            </p>

            <Link
              href="/#products"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-gray-800"
            >
              Explore products
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    );
  }

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
              <p className="font-bold">
                Algeria Commerce
              </p>

              <p className="text-xs text-gray-500">
                Secure checkout
              </p>
            </div>
          </Link>

          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to cart
          </Link>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
            Final step
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Checkout
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your information to place your order.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Customer information */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-2xl font-bold">
              Delivery information
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              We will use this information to contact you
              about your order.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Full name
                </label>

                <input
                  id="name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) =>
                    setCustomerName(e.target.value)
                  }
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl border border-black/10 bg-[#fafafa] px-4 py-3.5 text-sm outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold"
                >
                  Phone number
                </label>

                <input
                  id="phone"
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) =>
                    setCustomerPhone(e.target.value)
                  }
                  placeholder="05 XX XX XX XX"
                  className="w-full rounded-2xl border border-black/10 bg-[#fafafa] px-4 py-3.5 text-sm outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-semibold"
                >
                  Delivery address
                </label>

                <textarea
                  id="address"
                  required
                  rows={4}
                  value={customerAddress}
                  onChange={(e) =>
                    setCustomerAddress(e.target.value)
                  }
                  placeholder="Wilaya, commune, street, building..."
                  className="w-full resize-none rounded-2xl border border-black/10 bg-[#fafafa] px-4 py-3.5 text-sm outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5"
                />
              </div>
            </div>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {loading ? (
                "Placing order..."
              ) : (
                <>
                  Confirm order
                  <ArrowRight size={17} />
                </>
              )}
            </button>

            <div className="mt-8 grid gap-4 border-t border-black/5 pt-8 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                  <ShieldCheck size={17} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Secure
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Your information is protected.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                  <Truck size={17} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Cash on delivery
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Pay when your order arrives.
                  </p>
                </div>
              </div>
            </div>
          </form>

          {/* Order summary */}
          <aside className="h-fit lg:sticky lg:top-28">
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">
                Your order
              </h2>

              <div className="mt-6 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                      {item.image ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[10px] text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {item.quantity} ×{" "}
                        {item.price.toLocaleString()} DA
                      </p>
                    </div>

                    <p className="text-sm font-semibold">
                      {(
                        item.price * item.quantity
                      ).toLocaleString()}{" "}
                      DA
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-black/5 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    Total
                  </span>

                  <span className="text-2xl font-bold">
                    {total.toLocaleString()} DA
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}