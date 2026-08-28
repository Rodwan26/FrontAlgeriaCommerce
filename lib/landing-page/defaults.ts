import {
  DEFAULT_COLORS,
  FaqSection,
  FeaturesSection,
  FooterSection,
  GallerySection,
  HeroSection,
  LandingColors,
  LandingSection,
  LandingPage,
  OrderField,
  OrderFieldId,
  OrderFormSection,
  SectionType,
  TestimonialsSection,
} from "./types";

export const GALLERY_IMAGES = [
  { image: "/products/hero.jpg", caption: "" },
  { image: "/products/feater1.jpg", caption: "" },
  { image: "/products/feature-3.webp", caption: "" },
];

function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function makeOrderField(
  id: OrderFieldId,
  label: string,
  required = true,
  enabled = true
): OrderField {
  return { id, label, required, enabled };
}

export const DEFAULT_ORDER_FIELDS: OrderField[] = [
  makeOrderField("name", "الاسم الكامل"),
  makeOrderField("phone", "رقم الهاتف"),
  makeOrderField("wilaya", "الولاية"),
  makeOrderField("commune", "البلدية"),
  makeOrderField("delivery", "نوع التوصيل"),
  makeOrderField("quantity", "الكمية"),
  makeOrderField("address", "العنوان المفصل", false),
];

export function createOrderFormSection(
  colors: LandingColors = DEFAULT_COLORS
): OrderFormSection {
  return {
    id: uid(),
    type: "order-form",
    enabled: true,
    colors,
    title: "اطلب الآن",
    subtitle:
      "املأ النموذج التالي وسنتواصل معك لتأكيد طلبك. الدفع عند الاستلام.",
    buttonText: "تأكيد الطلب",
    price: 29900,
    currency: "دج",
    delivery: {
      homeLabel: "التوصيل إلى المنزل",
      homePrice: 800,
      officeLabel: "التسليم من المكتب",
      officePrice: 400,
    },
    fields: [...DEFAULT_ORDER_FIELDS],
  };
}

export function createHeroSection(
  colors: LandingColors = DEFAULT_COLORS
): HeroSection {
  return {
    id: uid(),
    type: "hero",
    enabled: true,
    colors,
    brand: "حاكاو HAKAU",
    title: "خطوتك نحو",
    highlightedTitle: "التميز",
    description:
      "حذاء حاكاو الرياضي يجمع بين الراحة الفائقة، الدعم المثالي، والتصميم العصري لأداء لا مثيل له.",
    price: 29900,
    currency: "دج",
    buttonText: "اطلب الآن",
    slides: [
      {
        image: "/products/feater1.jpg",
        title: "الراحة",
        description:
          "راحة تدوم طوال اليوم مع دعم ممتاز للقدم أثناء المشي والجري.",
      },
      {
        image: "/products/hero.jpg",
        title: "الأداء",
        description:
          "تصميم خفيف يساعدك على الحركة بسهولة واستجابة أفضل أثناء النشاط.",
      },
      {
        image: "/products/feature-3.webp",
        title: "الأناقة",
        description: "مظهر عصري يجمع بين الطابع الرياضي والأناقة لتظهر مميزاً.",
      },
    ],
  };
}

export function createFeaturesSection(
  colors: LandingColors = DEFAULT_COLORS
): FeaturesSection {
  return {
    id: uid(),
    type: "features",
    enabled: true,
    colors,
    title: "لماذا تختارنا؟",
    subtitle: "مميزات تجعل منتجنا الخيار الأفضل لك",
    items: [
      {
        id: uid(),
        title: "راحة تدوم طوال اليوم",
        description:
          "تصميم مريح يوفر دعماً ممتازاً للقدم ويمنحك تجربة أكثر راحة أثناء المشي والجري.",
        image: "/products/feature-1.webp",
      },
      {
        id: uid(),
        title: "أداء وخفة في كل خطوة",
        description:
          "تصميم رياضي خفيف يساعدك على الحركة بسهولة ويمنحك استجابة أفضل أثناء النشاط.",
        image: "/products/feature-2.webp",
      },
      {
        id: uid(),
        title: "تصميم رياضي مميز",
        description:
          "مظهر عصري وجذاب يجمع بين الطابع الرياضي والأناقة لتظهر بشكل مميز في كل مكان.",
        image: "/products/feature-3.webp",
      },
    ],
  };
}

export function createGallerySection(
  colors: LandingColors = DEFAULT_COLORS
): GallerySection {
  return {
    id: uid(),
    type: "gallery",
    enabled: true,
    colors,
    title: "صور المنتج",
    items: [
      { id: uid(), image: "/products/hero.jpg", caption: "" },
      { id: uid(), image: "/products/feater1.jpg", caption: "" },
      { id: uid(), image: "/products/feature-2.webp", caption: "" },
      { id: uid(), image: "/products/feature-1.webp", caption: "" },
      { id: uid(), image: "/products/feature-3.webp", caption: "" },
      { id: uid(), image: "/products/hero.jpg", caption: "" },
    ],
  };
}

export function createTestimonialsSection(
  colors: LandingColors = DEFAULT_COLORS
): TestimonialsSection {
  return {
    id: uid(),
    type: "testimonials",
    enabled: true,
    colors,
    title: "ماذا قال عملاؤنا؟",
    items: [
      {
        id: uid(),
        name: "أحمد م.",
        text: "منتج رائع بصراحة، الجودة ممتازة والتوصيل كان سريعاً. أنصح به بشدة.",
        rating: 5,
      },
      {
        id: uid(),
        name: "سارة ب.",
        text: "تجربة شراء مريحة جداً، الطلب وصل في الوقت المحدد والمنتج مطابق تماماً للصور.",
        rating: 5,
      },
      {
        id: uid(),
        name: "يوسف ك.",
        text: "أفضل منتج جربته، الأناقة والراحة في آن واحد. سأطلب مرة أخرى بالتأكيد.",
        rating: 4,
      },
    ],
  };
}

export function createFaqSection(
  colors: LandingColors = DEFAULT_COLORS
): FaqSection {
  return {
    id: uid(),
    type: "faq",
    enabled: true,
    colors,
    title: "الأسئلة الشائعة",
    items: [
      {
        id: uid(),
        question: "كيف يتم الدفع؟",
        answer: "الدفع عند الاستلام. لا تحتاج لدفع أي مبلغ قبل وصول طلبك.",
      },
      {
        id: uid(),
        question: "كم مدة التوصيل؟",
        answer:
          "التوصيل يستغرق من 2 إلى 5 أيام عمل حسب الولاية. نوصل لجميع الولايات.",
      },
      {
        id: uid(),
        question: "هل يمكنني استبدال المنتج؟",
        answer:
          "نعم، يمكنك استبدال أو إرجاع المنتج خلال 7 أيام من تاريخ الاستلام.",
      },
    ],
  };
}

export function createFooterSection(
  colors: LandingColors = DEFAULT_COLORS
): FooterSection {
  return {
    id: uid(),
    type: "footer",
    enabled: true,
    colors,
    copyright: "جميع الحقوق محفوظة © 2025",
    benefits: [
      {
        id: uid(),
        title: "الدفع عند الاستلام",
        description: "ادفع فقط عندما يصل طلبك إلى باب منزلك.",
      },
      {
        id: uid(),
        title: "توصيل سريع",
        description: "تصلك طلباتك خلال 2 إلى 5 أيام عمل لجميع الولايات.",
      },
      {
        id: uid(),
        title: "ضمان الجودة",
        description: "منتجات أصلية بجودة عالية مع ضمان الاستبدال.",
      },
    ],
  };
}

export function createSection(type: SectionType, colors: LandingColors): LandingSection {
  switch (type) {
    case "hero":
      return createHeroSection(colors);
    case "features":
      return createFeaturesSection(colors);
    case "gallery":
      return createGallerySection(colors);
    case "testimonials":
      return createTestimonialsSection(colors);
    case "faq":
      return createFaqSection(colors);
    case "order-form":
      return createOrderFormSection(colors);
    case "footer":
      return createFooterSection(colors);
    default:
      return createHeroSection(colors);
  }
}

export function createDefaultLandingPage(productId: number): LandingPage {
  const colors: LandingColors = { ...DEFAULT_COLORS };
  return {
    id: uid(),
    productId,
    slug: "",
    title: "صفحة هبوط المنتج",
    brand: "حاكاو HAKAU",
    headerColors: { ...colors },
    sections: [
      createHeroSection(colors),
      createFeaturesSection(colors),
      createGallerySection(colors),
      createTestimonialsSection(colors),
      createFaqSection(colors),
      createOrderFormSection(colors),
      createFooterSection(colors),
    ],
  };
}

export type SellerProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
};

export const DEMO_PRODUCT: SellerProduct = {
  id: 1,
  name: "HOKA Running Shoe",
  description:
    "حذاء HOKA الرياضي يجمع بين الراحة الفائقة، الدعم المثالي، والتصميم العصري لأداء لا مثيل له.",
  price: 29900,
  image: "/products/feater1.jpg",
};

export function makeSlug(name: string, productId: number): string {
  const base = name
    .normalize("NFKD")
    .replace(/[\u0600-\u06FF]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base || "product"}-${productId}`;
}

export function applyProductToDefaults(
  base: LandingPage,
  product: SellerProduct
): LandingPage {
  const page: LandingPage = {
    ...base,
    slug: makeSlug(product.name, product.id),
    title: product.name,
    brand: product.name,
  };

  page.sections = page.sections.map((section) => {
    if (section.type === "hero") {
      return {
        ...section,
        title: section.title || product.name,
        description: product.description || section.description,
        price: product.price || section.price,
        slides:
          product.image || section.slides.length === 0
            ? section.slides.map((slide, i) =>
                i === 0 && product.image ? { ...slide, image: product.image } : slide
              )
            : section.slides,
      };
    }
    if (section.type === "order-form") {
      return {
        ...section,
        price: product.price || section.price,
      };
    }
    return section;
  });

  return page;
}