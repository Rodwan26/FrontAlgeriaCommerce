"use client";

import { useState } from "react";
import { MapPin, Phone, User, ShoppingBag } from "lucide-react";
import { product } from "./../../data/product";

export default function OrderForm() {
  const [quantity, setQuantity] = useState(1);

  return (
    <section
      id="order"
      dir="rtl"
      className="relative overflow-hidden bg-[#080a0b] px-4 py-14 md:py-20"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[130px]" />

      <div className="relative mx-auto max-w-5xl">

        {/* Header */}
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-bold text-red-500">
            الطلب
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
            اطلب منتجك الآن
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-400">
            أدخل معلوماتك وسنتواصل معك لتأكيد طلبك.
          </p>
        </div>

        {/* Form card */}
        <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-white/10 bg-[#111315]/80 p-5 shadow-2xl backdrop-blur-xl sm:p-7">

          <div className="space-y-3">

            {/* Name */}
            <div className="relative">
              <User
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                placeholder="الاسم الكامل"
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  pr-12
                  pl-4
                  text-right
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-gray-500
                  transition
                  focus:border-red-500/60
                  focus:bg-white/[0.06]
                "
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="tel"
                placeholder="رقم الهاتف"
                dir="rtl"
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  pr-12
                  pl-4
                  text-right
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-gray-500
                  transition
                  focus:border-red-500/60
                  focus:bg-white/[0.06]
                "
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              <div className="relative">
                <MapPin
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <select
                  defaultValue=""
                  className="
                    h-14
                    w-full
                    appearance-none
                    rounded-xl
                    border
                    border-white/10
                    bg-[#151719]
                    pr-12
                    pl-4
                    text-sm
                    text-gray-400
                    outline-none
                    transition
                    focus:border-red-500/60
                  "
                >
                  <option value="" disabled>
                    اختر الولاية
                  </option>
                  <option>الجزائر</option>
                  <option>وهران</option>
                  <option>تلمسان</option>
                  <option>سطيف</option>
                  <option>قسنطينة</option>
                </select>
              </div>

              <div className="relative">
                <MapPin
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <select
                  defaultValue=""
                  className="
                    h-14
                    w-full
                    appearance-none
                    rounded-xl
                    border
                    border-white/10
                    bg-[#151719]
                    pr-12
                    pl-4
                    text-sm
                    text-gray-400
                    outline-none
                    transition
                    focus:border-red-500/60
                  "
                >
                  <option value="" disabled>
                    اختر البلدية
                  </option>
                  <option>بلدية 1</option>
                  <option>بلدية 2</option>
                </select>
              </div>

            </div>

            {/* Quantity */}
            <div className="flex h-14 items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4">

              <div className="flex items-center gap-3">
                <ShoppingBag
                  size={18}
                  className="text-gray-500"
                />

                <span className="text-sm text-gray-400">
                  الكمية
                </span>
              </div>

              <div className="flex items-center gap-4">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-lg text-white transition hover:bg-white/10"
                >
                  −
                </button>

                <span className="w-5 text-center text-sm font-bold text-white">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => q + 1)
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-lg text-white transition hover:bg-white/10"
                >
                  +
                </button>

              </div>
            </div>

          </div>

          {/* Order summary */}
          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">

            <span className="text-sm text-gray-400">
              المجموع
            </span>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">
                {(product.price * quantity).toLocaleString("ar-DZ")}
              </span>

              <span className="text-sm font-bold text-red-500">
                دج
              </span>
            </div>

          </div>

          {/* Submit */}
          <button
            type="button"
            className="
              mt-5
              flex
              h-14
              w-full
              items-center
              justify-center
              rounded-xl
              bg-red-600
              text-base
              font-black
              text-white
              shadow-xl
              shadow-red-600/20
              transition
              hover:bg-red-500
              hover:shadow-red-600/30
              active:scale-[0.98]
            "
          >
            تأكيد الطلب
          </button>

          <p className="mt-3 text-center text-xs text-gray-500">
            سيتم التواصل معك لتأكيد الطلب قبل الشحن.
          </p>
        </div>
      </div>
    </section>
  );
}