export type ProductFeature = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type ProductTheme = {
  primary: string;
  primaryHover: string;
  background: string;
  surface: string;
  border: string;
  text: string;
  mutedText: string;
};

export type Product = {
  id: string;

  name: string;
  brand: string;

  badge: string;

  title: string;
  highlightedTitle: string;
  description: string;

  price: number;
  currency: string;

  heroImage: string;

  features: ProductFeature[];

  theme: ProductTheme;
};