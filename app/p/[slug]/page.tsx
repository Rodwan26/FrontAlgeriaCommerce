"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import { usePublicLandingPage } from "@/lib/landing-page/useLandingPage";
import LandingPageRenderer from "@/components/landing-builder/LandingPageRenderer";

function PublicLandingPage() {
  const params = useParams<{ slug: string }>();
  const { page, ready } = usePublicLandingPage(params?.slug ?? "");

  if (!ready) {
    return <div className="min-h-screen bg-black" />;
  }

  if (!page) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4">
        <div className="text-center">
          <p className="text-2xl font-black text-white">الصفحة غير موجودة</p>
          <p className="mt-2 text-sm text-gray-500">
            لم يتم إنشاء صفحة هبوط لهذا المنتج بعد.
          </p>
        </div>
      </div>
    );
  }

  return <LandingPageRenderer page={page} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <PublicLandingPage />
    </Suspense>
  );
}