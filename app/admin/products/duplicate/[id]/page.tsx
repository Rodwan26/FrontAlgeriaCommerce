"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import ProductEditor from "@/components/admin/product-editor/ProductEditor";

function DuplicateProductPage() {
  const params = useParams<{ id: string }>();
  const cloneId = Number(params?.id);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Duplicate Product
        </h1>

        <p className="mt-2 text-gray-500">
          Create a copy based on an existing product.
        </p>
      </div>

      <ProductEditor cloneId={cloneId} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <DuplicateProductPage />
    </Suspense>
  );
}