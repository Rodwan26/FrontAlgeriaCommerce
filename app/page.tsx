"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ArrowDown,
  ArrowRight,
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
  Sparkles,
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
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=90",

  description: {
    ar: "حذاء رياضي مريح ومميز، مصمم للحركة والجري والاستعمال اليومي.",
    fr: "Une chaussure sportive confortable et élégante, pensée pour la course, le mouvement et le quotidien.",
    en: "A comfortable and stylish sports shoe designed for running, movement and everyday life.",
  },

  price: 2800,
};

const DELIVERY = {
  home: 500,
  office: 300,
};

/* =========================================================
   VIDEOS
========================================================= */

const HERO_VIDEO = "/videos/hoka-hero.mp4";
const RUNNING_VIDEO = "/videos/hoka-running.mp4";
const TRAINING_VIDEO = "/videos/hoka-training.mp4";

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

  /* =====================================================
     CUSTOMER
  ===================================================== */

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

  /* =====================================================
     ORDER
  ===================================================== */

  const [quantity, setQuantity] =
    useState(1);

  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("home");

  const [orderConfirmed, setOrderConfirmed] =
    useState(false);

  /* =====================================================
     STICKY CTA
  ===================================================== */

  const heroOrderButtonRef =
    useRef<HTMLButtonElement | null>(null);

  const [showStickyCTA, setShowStickyCTA] =
    useState(false);

  useEffect(() => {
    const button =
      heroOrderButtonRef.current;

    if (!button) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          /*
            إذا كان زر Hero ظاهرًا:
            نخفي الزر العائم.

            إذا خرج من الشاشة:
            نظهر الزر العائم.
          */
          setShowStickyCTA(
            !entry.isIntersecting
          );
        },
        {
          threshold: 0.15,
        }
      );

    observer.observe(button);

    return () => {
      observer.disconnect();
    };
  }, []);

  function scrollToOrder() {
    document
      .getElementById("order-section")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  /* =====================================================
     LOCATION
  ===================================================== */

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

  /* =====================================================
     DATE
  ===================================================== */

  const maxBirthDate =
    useMemo(() => {
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

  /* =====================================================
     PHONE
  ===================================================== */

  const phoneIsValid =
    /^(05|06|07)\d{8}$/.test(phone);

  function handlePhoneChange(
    value: string
  ) {
    const digits =
      value.replace(/\D/g, "");

    setPhone(
      digits.slice(0, 10)
    );
  }

  /* =====================================================
     LOCATION HELPERS
  ===================================================== */

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

  /* =====================================================
     QUANTITY
  ===================================================== */

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

  /* =====================================================
     TOTAL
  ===================================================== */

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

  /* =====================================================
     VALIDATION
  ===================================================== */

  const customerFormValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    phoneIsValid &&
    birthDateIsValid &&
    wilayaCode.length > 0 &&
    communeId.length > 0;

  /* =====================================================
     SUBMIT
  ===================================================== */

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!customerFormValid) {
      document
        .getElementById(
          "customer-form"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =====================================================
     SUCCESS
  ===================================================== */

  if (orderConfirmed) {
    return (
      <main
        dir={direction}
        className="
          min-h-screen
          bg-[#090909]
          px-4
          py-10
          text-white
        "
      >
        <div
          className="
            fixed
            inset-0
            pointer-events-none
            overflow-hidden
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-1/4
              h-[500px]
              w-[500px]
              -translate-x-1/2
              rounded-full
              bg-orange-500/10
              blur-[140px]
            "
          />
        </div>

        <div
          className="
            relative
            mx-auto
            flex
            min-h-[85vh]
            max-w-lg
            items-center
            justify-center
          "
        >
          <div
            className="
              w-full
              rounded-[2rem]
              border
              border-white/10
              bg-white/[0.04]
              p-7
              text-center
              shadow-2xl
              backdrop-blur-xl
              sm:p-10
            "
          >
            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-emerald-500
                text-white
                shadow-[0_15px_50px_rgba(16,185,129,0.25)]
              "
            >
              <Check size={36} />
            </div>

            <p
              className="
                mt-8
                text-xs
                font-black
                uppercase
                tracking-[0.3em]
                text-orange-400
              "
            >
              HOKA
            </p>

            <h1
              className="
                mt-3
                text-3xl
                font-black
                tracking-tight
                sm:text-4xl
              "
            >
              {t.order.successTitle}
            </h1>

            <p
              className="
                mx-auto
                mt-4
                max-w-sm
                text-sm
                leading-7
                text-white/50
              "
            >
              {
                t.order
                  .successDescription
              }
            </p>

            <div
              className="
                mt-8
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-5
                text-sm
              "
            >
              <div className="flex justify-between">
                <span className="text-white/40">
                  {t.order.product}
                </span>

                <span className="font-bold">
                  {PRODUCT.name}
                </span>
              </div>

              <div className="mt-4 flex justify-between">
                <span className="text-white/40">
                  {t.order.quantity}
                </span>

                <span className="font-bold">
                  {quantity}
                </span>
              </div>

              <div className="mt-4 flex justify-between">
                <span className="text-white/40">
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
                  mt-5
                  border-t
                  border-white/10
                  pt-5
                "
              >
                <div className="flex justify-between">
                  <span className="font-black">
                    {t.order.total}
                  </span>

                  <span
                    className="
                      text-xl
                      font-black
                      text-orange-400
                    "
                  >
                    {formatPrice(total)} DA
                  </span>
                </div>
              </div>
            </div>

            <p
              className="
                mt-7
                text-xs
                leading-6
                text-white/30
              "
            >
              {t.order.contactMessage}
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* =====================================================
     MAIN
  ===================================================== */

  return (
    <main
      dir={direction}
      className="
        min-h-screen
        overflow-x-hidden
        bg-[#090909]
        text-white
      "
    >

      {/* ===================================================
          HEADER
      =================================================== */}

      <header
        className="
          fixed
          inset-x-0
          top-0
          z-50
          border-b
          border-white/10
          bg-black/55
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto
            flex
            h-[68px]
            max-w-7xl
            items-center
            justify-between
            px-4
            sm:px-6
            lg:px-8
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
                rounded-full
                bg-white
                text-xs
                font-black
                text-black
              "
            >
              H
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-black tracking-tight">
                HOKA
              </p>

              <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                Move freely
              </p>
            </div>
          </div>

          <div
            className="
              flex
              items-center
              rounded-full
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
                  rounded-full
                  px-3
                  py-1.5
                  text-[9px]
                  font-black
                  transition-all
                  ${
                    language === lang
                      ? "bg-white text-black"
                      : "text-white/40 hover:text-white"
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

      {/* ===================================================
          HERO
      =================================================== */}

      <section
        className="
          relative
          min-h-[760px]
          overflow-hidden
          sm:min-h-[850px]
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
          "
        >
          <source
            src={HERO_VIDEO}
            type="video/mp4"
          />
        </video>

        <div
          className="
            absolute
            inset-0
            bg-black/45
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#090909]
            via-black/20
            to-black/45
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black/65
            via-transparent
            to-black/20
          "
        />

        <div
          className="
            absolute
            bottom-[-150px]
            left-1/2
            h-[400px]
            w-[600px]
            -translate-x-1/2
            rounded-full
            bg-orange-500/20
            blur-[130px]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[760px]
            max-w-7xl
            items-end
            px-4
            pb-24
            pt-32
            sm:min-h-[850px]
            sm:px-6
            sm:pb-28
            lg:px-8
          "
        >
          <div className="max-w-3xl">

            <div
              className="
                mb-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/15
                bg-black/30
                px-4
                py-2
                text-[10px]
                font-black
                uppercase
                tracking-[0.25em]
                backdrop-blur-md
              "
            >
              <Sparkles
                size={13}
                className="text-orange-400"
              />

              HOKA PERFORMANCE
            </div>

            <h1
              className="
                text-6xl
                font-black
                leading-[0.88]
                tracking-[-0.06em]
                sm:text-8xl
                lg:text-[9rem]
              "
            >
              RUN
              <br />

              <span className="text-orange-400">
                YOUR WAY.
              </span>
            </h1>

            <p
              className="
                mt-7
                max-w-xl
                text-sm
                leading-7
                text-white/65
                sm:text-base
              "
            >
              {PRODUCT.description[language]}
            </p>

            <div
              className="
                mt-8
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >
              {/* ==========================================
                  HERO ORDER BUTTON
                  هذا هو الزر الذي نراقبه
              ========================================== */}

              <button
                ref={heroOrderButtonRef}
                type="button"
                onClick={scrollToOrder}
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-white
                  px-7
                  py-4
                  text-sm
                  font-black
                  text-black
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-orange-400
                "
              >
                {t.store.orderNow}

                <ArrowRight
                  size={17}
                  className={
                    isArabic
                      ? "rotate-180"
                      : ""
                  }
                />
              </button>

              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-white/15
                  bg-black/20
                  px-7
                  py-4
                  backdrop-blur-md
                "
              >
                <span className="text-xs text-white/45">
                  {t.store.price}
                </span>

                <span className="font-black text-orange-400">
                  {formatPrice(
                    PRODUCT.price
                  )}{" "}
                  DA
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            absolute
            bottom-7
            left-1/2
            z-10
            flex
            -translate-x-1/2
            flex-col
            items-center
            gap-2
            text-white/30
          "
        >
          <span className="text-[8px] uppercase tracking-[0.35em]">
            Scroll
          </span>

          <ArrowDown
            size={15}
            className="animate-bounce"
          />
        </div>
      </section>

      {/* ===================================================
          STICKY MOBILE / DESKTOP CTA
      =================================================== */}

      <div
        className={`
          fixed
          bottom-5
          left-1/2
          z-[100]
          w-[calc(100%-24px)]
          max-w-md
          -translate-x-1/2
          transition-all
          duration-500
          ${
            showStickyCTA
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-8 opacity-0"
          }
        `}
      >
        <button
          type="button"
          onClick={scrollToOrder}
          className="
            sticky-order-button
            relative
            flex
            w-full
            items-center
            justify-center
            gap-3
            overflow-hidden
            rounded-2xl
            border
            border-red-400/30
            bg-[#8f1111]
            px-6
            py-4
            text-sm
            font-black
            text-white
            shadow-[0_15px_50px_rgba(127,29,29,0.55)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-[#a51414]
            active:scale-[0.98]
          "
        >
          {/* shine */}

          <span
            className="
              pointer-events-none
              absolute
              inset-y-0
              -left-1/2
              w-1/3
              rotate-12
              bg-gradient-to-r
              from-transparent
              via-white/30
              to-transparent
              blur-sm
              sticky-shine
            "
          />

          <ShoppingBag
            size={19}
            className="relative z-10"
          />

          <span className="relative z-10">
            {t.store.orderNow}
          </span>

          <span
            className="
              relative
              z-10
              rounded-lg
              bg-black/20
              px-2.5
              py-1
              text-xs
            "
          >
            {formatPrice(total)} DA
          </span>
        </button>
      </div>

      {/* ===================================================
          MARQUEE
      =================================================== */}

      <section
        className="
          overflow-hidden
          border-y
          border-white/10
          bg-[#0d0d0d]
          py-5
        "
      >
        <div
          className="
            flex
            min-w-max
            items-center
            gap-10
            text-xs
            font-black
            uppercase
            tracking-[0.3em]
            text-white/35
          "
        >
          <span>RUN</span>
          <span className="text-orange-400">
            ●
          </span>
          <span>MOVE</span>
          <span>●</span>
          <span>PERFORM</span>
          <span className="text-orange-400">
            ●
          </span>
          <span>COMFORT</span>
          <span>●</span>
          <span>RUN</span>
          <span className="text-orange-400">
            ●
          </span>
          <span>MOVE</span>
          <span>●</span>
          <span>PERFORM</span>
        </div>
      </section>

      {/* ===================================================
          PRODUCT SHOWCASE
      =================================================== */}

      <section
        className="
          relative
          mx-auto
          max-w-7xl
          px-4
          py-24
          sm:px-6
          sm:py-32
          lg:px-8
        "
      >
        <div
          className="
            grid
            gap-10
            lg:grid-cols-[1.15fr_0.85fr]
            lg:items-center
          "
        >
          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[2rem]
              bg-[#151515]
            "
          >
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-orange-500/10
                via-transparent
                to-white/5
              "
            />

            <img
              src={PRODUCT.image}
              alt={PRODUCT.name}
              className="
                relative
                z-10
                aspect-square
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-[1.04]
              "
            />

            <div
              className="
                absolute
                bottom-5
                left-5
                z-20
                rounded-full
                border
                border-white/10
                bg-black/60
                px-4
                py-2
                text-[9px]
                font-black
                uppercase
                tracking-[0.2em]
                backdrop-blur-xl
              "
            >
              HOKA
            </div>
          </div>

          <div>
            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.3em]
                text-orange-400
              "
            >
              THE SHOE
            </p>

            <h2
              className="
                mt-4
                text-5xl
                font-black
                tracking-[-0.05em]
                sm:text-7xl
              "
            >
              HOKA
            </h2>

            <p
              className="
                mt-6
                text-sm
                leading-8
                text-white/50
              "
            >
              {PRODUCT.description[language]}
            </p>

            <div
              className="
                mt-9
                grid
                grid-cols-2
                gap-px
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/10
              "
            >
              <Feature
                icon={<Zap size={18} />}
                title="LIGHT"
                description="Lightweight movement"
              />

              <Feature
                icon={<Sparkles size={18} />}
                title="COMFORT"
                description="Soft everyday feel"
              />

              <Feature
                icon={<ArrowRight size={18} />}
                title="RUN"
                description="Built for motion"
              />

              <Feature
                icon={<Check size={18} />}
                title="STYLE"
                description="Modern silhouette"
              />
            </div>

            <div
              className="
                mt-8
                flex
                items-end
                justify-between
                border-t
                border-white/10
                pt-7
              "
            >
              <div>
                <p className="text-[10px] text-white/35">
                  {t.store.price}
                </p>

                <p
                  className="
                    mt-1
                    text-3xl
                    font-black
                    text-orange-400
                  "
                >
                  {formatPrice(
                    PRODUCT.price
                  )}{" "}
                  DA
                </p>
              </div>

              <button
                type="button"
                onClick={scrollToOrder}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white
                  px-5
                  py-3
                  text-xs
                  font-black
                  text-black
                  transition
                  hover:bg-orange-400
                "
              >
                {t.store.orderNow}

                <ArrowRight
                  size={15}
                  className={
                    isArabic
                      ? "rotate-180"
                      : ""
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          EMOTION
      =================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-white
          px-4
          py-24
          text-black
          sm:py-32
        "
      >
        <div className="mx-auto max-w-7xl">
          <div
            className="
              grid
              gap-10
              lg:grid-cols-[0.7fr_1.3fr]
              lg:items-end
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.3em]
                  text-orange-600
                "
              >
                MORE THAN A SHOE
              </p>

              <h2
                className="
                  mt-5
                  text-5xl
                  font-black
                  leading-[0.9]
                  tracking-[-0.06em]
                  sm:text-7xl
                "
              >
                EVERY
                <br />
                STEP
                <br />
                MATTERS.
              </h2>
            </div>

            <p
              className="
                max-w-xl
                text-sm
                leading-8
                text-black/50
              "
            >
              {language === "ar"
                ? "الحركة ليست مجرد تمرين. إنها إحساس، طاقة، وثقة في كل خطوة."
                : language === "fr"
                ? "Le mouvement est plus qu'un entraînement. C'est une sensation, une énergie et une confiance à chaque pas."
                : "Movement is more than training. It is a feeling, energy and confidence in every step."}
            </p>
          </div>

          <div
            className="
              mt-14
              grid
              gap-4
              sm:grid-cols-2
            "
          >
            <div
              className="
                relative
                overflow-hidden
                rounded-[2rem]
              "
            >
              <img
                src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=85"
                alt="Runner"
                className="
                  aspect-[4/5]
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/60
                  via-transparent
                  to-transparent
                "
              />

              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  text-white
                "
              >
                <p className="text-2xl font-black">
                  MOVE.
                </p>
              </div>
            </div>

            <div
              className="
                relative
                overflow-hidden
                rounded-[2rem]
              "
            >
              <img
                src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1200&q=85"
                alt="Training"
                className="
                  aspect-[4/5]
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/60
                  via-transparent
                  to-transparent
                "
              />

              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  text-white
                "
              >
                <p className="text-2xl font-black">
                  FEEL.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          RUNNING VIDEO
      =================================================== */}

      <section
        className="
          relative
          min-h-[600px]
          overflow-hidden
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
          "
        >
          <source
            src={RUNNING_VIDEO}
            type="video/mp4"
          />
        </video>

        <div
          className="
            absolute
            inset-0
            bg-black/45
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-transparent
            to-black/20
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[600px]
            max-w-7xl
            items-end
            px-4
            pb-16
            sm:px-6
            lg:px-8
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.3em]
                text-orange-400
              "
            >
              MADE TO MOVE
            </p>

            <h2
              className="
                mt-4
                max-w-2xl
                text-5xl
                font-black
                leading-[0.9]
                tracking-[-0.05em]
                sm:text-7xl
              "
            >
              FEEL THE
              <br />

              <span className="text-orange-400">
                DIFFERENCE.
              </span>
            </h2>
          </div>
        </div>
      </section>

      {/* ===================================================
          PERFORMANCE
      =================================================== */}

      <section
        className="
          bg-[#090909]
          px-4
          py-24
          sm:py-32
        "
      >
        <div className="mx-auto max-w-7xl">
          <div
            className="
              grid
              gap-12
              lg:grid-cols-[0.8fr_1.2fr]
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.3em]
                  text-orange-400
                "
              >
                PERFORMANCE
              </p>

              <h2
                className="
                  mt-5
                  text-5xl
                  font-black
                  leading-[0.9]
                  tracking-[-0.06em]
                  sm:text-7xl
                "
              >
                BUILT
                <br />
                FOR
                <br />

                <span className="text-orange-400">
                  MOVEMENT.
                </span>
              </h2>
            </div>

            <div
              className="
                grid
                gap-px
                overflow-hidden
                rounded-[2rem]
                border
                border-white/10
                bg-white/10
                sm:grid-cols-2
              "
            >
              <PerformanceCard
                number="01"
                title="COMFORT"
                text={
                  language === "ar"
                    ? "إحساس مريح يساعدك على الحركة طوال اليوم."
                    : language === "fr"
                    ? "Un confort pensé pour accompagner chaque mouvement."
                    : "Comfort designed to support every movement."
                }
              />

              <PerformanceCard
                number="02"
                title="CUSHION"
                text={
                  language === "ar"
                    ? "وسادة مريحة لكل خطوة."
                    : language === "fr"
                    ? "Un amorti confortable à chaque pas."
                    : "Comfortable cushioning with every step."
                }
              />

              <PerformanceCard
                number="03"
                title="LIGHT"
                text={
                  language === "ar"
                    ? "تصميم خفيف للحركة بسهولة."
                    : language === "fr"
                    ? "Une silhouette légère pour bouger librement."
                    : "A lightweight silhouette made to move freely."
                }
              />

              <PerformanceCard
                number="04"
                title="STYLE"
                text={
                  language === "ar"
                    ? "تصميم رياضي عصري مناسب للجري واليوميات."
                    : language === "fr"
                    ? "Un design sportif moderne pour la course et le quotidien."
                    : "A modern athletic design for running and everyday life."
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          TRAINING VIDEO
      =================================================== */}

      <section
        className="
          relative
          mx-auto
          max-w-7xl
          px-4
          py-10
          sm:px-6
          sm:py-16
          lg:px-8
        "
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
          "
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="
              aspect-[16/9]
              h-full
              w-full
              object-cover
            "
          >
            <source
              src={TRAINING_VIDEO}
              type="video/mp4"
            />
          </video>

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-black/70
              via-black/20
              to-transparent
            "
          />

          <div
            className="
              absolute
              inset-y-0
              left-0
              flex
              max-w-xl
              items-center
              p-7
              sm:p-12
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.3em]
                  text-orange-400
                "
              >
                KEEP MOVING
              </p>

              <h2
                className="
                  mt-4
                  text-4xl
                  font-black
                  leading-none
                  sm:text-6xl
                "
              >
                NO EXCUSES.
              </h2>

              <p
                className="
                  mt-4
                  text-sm
                  leading-7
                  text-white/60
                "
              >
                {language === "ar"
                  ? "ارتدِ حذاءك. تحرك. ابدأ."
                  : language === "fr"
                  ? "Enfilez vos chaussures. Bougez. Commencez."
                  : "Lace up. Move. Start."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          ORDER SECTION
      =================================================== */}

      <section
        id="order-section"
        className="
          bg-[#f4f4f0]
          px-4
          py-20
          text-black
          sm:py-28
        "
      >
        <div className="mx-auto max-w-3xl">

          <div className="text-center">
            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.3em]
                text-orange-600
              "
            >
              GET YOURS
            </p>

            <h2
              className="
                mt-4
                text-4xl
                font-black
                tracking-[-0.05em]
                sm:text-6xl
              "
            >
              {language === "ar"
                ? "جاهز للحركة؟"
                : language === "fr"
                ? "Prêt à bouger ?"
                : "Ready to move?"}
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-12"
          >
            <div
              className="
                overflow-hidden
                rounded-[2rem]
                border
                border-black/10
                bg-white
                shadow-[0_30px_100px_rgba(0,0,0,0.08)]
              "
            >

              {/* PRODUCT MINI */}

              <div
                className="
                  flex
                  gap-4
                  border-b
                  border-black/10
                  p-5
                  sm:p-7
                "
              >
                <img
                  src={PRODUCT.image}
                  alt={PRODUCT.name}
                  className="
                    h-24
                    w-24
                    rounded-2xl
                    object-cover
                    sm:h-28
                    sm:w-28
                  "
                />

                <div className="flex flex-1 flex-col justify-center">
                  <p
                    className="
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.2em]
                      text-orange-600
                    "
                  >
                    HOKA
                  </p>

                  <h3 className="mt-1 text-2xl font-black">
                    HOKA
                  </h3>

                  <p className="mt-1 text-sm font-bold text-black/45">
                    {formatPrice(
                      PRODUCT.price
                    )}{" "}
                    DA
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-8">

                {/* QUANTITY */}

                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black">
                        {t.store.quantity}
                      </h3>

                      <p className="mt-1 text-xs text-black/40">
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
                        border-black/10
                        bg-black/[0.03]
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
                          text-black/50
                          transition
                          hover:bg-black/5
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
                          text-black/50
                          transition
                          hover:bg-black/5
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
                    border-black/10
                    pt-8
                  "
                >
                  <h3 className="font-black">
                    {t.store.delivery}
                  </h3>

                  <div className="mt-4 space-y-3">
                    <LightDeliveryOption
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
                        <Home size={18} />
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

                    <LightDeliveryOption
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
                        <Package size={18} />
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
                  id="customer-form"
                  className="
                    mt-8
                    border-t
                    border-black/10
                    pt-8
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
                        bg-black
                        text-white
                      "
                    >
                      <User size={17} />
                    </div>

                    <div>
                      <h3 className="font-black">
                        {t.store.customerInfo}
                      </h3>

                      <p className="mt-1 text-xs text-black/35">
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
                      mt-6
                      grid
                      gap-4
                      sm:grid-cols-2
                    "
                  >
                    <LightInputField
                      label={
                        t.customerGate
                          .firstName
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
                        className={
                          lightInputClass
                        }
                      />
                    </LightInputField>

                    <LightInputField
                      label={
                        t.customerGate
                          .lastName
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
                        className={
                          lightInputClass
                        }
                      />
                    </LightInputField>
                  </div>

                  {/* PHONE / DOB */}

                  <div
                    className="
                      mt-4
                      grid
                      gap-4
                      sm:grid-cols-2
                    "
                  >
                    <LightInputField
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
                          ${lightInputClass}
                          ${
                            phone.length > 0 &&
                            !phoneIsValid
                              ? "border-red-400"
                              : ""
                          }
                        `}
                      />

                      {phone.length > 0 &&
                        !phoneIsValid && (
                          <p className="mt-2 text-[11px] text-red-500">
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
                            text-emerald-600
                          "
                        >
                          <Check size={12} />

                          {
                            t.customerGate
                              .phoneValid
                          }
                        </p>
                      )}
                    </LightInputField>

                    <LightInputField
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
                          lightInputClass
                        }
                      />
                    </LightInputField>
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
                    <LightInputField
                      label={
                        t.customerGate
                          .wilaya
                      }
                      icon={
                        <MapPin
                          size={15}
                        />
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
                            ${lightInputClass}
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
                          className="
                            pointer-events-none
                            absolute
                            end-4
                            top-1/2
                            -translate-y-1/2
                            text-black/30
                          "
                        />
                      </div>
                    </LightInputField>

                    <LightInputField
                      label={
                        t.customerGate
                          .commune
                      }
                      icon={
                        <MapPin
                          size={15}
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
                          onChange={(e) =>
                            setCommuneId(
                              e.target.value
                            )
                          }
                          className={`
                            ${lightInputClass}
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
                          className="
                            pointer-events-none
                            absolute
                            end-4
                            top-1/2
                            -translate-y-1/2
                            text-black/30
                          "
                        />
                      </div>
                    </LightInputField>
                  </div>
                </div>

                {/* SUMMARY */}

                <div
                  className="
                    mt-8
                    border-t
                    border-dashed
                    border-black/10
                    pt-7
                  "
                >
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-black/40">
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
                      <span className="text-black/40">
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
                      mt-6
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
                        text-orange-600
                      "
                    >
                      {formatPrice(total)}{" "}
                      DA
                    </span>
                  </div>
                </div>

                {/* REAL ORDER BUTTON */}

                <button
                  type="submit"
                  disabled={
                    !customerFormValid
                  }
                  className="
                    mt-8
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-2xl
                    bg-black
                    px-6
                    py-5
                    text-sm
                    font-black
                    text-white
                    shadow-xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-orange-500
                    disabled:cursor-not-allowed
                    disabled:bg-black/10
                    disabled:text-black/30
                    disabled:shadow-none
                  "
                >
                  <ShoppingBag size={19} />

                  <span>
                    {t.store.orderNow}
                  </span>

                  <span
                    className="
                      rounded-lg
                      bg-white/10
                      px-2
                      py-1
                      text-xs
                    "
                  >
                    {formatPrice(total)}{" "}
                    DA
                  </span>
                </button>

                <div
                  className="
                    mt-4
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-[10px]
                    text-black/30
                  "
                >
                  <LockKeyhole size={12} />

                  {t.store.secureOrder}
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer
        className="
          border-t
          border-white/10
          bg-[#090909]
          px-4
          py-10
          text-white
          sm:px-6
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            justify-between
            gap-5
            sm:flex-row
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-white
                text-xs
                font-black
                text-black
              "
            >
              H
            </div>

            <div>
              <p className="text-sm font-black">
                HOKA
              </p>

              <p className="text-[9px] text-white/30">
                Move freely.
              </p>
            </div>
          </div>

          <p className="text-[10px] text-white/25">
            © {new Date().getFullYear()} Algeria Commerce
          </p>
        </div>
      </footer>

      {/* ===================================================
          STICKY CTA ANIMATION
      =================================================== */}

      <style jsx global>{`
        @keyframes stickyShine {
          0% {
            transform: translateX(-180%) rotate(12deg);
          }

          45% {
            transform: translateX(420%) rotate(12deg);
          }

          100% {
            transform: translateX(420%) rotate(12deg);
          }
        }

        .sticky-shine {
          animation: stickyShine 3.2s ease-in-out infinite;
        }

        @keyframes stickyPulse {
          0%,
          100% {
            box-shadow:
              0 15px 50px rgba(127, 29, 29, 0.45),
              0 0 0 0 rgba(153, 27, 27, 0.15);
          }

          50% {
            box-shadow:
              0 18px 55px rgba(127, 29, 29, 0.6),
              0 0 0 7px rgba(153, 27, 27, 0.05);
          }
        }

        .sticky-order-button {
          animation: stickyPulse 2.8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .sticky-shine,
          .sticky-order-button {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}

/* =========================================================
   FEATURE
========================================================= */

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        bg-[#151515]
        p-5
        sm:p-6
      "
    >
      <div
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          bg-orange-500/10
          text-orange-400
        "
      >
        {icon}
      </div>

      <p
        className="
          mt-5
          text-[10px]
          font-black
          tracking-[0.15em]
        "
      >
        {title}
      </p>

      <p
        className="
          mt-2
          text-xs
          leading-5
          text-white/35
        "
      >
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   PERFORMANCE CARD
========================================================= */

function PerformanceCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        bg-[#111111]
        p-7
        sm:p-9
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <span
          className="
            text-xs
            font-black
            text-orange-400
          "
        >
          {number}
        </span>

        <ArrowRight
          size={16}
          className="text-white/20"
        />
      </div>

      <h3
        className="
          mt-12
          text-2xl
          font-black
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-3
          text-xs
          leading-6
          text-white/35
        "
      >
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   DELIVERY OPTION
========================================================= */

function LightDeliveryOption({
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
        ${
          selected
            ? "border-black bg-black text-white shadow-lg"
            : "border-black/10 bg-black/[0.02] hover:border-black/20"
        }
      `}
    >
      <div
        className={`
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          ${
            selected
              ? "bg-orange-500 text-white"
              : "bg-black/5 text-black/40"
          }
        `}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-bold">
          {title}
        </p>

        <p
          className={`
            mt-1
            text-xs
            leading-5
            ${
              selected
                ? "text-white/45"
                : "text-black/35"
            }
          `}
        >
          {description}
        </p>
      </div>

      <p
        className={`
          shrink-0
          whitespace-nowrap
          text-xs
          font-black
          ${
            selected
              ? "text-orange-400"
              : "text-orange-600"
          }
        `}
      >
        +{formatPrice(price)} DA
      </p>
    </button>
  );
}

/* =========================================================
   INPUT
========================================================= */

function LightInputField({
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
          text-black/60
        "
      >
        <span className="text-orange-600">
          {icon}
        </span>

        <span>
          {label}
        </span>

        <span className="text-orange-500">
          *
        </span>
      </label>

      {children}
    </div>
  );
}

/* =========================================================
   INPUT STYLE
========================================================= */

const lightInputClass = `
  w-full
  rounded-2xl
  border
  border-black/10
  bg-[#fafafa]
  px-4
  py-3.5
  text-sm
  text-black
  outline-none
  transition-all
  duration-200
  placeholder:text-black/25
  focus:border-orange-500
  focus:bg-white
  focus:ring-4
  focus:ring-orange-500/10
`;