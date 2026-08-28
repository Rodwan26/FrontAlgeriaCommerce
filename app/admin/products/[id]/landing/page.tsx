"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import LandingPageBuilder from "@/components/admin/landing-builder/LandingPageBuilder";

function LandingEditorPage() {
  const params = useParams<{ id: string }>();
  const productId = Number(params?.id);

  return <LandingPageBuilder productId={productId} />;
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LandingEditorPage />
    </Suspense>
  );
}