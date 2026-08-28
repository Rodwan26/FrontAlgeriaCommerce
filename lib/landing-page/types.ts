export type SectionType =
  | "hero"
  | "features"
  | "gallery"
  | "testimonials"
  | "faq"
  | "order-form"
  | "footer";

export type LandingColors = {
  bg: string;
  surface: string;
  primary: string;
  primaryHover: string;
  text: string;
  mutedText: string;
  border: string;
};

export const DEFAULT_COLORS: LandingColors = {
  bg: "#111315",
  surface: "#181818",
  primary: "#ef2028",
  primaryHover: "#ff3038",
  text: "#ffffff",
  mutedText: "#a1a1aa",
  border: "#292a2b",
};

type BaseSection = {
  id: string;
  type: SectionType;
  enabled: boolean;
  colors: LandingColors;
};

export type HeroSlide = {
  image: string;
  title: string;
  description: string;
};

export type HeroSection = BaseSection & {
  type: "hero";
  brand: string;
  title: string;
  highlightedTitle: string;
  description: string;
  price: number;
  currency: string;
  buttonText: string;
  slides: HeroSlide[];
};

export type FeatureItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type FeaturesSection = BaseSection & {
  type: "features";
  title: string;
  subtitle: string;
  items: FeatureItem[];
};

export type GalleryItem = {
  id: string;
  image: string;
  caption: string;
};

export type GallerySection = BaseSection & {
  type: "gallery";
  title: string;
  items: GalleryItem[];
};

export type TestimonialItem = {
  id: string;
  name: string;
  text: string;
  rating: number;
};

export type TestimonialsSection = BaseSection & {
  type: "testimonials";
  title: string;
  items: TestimonialItem[];
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqSection = BaseSection & {
  type: "faq";
  title: string;
  items: FaqItem[];
};

export type OrderFieldId =
  | "name"
  | "phone"
  | "wilaya"
  | "commune"
  | "delivery"
  | "quantity"
  | "address";

export const ORDER_FIELD_LABELS: Record<OrderFieldId, string> = {
  name: "الاسم",
  phone: "رقم الهاتف",
  wilaya: "الولاية",
  commune: "البلدية",
  delivery: "نوع التوصيل",
  quantity: "الكمية",
  address: "العنوان المفصل",
};

export type OrderField = {
  id: OrderFieldId;
  label: string;
  required: boolean;
  enabled: boolean;
};

export type OrderFormSection = BaseSection & {
  type: "order-form";
  title: string;
  subtitle: string;
  buttonText: string;
  price: number;
  currency: string;
  delivery: {
    homeLabel: string;
    homePrice: number;
    officeLabel: string;
    officePrice: number;
  };
  fields: OrderField[];
};

export type FooterBenefit = {
  id: string;
  title: string;
  description: string;
};

export type FooterSection = BaseSection & {
  type: "footer";
  copyright: string;
  benefits: FooterBenefit[];
};

export type LandingSection =
  | HeroSection
  | FeaturesSection
  | GallerySection
  | TestimonialsSection
  | FaqSection
  | OrderFormSection
  | FooterSection;

export type LandingPage = {
  id: string;
  productId: number;
  slug: string;
  title: string;
  brand: string;
  headerColors: LandingColors;
  sections: LandingSection[];
};