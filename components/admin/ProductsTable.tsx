"use client";

import { useEffect, useState } from "react";
import ProductRow from "./ProductRow";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
};

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);

  async function loadProducts() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`
    );

    const data = await res.json();

    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr className="text-left text-sm font-semibold text-gray-600">
            <th className="px-6 py-4">Image</th>
            <th className="px-6 py-4">Product</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}