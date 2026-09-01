"use client";

import { ImagePlus, X } from "lucide-react";

type ProductMediaProps = {
  preview: string;
  onFileChange: (file: File | null) => void;
  error?: string;
};

export default function ProductMedia({
  preview,
  onFileChange,
  error,
}: ProductMediaProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900">
          Media
        </h2>
      </div>

      <div className="p-5">
        {preview ? (
          <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <img
              src={preview}
              alt="Product preview"
              className="h-72 w-full object-contain"
            />

            <button
              type="button"
              onClick={() => onFileChange(null)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-md hover:bg-gray-100"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/30">
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                onFileChange(e.target.files?.[0] ?? null);
              }}
            />

            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-sm">
              <ImagePlus size={22} className="text-gray-500" />
            </div>

            <p className="text-sm font-semibold text-gray-800">
              Add product media
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Upload images to showcase your product
            </p>
          </label>
        )}

        {error && (
          <p className="mt-3 text-sm font-medium text-red-600">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
