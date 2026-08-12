"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Home,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  UserRound,
  LockKeyhole,
} from "lucide-react";

import CustomerGate, {
  CustomerData,
} from "../components/CustomerGate";

/* =========================================================
   PRODUCT
========================================================= */

const PRODUCT = {
  name: "HOKA",
  description: "حذاء رياضي مريح مناسب للجري والمشي اليومي.",
  price: 2800,
};

/* =========================================================
   DELIVERY PRICES
========================================================= */

const DELIVERY = {
  home: 500,
  office: 300,
};

type DeliveryMethod = "home" | "office";

/* =========================================================
   HOME
========================================================= */

export default function HomePage() {
  const [customer, setCustomer] =
    useState<CustomerData | null>(null);

  if (!customer) {
    return (
      <CustomerGate
        onComplete={(data) => {
          console.log("Customer:", data);
          setCustomer(data);
        }}
      />
    );
  }

  return <StorePreview customer={customer} />;
}

/* =========================================================
   STORE / ORDER PAGE
========================================================= */

function StorePreview({
  customer,
}: {
  customer: CustomerData;
}) {
  const [quantity, setQuantity] = useState(1);

  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("home");

  const [orderConfirmed, setOrderConfirmed] =
    useState(false);

  const deliveryPrice =
    DELIVERY[deliveryMethod];

  const productTotal =
    PRODUCT.price * quantity;

  const total =
    productTotal + deliveryPrice;

  const formatPrice = (price: number) =>
    price.toLocaleString("fr-DZ");

  function increaseQuantity() {
    setQuantity((previous) =>
      Math.min(previous + 1, 10)
    );
  }

  function decreaseQuantity() {
    setQuantity((previous) =>
      Math.max(previous - 1, 1)
    );
  }

  function handleConfirmOrder() {
    const order = {
      customer,
      product: PRODUCT.name,
      quantity,
      delivery_method: deliveryMethod,
      product_total: productTotal,
      delivery_price: deliveryPrice,
      total,
    };

    console.log("ORDER:", order);

    setOrderConfirmed(true);
  }

  if (orderConfirmed) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#f8f8f6] px-5"
      >
        <div className="w-full max-w-md rounded-[2rem] border border-black/[0.06] bg-white p-8 text-center shadow-[0_25px_80px_rgba(0,0,0,0.08)]">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
            <Check size={30} />
          </div>

          <h1 className="mt-6 text-2xl font-bold">
            تم استلام طلبك بنجاح
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            شكرًا لك {customer.first_name}، سنتواصل معك
            لتأكيد الطلب ومعلومات التوصيل.
          </p>

          <div className="mt-6 rounded-2xl bg-[#f7f7f5] p-4 text-right">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                المنتج
              </span>

              <span className="font-semibold">
                {PRODUCT.name}
              </span>
            </div>

            <div className="mt-3 flex justify-between text-sm">
              <span className="text-gray-500">
                الكمية
              </span>

              <span className="font-semibold">
                {quantity}
              </span>
            </div>

            <div className="mt-3 flex justify-between text-sm">
              <span className="text-gray-500">
                التوصيل
              </span>

              <span className="font-semibold">
                {deliveryMethod === "home"
                  ? "إلى المنزل"
                  : "مكتب التوصيل"}
              </span>
            </div>

            <div className="mt-4 border-t border-black/10 pt-4">
              <div className="flex justify-between">
                <span className="font-semibold">
                  المجموع
                </span>

                <span className="text-lg font-bold">
                  {formatPrice(total)} DA
                </span>
              </div>
            </div>
          </div>

        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f8f8f6] text-gray-950"
    >

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/90 backdrop-blur-xl">

        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">

          {/* Brand */}

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-xs font-bold text-white">
              AC
            </div>

            <div>
              <p className="font-bold">
                Algeria Commerce
              </p>

              <p className="text-xs text-gray-400">
                مرحبًا {customer.first_name}
              </p>
            </div>

          </div>

          {/* Customer */}

          <div className="hidden items-center gap-3 sm:flex">

            <div className="text-left">

              <p className="text-xs font-semibold text-gray-900">
                {customer.first_name}{" "}
                {customer.last_name}
              </p>

              <p className="text-[11px] text-gray-400">
                {customer.wilaya_name} ·{" "}
                {customer.commune_name}
              </p>

            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
              <UserRound size={17} />
            </div>

          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white">
            <ShoppingBag size={19} />
          </div>

        </div>

      </header>


      {/* =====================================================
          PAGE
      ====================================================== */}

      <section className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 sm:py-14">

        {/* Page heading */}

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            منتجاتنا
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            اختر المنتج والكمية وطريقة التوصيل
          </p>

        </div>


        {/* ===================================================
            PRODUCT CARD
        ==================================================== */}

        <div className="overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white shadow-[0_20px_70px_rgba(0,0,0,0.08)]">

          {/* Product image */}

          <div className="m-4 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.5rem] bg-gray-100 sm:m-5">

            <div className="text-center">

              <ShoppingBag
                size={70}
                strokeWidth={1.2}
                className="mx-auto text-gray-300"
              />

              <p className="mt-3 text-xs text-gray-400">
                صورة المنتج
              </p>

            </div>

          </div>


          {/* Product information */}

          <div className="px-5 pb-5 sm:px-7 sm:pb-7">

            <p className="text-xs font-medium text-gray-400">
              Algeria Commerce
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {PRODUCT.name}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {PRODUCT.description}
            </p>

            <p className="mt-4 text-2xl font-bold">
              {formatPrice(PRODUCT.price)} DA
            </p>


            {/* =================================================
                QUANTITY
            ================================================== */}

            <div className="mt-7 border-t border-black/[0.06] pt-6">

              <div className="flex items-center justify-between">

                <h3 className="font-bold">
                  الكمية
                </h3>

                <div className="flex items-center gap-5">

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity === 1}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="إنقاص الكمية"
                  >
                    <Minus size={17} />
                  </button>

                  <span className="min-w-[20px] text-center text-lg font-bold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity === 10}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="زيادة الكمية"
                  >
                    <Plus size={17} />
                  </button>

                </div>

              </div>

            </div>


            {/* =================================================
                DELIVERY
            ================================================== */}

            <div className="mt-7 border-t border-black/[0.06] pt-6">

              <h3 className="mb-4 font-bold">
                طريقة التوصيل
              </h3>


              <div className="space-y-3">

                {/* HOME */}

                <button
                  type="button"
                  onClick={() =>
                    setDeliveryMethod("home")
                  }
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-right transition-all ${
                    deliveryMethod === "home"
                      ? "border-black bg-gray-50 shadow-sm"
                      : "border-black/10 bg-white hover:bg-gray-50"
                  }`}
                >

                  {/* Radio */}

                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      deliveryMethod === "home"
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                  >
                    {deliveryMethod === "home" && (
                      <div className="h-2.5 w-2.5 rounded-full bg-black" />
                    )}
                  </div>


                  {/* Icon */}

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Home
                      size={21}
                      className="text-gray-700"
                    />
                  </div>


                  {/* Text */}

                  <div className="min-w-0 flex-1">

                    <p className="font-semibold">
                      التوصيل إلى المنزل
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      توصيل الطلب إلى عنوانك
                    </p>

                  </div>


                  {/* PRICE */}

                  <div className="text-left">

                    <p className="font-bold whitespace-nowrap">
                      +{formatPrice(DELIVERY.home)} DA
                    </p>

                  </div>

                </button>


                {/* OFFICE */}

                <button
                  type="button"
                  onClick={() =>
                    setDeliveryMethod("office")
                  }
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-right transition-all ${
                    deliveryMethod === "office"
                      ? "border-black bg-gray-50 shadow-sm"
                      : "border-black/10 bg-white hover:bg-gray-50"
                  }`}
                >

                  {/* Radio */}

                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      deliveryMethod === "office"
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                  >
                    {deliveryMethod === "office" && (
                      <div className="h-2.5 w-2.5 rounded-full bg-black" />
                    )}
                  </div>


                  {/* Icon */}

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Package
                      size={21}
                      className="text-gray-700"
                    />
                  </div>


                  {/* Text */}

                  <div className="min-w-0 flex-1">

                    <p className="font-semibold">
                      مكتب التوصيل
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      استلام الطلب من مكتب التوصيل
                    </p>

                  </div>


                  {/* PRICE */}

                  <div className="text-left">

                    <p className="font-bold whitespace-nowrap">
                      +{formatPrice(DELIVERY.office)} DA
                    </p>

                  </div>

                </button>

              </div>

            </div>


            {/* =================================================
                SUMMARY
            ================================================== */}

            <div className="mt-7 border-t border-dashed border-black/10 pt-6">

              <div className="space-y-3">

                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    سعر المنتج
                  </span>

                  <span className="font-semibold">
                    {formatPrice(productTotal)} DA
                  </span>

                </div>


                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    التوصيل
                  </span>

                  <span className="font-semibold">
                    {formatPrice(deliveryPrice)} DA
                  </span>

                </div>

              </div>


              <div className="mt-5 flex items-end justify-between">

                <span className="font-bold">
                  المجموع
                </span>

                <span className="text-2xl font-bold">
                  {formatPrice(total)} DA
                </span>

              </div>

            </div>


            {/* =================================================
                CONFIRM
            ================================================== */}

            <button
              type="button"
              onClick={handleConfirmOrder}
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-black px-6 py-4 text-sm font-bold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl"
            >

              تأكيد الطلب

              <LockKeyhole size={17} />

            </button>


            {/* Security */}

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">

              <LockKeyhole size={14} />

              <span>
                معلوماتك محمية وآمنة
              </span>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}