"use client";

import { imageUrl } from "../../../lib/images";
const products = [
  {
    id: 1,
    name: "Nike Air Max",
    image: "/images/product.png",
    quantity: 2,
    price: 120,
  },
  {
    id: 2,
    name: "Adidas Hoodie",
    image: "/images/product.png",
    quantity: 1,
    price: 85,
  },
];
export default function ProductsCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900">
        Products
      </h2>

      <div className="space-y-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
          >
            <div className="flex items-center gap-4">
             <img
  src={imageUrl(product.image)}
  alt={product.name}
  className="h-full w-full object-cover"
/>

              <div>
                <h3 className="font-semibold text-gray-900">
                  {product.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Quantity: {product.quantity}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-gray-900">
                ${product.price}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Each
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}