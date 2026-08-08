import CategoryForm from "../../../../components/admin/category/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Add Category
        </h1>

        <p className="mt-2 text-gray-500">
          Create a new product category.
        </p>
      </div>

      <CategoryForm />
    </div>
  );
}