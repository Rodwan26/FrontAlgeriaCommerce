"use client";

type ProductImagesProps = {
  preview: string;
  onFileChange: (file: File | null) => void;
};

export default function ProductImages({
  preview,
  onFileChange,
}: ProductImagesProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Product Images
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add a clear image of your product.
        </p>
      </div>

      <label className="flex min-h-64 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-indigo-500 hover:bg-indigo-50">
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) =>
            onFileChange(e.target.files?.[0] ?? null)
          }
        />

        {preview ? (
          <img
            src={preview}
            alt="Product preview"
            className="max-h-64 max-w-full rounded-xl object-contain"
          />
        ) : (
          <div className="text-center">
            <p className="font-semibold text-gray-700">
              Click to upload an image
            </p>

            <p className="mt-1 text-sm text-gray-400">
              PNG, JPG or JPEG
            </p>
          </div>
        )}
      </label>
    </section>
  );
}