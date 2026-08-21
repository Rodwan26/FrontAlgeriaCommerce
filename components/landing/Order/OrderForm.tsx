"use client";

import { useState } from "react";
import {
  User,
  Phone,
  MapPin,
  Plus,
  Minus,
} from "lucide-react";

import { product } from "../data/product";
import { useLocations } from "../hooks/useLocations";

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
  const [wilayaCode, setWilayaCode] = useState<number | "">("");
  const [communeCode, setCommuneCode] = useState("");
  const [activeField, setActiveField] = useState<"" | "name" | "phone">("");

  const { wilayas, communes, selectWilaya } = useLocations();

  const [loading, setLoading] = useState(false);

  const deliveryPrice = deliveryPrices[deliveryMethod];

  const productsTotal = product.price * quantity;

  const totalPrice = productsTotal + deliveryPrice;

  const formatPrice = (price: number) =>
    price.toLocaleString("ar-DZ");

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("يرجى إدخال الاسم");
      return;
    }

    if (!phone.trim()) {
      alert("يرجى إدخال رقم الهاتف");
      return;
    }

    if (!wilayaCode) {
      alert("يرجى اختيار الولاية");
      return;
    }

    if (!communeCode) {
      alert("يرجى اختيار البلدية");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      console.log({
        name,
        phone,
        wilaya: wilayaCode,
        commune: communeCode,
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
        min-h-screen
        overflow-hidden
        bg-[#151515]
        px-4
        pb-28
        pt-10
        sm:px-6
      "
    >
      {/* =========================================
          BACKGROUND
      ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_15%,rgba(72,20,180,0.10),transparent_45%)]
        "
      />

      {/* =========================================
          MAIN CONTAINER
      ========================================= */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[520px]
          border-x-2
          border-[#4018b8]
          px-5
          pb-8
          pt-2
          sm:px-8
        "
      >

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="mb-7 text-center">

          <p
            className="
              text-sm
              font-bold
              text-white
              sm:text-base
            "
          >
            احصل على منتجك الآن
          </p>

          <div
            className="
              mt-3
              flex
              items-center
              justify-center
              gap-2
            "
          >

            <span
              className="
                text-4xl
                font-black
                tracking-tight
                text-white
                sm:text-5xl
              "
            >
              {formatPrice(product.price)}
            </span>

            <span
              className="
                text-lg
                font-bold
                text-white
              "
            >
              دج
            </span>

          </div>

        </div>

        {/* =========================================
            FORM
        ========================================= */}

        <div className="space-y-5">

          {/* =======================================
              NAME
          ======================================= */}

          <div
            className="
              flex
              h-[62px]
              w-full
              overflow-hidden
              rounded-2xl
              border-2
              border-[#4018b8]
              bg-[#181818]
            "
          >

            {/* Icon */}

            <div
              className="
                flex
                w-[76px]
                shrink-0
                items-center
                justify-center
                border-l-2
                border-[#4018b8]
              "
              style={{
                backgroundColor: activeField === "name" ? "#4018b8" : "#191919",
                color: activeField === "name" ? "white" : "#a7a7a7",
              }}
            >
              <User size={27} strokeWidth={1.8} />
            </div>

            {/* Input */}

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              onFocus={() => setActiveField("name")}
              onBlur={() => setActiveField("")}
              placeholder="الاسم"
              dir="rtl"
              className="
                min-w-0
                flex-1
                bg-transparent
                px-5
                text-right
                text-lg
                font-bold
                text-white
                outline-none
                placeholder:text-[#999]
                placeholder:font-bold
              "
            />

          </div>

          {/* =======================================
              PHONE
          ======================================= */}

          <div
            className="
              flex
              h-[62px]
              w-full
              overflow-hidden
              rounded-2xl
              border-2
              border-[#4018b8]
              bg-[#181818]
            "
          >

            {/* Icon */}

            <div
              className="
                flex
                w-[76px]
                shrink-0
                items-center
                justify-center
                border-l-2
                border-[#4018b8]
              "
              style={{
                backgroundColor: activeField === "phone" ? "#4018b8" : "#191919",
                color: activeField === "phone" ? "white" : "#a7a7a7",
              }}
            >
              <Phone size={27} strokeWidth={1.8} />
            </div>

            {/* Input */}

            <input
              type="tel"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              onFocus={() => setActiveField("phone")}
              onBlur={() => setActiveField("")}
              placeholder="رقم الهاتف"
              dir="rtl"
              inputMode="tel"
              className="
                min-w-0
                flex-1
                bg-transparent
                px-5
                text-right
                text-lg
                font-bold
                tracking-wide
                text-white
                outline-none
                placeholder:text-[#999]
                placeholder:font-bold
                placeholder:text-right
              "
            />

          </div>

          {/* =======================================
              WILAYA
          ======================================= */}

          <div
            className="
              relative
              h-[62px]
              w-full
              overflow-hidden
              rounded-2xl
              border-2
              border-[#4018b8]
              bg-[#181818]
            "
          >

            <MapPin
              size={23}
              strokeWidth={1.8}
              className="
                pointer-events-none
                absolute
                right-5
                top-1/2
                z-10
                -translate-y-1/2
                text-[#999]
              "
            />

            <select
              value={wilayaCode}
              onChange={(e) => {
                const code = Number(e.target.value);
                setWilayaCode(code);
                setCommuneCode("");
                selectWilaya(code);
              }}
              className={`
                h-full
                w-full
                appearance-none
                bg-transparent
                px-5
                pr-14
                text-right
                text-lg
                font-bold
                outline-none
                ${
                  wilayaCode
                    ? "text-white"
                    : "text-[#999]"
                }
              `}
            >

              <option
                value=""
                disabled
                className="bg-[#181818]"
              >
                اختر الولاية
              </option>

              {wilayas.map((w) => (
                <option
                  key={w.code}
                  value={w.code}
                  className="bg-[#181818]"
                >
                  {String(w.code).padStart(2, "0")} - {w.nameAr}
                </option>
              ))}

            </select>

          </div>

          {/* =======================================
              COMMUNE
          ======================================= */}

          <div
            className="
              relative
              h-[62px]
              w-full
              overflow-hidden
              rounded-2xl
              border-2
              border-[#4018b8]
              bg-[#181818]
            "
          >

            <MapPin
              size={23}
              strokeWidth={1.8}
              className="
                pointer-events-none
                absolute
                right-5
                top-1/2
                z-10
                -translate-y-1/2
                text-[#999]
              "
            />

            <select
              value={communeCode}
              onChange={(e) =>
                setCommuneCode(e.target.value)
              }
              disabled={!wilayaCode}
              className={`
                h-full
                w-full
                appearance-none
                bg-transparent
                px-5
                pr-14
                text-right
                text-lg
                font-bold
                outline-none
                ${
                  communeCode
                    ? "text-white"
                    : "text-[#999]"
                }
                ${!wilayaCode ? "opacity-50" : ""}
              `}
            >

              <option
                value=""
                disabled
                className="bg-[#181818]"
              >
                {wilayaCode
                  ? "اختر البلدية"
                  : "اختر الولاية أولاً"}
              </option>

              {communes.map((c) => (
                <option
                  key={c.code}
                  value={c.code}
                  className="bg-[#181818]"
                >
                  {c.nameAr}
                </option>
              ))}

            </select>

          </div>

          {/* =======================================
              DELIVERY
          ======================================= */}

          <div
            className="
              relative
              h-[62px]
              w-full
              overflow-hidden
              rounded-2xl
              border-2
              border-[#4018b8]
              bg-[#181818]
            "
          >

            <MapPin
              size={23}
              strokeWidth={1.8}
              className="
                pointer-events-none
                absolute
                right-5
                top-1/2
                z-10
                -translate-y-1/2
                text-[#999]
              "
            />

            <select
              value={deliveryMethod}
              onChange={(e) =>
                setDeliveryMethod(
                  e.target.value as DeliveryMethod
                )
              }
              className="
                h-full
                w-full
                appearance-none
                bg-transparent
                px-5
                pr-14
                text-right
                text-lg
                font-bold
                text-white
                outline-none
              "
            >

              <option
                value="home"
                className="bg-[#181818]"
              >
                توصيل إلى المنزل — {formatPrice(deliveryPrices.home)} دج
              </option>

              <option
                value="office"
                className="bg-[#181818]"
              >
                توصيل إلى المكتب — {formatPrice(deliveryPrices.office)} دج
              </option>

            </select>

          </div>

          {/* =======================================
              QUANTITY
          ======================================= */}

          <div
            className="
              flex
              items-center
              justify-between
              pt-2
            "
          >

            {/* Label */}

            <div>

              <p
                className="
                  text-lg
                  font-black
                  text-white
                  sm:text-xl
                "
              >
                الكمية
              </p>

            </div>

            {/* Counter */}

            <div
              className="
                flex
                h-[62px]
                w-[205px]
                items-center
                justify-between
                rounded-2xl
                border-2
                border-[#4018b8]
                bg-[#181818]
                px-4
              "
            >

              <button
                type="button"
                onClick={() =>
                  setQuantity((q) =>
                    Math.max(1, q - 1)
                  )
                }
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  text-[#aaa]
                  transition
                  hover:text-white
                  active:scale-90
                "
              >
                <Minus size={28} />
              </button>

              <span
                className="
                  text-xl
                  font-black
                  text-white
                "
              >
                {String(quantity).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={() =>
                  setQuantity((q) => q + 1)
                }
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  text-[#aaa]
                  transition
                  hover:text-white
                  active:scale-90
                "
              >
                <Plus size={28} />
              </button>

            </div>

          </div>

          {/* =======================================
              TOTAL
          ======================================= */}

          <div
            className="
              mt-5
              border-t
              border-[#30127e]
              pt-5
            "
          >

            <div className="flex items-center justify-between">

              <span className="text-base font-bold text-[#999]">
                المجموع
              </span>

              <div className="flex items-baseline gap-2">

                <span
                  className="
                    text-3xl
                    font-black
                    text-white
                  "
                >
                  {formatPrice(totalPrice)}
                </span>

                <span className="text-base font-bold text-white">
                  دج
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          MOBILE STICKY CTA
      ========================================= */}

      <div
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-50
          border-t
          border-[#222]
          bg-[#111]
          p-3
          pb-[calc(0.75rem+env(safe-area-inset-bottom))]
          md:hidden
        "
      >

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="
            flex
            h-[58px]
            w-full
            items-center
            justify-center
            rounded-2xl
            bg-red-600
            text-lg
            font-black
            text-white
            shadow-[0_8px_30px_rgba(255,0,0,0.25)]
            transition
            hover:bg-red-500
            active:scale-[0.98]
            disabled:opacity-60
          "
        >

          {loading
            ? "جاري إرسال الطلب..."
            : "اطلب الآن"}

        </button>

      </div>

    </section>
  );
}