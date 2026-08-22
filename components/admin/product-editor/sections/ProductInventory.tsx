"use client";

type ProductInventoryProps = {
  stock: string;
  onStockChange: (value: string) => void;
};

export default function ProductInventory({
  stock,
  onStockChange,
}: ProductInventoryProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900">
          Inventory
        </h2>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-800">
            SKU
          </label>

          <input
            type="text"
            placeholder="SKU"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-800">
            Quantity
          </label>

          <input
            type="number"
            min="0"
            value={stock}
            onChange={(e) => onStockChange(e.target.value)}
            placeholder="0"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>
    </section>
  );
}
