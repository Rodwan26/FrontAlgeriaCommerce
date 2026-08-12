"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronDown,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

import locations from "../app/data/algeria-locations.json";

import {
  translations,
  Language,
} from "../app/i18n";

/* =========================================================
   TYPES
========================================================= */

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
  onComplete: (customer: CustomerData) => void;
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

/* =========================================================
   DATA
========================================================= */

const wilayas = locations as Wilaya[];

/* =========================================================
   COMPONENT
========================================================= */

export default function CustomerGate({
  onComplete,
}: Props) {
  /* -------------------------------------------------------
     LANGUAGE
  ------------------------------------------------------- */

  const [language, setLanguage] =
    useState<Language>("ar");

  const t = translations[language];

  const isArabic = language === "ar";

  const direction = isArabic ? "rtl" : "ltr";

  /* -------------------------------------------------------
     FORM STATE
  ------------------------------------------------------- */

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

  /* -------------------------------------------------------
     SELECTED WILAYA
  ------------------------------------------------------- */

  const selectedWilaya = useMemo(() => {
    return wilayas.find(
      (wilaya) =>
        String(wilaya.wilayaCode) === wilayaCode
    );
  }, [wilayaCode]);

  const communes =
    selectedWilaya?.communes ?? [];

  /* -------------------------------------------------------
     PHONE VALIDATION
  ------------------------------------------------------- */

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

  /* -------------------------------------------------------
     WILAYA
  ------------------------------------------------------- */

  function handleWilayaChange(
    value: string
  ) {
    setWilayaCode(value);

    // Reset commune when wilaya changes
    setCommuneId("");
  }

  /* -------------------------------------------------------
     DATE / AGE
     
     Minimum age = 5 years
  ------------------------------------------------------- */

  function getMaxBirthDate() {
    const today = new Date();

    const maxDate = new Date(
      today.getFullYear() - 5,
      today.getMonth(),
      today.getDate()
    );

    const year =
      maxDate.getFullYear();

    const month = String(
      maxDate.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      maxDate.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const maxBirthDate =
    getMaxBirthDate();

  /* -------------------------------------------------------
     BIRTH DATE VALIDATION
  ------------------------------------------------------- */

  const birthDateIsValid =
    dateOfBirth.length > 0 &&
    dateOfBirth <= maxBirthDate;

  /* -------------------------------------------------------
     FORM VALIDATION
  ------------------------------------------------------- */

  const formIsValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    phoneIsValid &&
    birthDateIsValid &&
    wilayaCode.length > 0 &&
    communeId.length > 0;

  /* -------------------------------------------------------
     GET WILAYA NAME
  ------------------------------------------------------- */

  function getWilayaName(
    wilaya: Wilaya
  ) {
    if (language === "ar") {
      return wilaya.nameAr;
    }

    return wilaya.nameFr;
  }

  /* -------------------------------------------------------
     GET COMMUNE NAME
  ------------------------------------------------------- */

  function getCommuneName(
    commune: {
      id: number;
      nameFr: string;
      nameAr: string;
    }
  ) {
    if (language === "ar") {
      return commune.nameAr;
    }

    return commune.nameFr;
  }

  /* -------------------------------------------------------
     SUBMIT
  ------------------------------------------------------- */

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    /* -----------------------------------------------
       Extra age protection
    ----------------------------------------------- */

    if (
      !dateOfBirth ||
      dateOfBirth > maxBirthDate
    ) {
      return;
    }

    /* -----------------------------------------------
       Find selected commune
    ----------------------------------------------- */

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

    /* -----------------------------------------------
       Submit
    ----------------------------------------------- */

    setSubmitted(true);

    onComplete({
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
    });
  }

  /* -------------------------------------------------------
     HIDE AFTER SUBMIT
  ------------------------------------------------------- */

  if (submitted) {
    return null;
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main
      dir={direction}
      className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-y-auto bg-[#f5f5f3] px-4 py-6 sm:px-6"
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-40 h-96 w-96 rounded-full bg-black/[0.035] blur-3xl ${
            isArabic
              ? "-right-40"
              : "-left-40"
          }`}
        />

        <div
          className={`absolute -bottom-40 h-96 w-96 rounded-full bg-black/[0.035] blur-3xl ${
            isArabic
              ? "-left-40"
              : "-right-40"
          }`}
        />
      </div>

      {/* ===================================================
          CONTAINER
      =================================================== */}

      <div className="relative w-full max-w-2xl">

        {/* =================================================
            LANGUAGE SWITCHER
        ================================================= */}

        <div
          className={`mb-5 flex ${
            isArabic
              ? "justify-end"
              : "justify-end"
          }`}
        >
          <div className="flex rounded-xl border border-black/10 bg-white p-1 shadow-sm">

            {(
              ["ar", "fr", "en"] as Language[]
            ).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() =>
                  setLanguage(lang)
                }
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  language === lang
                    ? "bg-black text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {lang === "ar"
                  ? "العربية"
                  : lang === "fr"
                  ? "FR"
                  : "EN"}
              </button>
            ))}

          </div>
        </div>

        {/* =================================================
            BRAND
        ================================================= */}

        <div className="mb-6 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-sm font-bold text-white shadow-lg">
            AC
          </div>

          <p className="mt-3 text-xs font-semibold tracking-[0.18em] text-gray-400">
            ALGERIA COMMERCE
          </p>

        </div>

        {/* =================================================
            CARD
        ================================================= */}

        <div className="overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white shadow-[0_25px_80px_rgba(0,0,0,0.10)]">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="border-b border-black/[0.06] px-6 py-7 sm:px-9">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                <User size={19} />
              </div>

              <div>

                <h1 className="text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
                  {t.customerGate.title}
                </h1>

                <p className="mt-1.5 text-sm leading-6 text-gray-500">
                  {t.customerGate.description}
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5 px-6 py-7 sm:px-9 sm:py-8"
          >

            {/* =================================================
                NAME
            ================================================= */}

            <div className="grid gap-5 sm:grid-cols-2">

              {/* First name */}

              <Field
                label={t.customerGate.firstName}
                icon={<User size={17} />}
                required
              >
                <div className="relative">

                  <input
                    required
                    type="text"
                    value={firstName}
                    onChange={(event) =>
                      setFirstName(
                        event.target.value
                      )
                    }
                    placeholder={
                      t.customerGate
                        .firstNamePlaceholder
                    }
                    className={inputClass}
                  />

                  <User
                    size={17}
                    className={iconClass}
                  />

                </div>
              </Field>

              {/* Last name */}

              <Field
                label={t.customerGate.lastName}
                icon={<User size={17} />}
                required
              >
                <div className="relative">

                  <input
                    required
                    type="text"
                    value={lastName}
                    onChange={(event) =>
                      setLastName(
                        event.target.value
                      )
                    }
                    placeholder={
                      t.customerGate
                        .lastNamePlaceholder
                    }
                    className={inputClass}
                  />

                  <User
                    size={17}
                    className={iconClass}
                  />

                </div>
              </Field>

            </div>

            {/* =================================================
                PHONE + BIRTH DATE
            ================================================= */}

            <div className="grid gap-5 sm:grid-cols-2">

              {/* Phone */}

              <Field
                label={t.customerGate.phone}
                icon={<Phone size={17} />}
                required
              >
                <div className="relative">

                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(event) =>
                      handlePhoneChange(
                        event.target.value
                      )
                    }
                    placeholder={
                      t.customerGate
                        .phonePlaceholder
                    }
                    maxLength={10}
                    className={`${inputClass} ${
                      phone.length > 0 &&
                      !phoneIsValid
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/5"
                        : ""
                    }`}
                  />

                  <Phone
                    size={17}
                    className={iconClass}
                  />

                </div>

                {/* Invalid phone */}

                {phone.length > 0 &&
                  !phoneIsValid && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {
                        t.customerGate
                          .phoneError
                      }
                    </p>
                  )}

                {/* Valid phone */}

                {phoneIsValid && (
                  <p
                    className={`mt-2 flex items-center gap-1 text-xs font-medium text-green-600 ${
                      isArabic
                        ? "justify-start"
                        : "justify-start"
                    }`}
                  >
                    <Check size={13} />

                    {
                      t.customerGate
                        .phoneValid
                    }
                  </p>
                )}

              </Field>

              {/* Birth date */}

              <Field
                label={
                  t.customerGate.dateOfBirth
                }
                icon={
                  <CalendarDays size={17} />
                }
                required
              >
                <div className="relative">

                  <input
                    required
                    type="date"
                    value={dateOfBirth}
                    max={maxBirthDate}
                    onChange={(event) =>
                      setDateOfBirth(
                        event.target.value
                      )
                    }
                    className={inputClass}
                  />

                  <CalendarDays
                    size={17}
                    className={iconClass}
                  />

                </div>

                {/* Age error */}

                {dateOfBirth.length > 0 &&
                  !birthDateIsValid && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {
                        t.customerGate
                          .birthDateError
                      }
                    </p>
                  )}

              </Field>

            </div>

            {/* =================================================
                LOCATION
            ================================================= */}

            <div className="grid gap-5 sm:grid-cols-2">

              {/* Wilaya */}

              <Field
                label={
                  t.customerGate.wilaya
                }
                icon={<MapPin size={17} />}
                required
              >
                <div className="relative">

                  <select
                    required
                    value={wilayaCode}
                    onChange={(event) =>
                      handleWilayaChange(
                        event.target.value
                      )
                    }
                    className={`${inputClass} appearance-none`}
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

                  <MapPin
                    size={17}
                    className={iconClass}
                  />

                  <ChevronDown
                    size={17}
                    className={selectArrowClass}
                  />

                </div>
              </Field>

              {/* Commune */}

              <Field
                label={
                  t.customerGate.commune
                }
                icon={<MapPin size={17} />}
                required
              >
                <div className="relative">

                  <select
                    required
                    value={communeId}
                    disabled={
                      !selectedWilaya
                    }
                    onChange={(event) =>
                      setCommuneId(
                        event.target.value
                      )
                    }
                    className={`${inputClass} appearance-none ${
                      !selectedWilaya
                        ? "cursor-not-allowed bg-gray-100 text-gray-400"
                        : ""
                    }`}
                  >

                    <option value="">
                      {selectedWilaya
                        ? t.customerGate
                            .communePlaceholder
                        : t.customerGate
                            .selectWilayaFirst}
                    </option>

                    {communes.map(
                      (commune, index) => (
                        <option
                          key={`${commune.id}-${index}`}
                          value={commune.id}
                        >
                          {getCommuneName(
                            commune
                          )}
                        </option>
                      )
                    )}

                  </select>

                  <MapPin
                    size={17}
                    className={iconClass}
                  />

                  <ChevronDown
                    size={17}
                    className={selectArrowClass}
                  />

                </div>
              </Field>

            </div>

            {/* =================================================
                PRIVACY
            ================================================= */}

            <div className="flex gap-3 rounded-2xl bg-[#f7f7f5] p-4">

              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-gray-500"
              />

              <p className="text-xs leading-5 text-gray-500">
                {
                  t.customerGate
                    .privacy
                }
              </p>

            </div>

            {/* =================================================
                SUBMIT
            ================================================= */}

            <button
              type="submit"
              disabled={!formIsValid}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-black px-6 py-4 text-sm font-bold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
            >

              {t.customerGate.continue}

              <ArrowLeft
                size={17}
                className={`transition-transform duration-300 group-hover:-translate-x-1 ${
                  !isArabic
                    ? "rotate-180"
                    : ""
                }`}
              />

            </button>

            {/* =================================================
                NO ACCOUNT
            ================================================= */}

            <p className="text-center text-xs text-gray-400">
              {
                t.customerGate
                  .noAccount
              }
            </p>

          </form>

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <p className="mt-5 text-center text-xs text-gray-400">
          Algeria Commerce
        </p>

      </div>
    </main>
  );
}

/* =========================================================
   FIELD COMPONENT
========================================================= */

function Field({
  label,
  icon,
  children,
  required = false,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div>

      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">

        <span className="text-gray-400">
          {icon}
        </span>

        <span>
          {label}
        </span>

        {required && (
          <span className="text-red-500">
            *
          </span>
        )}

      </label>

      {children}

    </div>
  );
}

/* =========================================================
   STYLES
========================================================= */

/*
  مهم:

  padding-right: 44px
  يترك مساحة للأيقونة في RTL.

  وفي LTR نقوم بتعديل الاتجاه بواسطة CSS
  داخل الـ input نفسه.
*/

const inputClass =
  "w-full rounded-2xl border border-black/10 bg-gray-50 px-4 py-3.5 pr-11 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/[0.05]";

/*
  Icon position.

  بما أن التصميم الأساسي RTL:
  الأيقونة على اليمين.
*/

const iconClass =
  "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400";

/*
  Arrow for select.
*/

const selectArrowClass =
  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400";