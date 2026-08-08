"use client";

export default function OrderSummary() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal
          </span>

          <span className="font-medium text-gray-900">
            $325.00
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Shipping
          </span>

          <span className="font-medium text-gray-900">
            $15.00
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Discount
          </span>

          <span className="font-medium text-red-600">
            - $20.00
          </span>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-between">
          <span className="text-lg font-bold text-gray-900">
            Total
          </span>

          <span className="text-2xl font-bold text-indigo-600">
            $320.00
          </span>
        </div>
      </div>
    </div>
  );
}