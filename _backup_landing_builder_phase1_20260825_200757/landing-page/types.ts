export type LandingSectionType =
  | "hero"
  | "product"
  | "features"
  | "gallery"
  | "testimonials"
  | "faq"
  | "countdown"
  | "order-form";

export type LandingSection = {
  id: string;
  type: LandingSectionType;
  title: string;
  enabled: boolean;
  settings: Record<string, unknown>;
};

export type LandingTheme = {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  buttonTextColor: string;
  fontFamily: string;
};

export type LandingFormField = {
  id: string;
  type:
    | "text"
    | "phone"
    | "email"
    | "address"
    | "wilaya"
    | "commune";
  label: string;
  required: boolean;
  enabled: boolean;
};

export type LandingPage = {
  id: string;
  productId: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  theme: LandingTheme;
  sections: LandingSection[];
  formFields: LandingFormField[];
};

export type PreviewMode = "desktop" | "mobile";

export type SectionMoveDirection = "up" | "down";
