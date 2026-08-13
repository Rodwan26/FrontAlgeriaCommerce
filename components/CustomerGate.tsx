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
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

import locations from "../app/data/algeria-locations.json";

import {
  translations,
  Language,
} from "../app/i18n";

export type CustomerData = {
  first_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;

  wilaya_code: string;
  wilaya_name: string;

  commune_id: string;
  commune_name: string;

  language: Language;
};

type Props = {
  onComplete: (
    customer: CustomerData
  ) => void;
};

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

const wilayas = locations as Wilaya[];

export default function CustomerGate({
  onComplete,
}: Props) {
  const [language, setLanguage] =
    useState<Language>("ar");

  const t = translations[language];

  const isArabic = language === "ar";

  const direction = isArabic
    ? "rtl"
    : "ltr";

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

  const [submitted, setSubmitted] =
    useState(false);

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

  const phoneIsValid =
    /^(05|06|07)\d{8}$/.test(
      phone
    );

  const birthDateIsValid =
    dateOfBirth.length > 0 &&
    dateOfBirth <=
      maxBirthDate;

  function handlePhoneChange(
    value: string
  ) {
    const digits =
      value.replace(/\D/g, "");

    setPhone(
      digits.slice(0, 10)
    );
  }

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

  const formIsValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    phoneIsValid &&
    birthDateIsValid &&
    wilayaCode.length > 0 &&
    communeId.length > 0;

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!formIsValid) {
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

    const customer: CustomerData = {
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
    };

    console.log(
      "CUSTOMER:",
      customer
    );

    setSubmitted(true);

    onComplete(customer);
  }

  if (submitted) {
    return null;
  }

  return (
    <main
      dir={direction}
      className="
        fixed
        inset-0
        z-[100]
        min-h-screen
        overflow-y-auto
        bg-[#160b2d]
        text-white
      "
    >
      {/* BACKGROUND */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div
          className="
            absolute
            -left-32
            -top-32
            h-[420px]
            w-[420px]
            rounded-full
            bg-fuchsia-600/30
            blur-[100px]
          "
        />

        <div
          className="
            absolute
            -right-32
            top-1/3
            h-[420px]
            w-[420px]
            rounded-full
            bg-violet-600/30
            blur-[100px]
          "
        />

        <div
          className="
            absolute
            -bottom-40
            left-1/3
            h-[420px]
            w-[420px]
            rounded-full
            bg-orange-500/20
            blur-[110px]
          "
        />

      </div>

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-2xl
          px-4
          py-5
          sm:px-6
          sm:py-8
        "
      >

        {/* TOP BAR */}

        <div className="mb-7 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-fuchsia-500
                to-violet-600
                text-xs
                font-black
                shadow-lg
                shadow-fuchsia-900/30
              "
            >
              AC
            </div>

            <div className="hidden sm:block">

              <p className="text-sm font-black">
                Algeria Commerce
              </p>

              <p className="text-[10px] font-medium text-white/50">
                SHOPPING EXPERIENCE
              </p>

            </div>

          </div>

          {/* LANGUAGE */}

          <div
            className="
              flex
              rounded-2xl
              border
              border-white/10
              bg-white/10
              p-1
              backdrop-blur-xl
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
                  min-w-[42px]
                  rounded-xl
                  px-2.5
                  py-2
                  text-[11px]
                  font-black
                  transition-all
                  ${
                    language === lang
                      ? "bg-white text-[#27103f] shadow-lg"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
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

        {/* INTRO */}

        <div className="mb-6 text-center">

          <div
            className="
              mx-auto
              mb-5
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-[22px]
              bg-gradient-to-br
              from-orange-400
              to-pink-500
              shadow-xl
              shadow-orange-900/20
            "
          >
            <Sparkles size={25} />
          </div>

          <p
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.25em]
              text-fuchsia-300
            "
          >
            ALGERIA COMMERCE
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
            {t.customerGate.title}
          </h1>

          <p
            className="
              mx-auto
              mt-3
              max-w-md
              text-sm
              leading-7
              text-white/55
            "
          >
            {t.customerGate.description}
          </p>

        </div>

        {/* CARD */}

        <div
          className="
            overflow-hidden
            rounded-[2rem]
            border
            border-white/10
            bg-white/[0.08]
            shadow-[0_30px_100px_rgba(0,0,0,0.35)]
            backdrop-blur-2xl
          "
        >

          {/* CARD HEADER */}

          <div
            className="
              border-b
              border-white/10
              bg-gradient-to-r
              from-fuchsia-500/10
              via-violet-500/10
              to-orange-500/10
              px-5
              py-5
              sm:px-8
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
                  shadow-lg
                "
              >
                <MapPin size={17} />
              </div>

              <div>

                <p className="text-sm font-black">
                  {language === "ar"
                    ? "لنجهز تجربة التسوق"
                    : language === "fr"
                    ? "Préparons votre expérience"
                    : "Let's prepare your experience"}
                </p>

                <p className="mt-1 text-[11px] text-white/45">
                  {language === "ar"
                    ? "معلومات بسيطة فقط"
                    : language === "fr"
                    ? "Quelques informations seulement"
                    : "Just a few details"}
                </p>

              </div>

            </div>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="
              space-y-6
              px-5
              py-6
              sm:px-8
              sm:py-8
            "
          >

            {/* NAME */}

            <div className="grid gap-4 sm:grid-cols-2">

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

            {/* PHONE + DATE */}

            <div className="grid gap-4 sm:grid-cols-2">

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
                      phone.length > 0 &&
                      !phoneIsValid
                        ? "border-red-400/70 focus:border-red-400"
                        : ""
                    }
                  `}
                />

                {phone.length > 0 &&
                  !phoneIsValid && (

                    <p className="mt-2 text-[11px] font-medium text-red-300">
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
                  t.customerGate.dateOfBirth
                }
                icon={
                  <CalendarDays size={15} />
                }
              >

                <input
                  required
                  type="date"
                  value={dateOfBirth}
                  max={maxBirthDate}
                  onChange={(e) =>
                    setDateOfBirth(
                      e.target.value
                    )
                  }
                  className={inputClass}
                />

                {dateOfBirth &&
                  !birthDateIsValid && (

                    <p className="mt-2 text-[11px] text-red-300">
                      {
                        t.customerGate
                          .birthDateError
                      }
                    </p>

                  )}

              </InputField>

            </div>

            {/* LOCATION */}

            <div className="grid gap-4 sm:grid-cols-2">

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
                    value={wilayaCode}
                    onChange={(e) =>
                      handleWilayaChange(
                        e.target.value
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
                    className={selectArrowClass}
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
                    value={communeId}
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
                          ? "cursor-not-allowed opacity-50"
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
                          key={`${wilayaCode}-${commune.id}`}
                          value={commune.id}
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
                    className={selectArrowClass}
                  />

                </div>

              </InputField>

            </div>

            {/* PRIVACY */}

            <div
              className="
                flex
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-white/[0.05]
                p-4
              "
            >

              <ShieldCheck
                size={18}
                className="
                  mt-0.5
                  shrink-0
                  text-fuchsia-300
                "
              />

              <p
                className="
                  text-[11px]
                  leading-6
                  text-white/50
                "
              >
                {t.customerGate.privacy}
              </p>

            </div>

            {/* PROGRESS */}

            <div className="flex items-center gap-3">

              <div
                className="
                  h-1.5
                  flex-1
                  overflow-hidden
                  rounded-full
                  bg-white/10
                "
              >

                <div
                  className={`
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-fuchsia-500
                    via-violet-500
                    to-orange-400
                    transition-all
                    duration-500
                    ${
                      formIsValid
                        ? "w-full"
                        : "w-2/3"
                    }
                  `}
                />

              </div>

              <span className="text-[10px] font-semibold text-white/40">
                {formIsValid
                  ? language === "ar"
                    ? "جاهز"
                    : language === "fr"
                    ? "Prêt"
                    : "Ready"
                  : language === "ar"
                  ? "معلوماتك"
                  : language === "fr"
                  ? "Vos informations"
                  : "Your details"}
              </span>

            </div>

            {/* CTA */}

            <button
              type="submit"
              disabled={!formIsValid}
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
                shadow-[0_15px_40px_rgba(217,70,239,0.25)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_20px_50px_rgba(217,70,239,0.35)]
                disabled:cursor-not-allowed
                disabled:bg-white/10
                disabled:bg-none
                disabled:text-white/30
                disabled:shadow-none
              "
            >

              <span>
                {
                  t.customerGate
                    .continue
                }
              </span>

              <Sparkles
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:rotate-12
                  group-hover:scale-110
                "
              />

            </button>

            {/* NO ACCOUNT */}

            <p
              className="
                text-center
                text-[11px]
                leading-5
                text-white/35
              "
            >
              {
                t.customerGate.noAccount
              }
            </p>

          </form>

        </div>

        {/* FOOTER */}

        <div
          className="
            mt-5
            flex
            items-center
            justify-center
            gap-2
            text-[10px]
            font-medium
            text-white/30
          "
        >

          <ShieldCheck size={12} />

          <span>
            {language === "ar"
              ? "تجربة تسوق بسيطة وآمنة"
              : language === "fr"
              ? "Expérience d'achat simple et sécurisée"
              : "Simple and secure shopping experience"}
          </span>

        </div>

      </div>

    </main>
  );
}

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
          text-white/75
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

const inputClass = `
  w-full
  rounded-2xl
  border
  border-white/10
  bg-white/[0.07]
  px-4
  py-3.5
  text-sm
  text-white
  outline-none
  transition-all
  duration-200
  placeholder:text-white/25
  focus:border-fuchsia-400/70
  focus:bg-white/[0.10]
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