import ProductPrototype from "../../../../components/admin/product-prototype/ProductPrototype";

export default function ProductPrototypePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Add Product — Prototype
        </h1>

        <p className="mt-2 text-gray-500">
          Prototype for the new dynamic product creation experience.
        </p>
      </div>

      <ProductPrototype />
    </div>
  );
}