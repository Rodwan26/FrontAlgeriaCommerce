"use client";

import { useState } from "react";
import { User, Phone, MapPin, Plus, Minus, Home } from "lucide-react";
import { OrderFormSection } from "@/lib/landing-page/types";
import { hexWithAlpha } from "./BuilderHeader";
import { useLocations } from "@/components/landing/hooks/useLocations";

type Props = {
  section: OrderFormSection;
};

type DeliveryMethod = "home" | "office";

export default function BuilderOrderForm({ section }: Props) {
  const { colors } = section;

  const field = (id: "name" | "phone" | "wilaya" | "commune" | "delivery" | "quantity" | "address") =>
    section.fields.find((f) => f.id === id);

  const enabled = (id: "name" | "phone" | "wilaya" | "commune" | "delivery" | "quantity" | "address") =>
    field(id)?.enabled !== false;

  const required = (id: "name" | "phone" | "wilaya" | "commune" | "delivery" | "quantity" | "address") =>
    field(id)?.required === true;

  const [quantity, setQuantity] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("home");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [wilayaCode, setWilayaCode] = useState<number | "">("");
  const [communeCode, setCommuneCode] = useState("");
  const [activeField, setActiveField] = useState<"" | "name" | "phone">("");

  const { wilayas, communes, selectWilaya } = useLocations();

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const deliveryPrice =
    deliveryMethod === "home" ? section.delivery.homePrice : section.delivery.officePrice;
  const productsTotal = section.price * quantity;
  const totalPrice = productsTotal + deliveryPrice;

  const formatPrice = (price: number) => price.toLocaleString("ar-DZ");

  const surfaceBox = (active: boolean) => ({
    backgroundColor: active ? colors.primary : colors.surface,
    color: active ? "#ffffff" : colors.mutedText,
  });
  const chipBorder = { border: `2px solid ${colors.primary}` };

  const handleSubmit = async () => {
    const checks: Array<[boolean, string]> = [
      [enabled("name") && required("name") && !name.trim(), "يرجى إدخال الاسم"],
      [enabled("phone") && required("phone") && !phone.trim(), "يرجى إدخال رقم الهاتف"],
      [enabled("wilaya") && required("wilaya") && !wilayaCode, "يرجى اختيار الولاية"],
      [enabled("commune") && required("commune") && (wilayaCode !== "" && !communeCode), "يرجى اختيار البلدية"],
      [enabled("address") && required("address") && !address.trim(), "يرجى إدخال العنوان"],
    ];
    const firstError = checks.find(([failed]) => failed);
    if (firstError) {
      alert(firstError[1]);
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setSubmitted(true);
    } catch {
      alert("حدث خطأ، يرجى المحاولة مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  const selectDangerStyle = (hasValue: boolean) => ({
    color: hasValue ? colors.text : colors.mutedText,
  });

  const inputBase =
    "min-w-0 flex-1 bg-transparent px-5 text-right text-lg font-bold outline-none placeholder:font-bold placeholder:text-[#999]";

  return (
    <section
      id="order"
      dir="rtl"
      className="relative min-h-screen overflow-hidden px-4 pb-28 pt-10 sm:px-6"
      style={{ backgroundColor: colors.bg }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle_at_50%_15%, ${hexWithAlpha(colors.primary, 0.1)}, transparent 45%)`,
        }}
      />

      <div
        className="relative mx-auto w-full max-w-[520px] border-x-2 px-5 pb-8 pt-2 sm:px-8"
        style={{ borderColor: colors.primary, backgroundColor: hexWithAlpha(colors.surface, 0.5), borderLeftWidth: 2, borderRightWidth: 2, borderRadius: "0px" }}
      >
        <div className="mb-7 text-center">
          <p className="text-sm font-bold sm:text-base" style={{ color: colors.text }}>
            {section.title}
          </p>
          <p className="mx-auto mt-2 max-w-sm text-xs leading-5" style={{ color: colors.mutedText }}>
            {section.subtitle}
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="text-4xl font-black tracking-tight sm:text-5xl" style={{ color: colors.text }}>
              {formatPrice(section.price)}
            </span>
            <span className="text-lg font-bold" style={{ color: colors.text }}>
              {section.currency}
            </span>
          </div>
        </div>

        {submitted ? (
          <div
            className="rounded-3xl border-2 p-8 text-center"
            style={{ borderColor: colors.primary, backgroundColor: colors.surface }}
          >
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl text-white"
              style={{ backgroundColor: colors.primary }}
            >
              ✓
            </div>
            <h3 className="mt-4 text-xl font-black" style={{ color: colors.text }}>
              تم استلام طلبك بنجاح!
            </h3>
            <p className="mt-2 text-sm leading-6" style={{ color: colors.mutedText }}>
              سنتواصل معك قريباً لتأكيد الطلب وتفاصيل التوصيل.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-6 rounded-xl px-6 py-3 text-sm font-black text-white transition active:scale-95"
              style={{ backgroundColor: colors.primary }}
            >
              طلب جديد
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {enabled("name") && (
              <div
                className="flex h-[62px] w-full overflow-hidden rounded-2xl"
                style={{ border: `2px solid ${colors.primary}`, backgroundColor: colors.surface }}
              >
                <div
                  className="flex w-[76px] shrink-0 items-center justify-center border-l-2"
                  style={{ ...surfaceBox(activeField === "name"), width: 76, borderLeftWidth: 2, borderColor: colors.primary }}
                >
                  <User size={27} strokeWidth={1.8} />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setActiveField("name")}
                  onBlur={() => setActiveField("")}
                  placeholder={field("name")?.label ?? "الاسم"}
                  dir="rtl"
                  className={`${inputBase} text-white`}
                />
              </div>
            )}

            {enabled("phone") && (
              <div
                className="flex h-[62px] w-full overflow-hidden rounded-2xl"
                style={{ border: `2px solid ${colors.primary}`, backgroundColor: colors.surface }}
              >
                <div
                  className="flex w-[76px] shrink-0 items-center justify-center border-l-2"
                  style={{ ...surfaceBox(activeField === "phone"), width: 76, borderLeftWidth: 2, borderColor: colors.primary }}
                >
                  <Phone size={27} strokeWidth={1.8} />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onFocus={() => setActiveField("phone")}
                  onBlur={() => setActiveField("")}
                  placeholder={field("phone")?.label ?? "رقم الهاتف"}
                  dir="rtl"
                  inputMode="tel"
                  className={`${inputBase} tracking-wide text-white`}
                />
              </div>
            )}

            {enabled("wilaya") && (
              <div
                className="relative h-[62px] w-full overflow-hidden rounded-2xl"
                style={{ border: `2px solid ${colors.primary}`, backgroundColor: colors.surface }}
              >
                <MapPin size={23} strokeWidth={1.8} className="pointer-events-none absolute right-5 top-1/2 z-10 -translate-y-1/2" style={{ color: colors.mutedText }} />
                <select
                  value={wilayaCode}
                  onChange={(e) => {
                    const code = Number(e.target.value);
                    setWilayaCode(code);
                    setCommuneCode("");
                    selectWilaya(code);
                  }}
                  className="h-full w-full appearance-none bg-transparent px-5 pr-14 text-right text-lg font-bold outline-none"
                  style={selectDangerStyle(Boolean(wilayaCode))}
                >
                  <option value="" disabled style={{ backgroundColor: colors.surface }}>
                    {field("wilaya")?.label ?? "اختر الولاية"}
                  </option>
                  {wilayas.map((w) => (
                    <option key={w.code} value={w.code} style={{ backgroundColor: colors.surface }}>
                      {String(w.code).padStart(2, "0")} - {w.nameAr}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {enabled("commune") && (
              <div
                className="relative h-[62px] w-full overflow-hidden rounded-2xl"
                style={{ border: `2px solid ${colors.primary}`, backgroundColor: colors.surface }}
              >
                <MapPin size={23} strokeWidth={1.8} className="pointer-events-none absolute right-5 top-1/2 z-10 -translate-y-1/2" style={{ color: colors.mutedText }} />
                <select
                  value={communeCode}
                  onChange={(e) => setCommuneCode(e.target.value)}
                  disabled={!wilayaCode}
                  className="h-full w-full appearance-none bg-transparent px-5 pr-14 text-right text-lg font-bold outline-none disabled:opacity-50"
                  style={selectDangerStyle(Boolean(communeCode))}
                >
                  <option value="" disabled style={{ backgroundColor: colors.surface }}>
                    {wilayaCode ? field("commune")?.label ?? "اختر البلدية" : "اختر الولاية أولاً"}
                  </option>
                  {communes.map((c) => (
                    <option key={c.code} value={c.code} style={{ backgroundColor: colors.surface }}>
                      {c.nameAr}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {enabled("address") && (
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={field("address")?.label ?? "العنوان المفصل"}
                dir="rtl"
                rows={2}
                className="w-full resize-none rounded-2xl px-5 py-4 text-right text-lg font-bold text-white outline-none placeholder:font-bold placeholder:text-[#999]"
                style={{ border: `2px solid ${colors.primary}`, backgroundColor: colors.surface }}
              />
            )}

            {enabled("delivery") && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("home")}
                  className="flex h-[62px] flex-col items-center justify-center gap-1 rounded-2xl border-2 px-2 transition active:scale-[0.97]"
                  style={{
                    borderColor: deliveryMethod === "home" ? colors.primary : colors.border,
                    backgroundColor: deliveryMethod === "home" ? hexWithAlpha(colors.primary, 0.12) : colors.surface,
                  }}
                >
                  <Home size={20} style={{ color: deliveryMethod === "home" ? colors.primary : colors.mutedText }} />
                  <span className="text-xs font-bold" style={{ color: colors.text }}>
                    {section.delivery.homeLabel}
                  </span>
                  <span className="text-[11px] font-bold" style={{ color: colors.primary }}>
                    {formatPrice(section.delivery.homePrice)} {section.currency}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod("office")}
                  className="flex h-[62px] flex-col items-center justify-center gap-1 rounded-2xl border-2 px-2 transition active:scale-[0.97]"
                  style={{
                    borderColor: deliveryMethod === "office" ? colors.primary : colors.border,
                    backgroundColor: deliveryMethod === "office" ? hexWithAlpha(colors.primary, 0.12) : colors.surface,
                  }}
                >
                  <MapPin size={20} style={{ color: deliveryMethod === "office" ? colors.primary : colors.mutedText }} />
                  <span className="text-xs font-bold" style={{ color: colors.text }}>
                    {section.delivery.officeLabel}
                  </span>
                  <span className="text-[11px] font-bold" style={{ color: colors.primary }}>
                    {formatPrice(section.delivery.officePrice)} {section.currency}
                  </span>
                </button>
              </div>
            )}

            {enabled("quantity") && (
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-lg font-black sm:text-xl" style={{ color: colors.text }}>
                    {field("quantity")?.label ?? "الكمية"}
                  </p>
                </div>

                <div
                  className="flex h-[62px] w-[205px] items-center justify-between rounded-2xl px-4"
                  style={{ ...chipBorder, backgroundColor: colors.surface }}
                >
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-10 w-10 items-center justify-center text-[#aaa] transition hover:text-white active:scale-90"
                  >
                    <Minus size={28} />
                  </button>
                  <span className="text-xl font-black text-white">{String(quantity).padStart(2, "0")}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-10 w-10 items-center justify-center text-[#aaa] transition hover:text-white active:scale-90"
                  >
                    <Plus size={28} />
                  </button>
                </div>
              </div>
            )}

            <div className="mt-5 border-t pt-5" style={{ borderColor: hexWithAlpha(colors.primary, 0.4) }}>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold" style={{ color: colors.mutedText }}>
                  المجموع
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black" style={{ color: colors.text }}>
                    {formatPrice(totalPrice)}
                  </span>
                  <span className="text-base font-bold" style={{ color: colors.text }}>
                    {section.currency}
                  </span>
                </div>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs" style={{ color: colors.mutedText }}>
                <span>المنتجات: {formatPrice(productsTotal)} {section.currency}</span>
                <span>التوصيل: {formatPrice(deliveryPrice)} {section.currency}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex h-[58px] w-full items-center justify-center rounded-2xl text-lg font-black text-white shadow-[0_8px_30px_rgba(255,0,0,0.25)] transition active:scale-[0.98] disabled:opacity-60"
              style={{ backgroundColor: colors.primary }}
            >
              {loading ? "جاري إرسال الطلب..." : section.buttonText}
            </button>
          </div>
        )}
      </div>

      {!submitted && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 border-t p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden"
          style={{ borderColor: colors.border, backgroundColor: colors.bg }}
        >
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex h-[58px] w-full items-center justify-center rounded-2xl text-lg font-black text-white shadow-[0_8px_30px_rgba(255,0,0,0.25)] transition active:scale-[0.98] disabled:opacity-60"
            style={{ backgroundColor: colors.primary }}
          >
            {loading ? "جاري إرسال الطلب..." : section.buttonText}
          </button>
        </div>
      )}
    </section>
  );
}