"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Category = {
  id: number;
  name: string;
};

export default function ProductForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );

        if (!res.ok) {
          throw new Error("Failed to load categories");
        }

        const data = await res.json();

        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    }

    loadCategories();
  }, []);

  async function uploadImage(file: File) {
    const formData = new FormData();

    formData.append("image", file);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/upload/product-image`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      alert("Image upload failed");
      return;
    }

    const data = await res.json();

    setUploadedImage(data.url);
  }

  async function saveProduct() {
    if (!name.trim()) {
      alert("Please enter a product name");
      return;
    }

    if (!price) {
      alert("Please enter a price");
      return;
    }

    if (!categoryId) {
      alert("Please select a category");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          image: uploadedImage,
          category_id: Number(categoryId),
        }),
      }
    );

    if (!res.ok) {
      alert("Failed to create product");
      return;
    }

    router.push("/admin/products");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Product Information
        </h2>

        <div className="space-y-5">
          <div>
            <label className="mb-3 block text-base font-semibold text-gray-800">
              Product Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-900 outline-none transition focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-base font-semibold text-gray-800">
              Description
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-900 outline-none transition focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-base font-semibold text-gray-800">
              Category
            </label>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-900 outline-none transition focus:border-indigo-600"
            >
              <option value="">Select a category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-base font-semibold text-gray-800">
                Price
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-900 outline-none transition focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-base font-semibold text-gray-800">
                Stock
              </label>

              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-900 outline-none transition focus:border-indigo-600"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-2 block text-base font-semibold text-gray-800">
          Product Image
        </h2>

        <label className="flex h-72 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 hover:border-indigo-500">
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={async (e) => {
              if (!e.target.files?.[0]) return;

              const file = e.target.files[0];

              setImage(file);
              setPreview(URL.createObjectURL(file));

              await uploadImage(file);
            }}
          />

          {preview ? (
            <img
              src={preview}
              alt="Product preview"
              className="h-full w-full rounded-xl object-contain"
            />
          ) : (
            <div className="text-center text-gray-500">
              <p className="font-medium">
                Click to upload product image
              </p>

              <p className="mt-1 text-sm">
                PNG, JPG or JPEG
              </p>
            </div>
          )}
        </label>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={saveProduct}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}

