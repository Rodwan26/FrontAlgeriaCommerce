import { Product } from "../types/product";

export const product: Product = {
  id: "hoka-running-shoe",

  name: "حذاء HOKA الرياضي",

  brand: "HOKA",

  badge: "الأداء • الراحة • السرعة",

  title: "خطوتك نحو",

  highlightedTitle: "التميز",

  description:
    "حذاء HOKA الرياضي يجمع بين الراحة الفائقة، الدعم المثالي، والتصميم العصري لأداء لا مثيل له.",

  price: 29900,

  currency: "دج",

  heroImage: "/products/feater1.jpg",

  features: [
    {
      id: "comfort",

      title: "راحة تدوم طوال اليوم",

      description:
        "تصميم مريح يوفر دعماً ممتازاً للقدم ويمنحك تجربة أكثر راحة أثناء المشي والجري.",

      image: "/products/feature-1.webp",
    },

    {
      id: "performance",

      title: "أداء وخفة في كل خطوة",

      description:
        "تصميم رياضي خفيف يساعدك على الحركة بسهولة ويمنحك استجابة أفضل أثناء النشاط.",

      image: "/products/feature-2.webp",
    },

    {
      id: "design",

      title: "تصميم رياضي مميز",

      description:
        "مظهر عصري وجذاب يجمع بين الطابع الرياضي والأناقة لتظهر بشكل مميز في كل مكان.",

      image: "/products/feature-3.webp",
    },
  ],

  theme: {
    primary: "#ef2028",

    primaryHover: "#ff3038",

    background: "#080a0b",

    surface: "#111315",

    border: "#ef2028",

    text: "#ffffff",

    mutedText: "#a1a1aa",
  },
};
