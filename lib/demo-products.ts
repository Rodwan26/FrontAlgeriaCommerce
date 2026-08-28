export type DemoProductStatus = "active" | "draft";

export type DemoProduct = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image: string | null;
  status: DemoProductStatus;
};

export const DEMO_PRODUCTS: DemoProduct[] = [
  {
    id: 1,
    name: "HOKA Running Shoe",
    description: "Premium running shoes designed for comfort and performance.",
    category: "Shoes",
    price: 29900,
    stock: 25,
    image: "/products/hero.jpg",
    status: "active",
  },
  {
    id: 2,
    name: "Premium Sport Shoes",
    description: "Lightweight sport shoes for everyday training.",
    category: "Shoes",
    price: 24900,
    stock: 3,
    image: "/products/hero.jpg",
    status: "active",
  },
  {
    id: 3,
    name: "Urban Running Shoes",
    description: "Modern running shoes with a comfortable lightweight design.",
    category: "Sports",
    price: 27900,
    stock: 12,
    image: "/products/hero.jpg",
    status: "draft",
  },
];

export function getDemoProduct(id: number): DemoProduct | undefined {
  return DEMO_PRODUCTS.find((product) => product.id === id);
}

export function getDemoCategories(): string[] {
  return Array.from(
    new Set(DEMO_PRODUCTS.map((product) => product.category).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));
}