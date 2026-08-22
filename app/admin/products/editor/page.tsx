import ProductEditor from "../../../../components/admin/product-editor/ProductEditor";

export default function ProductEditorPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Add Product
        </h1>

        <p className="mt-2 text-gray-500">
          Create and manage your product.
        </p>
      </div>

      <ProductEditor />
    </div>
  );
}
