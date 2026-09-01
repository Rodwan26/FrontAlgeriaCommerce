"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

type Collection = {
  id: number;
  name: string;
};

type Props = {
  collection: Collection;
  refresh: () => void;
};

export default function CollectionRow({
  collection,
  refresh,
}: Props) {
  const [deleting, setDeleting] = useState(false);

  async function deleteCollection() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${collection.name}"?`
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/collections/${collection.id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const errorData = await res.json();

        alert(
          errorData.detail ||
            "Failed to delete collection"
        );

        return;
      }

      await refresh();
    } catch (error) {
      console.error(
        "Failed to delete collection:",
        error
      );

      alert(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <tr className="border-b">
      <td className="px-6 py-4">
        {collection.id}
      </td>

      <td className="px-6 py-4">
        {collection.name}
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-center gap-2">
          <Link
            href={`/admin/collections/edit/${collection.id}`}
            className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
          >
            <Pencil size={18} />
          </Link>

          <button
            type="button"
            onClick={deleteCollection}
            disabled={deleting}
            className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
