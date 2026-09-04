"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, LayoutTemplate, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLandingPageSlug, productPublicUrl } from "@/lib/landing-page/storage";

type ProductEditorHeaderProps = {
  onSave?: () => void;
  title?: string;
  productId?: number;
};

export default function ProductEditorHeader({
  onSave,
  title = "Add product",
  productId,
}: ProductEditorHeaderProps) {
  const router = useRouter();
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setSlug(null);
      return;
    }

    let cancelled = false;

    getLandingPageSlug(productId)
      .then((value) => {
        if (!cancelled) setSlug(value);
      })
      .catch(() => {
        if (!cancelled) setSlug(null);
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  const publicUrl =
    slug && typeof window !== "undefined"
      ? `${window.location.origin}${productPublicUrl(slug)}`
      : "";

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Back to products"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-500">
              Products
            </p>

            <h1 className="truncate text-lg font-semibold text-gray-900">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {productId ? (
            <>
              <a
                href={publicUrl || "#"}
                target={publicUrl ? "_blank" : undefined}
                rel="noreferrer"
                className={`hidden items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold transition sm:flex ${
                  publicUrl
                    ? "border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
                    : "pointer-events-none border-gray-100 text-gray-300"
                }`}
              >
                <ExternalLink size={14} />
                View page
              </a>

              <a
                href={`/admin/products/${productId}`}
                className="hidden items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-600 transition hover:border-indigo-300 hover:text-indigo-600 sm:flex"
              >
                Details
              </a>

              <a
                href={`/admin/products/${productId}/landing`}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-green-600 transition hover:border-green-300"
              >
                <LayoutTemplate size={14} />
                <span className="hidden sm:inline">Landing</span>
              </a>
            </>
          ) : null}

          <button
            type="button"
            onClick={onSave}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <Save size={16} />
            Save
          </button>
        </div>
      </div>
    </header>
  );
}