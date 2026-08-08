"use client";

import { MapPin } from "lucide-react";

export default function ShippingCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900">
        Shipping Address
      </h2>

      <div className="flex gap-3">
        <MapPin
          size={20}
          className="mt-1 text-indigo-600"
        />

        <div className="space-y-1 text-gray-700">
          <p>Ahmed Ali</p>
          <p>123 Main Street</p>
          <p>Algiers</p>
          <p>Algeria</p>
        </div>
      </div>
    </div>
  );
}