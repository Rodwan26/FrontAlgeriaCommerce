"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink, Loader2, Pencil, Search, Trash2 } from "lucide-react";
import {
  deleteLandingPage,
  listLandingPages,
} from "@/lib/landing-page/storage";
import { LandingPage } from "@/lib/landing-page/types";

export default function LandingPagesTable() {
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  async function loadPages() {
    try {
      setLoading(true);
      setPages(await listLandingPages());
    } catch (error) {
      console.error("Failed to load landing pages:", error);
      setPages([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPages();
  }, []);

  const filteredPages = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return pages;
    }

    return pages.filter((page) => {
      return (
        (page.title ?? "").toLowerCase().includes(value) ||
        (page.brand ?? "").toLowerCase().includes(value) ||
        page.slug.toLowerCase().includes(value) ||
        (page.product?.name ?? "").toLowerCase().includes(value)
      );
    });
  }, [pages, search]);

  async function handleDelete(page: LandingPage) {
    if (
      !window.confirm(
        `هل أنت متأكد من حذف صفحة الهبوط "${page.title || page.slug}"؟\nلا يمكن التراجع عن هذا الإجراء.`
      )
    ) {
      return;
    }

    setDeletingSlug(page.slug);

    const ok = await deleteLandingPage(page.slug);

    setDeletingSlug(null);

    if (!ok) {
      alert("تعذّر حذف صفحة الهبوط. تأكد من الاتصال بالخادم وحاول مجددًا.");
      return;
    }

    await loadPages();
  }

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border bg-white shadow-sm">
        <Loader2 size={26} className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="ابحث بالعنوان أو العلامة أو الرابط أو المنتج..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <span className="shrink-0 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
            {pages.length} صفحة
          </span>
        </div>
      </div>

      {/* Table */}
      {filteredPages.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
          <p className="font-medium text-gray-700">
            {pages.length === 0
              ? "لا توجد صفحات هبوط بعد."
              : "لا توجد نتائج مطابقة لبحثك."}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            أنشئ صفحة هبوط لأي منتج من صفحة المنتج ثم عُد إلى هنا لإدارتها.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    صفحة الهبوط
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    الرابط
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    المنتج
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    الإجراءات
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredPages.map((page) => {
                  const canEdit = page.productId > 0;

                  return (
                    <tr
                      key={page.id}
                      className="border-t transition hover:bg-gray-50"
                    >
                      {/* Page */}
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">
                          {page.title || "بدون عنوان"}
                        </p>

                        {page.brand ? (
                          <p className="mt-1 text-sm text-gray-500">
                            {page.brand}
                          </p>
                        ) : null}
                      </td>

                      {/* Slug */}
                      <td className="px-6 py-4">
                        <a
                          href={`/p/${page.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                          dir="ltr"
                        >
                          /p/{page.slug}
                        </a>
                      </td>

                      {/* Product */}
                      <td className="px-6 py-4">
                        {page.product ? (
                          <span className="text-sm font-medium text-gray-800">
                            {page.product.name}
                          </span>
                        ) : (
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                            بدون منتج
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={`/p/${page.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                            title="فتح الصفحة العامة"
                          >
                            <ExternalLink size={18} />
                          </a>

                          {canEdit ? (
                            <Link
                              href={`/admin/products/${page.productId}/landing`}
                              className="rounded-lg bg-indigo-100 p-2 text-indigo-600 transition hover:bg-indigo-200"
                              title="تعديل الصفحة"
                            >
                              <Pencil size={18} />
                            </Link>
                          ) : (
                            <span
                              className="cursor-not-allowed rounded-lg bg-gray-100 p-2 text-gray-400"
                              title="لا يوجد منتج مرتبط"
                            >
                              <Pencil size={18} />
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDelete(page)}
                            disabled={deletingSlug === page.slug}
                            className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200 disabled:opacity-50"
                            title="حذف الصفحة"
                          >
                            {deletingSlug === page.slug ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}