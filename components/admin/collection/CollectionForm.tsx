"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  initialName?: string;
  collectionId?: number;
};

export default function CollectionForm({
  initialName = "",
  collectionId,
}: Props) {
  const router = useRouter();

  const [name, setName] = useState(initialName);

  async function saveCollection() {
    const url = collectionId
      ? `${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/collections`;

    const method = collectionId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    if (!res.ok) {
      alert("Failed to save collection");
      return;
    }

    router.push("/admin/collections");
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Collection Information
      </h2>

      <div>
        <label className="mb-2 block font-semibold">
          Collection Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter collection name"
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black outline-none focus:border-indigo-600"
        />
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/collections")}
          className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={saveCollection}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
        >
          {collectionId
            ? "Update Collection"
            : "Save Collection"}
        </button>
      </div>
    </div>
  );
}
