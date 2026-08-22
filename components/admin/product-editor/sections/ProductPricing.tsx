"use client";

type ProductPricingProps = {
  price: string;
  onPriceChange: (value: string) => void;
};

export default function ProductPricing({
  price,
  onPriceChange,
}: ProductPricingProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900">
          Pricing
        </h2>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-800">
            Price
          </label>

          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => onPriceChange(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-800">
            Compare-at price
          </label>

          <input
            type="number"
            min="0"
            placeholder="0.00"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>
    </section>
  );
}
