import CollectionForm from "../../../../components/admin/collection/CollectionForm";

export default function NewCollectionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Add Collection
        </h1>

        <p className="mt-2 text-gray-500">
          Create a new product collection.
        </p>
      </div>

      <CollectionForm />
    </div>
  );
}
