"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  User,
  ShoppingBag,
  Home,
  Building2,
  Minus,
  Plus,
  Check,
} from "lucide-react";

import { product } from "../../data/product";

type DeliveryMethod = "home" | "office";

const deliveryPrices: Record<DeliveryMethod, number> = {
  home: 400,
  office: 250,
};

export default function OrderForm() {
  const [quantity, setQuantity] = useState(1);
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("home");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");

  const [loading, setLoading] = useState(false);

  const deliveryPrice = deliveryPrices[deliveryMethod];
  const productsTotal = product.price * quantity;
  const totalPrice = productsTotal + deliveryPrice;

  const formatPrice = (price: number) =>
    price.toLocaleString("ar-DZ");

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("يرجى إدخال الاسم الكامل");
      return;
    }

    if (!phone.trim()) {
      alert("يرجى إدخال رقم الهاتف");
      return;
    }

    if (!wilaya) {
      alert("يرجى اختيار الولاية");
      return;
    }

    if (!commune) {
      alert("يرجى اختيار البلدية");
      return;
    }

    setLoading(true);

    try {
      /*
       * سيتم ربط الطلب بالـ Backend لاحقًا
       * بعد موافقة العميل على التصميم.
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      console.log({
        name,
        phone,
        wilaya,
        commune,
        quantity,
        deliveryMethod,
        deliveryPrice,
        productsTotal,
        totalPrice,
      });

      alert("تم إرسال طلبك بنجاح");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ، يرجى المحاولة مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="order"
      dir="rtl"
      className="
        relative
        overflow-hidden
        bg-[#080a0b]
        px-4
        py-10
        sm:py-12
        md:py-14
      "
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[360px]
          w-[360px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-red-600/[0.06]
          blur-[120px]
        "
      />

      <div className="relative mx-auto max-w-xl">

        {/* =========================
            HEADER
        ========================== */}

        <div className="text-center">

          <p className="text-xs font-bold tracking-[0.18em] text-red-500">
            اطلب الآن
          </p>

          <h2
            className="
              mt-2
              text-3xl
              font-black
              tracking-tight
              text-white
              sm:text-4xl
            "
          >
            أكمل طلبك
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            أدخل معلوماتك وسنتواصل معك لتأكيد الطلب.
          </p>

        </div>

        {/* =========================
            FORM CARD
        ========================== */}

        <div
          className="
            mt-6
            rounded-3xl
            border
            border-white/[0.08]
            bg-[#111315]/90
            p-4
            shadow-2xl
            backdrop-blur-xl
            sm:p-6
          "
        >

          {/* =========================
              CUSTOMER INFORMATION
          ========================== */}

          <div className="space-y-3">

            {/* Name */}

            <div className="relative">

              <User
                size={18}
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  z-10
                  -translate-y-1/2
                  text-gray-500
                "
              />

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="الاسم الكامل"
                autoComplete="name"
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.035]
                  pr-12
                  pl-4
                  text-right
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-gray-500
                  transition-all
                  duration-200
                  focus:border-red-500/60
                  focus:bg-white/[0.05]
                  focus:ring-2
                  focus:ring-red-500/[0.08]
                "
              />

            </div>

            {/* Phone */}

            <div className="relative">

              <Phone
                size={18}
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  z-10
                  -translate-y-1/2
                  text-gray-500
                "
              />

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="رقم الهاتف"
                dir="ltr"
                inputMode="tel"
                autoComplete="tel"
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.035]
                  pr-12
                  pl-4
                  text-left
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-gray-500
                  transition-all
                  duration-200
                  focus:border-red-500/60
                  focus:bg-white/[0.05]
                  focus:ring-2
                  focus:ring-red-500/[0.08]
                "
              />

            </div>

            {/* Location */}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              {/* Wilaya */}

              <div className="relative">

                <MapPin
                  size={18}
                  className="
                    pointer-events-none
                    absolute
                    right-4
                    top-1/2
                    z-10
                    -translate-y-1/2
                    text-gray-500
                  "
                />

                <select
                  value={wilaya}
                  onChange={(e) => setWilaya(e.target.value)}
                  className={`
                    h-14
                    w-full
                    appearance-none
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-[#151719]
                    pr-12
                    pl-4
                    text-right
                    text-sm
                    outline-none
                    transition-all
                    duration-200
                    focus:border-red-500/60
                    focus:ring-2
                    focus:ring-red-500/[0.08]
                    ${
                      wilaya
                        ? "text-white"
                        : "text-gray-500"
                    }
                  `}
                >
                  <option value="" disabled>
                    اختر الولاية
                  </option>

                  <option value="الجزائر">
                    الجزائر
                  </option>

                  <option value="وهران">
                    وهران
                  </option>

                  <option value="تلمسان">
                    تلمسان
                  </option>

                  <option value="سطيف">
                    سطيف
                  </option>

                  <option value="قسنطينة">
                    قسنطينة
                  </option>
                </select>

              </div>

              {/* Commune */}

              <div className="relative">

                <MapPin
                  size={18}
                  className="
                    pointer-events-none
                    absolute
                    right-4
                    top-1/2
                    z-10
                    -translate-y-1/2
                    text-gray-500
                  "
                />

                <select
                  value={commune}
                  onChange={(e) => setCommune(e.target.value)}
                  disabled={!wilaya}
                  className={`
                    h-14
                    w-full
                    appearance-none
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-[#151719]
                    pr-12
                    pl-4
                    text-right
                    text-sm
                    outline-none
                    transition-all
                    duration-200
                    focus:border-red-500/60
                    focus:ring-2
                    focus:ring-red-500/[0.08]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    ${
                      commune
                        ? "text-white"
                        : "text-gray-500"
                    }
                  `}
                >
                  <option value="" disabled>
                    اختر البلدية
                  </option>

                  <option value="بلدية 1">
                    بلدية 1
                  </option>

                  <option value="بلدية 2">
                    بلدية 2
                  </option>

                  <option value="بلدية 3">
                    بلدية 3
                  </option>
                </select>

              </div>

            </div>

          </div>

          {/* =========================
              QUANTITY
          ========================== */}

          <div
            className="
              mt-3
              flex
              h-14
              items-center
              justify-between
              rounded-xl
              border
              border-white/[0.08]
              bg-white/[0.035]
              px-4
            "
          >

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
                  setQuantity((q) =>
                    Math.max(1, q - 1)
                  )
                }
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-white/[0.05]
                  text-white
                  transition
                  hover:bg-white/[0.1]
                  active:scale-90
                "
                aria-label="تقليل الكمية"
              >
                <Minus size={15} />
              </button>

              <span className="w-5 text-center text-sm font-bold text-white">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  setQuantity((q) => q + 1)
                }
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-white/[0.05]
                  text-white
                  transition
                  hover:bg-white/[0.1]
                  active:scale-90
                "
                aria-label="زيادة الكمية"
              >
                <Plus size={15} />
              </button>

            </div>

          </div>

          {/* =========================
              DELIVERY METHOD
          ========================== */}

          <div className="mt-5">

            <div className="mb-3 flex items-center justify-between">

              <span className="text-sm font-bold text-white">
                طريقة التوصيل
              </span>

              <span className="text-xs text-gray-500">
                اختر الطريقة المناسبة لك
              </span>

            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              {/* HOME DELIVERY */}

              <button
                type="button"
                onClick={() =>
                  setDeliveryMethod("home")
                }
                aria-pressed={deliveryMethod === "home"}
                className={`
                  relative
                  flex
                  min-h-[82px]
                  items-center
                  justify-between
                  gap-3
                  rounded-2xl
                  border
                  p-4
                  text-right
                  transition-all
                  duration-200
                  ${
                    deliveryMethod === "home"
                      ? `
                        border-red-500/70
                        bg-red-500/[0.08]
                        shadow-lg
                        shadow-red-500/[0.05]
                      `
                      : `
                        border-white/[0.08]
                        bg-white/[0.025]
                        hover:border-white/[0.15]
                        hover:bg-white/[0.04]
                      `
                  }
                `}
              >

                {/* Content */}

                <div className="flex min-w-0 items-center gap-3">

                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      transition-colors
                      ${
                        deliveryMethod === "home"
                          ? "bg-red-500/15 text-red-500"
                          : "bg-white/[0.05] text-gray-500"
                      }
                    `}
                  >
                    <Home size={19} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-sm font-bold text-white">
                      التوصيل للمنزل
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      استلام الطلب في المنزل
                    </p>

                  </div>

                </div>

                {/* Price */}

                <div className="shrink-0 text-left">

                  <p className="whitespace-nowrap text-sm font-black text-white">
                    {formatPrice(deliveryPrices.home)}
                  </p>

                  <p className="mt-0.5 text-[10px] text-gray-500">
                    دج
                  </p>

                </div>

                {/* Selected indicator */}

                {deliveryMethod === "home" && (
                  <div
                    className="
                      absolute
                      left-2
                      top-2
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      bg-red-500
                      text-white
                      shadow-md
                      shadow-red-500/20
                    "
                  >
                    <Check
                      size={11}
                      strokeWidth={3.5}
                    />
                  </div>
                )}

              </button>

              {/* OFFICE DELIVERY */}

              <button
                type="button"
                onClick={() =>
                  setDeliveryMethod("office")
                }
                aria-pressed={deliveryMethod === "office"}
                className={`
                  relative
                  flex
                  min-h-[82px]
                  items-center
                  justify-between
                  gap-3
                  rounded-2xl
                  border
                  p-4
                  text-right
                  transition-all
                  duration-200
                  ${
                    deliveryMethod === "office"
                      ? `
                        border-red-500/70
                        bg-red-500/[0.08]
                        shadow-lg
                        shadow-red-500/[0.05]
                      `
                      : `
                        border-white/[0.08]
                        bg-white/[0.025]
                        hover:border-white/[0.15]
                        hover:bg-white/[0.04]
                      `
                  }
                `}
              >

                {/* Content */}

                <div className="flex min-w-0 items-center gap-3">

                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      transition-colors
                      ${
                        deliveryMethod === "office"
                          ? "bg-red-500/15 text-red-500"
                          : "bg-white/[0.05] text-gray-500"
                      }
                    `}
                  >
                    <Building2 size={19} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-sm font-bold text-white">
                      التوصيل للمكتب
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      الاستلام من مكتب التوصيل
                    </p>

                  </div>

                </div>

                {/* Price */}

                <div className="shrink-0 text-left">

                  <p className="whitespace-nowrap text-sm font-black text-white">
                    {formatPrice(deliveryPrices.office)}
                  </p>

                  <p className="mt-0.5 text-[10px] text-gray-500">
                    دج
                  </p>

                </div>

                {/* Selected indicator */}

                {deliveryMethod === "office" && (
                  <div
                    className="
                      absolute
                      left-2
                      top-2
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      bg-red-500
                      text-white
                      shadow-md
                      shadow-red-500/20
                    "
                  >
                    <Check
                      size={11}
                      strokeWidth={3.5}
                    />
                  </div>
                )}

              </button>

            </div>

          </div>

          {/* =========================
              ORDER SUMMARY
          ========================== */}

          <div
            className="
              mt-5
              space-y-3
              border-t
              border-white/[0.08]
              pt-5
            "
          >

            <div className="flex items-center justify-between">

              <span className="text-sm text-gray-500">
                المنتجات
              </span>

              <span className="text-sm font-medium text-gray-300">
                {formatPrice(productsTotal)} دج
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-sm text-gray-500">
                التوصيل
              </span>

              <span className="text-sm font-medium text-gray-300">
                {formatPrice(deliveryPrice)} دج
              </span>

            </div>

            <div
              className="
                flex
                items-end
                justify-between
                border-t
                border-white/[0.05]
                pt-3
              "
            >

              <span className="text-sm font-bold text-gray-300">
                المجموع
              </span>

              <div className="flex items-baseline gap-2">

                <span className="text-2xl font-black text-white">
                  {formatPrice(totalPrice)}
                </span>

                <span className="text-sm font-bold text-red-500">
                  دج
                </span>

              </div>

            </div>

          </div>

          {/* =========================
              SUBMIT
          ========================== */}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="
              relative
              mt-5
              flex
              h-14
              w-full
              items-center
              justify-center
              gap-2
              overflow-hidden
              rounded-xl
              bg-red-600
              text-base
              font-black
              text-white
              shadow-xl
              shadow-red-600/20
              transition-all
              duration-300
              hover:bg-red-500
              hover:shadow-red-600/30
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {loading ? (
              <>
                <span
                  className="
                    h-4
                    w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-white/30
                    border-t-white
                  "
                />

                جاري إرسال الطلب...
              </>
            ) : (
              "تأكيد الطلب"
            )}

          </button>

          <p className="mt-3 text-center text-[11px] text-gray-600">
            سنتواصل معك هاتفيًا لتأكيد طلبك قبل الشحن.
          </p>

        </div>

      </div>
    </section>
  );
}