export type SectionType =
  | "hero"
  | "product"
  | "features"
  | "gallery"
  | "testimonials"
  | "faq"
  | "countdown"
  | "order";

export type LandingSectionType = SectionType;

export type LandingSection = {
  id: string;
  type: SectionType;
  title: string;
  enabled: boolean;
  settings: Record<string, unknown>;
};

export type LandingSettings = {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  buttonText: string;
  fontFamily: string;
};

export type LandingTheme = {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  buttonTextColor: string;
};

export type PreviewMode = "desktop" | "mobile";

export type SectionMoveDirection = "up" | "down";

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
