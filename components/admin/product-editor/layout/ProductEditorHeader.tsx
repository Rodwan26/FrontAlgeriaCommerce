"use client";

import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";

type ProductEditorHeaderProps = {
  onSave?: () => void;
};

export default function ProductEditorHeader({
  onSave,
}: ProductEditorHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Back to products"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-500">
              Products
            </p>

            <h1 className="truncate text-lg font-semibold text-gray-900">
              Add product
            </h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onSave}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <Save size={16} />
            Save
          </button>
        </div>
      </div>
    </header>
  );
}
