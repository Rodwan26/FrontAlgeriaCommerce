"use client";

import { useEffect, useState } from "react";
import CollectionsHeader from "./CollectionsHeader";
import CollectionRow from "./CollectionRow";

type Collection = {
  id: number;
  name: string;
};

export default function CollectionsTable() {
  const [collections, setCollections] = useState<
    Collection[]
  >([]);

  async function loadCollections() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/collections`
    );

    const data = await res.json();

    setCollections(data);
  }

  useEffect(() => {
    loadCollections();
  }, []);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <CollectionsHeader />

      <div className="mt-6 overflow-hidden rounded-xl border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">
                ID
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Collection
              </th>

              <th className="px-6 py-4 text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {collections.map((collection) => (
              <CollectionRow
                key={collection.id}
                collection={collection}
                refresh={loadCollections}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
