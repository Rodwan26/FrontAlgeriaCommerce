"use client";

import { Suspense, useEffect, useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  LayoutTemplate,
  Pencil,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { getLandingPageSlug, productPublicUrl } from "@/lib/landing-page/storage";
import { imageUrl } from "@/lib/images";

type DetailProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: string;
  image: string | null;
  category: { id: number; name: string } | null;
};

function ProductDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const productId = Number(params?.id);

  const [product, setProduct] = useState<DetailProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!productId) return;

    let cancelled = false;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load product");
        }

        return res.json();
      })
      .then((data) => {
        if (!cancelled) setProduct(data);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm font-medium text-gray-500">
          Loading...
        </p>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Product not found
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Could not find product #{productId}.
          </p>
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to products
          </button>
        </div>
      </div>
    );
  }

  const slug = getLandingPageSlug(product.id);
  const publicUrl = slug
    ? `${window.location.origin}${productPublicUrl(slug)}`
    : "";
  const lowStock = product.stock <= 5;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100"
            title="Back to products"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="mt-1 text-gray-500">
              Product details
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={publicUrl || "#"}
            target={publicUrl ? "_blank" : undefined}
            rel="noreferrer"
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold transition ${
              publicUrl
                ? "border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
                : "pointer-events-none border-gray-100 text-gray-300"
            }`}
          >
            <ExternalLink size={14} />
            View page
          </a>

          <a
            href={`/admin/products/${product.id}/landing`}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-green-600 transition hover:border-green-300"
          >
            <LayoutTemplate size={14} />
            Landing page
          </a>

          <button
            type="button"
            onClick={() => router.push(`/admin/products/edit/${product.id}`)}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-black text-white transition hover:bg-indigo-500"
          >
            <Pencil size={14} />
            Edit
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:col-span-1">
          <div className="aspect-square w-full bg-gray-50">
            {product.image ? (
              <img
                src={imageUrl(product.image)}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                No Image
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-base font-semibold text-gray-900">
                Information
              </h2>
            </div>

            <dl className="grid gap-x-8 gap-y-4 p-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-gray-500">Category</dt>
                <dd className="mt-1 text-sm font-semibold text-gray-900">
                  {product.category?.name ?? "—"}
                </dd>
              </div>

              <div>
                <dt className="text-sm text-gray-500">Price</dt>
                <dd className="mt-1 text-sm font-semibold text-gray-900">
                  {product.price.toLocaleString("en-US")} DA
                </dd>
              </div>

              <div>
                <dt className="text-sm text-gray-500">Stock</dt>
                <dd className="mt-1">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      lowStock ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}
                  >
                    {product.stock}
                    {lowStock ? " · Low stock" : ""}
                  </span>
                </dd>
              </div>

              <div>
                <dt className="text-sm text-gray-500">Status</dt>
                <dd className="mt-1">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      product.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {product.status === "active" ? "Active" : "Draft"}
                  </span>
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm text-gray-500">Description</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-900">
                  {product.description}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ProductDetailPage />
    </Suspense>
  );
}
