"use client";

import {
  FormEvent,
  useMemo,
  useState,
} from "react";

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
  Play,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  User,
  Zap,
} from "lucide-react";

import locations from "./data/algeria-locations.json";

import {
  translations,
  Language,
} from "./i18n";

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

const wilayas = locations as Wilaya[];

/* =========================================================
   PRODUCT
========================================================= */

const PRODUCT = {
  name: "HOKA",

  image:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",

  description: {
    ar: "حذاء رياضي مريح ومميز، مناسب للجري والمشي والاستعمال اليومي.",
    fr: "Chaussure de sport confortable et élégante, idéale pour la course, la marche et l'utilisation quotidienne.",
    en: "Comfortable and stylish sports shoes, ideal for running, walking and everyday use.",
  },

  price: 2800,
};

/* =========================================================
   REAL FREE STOCK VIDEOS
   Pexels videos are free to use according to their pages.
========================================================= */

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/5319940/5319940-sd_640_360_25fps.mp4";

const SPORT_VIDEO =
  "https://videos.pexels.com/video-files/4761437/4761437-sd_640_360_25fps.mp4";

const RUNNING_VIDEO =
  "https://videos.pexels.com/video-files/4763826/4763826-sd_640_360_24fps.mp4";

const DELIVERY = {
  home: 500,
  office: 300,
};

/* =========================================================
   PAGE
========================================================= */

export default function HomePage() {
  const [language, setLanguage] =
    useState<Language>("ar");

  const t = translations[language];

  const isArabic = language === "ar";

  const direction = isArabic
    ? "rtl"
    : "ltr";

  /* CUSTOMER */

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

  /* ORDER */

  const [quantity, setQuantity] =
    useState(1);

  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("home");

  const [orderConfirmed, setOrderConfirmed] =
    useState(false);

  /* LOCATION */

  const selectedWilaya = useMemo(() => {
    return wilayas.find(
      (wilaya) =>
        String(wilaya.wilayaCode) ===
        wilayaCode
    );
  }, [wilayaCode]);

  const communes =
    selectedWilaya?.communes ?? [];

  /* DATE */

  const maxBirthDate = useMemo(() => {
    const today = new Date();

    const date = new Date(
      today.getFullYear() - 5,
      today.getMonth(),
      today.getDate()
    );

    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;
  }, []);

  const birthDateIsValid =
    dateOfBirth.length > 0 &&
    dateOfBirth <= maxBirthDate;

  /* PHONE */

  const phoneIsValid =
    /^(05|06|07)\d{8}$/.test(phone);

  function handlePhoneChange(
    value: string
  ) {
    const digits = value.replace(
      /\D/g,
      ""
    );

    setPhone(
      digits.slice(0, 10)
    );
  }

  /* LOCATION */

  function handleWilayaChange(
    value: string
  ) {
    setWilayaCode(value);
    setCommuneId("");
  }

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

  /* QUANTITY */

  function increaseQuantity() {
    setQuantity((current) =>
      Math.min(current + 1, 10)
    );
  }

  function decreaseQuantity() {
    setQuantity((current) =>
      Math.max(current - 1, 1)
    );
  }

  /* TOTAL */

  const deliveryPrice =
    DELIVERY[deliveryMethod];

  const productTotal =
    PRODUCT.price * quantity;

  const total =
    productTotal +
    deliveryPrice;

  function formatPrice(
    value: number
  ) {
    return value.toLocaleString(
      "fr-DZ"
    );
  }

  /* VALIDATION */

  const customerFormValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    phoneIsValid &&
    birthDateIsValid &&
    wilayaCode.length > 0 &&
    communeId.length > 0;

  /* SUBMIT */

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!customerFormValid) {
      return;
    }

    const selectedCommune =
      communes.find(
        (commune) =>
          String(commune.id) ===
          communeId
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
        name: PRODUCT.name,
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
        className="
          min-h-screen
          bg-[#090611]
          px-4
          py-10
          text-white
        "
      >
        <div
          className="
            mx-auto
            flex
            min-h-[80vh]
            max-w-lg
            items-center
            justify-center
          "
        >
          <div
            className="
              relative
              w-full
              overflow-hidden
              rounded-[2rem]
              border
              border-white/10
              bg-white/[0.07]
              p-7
              text-center
              shadow-[0_30px_100px_rgba(0,0,0,0.5)]
              backdrop-blur-2xl
              sm:p-10
            "
          >
            <div
              className="
                absolute
                -left-20
                -top-20
                h-48
                w-48
                rounded-full
                bg-fuchsia-500/20
                blur-3xl
              "
            />

            <div
              className="
                relative
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-emerald-400
                to-teal-500
                text-white
                shadow-xl
              "
            >
              <Check size={36} />
            </div>

            <h1
              className="
                relative
                mt-7
                text-2xl
                font-black
                sm:text-3xl
              "
            >
              {t.order.successTitle}
            </h1>

            <p
              className="
                relative
                mx-auto
                mt-3
                max-w-sm
                text-sm
                leading-7
                text-white/55
              "
            >
              {
                t.order
                  .successDescription
              }
            </p>

            <div
              className="
                relative
                mt-7
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                p-5
                text-sm
              "
            >
              <div className="flex justify-between">
                <span className="text-white/45">
                  {t.order.product}
                </span>

                <span className="font-bold">
                  {PRODUCT.name}
                </span>
              </div>

              <div className="mt-3 flex justify-between">
                <span className="text-white/45">
                  {t.order.quantity}
                </span>

                <span className="font-bold">
                  {quantity}
                </span>
              </div>

              <div className="mt-3 flex justify-between">
                <span className="text-white/45">
                  {t.order.delivery}
                </span>

                <span className="font-bold">
                  {deliveryMethod ===
                  "home"
                    ? t.order.home
                    : t.order.office}
                </span>
              </div>

              <div
                className="
                  mt-4
                  border-t
                  border-white/10
                  pt-4
                "
              >
                <div className="flex justify-between">
                  <span className="font-bold">
                    {t.order.total}
                  </span>

                  <span
                    className="
                      text-xl
                      font-black
                      text-orange-300
                    "
                  >
                    {formatPrice(total)} DA
                  </span>
                </div>
              </div>
            </div>

            <p
              className="
                relative
                mt-6
                text-xs
                leading-5
                text-white/35
              "
            >
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
      className="
        min-h-screen
        overflow-x-hidden
        bg-[#08050d]
        text-white
      "
    >
      {/* =====================================================
          GLOBAL BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            -left-40
            -top-40
            h-[500px]
            w-[500px]
            rounded-full
            bg-fuchsia-600/20
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            right-[-200px]
            top-[40%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-violet-600/20
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            bottom-[-200px]
            left-[30%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-orange-500/10
            blur-[140px]
          "
        />
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-white/[0.08]
          bg-[#08050d]/70
          backdrop-blur-2xl
        "
      >
        <div
          className="
            mx-auto
            flex
            h-[68px]
            max-w-6xl
            items-center
            justify-between
            px-4
            sm:px-6
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-orange-400
                via-pink-500
                to-fuchsia-600
                text-xs
                font-black
                shadow-[0_10px_30px_rgba(217,70,239,0.3)]
              "
            >
              AC
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-black">
                Algeria Commerce
              </p>

              <p className="text-[10px] text-white/30">
                {t.store.products}
              </p>
            </div>
          </div>

          <div
            className="
              flex
              rounded-xl
              border
              border-white/10
              bg-white/[0.05]
              p-1
            "
          >
            {(
              ["ar", "fr", "en"] as Language[]
            ).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() =>
                  setLanguage(lang)
                }
                className={`
                  rounded-lg
                  px-3
                  py-1.5
                  text-[10px]
                  font-black
                  transition
                  ${
                    language === lang
                      ? "bg-white text-[#241037]"
                      : "text-white/45 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                {lang === "ar"
                  ? "AR"
                  : lang === "fr"
                  ? "FR"
                  : "EN"}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* =====================================================
          HERO VIDEO
      ===================================================== */}

      <section
        className="
          relative
          min-h-[620px]
          overflow-hidden
          border-b
          border-white/[0.08]
        "
      >
        {/* VIDEO */}

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={PRODUCT.image}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            opacity-45
          "
        >
          <source
            src={HERO_VIDEO}
            type="video/mp4"
          />
        </video>

        {/* DARK OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#08050d]/55
            via-[#08050d]/65
            to-[#08050d]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-fuchsia-950/30
            via-transparent
            to-orange-950/20
          "
        />

        {/* CONTENT */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[620px]
            max-w-6xl
            items-center
            px-4
            py-20
            sm:px-6
          "
        >
          <div
            className="
              mx-auto
              max-w-3xl
              text-center
            "
          >
            <div
              className="
                mx-auto
                mb-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.07]
                px-4
                py-2
                text-xs
                font-bold
                text-white/80
                backdrop-blur-xl
              "
            >
              <Sparkles
                size={14}
                className="text-orange-300"
              />

              {t.store.productBrand}
            </div>

            <h1
              className="
                text-5xl
                font-black
                leading-[1.05]
                tracking-[-0.04em]
                sm:text-7xl
              "
            >
              {t.store.products}
            </h1>

            <p
              className="
                mx-auto
                mt-6
                max-w-xl
                text-sm
                leading-7
                text-white/60
                sm:text-base
              "
            >
              {t.store.subtitle}
            </p>

            <div
              className="
                mt-8
                flex
                flex-wrap
                items-center
                justify-center
                gap-3
              "
            >
              <a
                href="#product"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-gradient-to-r
                  from-orange-400
                  via-pink-500
                  to-fuchsia-600
                  px-6
                  py-3.5
                  text-sm
                  font-black
                  shadow-[0_15px_45px_rgba(217,70,239,0.3)]
                  transition
                  hover:-translate-y-1
                "
              >
                <ShoppingBag size={17} />

                {t.store.orderNow}
              </a>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/20
                  px-5
                  py-3.5
                  text-xs
                  text-white/60
                  backdrop-blur-xl
                "
              >
                <Play
                  size={14}
                  className="fill-current"
                />

                Premium running experience
              </div>
            </div>

            {/* SOCIAL PROOF */}

            <div
              className="
                mt-10
                flex
                items-center
                justify-center
                gap-4
                text-xs
                text-white/40
              "
            >
              <div className="flex">
                {Array.from({
                  length: 5,
                }).map((_, index) => (
                  <Star
                    key={index}
                    size={13}
                    className="
                      fill-orange-300
                      text-orange-300
                    "
                  />
                ))}
              </div>

              <span>
                Designed for movement
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCT SECTION
      ===================================================== */}

      <section
        id="product"
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
          px-4
          pb-32
          pt-16
          sm:px-6
          sm:pt-24
        "
      >
        {/* PRODUCT FORM */}

        <form
          onSubmit={handleSubmit}
          className="
            mx-auto
            max-w-2xl
          "
        >
          <div
            className="
              overflow-hidden
              rounded-[2rem]
              border
              border-white/10
              bg-white/[0.055]
              shadow-[0_30px_100px_rgba(0,0,0,0.4)]
              backdrop-blur-2xl
            "
          >
            {/* PRODUCT IMAGE */}

            <div className="p-3 sm:p-5">
              <div
                className="
                  relative
                  aspect-[4/3]
                  overflow-hidden
                  rounded-[1.5rem]
                  bg-[#180e23]
                "
              >
                <img
                  src={PRODUCT.image}
                  alt={PRODUCT.name}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-700
                    hover:scale-[1.04]
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/50
                    via-transparent
                    to-transparent
                  "
                />

                <div
                  className="
                    absolute
                    bottom-4
                    left-4
                    right-4
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div
                    className="
                      rounded-xl
                      border
                      border-white/10
                      bg-black/25
                      px-3
                      py-2
                      text-[10px]
                      font-bold
                      text-white/80
                      backdrop-blur-xl
                    "
                  >
                    Premium performance
                  </div>

                  <div
                    className="
                      rounded-xl
                      bg-orange-400
                      px-3
                      py-2
                      text-[10px]
                      font-black
                      text-black
                    "
                  >
                    HOKA
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUCT INFORMATION */}

            <div
              className="
                px-5
                pb-7
                sm:px-8
                sm:pb-9
              "
            >
              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-5
                "
              >
                <div>
                  <p
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.2em]
                      text-fuchsia-300
                    "
                  >
                    {t.store.productBrand}
                  </p>

                  <h2
                    className="
                      mt-2
                      text-3xl
                      font-black
                    "
                  >
                    {PRODUCT.name}
                  </h2>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-orange-300/20
                    bg-gradient-to-br
                    from-orange-400/15
                    to-pink-500/10
                    px-4
                    py-3
                  "
                >
                  <p className="text-[9px] text-white/35">
                    {t.store.price}
                  </p>

                  <p
                    className="
                      mt-1
                      whitespace-nowrap
                      text-lg
                      font-black
                      text-orange-300
                    "
                  >
                    {formatPrice(
                      PRODUCT.price
                    )}{" "}
                    DA
                  </p>
                </div>
              </div>

              <p
                className="
                  mt-4
                  text-sm
                  leading-7
                  text-white/50
                "
              >
                {
                  PRODUCT.description[
                    language
                  ]
                }
              </p>

              {/* FEATURES */}

              <div
                className="
                  mt-6
                  grid
                  grid-cols-3
                  gap-2
                "
              >
                <Feature
                  icon={<Zap size={15} />}
                  text="Light"
                />

                <Feature
                  icon={<Star size={15} />}
                  text="Comfort"
                />

                <Feature
                  icon={<Check size={15} />}
                  text="Sport"
                />
              </div>

              {/* QUANTITY */}

              <div
                className="
                  mt-8
                  border-t
                  border-white/10
                  pt-7
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div>
                    <h3 className="font-black">
                      {t.store.quantity}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-white/35
                      "
                    >
                      {quantity === 10
                        ? t.store.maximumQuantity
                        : t.store.minimumQuantity}
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.05]
                      p-1
                    "
                  >
                    <button
                      type="button"
                      onClick={
                        decreaseQuantity
                      }
                      disabled={
                        quantity === 1
                      }
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        text-white/60
                        transition
                        hover:bg-white/10
                        hover:text-white
                        disabled:opacity-20
                      "
                    >
                      <Minus size={17} />
                    </button>

                    <span
                      className="
                        flex
                        h-10
                        min-w-10
                        items-center
                        justify-center
                        font-black
                      "
                    >
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={
                        increaseQuantity
                      }
                      disabled={
                        quantity === 10
                      }
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        text-white/60
                        transition
                        hover:bg-white/10
                        hover:text-white
                        disabled:opacity-20
                      "
                    >
                      <Plus size={17} />
                    </button>
                  </div>
                </div>
              </div>

              {/* DELIVERY */}

              <div
                className="
                  mt-8
                  border-t
                  border-white/10
                  pt-7
                "
              >
                <h3 className="font-black">
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
                      <Home size={19} />
                    }
                    title={
                      t.store.homeDelivery
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
                      <Package size={19} />
                    }
                    title={
                      t.store.officeDelivery
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

              {/* CUSTOMER */}

              <div
                className="
                  mt-8
                  border-t
                  border-white/10
                  pt-7
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-gradient-to-br
                      from-fuchsia-500
                      to-violet-600
                    "
                  >
                    <User size={17} />
                  </div>

                  <div>
                    <h3 className="font-black">
                      {t.store.customerInfo}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-white/30
                      "
                    >
                      {
                        t.customerGate
                          .privacy
                      }
                    </p>
                  </div>
                </div>

                {/* NAME */}

                <div
                  className="
                    mt-5
                    grid
                    gap-4
                    sm:grid-cols-2
                  "
                >
                  <InputField
                    label={
                      t.customerGate.firstName
                    }
                    icon={
                      <User size={15} />
                    }
                  >
                    <input
                      required
                      type="text"
                      value={firstName}
                      onChange={(e) =>
                        setFirstName(
                          e.target.value
                        )
                      }
                      placeholder={
                        t.customerGate
                          .firstNamePlaceholder
                      }
                      className={inputClass}
                    />
                  </InputField>

                  <InputField
                    label={
                      t.customerGate.lastName
                    }
                    icon={
                      <User size={15} />
                    }
                  >
                    <input
                      required
                      type="text"
                      value={lastName}
                      onChange={(e) =>
                        setLastName(
                          e.target.value
                        )
                      }
                      placeholder={
                        t.customerGate
                          .lastNamePlaceholder
                      }
                      className={inputClass}
                    />
                  </InputField>
                </div>

                {/* PHONE / DATE */}

                <div
                  className="
                    mt-4
                    grid
                    gap-4
                    sm:grid-cols-2
                  "
                >
                  <InputField
                    label={
                      t.customerGate.phone
                    }
                    icon={
                      <Phone size={15} />
                    }
                  >
                    <input
                      required
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={(e) =>
                        handlePhoneChange(
                          e.target.value
                        )
                      }
                      placeholder={
                        t.customerGate
                          .phonePlaceholder
                      }
                      maxLength={10}
                      className={`
                        ${inputClass}
                        ${
                          phone.length >
                            0 &&
                          !phoneIsValid
                            ? "border-red-400/60"
                            : ""
                        }
                      `}
                    />

                    {phone.length >
                      0 &&
                      !phoneIsValid && (
                        <p className="mt-2 text-[11px] text-red-300">
                          {
                            t.customerGate
                              .phoneError
                          }
                        </p>
                      )}

                    {phoneIsValid && (
                      <p
                        className="
                          mt-2
                          flex
                          items-center
                          gap-1
                          text-[11px]
                          font-semibold
                          text-emerald-300
                        "
                      >
                        <Check size={12} />

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
                        size={15}
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
                      onChange={(e) =>
                        setDateOfBirth(
                          e.target.value
                        )
                      }
                      className={
                        inputClass
                      }
                    />
                  </InputField>
                </div>

                {/* LOCATION */}

                <div
                  className="
                    mt-4
                    grid
                    gap-4
                    sm:grid-cols-2
                  "
                >
                  <InputField
                    label={
                      t.customerGate.wilaya
                    }
                    icon={
                      <MapPin size={15} />
                    }
                  >
                    <div className="relative">
                      <select
                        required
                        value={
                          wilayaCode
                        }
                        onChange={(e) =>
                          handleWilayaChange(
                            e.target.value
                          )
                        }
                        className={`
                          ${inputClass}
                          appearance-none
                          pe-11
                        `}
                      >
                        <option value="">
                          {
                            t.customerGate
                              .wilayaPlaceholder
                          }
                        </option>

                        {wilayas.map(
                          (wilaya) => (
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
                      t.customerGate.commune
                    }
                    icon={
                      <MapPin size={15} />
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
                        onChange={(e) =>
                          setCommuneId(
                            e.target.value
                          )
                        }
                        className={`
                          ${inputClass}
                          appearance-none
                          pe-11
                          ${
                            !selectedWilaya
                              ? "cursor-not-allowed opacity-40"
                              : ""
                          }
                        `}
                      >
                        <option value="">
                          {selectedWilaya
                            ? t.customerGate
                                .communePlaceholder
                            : t.customerGate
                                .selectWilayaFirst}
                        </option>

                        {communes.map(
                          (commune) => (
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

              {/* SUMMARY */}

              <div
                className="
                  mt-8
                  border-t
                  border-dashed
                  border-white/10
                  pt-7
                "
              >
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/40">
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
                    <span className="text-white/40">
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

                <div
                  className="
                    mt-5
                    flex
                    items-end
                    justify-between
                  "
                >
                  <span className="text-lg font-black">
                    {t.store.total}
                  </span>

                  <span
                    className="
                      text-3xl
                      font-black
                      text-orange-300
                    "
                  >
                    {formatPrice(total)}
                    {" DA"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              CTA
          ================================================= */}

          <div
            className="
              fixed
              bottom-0
              left-0
              right-0
              z-50
              border-t
              border-white/10
              bg-[#08050d]/90
              px-4
              py-3
              shadow-[0_-20px_50px_rgba(0,0,0,0.4)]
              backdrop-blur-2xl
              sm:static
              sm:mt-5
              sm:border-0
              sm:bg-transparent
              sm:p-0
              sm:shadow-none
              sm:backdrop-blur-none
            "
          >
            <div className="mx-auto max-w-2xl">
              <button
                type="submit"
                disabled={
                  !customerFormValid
                }
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-orange-400
                  via-pink-500
                  to-fuchsia-600
                  px-6
                  py-4
                  text-sm
                  font-black
                  text-white
                  shadow-[0_15px_40px_rgba(217,70,239,0.3)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_20px_50px_rgba(217,70,239,0.4)]
                  disabled:cursor-not-allowed
                  disabled:bg-white/10
                  disabled:bg-none
                  disabled:text-white/30
                  disabled:shadow-none
                "
              >
                <ShoppingBag
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />

                <span>
                  {t.store.orderNow}
                </span>

                <span
                  className="
                    rounded-lg
                    bg-white/15
                    px-2
                    py-1
                    text-xs
                  "
                >
                  {formatPrice(total)}
                  {" DA"}
                </span>
              </button>

              <div
                className="
                  mt-2
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  text-[10px]
                  text-white/30
                  sm:hidden
                "
              >
                <LockKeyhole size={11} />

                <span>
                  {t.store.secureOrder}
                </span>
              </div>
            </div>
          </div>
        </form>

        {/* ===================================================
            EMOTIONAL SPORT SECTION
        =================================================== */}

        <section
          className="
            mx-auto
            mt-24
            max-w-6xl
          "
        >
          <div
            className="
              mb-8
              max-w-xl
            "
          >
            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.25em]
                text-orange-300
              "
            >
              MOVE DIFFERENT
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-black
                tracking-tight
                sm:text-5xl
              "
            >
              Built for movement.
            </h2>

            <p
              className="
                mt-4
                text-sm
                leading-7
                text-white/45
              "
            >
              Run. Train. Move.
              Feel every step with
              confidence.
            </p>
          </div>

          <div
            className="
              grid
              gap-4
              md:grid-cols-3
            "
          >
            <SportVideo
              src={HERO_VIDEO}
              title="RUN"
            />

            <SportVideo
              src={SPORT_VIDEO}
              title="TRAIN"
            />

            <SportVideo
              src={RUNNING_VIDEO}
              title="MOVE"
            />
          </div>
        </section>
      </section>
    </main>
  );
}

/* =========================================================
   SPORT VIDEO
========================================================= */

function SportVideo({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  return (
    <div
      className="
        group
        relative
        aspect-[4/5]
        overflow-hidden
        rounded-[1.75rem]
        border
        border-white/10
        bg-white/[0.04]
      "
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          opacity-75
          transition
          duration-700
          group-hover:scale-105
          group-hover:opacity-90
        "
      >
        <source
          src={src}
          type="video/mp4"
        />
      </video>

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/10
          to-transparent
        "
      />

      <div
        className="
          absolute
          bottom-5
          left-5
          right-5
          flex
          items-end
          justify-between
        "
      >
        <div>
          <p className="text-[9px] font-bold tracking-[0.3em] text-white/50">
            HOKA
          </p>

          <p className="mt-1 text-xl font-black">
            {title}
          </p>
        </div>

        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-white/10
            backdrop-blur-xl
          "
        >
          <Play
            size={13}
            className="ml-0.5 fill-white"
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FEATURE
========================================================= */

function Feature({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-white/10
        bg-white/[0.035]
        px-2
        py-3
        text-[10px]
        font-bold
        text-white/55
      "
    >
      <span className="text-orange-300">
        {icon}
      </span>

      {text}
    </div>
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
  icon: React.ReactNode;
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
      className={`
        flex
        w-full
        items-center
        gap-3
        rounded-2xl
        border
        p-4
        text-start
        transition-all
        duration-200
        ${
          selected
            ? "border-fuchsia-400/50 bg-gradient-to-r from-fuchsia-500/15 to-violet-500/10 shadow-lg shadow-fuchsia-900/10"
            : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
        }
      `}
    >
      {/* RADIO */}

      <div
        className={`
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-full
          border-2
          ${
            selected
              ? "border-fuchsia-400"
              : "border-white/20"
          }
        `}
      >
        {selected && (
          <div
            className="
              h-2.5
              w-2.5
              rounded-full
              bg-gradient-to-r
              from-fuchsia-400
              to-pink-400
            "
          />
        )}
      </div>

      {/* ICON */}

      <div
        className={`
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          ${
            selected
              ? "bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white shadow-lg"
              : "bg-white/10 text-white/45"
          }
        `}
      >
        {icon}
      </div>

      {/* TEXT */}

      <div className="min-w-0 flex-1">
        <p className="font-bold">
          {title}
        </p>

        <p
          className="
            mt-1
            text-xs
            leading-5
            text-white/35
          "
        >
          {description}
        </p>
      </div>

      {/* PRICE */}

      <div className="shrink-0 text-end">
        <p
          className="
            whitespace-nowrap
            text-sm
            font-black
            text-orange-300
          "
        >
          +{formatPrice(price)} DA
        </p>
      </div>
    </button>
  );
}

/* =========================================================
   INPUT
========================================================= */

function InputField({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="
          mb-2
          flex
          items-center
          gap-2
          text-xs
          font-bold
          text-white/70
        "
      >
        <span className="text-fuchsia-300">
          {icon}
        </span>

        <span>
          {label}
        </span>

        <span className="text-orange-300">
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

const inputClass = `
  w-full
  rounded-2xl
  border
  border-white/10
  bg-white/[0.06]
  px-4
  py-3.5
  text-sm
  text-white
  outline-none
  transition-all
  duration-200
  placeholder:text-white/25
  focus:border-fuchsia-400/70
  focus:bg-white/[0.09]
  focus:ring-4
  focus:ring-fuchsia-500/10
`;

const selectArrowClass = `
  pointer-events-none
  absolute
  end-4
  top-1/2
  -translate-y-1/2
  text-white/40
`;