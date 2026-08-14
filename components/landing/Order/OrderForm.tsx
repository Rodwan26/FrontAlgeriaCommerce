"use client";

import { useState } from "react";
import {
  User,
  Phone,
  Home,
  ShoppingCart,
} from "lucide-react";

import FormField from "./FormField";
import LocationSelect from "./LocationSelect";
import QuantitySelector from "./QuantitySelector";
import { product } from "../../data/product";

export default function OrderForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const order = {
      product: product.name,
      name,
      phone,
      wilaya,
      commune,
      address,
      quantity,
    };

    console.log("Order:", order);

    alert("تم تسجيل طلبك بنجاح");
  };

  return (
    <section
      id="order"
      className="bg-[#080a0b] px-4 py-8 md:py-16"
    >
      <div className="mx-auto max-w-3xl">

        <div className="relative overflow-hidden rounded-3xl border border-red-600 bg-[#111315] p-5 shadow-[0_0_60px_rgba(239,68,68,0.12)] md:p-10">

          {/* Glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-red-600/10 blur-[100px]" />

          <div className="relative">

            {/* Title */}
            <div className="mb-7 text-center">
              <h2 className="text-3xl font-black text-white md:text-4xl">
                اطلب حذاء{" "}
                <span className="text-red-500">
                  HOKA
                </span>{" "}
                الآن
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                املأ معلوماتك وسيتم التواصل معك لتأكيد طلبك
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-3"
              dir="rtl"
            >

              <FormField
                icon={User}
                placeholder="الاسم الكامل"
                value={name}
                onChange={setName}
              />

              <FormField
                icon={Phone}
                placeholder="رقم الهاتف"
                type="tel"
                value={phone}
                onChange={setPhone}
              />

              <LocationSelect
                type="wilaya"
                value={wilaya}
                onChange={setWilaya}
              />

              <LocationSelect
                type="commune"
                value={commune}
                onChange={setCommune}
              />

              <div className="relative">
                <Home
                  size={22}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
                />

                <input
                  type="text"
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  placeholder="توصيل إلى المنزل"
                  className="h-16 w-full rounded-xl border border-red-600/80 bg-[#151719] px-14 text-right text-base text-white outline-none transition placeholder:text-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
                />
              </div>

              <div className="pt-2">
                <QuantitySelector
                  quantity={quantity}
                  onChange={setQuantity}
                />
              </div>

              <button
                type="submit"
                className="group relative mt-2 flex h-16 w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-red-600 text-xl font-black text-white shadow-xl shadow-red-600/20 transition hover:bg-red-500 active:scale-[0.98]"
              >
                <span className="relative z-10">
                  اطلب الآن
                </span>

                <ShoppingCart
                  size={22}
                  className="relative z-10"
                />

                {/* Shine */}
                <span className="absolute -left-20 top-0 h-full w-16 -skew-x-12 bg-white/20 transition-all duration-700 group-hover:left-[120%]" />
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}