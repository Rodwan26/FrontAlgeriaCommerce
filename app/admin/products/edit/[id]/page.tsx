"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  category_id: number | null;
  category: Category | null;
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/categories`
          ),
        ]);

        if (!productRes.ok) {
          throw new Error("Product not found");
        }

        if (!categoriesRes.ok) {
          throw new Error("Failed to load categories");
        }

        const productData: Product = await productRes.json();
        const categoriesData: Category[] =
          await categoriesRes.json();

        setProduct(productData);
        setCategories(categoriesData);

        setName(productData.name);
        setDescription(productData.description);
        setPrice(String(productData.price));

        setCategoryId(
          productData.category_id
            ? String(productData.category_id)
            : ""
        );
      } catch (error) {
        console.error(error);
        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [productId]);

  async function updateProduct() {
    if (!name.trim()) {
      alert("Please enter a product name");
      return;
    }

    if (!price) {
      alert("Please enter a price");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            price: Number(price),
            image: product?.image ?? null,
            category_id: categoryId
              ? Number(categoryId)
              : null,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        Product not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Edit Product
        </h1>

        <p className="mt-1 text-gray-500">
          Update your product information.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="space-y-5">
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Product Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Description
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Category
            </label>

            <select
              value={categoryId}
              onChange={(e) =>
                setCategoryId(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-indigo-600"
            >
              <option value="">
                No Category
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Price
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-indigo-600"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() =>
                router.push("/admin/products")
              }
              className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={updateProduct}
              disabled={saving}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

