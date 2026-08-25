import type {
  LandingFormField,
  LandingPage,
  LandingSection,
  LandingTheme,
} from "./types";

export const defaultFormFields: LandingFormField[] = [
  {
    id: "customer-name",
    type: "text",
    label: "Full name",
    required: true,
    enabled: true,
  },
  {
    id: "customer-phone",
    type: "phone",
    label: "Phone number",
    required: true,
    enabled: true,
  },
  {
    id: "customer-wilaya",
    type: "wilaya",
    label: "Wilaya",
    required: true,
    enabled: true,
  },
  {
    id: "customer-commune",
    type: "commune",
    label: "Commune",
    required: true,
    enabled: true,
  },
  {
    id: "customer-address",
    type: "address",
    label: "Address",
    required: false,
    enabled: true,
  },
];

export const defaultSectionSettings: Record<
  LandingSection["type"],
  Record<string, unknown>
> = {
  hero: {
    eyebrow: "New collection",
    title: "Your product deserves a great first impression.",
    subtitle:
      "Create a powerful shopping experience designed to convert visitors into customers.",
    buttonText: "Order now",
    image: "",
  },

  product: {
    title: "Designed for you",
    description:
      "Showcase your product with the information your customers need.",
    price: "29,900 DA",
    image: "",
  },

  features: {
    title: "Why customers love it",
    items: [
      "Premium quality",
      "Fast delivery",
      "Easy ordering",
    ],
  },

  gallery: {
    title: "Product gallery",
    images: [],
  },

  testimonials: {
    title: "What our customers say",
    items: [
      {
        name: "Customer",
        text: "Amazing product and excellent service.",
      },
      {
        name: "Happy customer",
        text: "The ordering process was very easy.",
      },
    ],
  },

  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "How long does delivery take?",
        answer:
          "Delivery time depends on your location.",
      },
      {
        question: "How can I order?",
        answer:
          "Fill in the order form and we will contact you.",
      },
    ],
  },

  countdown: {
    title: "Limited time offer",
    subtitle:
      "Order now before this offer ends.",
    duration: 24 * 60 * 60,
  },

  "order-form": {
    title: "Order now",
    subtitle:
      "Fill in your information and we will contact you.",
    buttonText: "Confirm order",
  },
};

export const defaultSectionTitles: Record<
  LandingSection["type"],
  string
> = {
  hero: "Hero",
  product: "Product",
  features: "Features",
  gallery: "Gallery",
  testimonials: "Testimonials",
  faq: "FAQ",
  countdown: "Countdown",
  "order-form": "Order Form",
};

export const defaultSections: LandingSection[] = (
  Object.keys(defaultSectionSettings) as LandingSection["type"][]
).map((type, index) => ({
  id: `${type}-${index}`,
  type,
  title: defaultSectionTitles[type],
  enabled: true,
  settings: {
    ...defaultSectionSettings[type],
  },
}));

export const defaultTheme: LandingTheme = {
  primaryColor: "#EF2028",
  secondaryColor: "#111827",
  backgroundColor: "#FFFFFF",
  textColor: "#111827",
  buttonTextColor: "#FFFFFF",
  fontFamily: "Inter",
};

export const defaultLandingPage: LandingPage = {
  id: "landing-page-demo",
  productId: "hoka-running-shoe",
  title: "HOKA Running Shoe Landing Page",
  slug: "hoka-running-shoe",
  status: "draft",
  theme: defaultTheme,
  sections: defaultSections,
  formFields: defaultFormFields,
};
