"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";

import {
  CalendarDays,
  Check,
  ChevronDown,
  Home,
  LockKeyhole,
  MapPin,
  Minus,
  Package,
  Phone,
  Plus,
  ShoppingBag,
  User,
} from "lucide-react";

import locations from "./data/algeria-locations.json";

import {
  translations,
  Language,
} from "./i18n";

/* =========================================================
   TYPES
========================================================= */

type Wilaya = {
  wilayaCode: number;
  nameFr: string;
  nameAr: string;

  communes: {
    id: number;
    nameFr: string;
    nameAr: string;
  }[];
};

type DeliveryMethod = "home" | "office";

/* =========================================================
   DATA
========================================================= */

const wilayas = locations as Wilaya[];

/* =========================================================
   PRODUCT
========================================================= */

const PRODUCT = {
  name: "HOKA",

  /*
    ضع هنا رابط الصورة المباشر.

    مثال:
    "https://example.com/hoka-shoe.jpg"

    يجب أن يكون الرابط يعيد الصورة نفسها،
    وليس رابط صفحة المنتج.
  */
  image:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=90",

  description: {
    ar: "حذاء رياضي مريح مناسب للجري والمشي اليومي.",
    fr: "Chaussure de sport confortable, idéale pour la course et la marche quotidienne.",
    en: "Comfortable sports shoes, ideal for running and everyday walking.",
  },

  price: 2800,
};

/* =========================================================
   DELIVERY
========================================================= */

const DELIVERY = {
  home: 500,
  office: 300,
};

/* =========================================================
   HOME
========================================================= */

export default function HomePage() {
  /* =======================================================
     LANGUAGE
  ======================================================= */

  const [language, setLanguage] =
    useState<Language>("ar");

  const t = translations[language];

  const isArabic =
    language === "ar";

  const direction =
    isArabic ? "rtl" : "ltr";

  /* =======================================================
     CUSTOMER
  ======================================================= */

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [dateOfBirth, setDateOfBirth] =
    useState("");

  const [wilayaCode, setWilayaCode] =
    useState("");

  const [communeId, setCommuneId] =
    useState("");

  /* =======================================================
     ORDER
  ======================================================= */

  const [quantity, setQuantity] =
    useState(1);

  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("home");

  const [orderConfirmed, setOrderConfirmed] =
    useState(false);

  /* =======================================================
     LOCATION
  ======================================================= */

  const selectedWilaya =
    useMemo(() => {
      return wilayas.find(
        (wilaya) =>
          String(
            wilaya.wilayaCode
          ) === wilayaCode
      );
    }, [wilayaCode]);

  const communes =
    selectedWilaya?.communes ?? [];

  /* =======================================================
     BIRTH DATE
     Minimum age = 5 years
  ======================================================= */

  const maxBirthDate =
    useMemo(() => {
      const today = new Date();

      const date = new Date(
        today.getFullYear() - 5,
        today.getMonth(),
        today.getDate()
      );

      const year =
        date.getFullYear();

      const month =
        String(
          date.getMonth() + 1
        ).padStart(2, "0");

      const day =
        String(
          date.getDate()
        ).padStart(2, "0");

      return `${year}-${month}-${day}`;
    }, []);

  const birthDateIsValid =
    dateOfBirth.length > 0 &&
    dateOfBirth <=
      maxBirthDate;

  /* =======================================================
     PHONE
  ======================================================= */

  const phoneIsValid =
    /^(05|06|07)\d{8}$/.test(
      phone
    );

  function handlePhoneChange(
    value: string
  ) {
    const digits =
      value.replace(
        /\D/g,
        ""
      );

    setPhone(
      digits.slice(0, 10)
    );
  }

  /* =======================================================
     LOCATION
  ======================================================= */

  function handleWilayaChange(
    value: string
  ) {
    setWilayaCode(value);

    setCommuneId("");
  }

  /* =======================================================
     LOCATION NAMES
  ======================================================= */

  function getWilayaName(
    wilaya: Wilaya
  ) {
    return language === "ar"
      ? wilaya.nameAr
      : wilaya.nameFr;
  }

  function getCommuneName(
    commune: {
      id: number;
      nameFr: string;
      nameAr: string;
    }
  ) {
    return language === "ar"
      ? commune.nameAr
      : commune.nameFr;
  }

  /* =======================================================
     FORM VALIDATION
  ======================================================= */

  const customerFormValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    phoneIsValid &&
    birthDateIsValid &&
    wilayaCode.length > 0 &&
    communeId.length > 0;

  /* =======================================================
     TOTAL
  ======================================================= */

  const deliveryPrice =
    DELIVERY[deliveryMethod];

  const productTotal =
    PRODUCT.price *
    quantity;

  const total =
    productTotal +
    deliveryPrice;

  /* =======================================================
     PRICE FORMAT
  ======================================================= */

  function formatPrice(
    value: number
  ) {
    return value.toLocaleString(
      "fr-DZ"
    );
  }

  /* =======================================================
     DESCRIPTION
  ======================================================= */

  const productDescription =
    PRODUCT.description[
      language
    ];

  /* =======================================================
     QUANTITY
  ======================================================= */

  function increaseQuantity() {
    setQuantity((current) =>
      Math.min(
        current + 1,
        10
      )
    );
  }

  function decreaseQuantity() {
    setQuantity((current) =>
      Math.max(
        current - 1,
        1
      )
    );
  }

  /* =======================================================
     ORDER
  ======================================================= */

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!customerFormValid) {
      return;
    }

    if (
      !dateOfBirth ||
      dateOfBirth >
        maxBirthDate
    ) {
      return;
    }

    const selectedCommune =
      communes.find(
        (commune) =>
          String(
            commune.id
          ) === communeId
      );

    if (
      !selectedWilaya ||
      !selectedCommune
    ) {
      return;
    }

    const order = {
      customer: {
        first_name:
          firstName.trim(),

        last_name:
          lastName.trim(),

        phone,

        date_of_birth:
          dateOfBirth,

        wilaya_code:
          String(
            selectedWilaya.wilayaCode
          ),

        wilaya_name:
          getWilayaName(
            selectedWilaya
          ),

        commune_id:
          String(
            selectedCommune.id
          ),

        commune_name:
          getCommuneName(
            selectedCommune
          ),

        language,
      },

      product: {
        name:
          PRODUCT.name,

        image:
          PRODUCT.image,

        quantity,

        unit_price:
          PRODUCT.price,

        product_total:
          productTotal,
      },

      delivery: {
        method:
          deliveryMethod,

        price:
          deliveryPrice,
      },

      total,
    };

    console.log(
      "ORDER:",
      order
    );

    setOrderConfirmed(true);
  }

  /* =======================================================
     SUCCESS
  ======================================================= */

  if (orderConfirmed) {
    return (
      <main
        dir={direction}
        className="min-h-screen bg-[#f7f5f1] px-4 py-10 sm:px-6"
      >
        <div className="mx-auto flex min-h-[80vh] max-w-lg items-center justify-center">

          <div className="w-full overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white p-7 text-center shadow-[0_30px_100px_rgba(0,0,0,0.10)] sm:p-10">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check size={36} />
            </div>

            <h1 className="mt-7 text-2xl font-bold sm:text-3xl">
              {t.order.successTitle}
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-gray-500">
              {t.order.successDescription}
            </p>

            <div className="mt-7 overflow-hidden rounded-2xl border border-black/[0.06] bg-[#faf9f6]">

              <div className="flex h-44 items-center justify-center bg-gradient-to-br from-[#eeeae3] via-[#f7f5f1] to-[#e3ded5] p-5">

                <img
                  src={
                    PRODUCT.image
                  }
                  alt={
                    PRODUCT.name
                  }
                  className="h-full w-full object-contain"
                />

              </div>

              <div className="p-5 text-sm">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    {t.order.product}
                  </span>

                  <span className="font-bold">
                    {PRODUCT.name}
                  </span>

                </div>

                <div className="mt-3 flex justify-between">

                  <span className="text-gray-500">
                    {t.order.quantity}
                  </span>

                  <span className="font-bold">
                    {quantity}
                  </span>

                </div>

                <div className="mt-3 flex justify-between">

                  <span className="text-gray-500">
                    {t.order.delivery}
                  </span>

                  <span className="font-bold">
                    {deliveryMethod ===
                    "home"
                      ? t.order.home
                      : t.order.office}
                  </span>

                </div>

                <div className="mt-4 border-t border-black/10 pt-4">

                  <div className="flex items-center justify-between">

                    <span className="font-bold">
                      {t.order.total}
                    </span>

                    <span className="text-xl font-bold">
                      {formatPrice(
                        total
                      )}{" "}
                      DA
                    </span>

                  </div>

                </div>

              </div>

            </div>

            <p className="mt-6 text-xs leading-5 text-gray-400">
              {t.order.contactMessage}
            </p>

          </div>

        </div>
      </main>
    );
  }

  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <main
      dir={direction}
      className="min-h-screen bg-[#f7f5f1] text-gray-950"
    >

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/90 backdrop-blur-xl">

        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">

          {/* BRAND */}

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-xs font-black tracking-wide text-white shadow-lg">
              AC
            </div>

            <div className="hidden sm:block">

              <p className="text-sm font-bold">
                Algeria Commerce
              </p>

              <p className="text-[11px] text-gray-400">
                {t.store.products}
              </p>

            </div>

          </div>

          {/* LANGUAGE */}

          <div className="flex items-center gap-2">

            <div className="flex rounded-xl border border-black/10 bg-white p-1 shadow-sm">

              {(
                [
                  "ar",
                  "fr",
                  "en",
                ] as Language[]
              ).map(
                (lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() =>
                      setLanguage(
                        lang
                      )
                    }
                    className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition-all duration-200 sm:px-3 ${
                      language ===
                      lang
                        ? "bg-black text-white shadow-sm"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {lang === "ar"
                      ? "AR"
                      : lang === "fr"
                      ? "FR"
                      : "EN"}
                  </button>
                )
              )}

            </div>

          </div>

        </div>

      </header>

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="mx-auto max-w-6xl px-4 pb-4 pt-10 sm:px-6 sm:pt-14">

        <div className="mx-auto max-w-2xl text-center">

          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-3 py-1.5 text-xs font-semibold text-gray-500 shadow-sm">

            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            {t.store.productBrand}

          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            {t.store.products}
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
            {t.store.subtitle}
          </p>

        </div>

      </section>

      {/* ===================================================
          PRODUCT / CHECKOUT
      =================================================== */}

      <section className="mx-auto max-w-6xl px-4 pb-32 pt-8 sm:px-6">

        <form
          onSubmit={
            handleSubmit
          }
          className="mx-auto max-w-2xl"
        >

          <div className="overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white shadow-[0_25px_100px_rgba(0,0,0,0.08)]">

            {/* =================================================
                PRODUCT IMAGE
            ================================================= */}

            <div className="p-3 sm:p-5">

              <div className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#e9e3da] via-[#f7f5f1] to-[#ddd7cd]">

                {/* Background glow */}

                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9),transparent_58%)]" />

                {/* Decorative blur */}

                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/50 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-black/5 blur-3xl" />

                {/* PRODUCT IMAGE */}

                <img
                  src={
                    PRODUCT.image
                  }
                  alt={
                    PRODUCT.name
                  }
                  loading="eager"
                  className="relative z-10 h-full w-full object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-[1.06] sm:p-12"
                />

              </div>

            </div>

            {/* =================================================
                PRODUCT INFORMATION
            ================================================= */}

            <div className="px-5 pb-7 sm:px-8 sm:pb-9">

              <div className="flex items-start justify-between gap-5">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {t.store.productBrand}
                  </p>

                  <h2 className="mt-2 text-3xl font-black">
                    {PRODUCT.name}
                  </h2>

                </div>

                <div className="rounded-2xl bg-[#f7f7f5] px-4 py-3 text-left">

                  <p className="text-[10px] font-semibold text-gray-400">
                    {t.store.price}
                  </p>

                  <p className="mt-1 whitespace-nowrap text-lg font-black">
                    {formatPrice(
                      PRODUCT.price
                    )}
                    {" DA"}
                  </p>

                </div>

              </div>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                {productDescription}
              </p>

              {/* =================================================
                  QUANTITY
              ================================================== */}

              <div className="mt-8 border-t border-black/[0.06] pt-7">

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="font-bold">
                      {t.store.quantity}
                    </h3>

                    <p className="mt-1 text-xs text-gray-400">
                      {quantity ===
                      10
                        ? t.store
                            .maximumQuantity
                        : t.store
                            .minimumQuantity}
                    </p>

                  </div>

                  <div className="flex items-center rounded-2xl border border-black/10 bg-[#fafafa] p-1">

                    <button
                      type="button"
                      onClick={
                        decreaseQuantity
                      }
                      disabled={
                        quantity ===
                        1
                      }
                      aria-label={
                        t.store
                          .decreaseQuantity
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Minus
                        size={17}
                      />
                    </button>

                    <span className="flex h-10 min-w-10 items-center justify-center text-base font-black">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={
                        increaseQuantity
                      }
                      disabled={
                        quantity ===
                        10
                      }
                      aria-label={
                        t.store
                          .increaseQuantity
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Plus
                        size={17}
                      />
                    </button>

                  </div>

                </div>

              </div>

              {/* =================================================
                  DELIVERY
              ================================================== */}

              <div className="mt-8 border-t border-black/[0.06] pt-7">

                <h3 className="font-bold">
                  {t.store.delivery}
                </h3>

                <div className="mt-4 space-y-3">

                  <DeliveryOption
                    selected={
                      deliveryMethod ===
                      "home"
                    }
                    onClick={() =>
                      setDeliveryMethod(
                        "home"
                      )
                    }
                    icon={
                      <Home size={20} />
                    }
                    title={
                      t.store
                        .homeDelivery
                    }
                    description={
                      t.store
                        .homeDeliveryDescription
                    }
                    price={
                      DELIVERY.home
                    }
                    formatPrice={
                      formatPrice
                    }
                  />

                  <DeliveryOption
                    selected={
                      deliveryMethod ===
                      "office"
                    }
                    onClick={() =>
                      setDeliveryMethod(
                        "office"
                      )
                    }
                    icon={
                      <Package
                        size={20}
                      />
                    }
                    title={
                      t.store
                        .officeDelivery
                    }
                    description={
                      t.store
                        .officeDeliveryDescription
                    }
                    price={
                      DELIVERY.office
                    }
                    formatPrice={
                      formatPrice
                    }
                  />

                </div>

              </div>

              {/* =================================================
                  CUSTOMER INFORMATION
              ================================================== */}

              <div className="mt-8 border-t border-black/[0.06] pt-7">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                    <User
                      size={17}
                    />
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {
                        t.store
                          .customerInfo
                      }
                    </h3>

                    <p className="mt-1 text-xs text-gray-400">
                      {
                        t.customerGate
                          .privacy
                      }
                    </p>

                  </div>

                </div>

                {/* NAME */}

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                  <InputField
                    label={
                      t.customerGate
                        .firstName
                    }
                    icon={
                      <User
                        size={16}
                      />
                    }
                  >

                    <input
                      required
                      type="text"
                      value={
                        firstName
                      }
                      onChange={(
                        e
                      ) =>
                        setFirstName(
                          e.target
                            .value
                        )
                      }
                      placeholder={
                        t.customerGate
                          .firstNamePlaceholder
                      }
                      className={
                        inputClass
                      }
                    />

                  </InputField>

                  <InputField
                    label={
                      t.customerGate
                        .lastName
                    }
                    icon={
                      <User
                        size={16}
                      />
                    }
                  >

                    <input
                      required
                      type="text"
                      value={
                        lastName
                      }
                      onChange={(
                        e
                      ) =>
                        setLastName(
                          e.target
                            .value
                        )
                      }
                      placeholder={
                        t.customerGate
                          .lastNamePlaceholder
                      }
                      className={
                        inputClass
                      }
                    />

                  </InputField>

                </div>

                {/* PHONE + DOB */}

                <div className="mt-4 grid gap-4 sm:grid-cols-2">

                  <InputField
                    label={
                      t.customerGate
                        .phone
                    }
                    icon={
                      <Phone
                        size={16}
                      />
                    }
                  >

                    <input
                      required
                      type="tel"
                      inputMode="numeric"
                      value={
                        phone
                      }
                      onChange={(
                        e
                      ) =>
                        handlePhoneChange(
                          e.target
                            .value
                        )
                      }
                      placeholder={
                        t.customerGate
                          .phonePlaceholder
                      }
                      maxLength={10}
                      className={`${inputClass} ${
                        phone.length >
                          0 &&
                        !phoneIsValid
                          ? "border-red-300 focus:border-red-500"
                          : ""
                      }`}
                    />

                    {phone.length >
                      0 &&
                      !phoneIsValid && (
                        <p className="mt-2 text-[11px] font-medium text-red-500">
                          {
                            t.customerGate
                              .phoneError
                          }
                        </p>
                      )}

                    {phoneIsValid && (
                      <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">

                        <Check
                          size={12}
                        />

                        {
                          t.customerGate
                            .phoneValid
                        }

                      </p>
                    )}

                  </InputField>

                  <InputField
                    label={
                      t.customerGate
                        .dateOfBirth
                    }
                    icon={
                      <CalendarDays
                        size={16}
                      />
                    }
                  >

                    <input
                      required
                      type="date"
                      value={
                        dateOfBirth
                      }
                      max={
                        maxBirthDate
                      }
                      onChange={(
                        e
                      ) =>
                        setDateOfBirth(
                          e.target
                            .value
                        )
                      }
                      className={
                        inputClass
                      }
                    />

                    {dateOfBirth &&
                      !birthDateIsValid && (
                        <p className="mt-2 text-[11px] font-medium text-red-500">
                          {
                            t.customerGate
                              .birthDateError
                          }
                        </p>
                      )}

                  </InputField>

                </div>

                {/* LOCATION */}

                <div className="mt-4 grid gap-4 sm:grid-cols-2">

                  <InputField
                    label={
                      t.customerGate
                        .wilaya
                    }
                    icon={
                      <MapPin
                        size={16}
                      />
                    }
                  >

                    <div className="relative">

                      <select
                        required
                        value={
                          wilayaCode
                        }
                        onChange={(
                          e
                        ) =>
                          handleWilayaChange(
                            e.target
                              .value
                          )
                        }
                        className={`${inputClass} appearance-none pe-11`}
                      >

                        <option value="">
                          {
                            t.customerGate
                              .wilayaPlaceholder
                          }
                        </option>

                        {wilayas.map(
                          (
                            wilaya
                          ) => (
                            <option
                              key={
                                wilaya.wilayaCode
                              }
                              value={
                                wilaya.wilayaCode
                              }
                            >
                              {getWilayaName(
                                wilaya
                              )}
                            </option>
                          )
                        )}

                      </select>

                      <ChevronDown
                        size={16}
                        className={
                          selectArrowClass
                        }
                      />

                    </div>

                  </InputField>

                  <InputField
                    label={
                      t.customerGate
                        .commune
                    }
                    icon={
                      <MapPin
                        size={16}
                      />
                    }
                  >

                    <div className="relative">

                      <select
                        required
                        disabled={
                          !selectedWilaya
                        }
                        value={
                          communeId
                        }
                        onChange={(
                          e
                        ) =>
                          setCommuneId(
                            e.target
                              .value
                          )
                        }
                        className={`${inputClass} appearance-none pe-11 ${
                          !selectedWilaya
                            ? "cursor-not-allowed bg-gray-100 text-gray-400"
                            : ""
                        }`}
                      >

                        <option value="">
                          {selectedWilaya
                            ? t
                                .customerGate
                                .communePlaceholder
                            : t
                                .customerGate
                                .selectWilayaFirst}
                        </option>

                        {communes.map(
                          (
                            commune
                          ) => (
                            <option
                              key={
                                commune.id
                              }
                              value={
                                commune.id
                              }
                            >
                              {getCommuneName(
                                commune
                              )}
                            </option>
                          )
                        )}

                      </select>

                      <ChevronDown
                        size={16}
                        className={
                          selectArrowClass
                        }
                      />

                    </div>

                  </InputField>

                </div>

              </div>

              {/* =================================================
                  SUMMARY
              ================================================== */}

              <div className="mt-8 border-t border-dashed border-black/10 pt-7">

                <div className="space-y-3 text-sm">

                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      {
                        t.store
                          .productTotal
                      }
                    </span>

                    <span className="font-semibold">
                      {formatPrice(
                        productTotal
                      )}{" "}
                      DA
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      {
                        t.store
                          .deliveryPrice
                      }
                    </span>

                    <span className="font-semibold">
                      {formatPrice(
                        deliveryPrice
                      )}{" "}
                      DA
                    </span>

                  </div>

                </div>

                <div className="mt-5 flex items-end justify-between">

                  <span className="text-lg font-bold">
                    {t.store.total}
                  </span>

                  <span className="text-3xl font-black tracking-tight">
                    {formatPrice(
                      total
                    )}
                    {" DA"}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              STICKY CTA
          ================================================== */}

          <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/[0.07] bg-white/95 px-4 py-3 shadow-[0_-15px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:static sm:mt-5 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none">

            <div className="mx-auto max-w-2xl">

              <button
                type="submit"
                disabled={
                  !customerFormValid
                }
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-black px-6 py-4 text-sm font-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#222] hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
              >

                <ShoppingBag
                  size={18}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>
                  {t.store.orderNow}
                </span>

                <span className="rounded-lg bg-white/10 px-2 py-1 text-xs">
                  {formatPrice(
                    total
                  )}
                  {" DA"}
                </span>

              </button>

              <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-gray-400 sm:hidden">

                <LockKeyhole
                  size={11}
                />

                <span>
                  {
                    t.store
                      .secureOrder
                  }
                </span>

              </div>

            </div>

          </div>

        </form>

      </section>

    </main>
  );
}

/* =========================================================
   DELIVERY OPTION
========================================================= */

function DeliveryOption({
  selected,
  onClick,
  icon,
  title,
  description,
  price,
  formatPrice,
}: {
  selected: boolean;
  onClick: () => void;
  icon: ReactNode;
  title: string;
  description: string;
  price: number;
  formatPrice: (
    price: number
  ) => string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-start transition-all duration-200 ${
        selected
          ? "border-black bg-[#f7f7f5] shadow-sm"
          : "border-black/10 bg-white hover:border-black/20 hover:bg-[#fafafa]"
      }`}
    >

      {/* RADIO */}

      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
          selected
            ? "border-black"
            : "border-gray-300"
        }`}
      >

        {selected && (
          <div className="h-2.5 w-2.5 rounded-full bg-black" />
        )}

      </div>

      {/* ICON */}

      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          selected
            ? "bg-black text-white"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {icon}
      </div>

      {/* TEXT */}

      <div className="min-w-0 flex-1">

        <p className="font-bold">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-gray-400">
          {description}
        </p>

      </div>

      {/* PRICE */}

      <div className="shrink-0 text-end">

        <p className="whitespace-nowrap text-sm font-black">
          +{formatPrice(
            price
          )}{" "}
          DA
        </p>

      </div>

    </button>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
  label,
  icon,
  children,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>

      <label className="mb-2 flex items-center gap-2 text-xs font-bold text-gray-700">

        <span className="text-gray-400">
          {icon}
        </span>

        <span>
          {label}
        </span>

        <span className="text-red-500">
          *
        </span>

      </label>

      {children}

    </div>
  );
}

/* =========================================================
   STYLES
========================================================= */

const inputClass =
  "w-full rounded-2xl border border-black/10 bg-[#fafafa] px-4 py-3.5 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/[0.05]";

const selectArrowClass =
  "pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-gray-400";