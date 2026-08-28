"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import ProductEditor from "@/components/admin/product-editor/ProductEditor";

function EditProductPage() {
  const params = useParams<{ id: string }>();
  const productId = Number(params?.id);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Edit Product
        </h1>

        <p className="mt-2 text-gray-500">
          Update your product information.
        </p>
      </div>

      <ProductEditor productId={productId} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <EditProductPage />
    </Suspense>
  );
}