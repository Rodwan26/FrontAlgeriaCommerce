import { ArrowUpLeft, Check } from "lucide-react";
import { product } from "../../data/product";

export default function Features() {
  return (
    <section
      id="features"
      dir="rtl"
      className="
        relative
        overflow-hidden
        bg-[#080a0b]
        py-20
        sm:py-24
        lg:py-32
      "
    >
      {/* Background */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            left-[-180px]
            top-[20%]
            h-[400px]
            w-[400px]
            rounded-full
            bg-red-950/20
            blur-[140px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <div className="max-w-2xl">
          <span className="text-xs font-bold tracking-[0.2em] text-red-500">
            WHY HOKA
          </span>

          <h2
            className="
              mt-4
              text-4xl
              font-black
              leading-tight
              tracking-tight
              text-white
              sm:text-5xl
              lg:text-6xl
            "
          >
            مصمم ليواكب
            <br />
            <span className="text-red-500">
              كل خطوة
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-8 text-white/45 sm:text-base">
            كل تفصيلة في الحذاء صُممت لتمنحك تجربة أكثر راحة
            وثباتاً أثناء الحركة.
          </p>
        </div>

        {/* Feature cards */}

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {product.features.map((feature, index) => (
            <article
              key={feature.id}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/[0.07]
                bg-white/[0.025]
                p-6
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-red-500/20
                hover:bg-white/[0.04]
              "
            >
              {/* Number */}

              <div className="flex items-center justify-between">
                <span
                  className="
                    text-xs
                    font-black
                    tracking-[0.2em]
                    text-white/20
                  "
                >
                  0{index + 1}
                </span>

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500/10
                    text-red-500
                  "
                >
                  <Check size={17} strokeWidth={2.5} />
                </div>
              </div>

              {/* Image */}

              <div
                className="
                  relative
                  mt-7
                  aspect-[4/3]
                  overflow-hidden
                  rounded-2xl
                  bg-black
                "
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-105
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/50
                    via-transparent
                    to-transparent
                  "
                />
              </div>

              {/* Text */}

              <div className="mt-6">
                <h3 className="text-xl font-black text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/40">
                  {feature.description}
                </p>
              </div>

              {/* Bottom accent */}

              <div
                className="
                  mt-6
                  h-px
                  w-10
                  bg-red-500
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />
            </article>
          ))}
        </div>

        {/* Bottom CTA */}

        <div
          className="
            mt-12
            flex
            flex-col
            items-center
            justify-between
            gap-5
            rounded-3xl
            border
            border-white/[0.07]
            bg-white/[0.025]
            p-6
            sm:flex-row
            sm:p-8
          "
        >
          <div className="text-center sm:text-right">
            <p className="text-lg font-black text-white">
              جاهز لتجربة الفرق؟
            </p>

            <p className="mt-1 text-sm text-white/40">
              اطلب حذاءك الآن واستمتع براحة أفضل.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById("order")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
            className="
              group
              flex
              shrink-0
              items-center
              gap-2
              rounded-xl
              bg-red-600
              px-6
              py-3.5
              text-sm
              font-black
              text-white
              transition
              hover:bg-red-500
              active:scale-95
            "
          >
            اطلب الآن

            <ArrowUpLeft
              size={17}
              className="
                transition-transform
                group-hover:-translate-y-0.5
                group-hover:-translate-x-0.5
              "
            />
          </button>
        </div>
      </div>
    </section>
  );
}