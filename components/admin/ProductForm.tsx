"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function ProductForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    async function saveProduct() {
const formData = new FormData();

formData.append("name", name);
formData.append("description", description);
formData.append("price", price);
formData.append("stock", stock);

if (image) {
  formData.append("image", image);
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
      image: image ? image.name : "",
    }),
  }
);
if (!res.ok) {
  alert("Failed to create product");
  return;
}
router.push("/admin/products");
}
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");
const [stock, setStock] = useState("");
const [image, setImage] = useState<File | null>(null);

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-2 block text-base font-semibold text-gray-700">
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
className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-indigo-600"/>
          </div>

          <div>
            <label className="mb-2 block text-base font-semibold text-gray-800">
              Description
            </label>

           <textarea
  rows={5}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-indigo-600"/>
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
className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-indigo-600"/>
            </div>

            <div>
              <label className="mb-2 block text-base font-semibold text-gray-800">
                Stock
              </label>

              <input
  type="number"
  value={stock}
  onChange={(e) => setStock(e.target.value)}
className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-indigo-600"/>
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
    onChange={(e) => {
      if (e.target.files?.[0]) {
        setImage(e.target.files[0]);
      }
    }}
  />

  <span className="text-gray-500">
    {image ? image.name : "Upload Image"}
  </span>
</label>
      </div>
      <div className="mt-8 flex justify-end gap-4">
 <button
  type="button"
  onClick={() => router.push("/admin/products")}
  className="rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-800 shadow-sm transition hover:bg-gray-50"
>
  Cancel
</button>

  <button
  type="button"
  onClick={saveProduct}
  className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
>
  Save Product
</button>
</div>
    </div>
  );
}