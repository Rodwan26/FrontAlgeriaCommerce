"use client";

import {
  ImagePlus,
  Star,
} from "lucide-react";

import type {
  LandingFormField,
  LandingSection,
  LandingSettings,
} from "../types";

type SectionRendererProps = {
  section: LandingSection;
  settings: LandingSettings;
  formFields: LandingFormField[];
};

function getString(
  value: unknown,
  fallback: string
): string {
  return typeof value === "string"
    ? value
    : fallback;
}

function getNumber(
  value: unknown,
  fallback: number
): number {
  return typeof value === "number"
    ? value
    : fallback;
}

function getFormAppearance(
  section: LandingSection
) {
  const appearance =
    section.settings.appearance;

  const data =
    appearance &&
    typeof appearance === "object"
      ? appearance as Record<string, unknown>
      : {};

  return {
    sectionBackground: getString(
      data.sectionBackground,
      "#F9FAFB"
    ),
    formBackground: getString(
      data.formBackground,
      "#FFFFFF"
    ),
    textColor: getString(
      data.textColor,
      "#111827"
    ),
    inputBackground: getString(
      data.inputBackground,
      "#FFFFFF"
    ),
    inputTextColor: getString(
      data.inputTextColor,
      "#111827"
    ),
    inputBorderColor: getString(
      data.inputBorderColor,
      "#D1D5DB"
    ),
    buttonBackground: getString(
      data.buttonBackground,
      "#EF2028"
    ),
    buttonTextColor: getString(
      data.buttonTextColor,
      "#FFFFFF"
    ),
  };
}

function FieldInput({
  field,
  appearance,
}: {
  field: LandingFormField;
  appearance: ReturnType<typeof getFormAppearance>;
}) {
  const commonClass =
    "w-full rounded-xl border px-4 py-3 text-sm outline-none transition";

  const style = {
    backgroundColor:
      appearance.inputBackground,
    color: appearance.inputTextColor,
    borderColor:
      appearance.inputBorderColor,
  };

  const validationProps = {
    required: field.required,
    minLength: field.minLength,
    maxLength: field.maxLength,
    pattern: field.pattern || undefined,
  };

  if (field.type === "textarea") {
    return (
      <textarea
        className={`${commonClass} min-h-28 resize-y`}
        style={style}
        placeholder={field.placeholder}
        {...validationProps}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        className={commonClass}
        style={style}
        required={field.required}
        defaultValue=""
      >
        <option value="" disabled>
          {field.placeholder || "Select an option"}
        </option>

        {(field.options ?? []).map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          )
        )}
      </select>
    );
  }

  if (
    field.type === "wilaya" ||
    field.type === "commune"
  ) {
    return (
      <select
        className={commonClass}
        style={style}
        required={field.required}
        defaultValue=""
      >
        <option value="" disabled>
          {field.placeholder ||
            (field.type === "wilaya"
              ? "Select Wilaya"
              : "Select Commune")}
        </option>
      </select>
    );
  }

  let inputType:
    | "text"
    | "tel"
    | "email"
    | "number" = "text";

  if (field.type === "phone") {
    inputType = "tel";
  }

  if (field.type === "email") {
    inputType = "email";
  }

  if (field.type === "number") {
    inputType = "number";
  }

  return (
    <input
      type={inputType}
      className={commonClass}
      style={style}
      placeholder={field.placeholder}
      {...validationProps}
    />
  );
}

function SectionRenderer({
  section,
  settings,
  formFields,
}: SectionRendererProps) {
  if (!section.enabled) {
    return null;
  }

  const sectionId =
    `landing-section-${section.id}`;

  switch (section.type) {
    case "hero":
      return (
        <section
          id={sectionId}
          className="relative overflow-hidden px-6 py-20 text-center"
          style={{
            backgroundColor:
              settings.secondaryColor,
            color: "#ffffff",
          }}
        >
          <div className="mx-auto max-w-3xl">
            <p
              className="mb-4 text-sm font-semibold uppercase tracking-[0.2em]"
              style={{
                color:
                  settings.primaryColor,
              }}
            >
              {getString(
                section.settings.eyebrow,
                "Premium Product"
              )}
            </p>

            <h1 className="text-4xl font-bold sm:text-6xl">
              {getString(
                section.settings.title,
                "Your Product"
              )}
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base text-gray-300 sm:text-lg">
              {getString(
                section.settings.subtitle,
                "Build a beautiful product landing page."
              )}
            </p>

            <button
              type="button"
              className="mt-8 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg"
              style={{
                backgroundColor:
                  settings.primaryColor,
              }}
            >
              {getString(
                section.settings.buttonText,
                settings.buttonText
              )}
            </button>
          </div>
        </section>
      );

    case "product":
      return (
        <section
          id={sectionId}
          className="px-6 py-16"
          style={{
            backgroundColor:
              settings.backgroundColor,
            color: settings.textColor,
          }}
        >
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
            <div className="flex aspect-square items-center justify-center rounded-2xl bg-gray-100">
              <ImagePlus
                size={48}
                className="text-gray-300"
              />
            </div>

            <div>
              <p
                className="text-sm font-semibold uppercase tracking-wider"
                style={{
                  color:
                    settings.primaryColor,
                }}
              >
                Product
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {getString(
                  section.settings.title,
                  "Premium Product"
                )}
              </h2>

              <p className="mt-4 leading-7 opacity-70">
                {getString(
                  section.settings.description,
                  "Add your product description."
                )}
              </p>

              <div
                className="mt-6 text-3xl font-bold"
                style={{
                  color:
                    settings.primaryColor,
                }}
              >
                {getString(
                  section.settings.price,
                  "29,900 DA"
                )}
              </div>

              <button
                type="button"
                className="mt-6 rounded-xl px-6 py-3 text-sm font-bold text-white"
                style={{
                  backgroundColor:
                    settings.primaryColor,
                }}
              >
                {settings.buttonText}
              </button>
            </div>
          </div>
        </section>
      );

    case "features":
      return (
        <section
          id={sectionId}
          className="bg-gray-50 px-6 py-16"
        >
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2
                className="text-3xl font-bold"
                style={{
                  color: settings.textColor,
                }}
              >
                {getString(
                  section.settings.title,
                  "Why customers love it"
                )}
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {(
                Array.isArray(
                  section.settings.items
                )
                  ? section.settings.items
                  : [
                      "Premium Quality",
                      "Fast Delivery",
                      "Easy to Use",
                    ]
              ).map((feature) => (
                <div
                  key={String(feature)}
                  className="rounded-2xl bg-white p-6 text-center shadow-sm"
                >
                  <div
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-white"
                    style={{
                      backgroundColor:
                        settings.primaryColor,
                    }}
                  >
                    <Star size={20} />
                  </div>

                  <h3 className="mt-4 font-bold">
                    {String(feature)}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Add a short description for this feature.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "gallery":
      return (
        <section
          id={sectionId}
          className="px-6 py-16"
          style={{
            backgroundColor:
              settings.backgroundColor,
            color: settings.textColor,
          }}
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-bold">
              {getString(
                section.settings.title,
                "Product Gallery"
              )}
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="flex aspect-square items-center justify-center rounded-xl bg-gray-100"
                  >
                    <ImagePlus className="text-gray-300" />
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      );

    case "testimonials":
      return (
        <section
          id={sectionId}
          className="bg-gray-50 px-6 py-16"
        >
          <div className="mx-auto max-w-5xl">
            <h2
              className="text-center text-3xl font-bold"
              style={{
                color: settings.textColor,
              }}
            >
              {getString(
                section.settings.title,
                "What our customers say"
              )}
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[1, 2, 3].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                  >
                    <div
                      className="flex gap-1"
                      style={{
                        color:
                          settings.primaryColor,
                      }}
                    >
                      {"★★★★★"}
                    </div>

                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      “Amazing product. I am very happy with my purchase.”
                    </p>

                    <p className="mt-5 text-sm font-bold">
                      Customer Name
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      );

    case "faq":
      return (
        <section
          id={sectionId}
          className="px-6 py-16"
          style={{
            backgroundColor:
              settings.backgroundColor,
            color: settings.textColor,
          }}
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold">
              {getString(
                section.settings.title,
                "Frequently Asked Questions"
              )}
            </h2>

            <div className="mt-8 space-y-3">
              {[
                "How long does delivery take?",
                "Can I return the product?",
                "What payment methods are available?",
              ].map((question) => (
                <div
                  key={question}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                >
                  <p className="font-semibold">
                    {question}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Add your answer to this question.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "countdown":
      return (
        <section
          id={sectionId}
          className="px-6 py-14 text-center text-white"
          style={{
            backgroundColor:
              settings.primaryColor,
          }}
        >
          <h2 className="text-3xl font-bold">
            {getString(
              section.settings.title,
              "Special Offer Ends Soon"
            )}
          </h2>

          <div className="mt-6 flex justify-center gap-3">
            {["02", "14", "38", "52"].map(
              (value, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-white/15 px-4 py-3"
                >
                  <div className="text-2xl font-bold">
                    {value}
                  </div>

                  <div className="text-xs opacity-70">
                    {
                      [
                        "Days",
                        "Hours",
                        "Min",
                        "Sec",
                      ][index]
                    }
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      );

    case "order-form": {
      const appearance =
        getFormAppearance(section);

      const visibleFields =
        formFields.filter(
          (field) => field.enabled
        );

      return (
        <section
          id={sectionId}
          className="px-6 py-16"
          style={{
            backgroundColor:
              appearance.sectionBackground,
            color: appearance.textColor,
          }}
        >
          <div className="mx-auto max-w-xl">
            <div
              className="rounded-2xl p-6 shadow-lg sm:p-8"
              style={{
                backgroundColor:
                  appearance.formBackground,
                color: appearance.textColor,
              }}
            >
              <h2 className="text-center text-3xl font-bold">
                {getString(
                  section.settings.title,
                  "Order Now"
                )}
              </h2>

              <p
                className="mt-2 text-center text-sm opacity-70"
              >
                {getString(
                  section.settings.subtitle,
                  "Fill in your information and we will contact you."
                )}
              </p>

              <div className="mt-7 space-y-4">
                {visibleFields.map(
                  (field) => (
                    <div
                      key={field.id}
                    >
                      <label
                        className="mb-1.5 block text-sm font-semibold"
                        style={{
                          color:
                            appearance.textColor,
                        }}
                      >
                        {field.label}

                        {field.required && (
                          <span className="ml-1 text-red-500">
                            *
                          </span>
                        )}
                      </label>

                      <FieldInput
                        field={field}
                        appearance={
                          appearance
                        }
                      />

                      {field.minLength !==
                        undefined ||
                        field.maxLength !==
                          undefined ? (
                        <p className="mt-1 text-[11px] opacity-50">
                          {field.minLength !==
                            undefined &&
                            `Min ${field.minLength}`}
                          {field.minLength !==
                            undefined &&
                            field.maxLength !==
                              undefined &&
                            " • "}
                          {field.maxLength !==
                            undefined &&
                            `Max ${field.maxLength}`}
                        </p>
                      ) : null}
                    </div>
                  )
                )}

                {visibleFields.length ===
                  0 && (
                  <div
                    className="rounded-xl border border-dashed p-6 text-center text-sm opacity-60"
                    style={{
                      borderColor:
                        appearance.inputBorderColor,
                    }}
                  >
                    No form fields enabled.
                  </div>
                )}

                <button
                  type="button"
                  className="w-full rounded-xl py-3.5 text-sm font-bold"
                  style={{
                    backgroundColor:
                      appearance.buttonBackground,
                    color:
                      appearance.buttonTextColor,
                  }}
                >
                  {getString(
                    section.settings.buttonText,
                    settings.buttonText
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      );
    }

    default:
      return null;
  }
}

export default SectionRenderer;
