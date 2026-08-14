export type ProductFeature = {
  id: number;
  image: string;
  title: string;
  description: string;
};

export type Product = {
  name: string;
  brand: string;
  price: number;
  currency: string;
  heroImage: string;
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
  features: ProductFeature[];
};