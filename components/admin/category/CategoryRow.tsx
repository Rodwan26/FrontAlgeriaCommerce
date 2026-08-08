"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

type Category = {
  id: number;
  name: string;
};

type Props = {
  category: Category;
  refresh: () => void;
};

export default function CategoryRow({
  category,
  refresh,
}: Props) {
  const [deleting, setDeleting] = useState(false);


async function deleteCategory() {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${category.name}"?`
  );

  if (!confirmed) {
    return;
  }

  setDeleting(true);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${category.id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      const errorData = await res.json();

      alert(
        errorData.detail || "Failed to delete category"
      );

      return;
    }

    await refresh();
  } catch (error) {
    console.error("Failed to delete category:", error);

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
        {category.id}
      </td>

      <td className="px-6 py-4">
        {category.name}
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-center gap-2">
          <Link
            href={`/admin/categories/edit/${category.id}`}
            className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
          >
            <Pencil size={18} />
          </Link>

          <button
            type="button"
            onClick={deleteCategory}
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

