import ProductForm from "../../../../components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Add Product
        </h1>

        <p className="mt-2 text-gray-500">
          Create a new product for your store.
        </p>
      </div>

      <ProductForm />
    </div>
  );
}