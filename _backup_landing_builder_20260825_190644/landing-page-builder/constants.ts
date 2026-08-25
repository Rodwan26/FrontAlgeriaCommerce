import {
  FileText,
  HelpCircle,
  ImagePlus,
  MessageSquare,
  ShoppingBag,
  Star,
  Timer,
  Type,
} from "lucide-react";

import type { LandingSettings, SectionType } from "./types";

export const DEFAULT_LANDING_SETTINGS: LandingSettings = {
  primaryColor: "#EF2028",
  secondaryColor: "#111827",
  backgroundColor: "#FFFFFF",
  textColor: "#111827",
  buttonText: "Order Now",
  fontFamily: "Inter",
};

export const SECTION_LABELS: Record<SectionType, string> = {
  hero: "Hero",
  product: "Product",
  features: "Features",
  gallery: "Gallery",
  testimonials: "Testimonials",
  faq: "FAQ",
  countdown: "Countdown",
  "order-form": "Order Form",
};

export const SECTION_ICONS: Record<SectionType, typeof Type> = {
  hero: Type,
  product: ShoppingBag,
  features: Star,
  gallery: ImagePlus,
  testimonials: MessageSquare,
  faq: HelpCircle,
  countdown: Timer,
  "order-form": FileText,
} as const;

export const SIDEBAR_RESIZE_LIMITS = {
  min: 220,
  max: 420,
  collapsed: 52,
} as const;

export const DEFAULT_SECTION_TYPES: SectionType[] = [
  "hero",
  "product",
  "features",
  "gallery",
  "testimonials",
  "faq",
  "countdown",
  "order-form",
];






