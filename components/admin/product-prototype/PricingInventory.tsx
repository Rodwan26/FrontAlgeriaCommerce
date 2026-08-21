"use client";

type PricingInventoryProps = {
  price: string;
  stock: string;
  onPriceChange: (value: string) => void;
  onStockChange: (value: string) => void;
};

export default function PricingInventory({
  price,
  stock,
  onPriceChange,
  onStockChange,
}: PricingInventoryProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Pricing & Inventory
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Set the price and available stock.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Price
          </label>

          <div className="relative">
            <input
              type="number"
              value={price}
              onChange={(e) =>
                onPriceChange(e.target.value)
              }
              placeholder="0"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-16 text-gray-900 outline-none focus:border-indigo-600"
            />

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              DZD
            </span>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Stock
          </label>

          <input
            type="number"
            value={stock}
            onChange={(e) =>
              onStockChange(e.target.value)
            }
            placeholder="0"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-indigo-600"
          />
        </div>
      </div>
    </section>
  );
}