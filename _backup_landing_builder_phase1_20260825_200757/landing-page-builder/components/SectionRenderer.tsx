"use client";

import {
  ImagePlus,
  Star,
} from "lucide-react";

import type {
  LandingSection,
  LandingSettings,
} from "../types";

type SectionRendererProps = {
  section: LandingSection;
  settings: LandingSettings;
};

function SectionRenderer({ section, settings }: SectionRendererProps) {
    if (!section.enabled) {
      return null;
    }

    switch (section.type) {
      case "hero":
        return (
          <section
            key={section.id}
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
                Premium Product
              </p>

              <h1 className="text-4xl font-bold sm:text-6xl">
                Your Product
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-base text-gray-300 sm:text-lg">
                Build a beautiful product landing
                page that converts visitors into
                customers.
              </p>

              <button
                type="button"
                className="mt-8 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg"
                style={{
                  backgroundColor:
                    settings.primaryColor,
                }}
              >
                {settings.buttonText}
              </button>
            </div>
          </section>
        );

      case "product":
        return (
          <section
            key={section.id}
            className="px-6 py-16"
            style={{
              backgroundColor:
                settings.backgroundColor,
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

                <h2
                  className="mt-3 text-3xl font-bold"
                  style={{
                    color: settings.textColor,
                  }}
                >
                  Premium Product
                </h2>

                <p className="mt-4 leading-7 text-gray-500">
                  Add your product description,
                  benefits, specifications and
                  pricing here.
                </p>

                <div className="mt-6 text-3xl font-bold">
                  29,900 DA
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
            key={section.id}
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
                  Why choose this product?
                </h2>

                <p className="mt-3 text-gray-500">
                  Highlight the most important
                  benefits of your product.
                </p>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {[
                  "Premium Quality",
                  "Fast Delivery",
                  "Easy to Use",
                ].map((feature) => (
                  <div
                    key={feature}
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
                      {feature}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Add a short description for
                      this feature.
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
            key={section.id}
            className="px-6 py-16"
          >
            <div className="mx-auto max-w-5xl">
              <h2 className="text-center text-3xl font-bold">
                Product Gallery
              </h2>

              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="flex aspect-square items-center justify-center rounded-xl bg-gray-100"
                  >
                    <ImagePlus className="text-gray-300" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "testimonials":
        return (
          <section
            key={section.id}
            className="bg-gray-50 px-6 py-16"
          >
            <div className="mx-auto max-w-5xl">
              <h2 className="text-center text-3xl font-bold">
                What our customers say
              </h2>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {[1, 2, 3].map((item) => (
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
                      “Amazing product. I am very
                      happy with my purchase.”
                    </p>

                    <p className="mt-5 text-sm font-bold">
                      Customer Name
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "faq":
        return (
          <section
            key={section.id}
            className="px-6 py-16"
          >
            <div className="mx-auto max-w-3xl">
              <h2 className="text-center text-3xl font-bold">
                Frequently Asked Questions
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
                      Add your answer to this
                      question.
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
            key={section.id}
            className="px-6 py-14 text-center text-white"
            style={{
              backgroundColor:
                settings.primaryColor,
            }}
          >
            <h2 className="text-3xl font-bold">
              Special Offer Ends Soon
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
                      {[
                        "Days",
                        "Hours",
                        "Min",
                        "Sec",
                      ][index]}
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        );

      case "order-form":
        return (
          <section
            key={section.id}
            className="bg-gray-50 px-6 py-16"
          >
            <div className="mx-auto max-w-xl">
              <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
                <h2 className="text-center text-3xl font-bold">
                  Order Now
                </h2>

                <p className="mt-2 text-center text-sm text-gray-500">
                  Fill in your information and
                  we will contact you.
                </p>

                <div className="mt-7 space-y-4">
                  {[
                    "Full name",
                    "Phone number",
                    "Wilaya",
                    "Commune",
                  ].map((field) => (
                    <input
                      key={field}
                      placeholder={field}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none"
                    />
                  ))}

                  <button
                    type="button"
                    className="w-full rounded-xl py-3.5 text-sm font-bold text-white"
                    style={{
                      backgroundColor:
                        settings.primaryColor,
                    }}
                  >
                    {settings.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  }


export default SectionRenderer;


