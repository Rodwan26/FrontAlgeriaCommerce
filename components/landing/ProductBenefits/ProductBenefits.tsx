import { Footprints, Feather, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Footprints,
    title: "راحة طوال اليوم",
    description: "دعم مريح للقدم في كل خطوة.",
  },
  {
    icon: Feather,
    title: "خفيفة وسريعة",
    description: "حرية أكبر للحركة دون ثقل.",
  },
  {
    icon: Sparkles,
    title: "تصميم عصري",
    description: "مظهر رياضي أنيق يناسب كل يوم.",
  },
];

export default function ProductBenefits() {
  return (
    <section
      id="features"
      dir="rtl"
      className="relative overflow-hidden bg-[#080a0b] px-4 py-10 md:py-14"
    >
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-7 text-center">
          <p className="text-sm font-bold text-red-500">
            لماذا HOKA؟
          </p>

          <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
            كل ما تحتاجه في كل خطوة
          </h2>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="
                  group
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.025]
                  px-5
                  py-4
                  transition
                  duration-300
                  hover:border-red-500/30
                  hover:bg-red-500/[0.03]
                  sm:block
                  sm:px-5
                  sm:py-5
                "
              >
                {/* Icon */}
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-red-500/10
                    text-red-500
                    transition
                    duration-300
                    group-hover:bg-red-500
                    group-hover:text-white
                  "
                >
                  <Icon size={21} strokeWidth={2} />
                </div>

                {/* Text */}
                <div className="sm:mt-4">
                  <h3 className="text-sm font-black text-white sm:text-base">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}