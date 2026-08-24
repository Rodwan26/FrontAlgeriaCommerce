import {
  LandingFormField,
  LandingPage,
  LandingSection,
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

export const defaultSections: LandingSection[] = [
  {
    id: "hero",
    type: "hero",
    enabled: true,
    settings: {
      eyebrow: "New collection",
      title: "Your product deserves a great first impression.",
      subtitle:
        "Create a powerful shopping experience designed to convert visitors into customers.",
      buttonText: "Order now",
      image: "",
    },
  },
  {
    id: "product",
    type: "product",
    enabled: true,
    settings: {
      title: "Designed for you",
      description:
        "Showcase your product with the information your customers need.",
      price: "29,900 DA",
      image: "",
    },
  },
  {
    id: "features",
    type: "features",
    enabled: true,
    settings: {
      title: "Why customers love it",
      items: [
        "Premium quality",
        "Fast delivery",
        "Easy ordering",
      ],
    },
  },
  {
    id: "testimonials",
    type: "testimonials",
    enabled: true,
    settings: {
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
  },
  {
    id: "faq",
    type: "faq",
    enabled: true,
    settings: {
      title: "Frequently asked questions",
      items: [
        {
          question: "How long does delivery take?",
          answer: "Delivery time depends on your location.",
        },
        {
          question: "How can I order?",
          answer: "Fill in the order form and we will contact you.",
        },
      ],
    },
  },
  {
    id: "order-form",
    type: "order-form",
    enabled: true,
    settings: {
      title: "Order now",
      subtitle: "Fill in your information and we will contact you.",
      buttonText: "Confirm order",
    },
  },
];

export const defaultLandingPage: LandingPage = {
  id: "landing-page-demo",
  productId: "hoka-running-shoe",
  title: "HOKA Running Shoe Landing Page",
  slug: "hoka-running-shoe",
  status: "draft",
  theme: {
    primaryColor: "#EF2028",
    secondaryColor: "#111827",
    backgroundColor: "#FFFFFF",
    textColor: "#111827",
    buttonTextColor: "#FFFFFF",
  },
  sections: defaultSections,
  formFields: defaultFormFields,
};
