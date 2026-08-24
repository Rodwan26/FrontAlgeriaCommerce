export type LandingSectionType =
  | "hero"
  | "product"
  | "image"
  | "features"
  | "testimonials"
  | "faq"
  | "order-form";

export type LandingSection = {
  id: string;
  type: LandingSectionType;
  enabled: boolean;
  settings: Record<string, unknown>;
};

export type LandingTheme = {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  buttonTextColor: string;
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
