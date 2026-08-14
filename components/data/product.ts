import { Product } from "../types/product";

export const product: Product = {
  name: "حذاء HOKA الرياضي",
  brand: "HOKA",

  price: 29900,
  currency: "دج",

  heroImage: "/products/hero.webp",

  badge: "الأداء. الراحة. السرعة.",

  title: "خطوتك نحو",

  highlightedTitle: "التميز",

  description:
    "حذاء HOKA الرياضي يجمع بين الراحة الفائقة، الدعم المثالي، والتصميم العصري لأداء لا مثيل له.",

  features: [
    {
      id: 1,
      image: "/products/feature-1.webp",
      title: "خفيف وسريع",
      description:
        "تصميم خفيف الوزن يمنحك سرعة أكبر وراحة في كل خطوة.",
    },
    {
      id: 2,
      image: "/products/feature-2.webp",
      title: "وسادة فائقة الراحة",
      description:
        "تقنية Cushion تساعد على امتصاص الصدمات وحماية مفاصلك.",
    },
    {
      id: 3,
      image: "/products/feature-3.webp",
      title: "ثبات ودعم مثالي",
      description:
        "هيكل مصمم لتثبيت قدمك وتقليل الإجهاد أثناء الجري.",
    },
  ],
};