"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CollectionForm from "../../../../../components/admin/collection/CollectionForm";

type Collection = {
  id: number;
  name: string;
};

export default function EditCollectionPage() {
  const { id } = useParams();

  const [collection, setCollection] =
    useState<Collection | null>(null);

  useEffect(() => {
    async function loadCollection() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/collections/${id}`
      );

      if (!res.ok) return;

      const data = await res.json();

      setCollection(data);
    }

    loadCollection();
  }, [id]);

  if (!collection) {
    return (
      <div className="rounded-xl bg-white p-8 shadow-sm">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Collection
        </h1>

        <p className="mt-2 text-gray-500">
          Update collection information.
        </p>
      </div>

      <CollectionForm
        collectionId={collection.id}
        initialName={collection.name}
      />
    </div>
  );
}
