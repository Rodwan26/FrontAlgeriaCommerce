"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  LayoutTemplate,
  Loader2,
  Save,
  SlidersHorizontal,
  Smartphone,
} from "lucide-react";
import { useRouter } from "next/navigation";
import SectionSidebar from "./SectionSidebar";
import PreviewCanvas from "./PreviewCanvas";
import DesignPanel from "./DesignPanel";
import { useLandingPage } from "@/lib/landing-page/useLandingPage";
import { saveLandingPage, productPublicUrl } from "@/lib/landing-page/storage";
import { createSection, SellerProduct } from "@/lib/landing-page/defaults";
import {
  DEFAULT_COLORS,
  LandingColors,
  LandingPage,
  SectionType,
} from "@/lib/landing-page/types";
import { imageUrl } from "@/lib/images";

type Props = {
  productId: number;
};

export default function LandingPageBuilder({ productId }: Props) {
  const router = useRouter();
  const [product, setProduct] = useState<SellerProduct | null>(null);
  const [selectedId, setSelectedId] = useState<string>("global");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState<"sections" | "design" | "preview">("design");

  const { page, setPage, ready } = useLandingPage(productId, product);

  useEffect(() => {
    let cancelled = false;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        setProduct({
          id: data.id,
          name: data.name ?? "",
          description: data.description ?? "",
          price: Number(data.price) || 0,
          image: data.image ? imageUrl(data.image) : null,
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [productId]);

  const patchGlobal = (patch: Partial<Pick<LandingPage, "brand" | "title" | "slug">>) => {
    if (!page) return;
    setPage({ ...page, ...patch });
  };

  const patchGlobalColors = (patch: Partial<LandingColors>) => {
    if (!page) return;
    setPage({ ...page, headerColors: { ...page.headerColors, ...patch } });
  };

  const patchSection = (id: string, patch: Record<string, any>) => {
    if (!page) return;
    setPage({
      ...page,
      sections: page.sections.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });
  };

  const toggleSection = (id: string) => {
    if (!page) return;
    setPage({
      ...page,
      sections: page.sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    });
  };

  const removeSection = (id: string) => {
    if (!page) return;
    setPage({ ...page, sections: page.sections.filter((s) => s.id !== id) });
    if (selectedId === id) setSelectedId("global");
  };

  const moveSection = (id: string, direction: -1 | 1) => {
    if (!page) return;
    const index = page.sections.findIndex((s) => s.id === id);
    const to = index + direction;
    if (index < 0 || to < 0 || to >= page.sections.length) return;
    const sections = [...page.sections];
    const [item] = sections.splice(index, 1);
    sections.splice(to, 0, item);
    setPage({ ...page, sections });
  };

  const addSection = (type: SectionType) => {
    if (!page) return;
    const section = createSection(type, { ...DEFAULT_COLORS });
    const footerIndex = page.sections.findIndex((s) => s.type === "footer");
    const sections = [...page.sections];
    if (footerIndex >= 0) sections.splice(footerIndex, 0, section);
    else sections.push(section);
    setPage({ ...page, sections });
    selectSection(section.id);
  };

  const handleSave = () => {
    if (!page || !page.slug) return;
    saveLandingPage(page);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const selectGlobal = () => {
    setSelectedId("global");
  };

  const selectSection = (id: string) => {
    setSelectedId(id);
  };

  const selectedSection = page?.sections.find((s) => s.id === selectedId) ?? null;

  if (!ready || !page) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 size={28} className="animate-spin text-gray-400" />
      </div>
    );
  }

  const publicUrl =
    typeof window !== "undefined" && page.slug
      ? `${window.location.origin}${productPublicUrl(page.slug)}`
      : "";

  const designPanelProps = {
    global: {
      brand: page.brand,
      title: page.title,
      slug: page.slug,
      colors: page.headerColors,
      onPatch: patchGlobal,
      onPatchColors: patchGlobalColors,
    },
    selectedSection,
    onPatchSection: patchSection,
  };

  return (
    <div dir="rtl" className="flex h-full flex-col">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100"
            title="العودة للمنتجات"
          >
            <ArrowRight size={18} />
          </button>
          <div>
            <h1 className="text-lg font-black text-gray-900">محرر صفحة الهبوط</h1>
            <p className="text-xs text-gray-500">{page.title || product?.name || `المنتج ${productId}`}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {page.slug ? (
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(publicUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-600 transition hover:border-indigo-300 hover:text-indigo-600"
              title={publicUrl}
            >
              {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
              <span dir="ltr">{page.slug ? `/${page.slug}` : ""}</span>
            </button>
          ) : null}

          <a
            href={publicUrl || "/p/placeholder"}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-600 transition hover:border-indigo-300 hover:text-indigo-600"
          >
            <ExternalLink size={14} />
            عرض
          </a>

          <button
            type="button"
            onClick={handleSave}
            disabled={!page.slug}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-black text-white shadow-sm transition active:scale-95 disabled:opacity-50 ${
              saved ? "bg-green-600" : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {saved ? <Check size={14} /> : <Save size={14} />}
            {saved ? "تم الحفظ" : "حفظ"}
          </button>
        </div>
      </div>

      {/* =========================
          DESKTOP LAYOUT (lg+)
      ========================== */}
      <div className="hidden h-[calc(100vh-220px)] min-h-[520px] items-stretch gap-4 rounded-2xl border border-gray-200 bg-white shadow-sm lg:flex">
        <div className="w-60 shrink-0 overflow-hidden border-l border-gray-200">
          <SectionSidebar
            page={page}
            selectedId={selectedId}
            onSelectGlobal={selectGlobal}
            onSelectSection={selectSection}
            onToggleSection={toggleSection}
            onRemoveSection={removeSection}
            onMoveSection={moveSection}
            onAddSection={addSection}
          />
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <PreviewCanvas page={page} selectedId={selectedId} />
        </div>

        <div className="w-80 shrink-0 overflow-hidden border-r border-gray-200">
          <DesignPanel {...designPanelProps} />
        </div>
      </div>

      {/* =========================
          MOBILE LAYOUT (<lg)
      ========================== */}
      <div className="flex flex-col gap-3 lg:hidden">
        <div className="flex h-11 shrink-0 items-center overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <SectionSidebar
            page={page}
            selectedId={selectedId}
            variant="chips"
            onSelectGlobal={selectGlobal}
            onSelectSection={selectSection}
            onToggleSection={toggleSection}
            onRemoveSection={removeSection}
            onMoveSection={moveSection}
            onAddSection={addSection}
          />
        </div>

        <div className="grid shrink-0 grid-cols-3 gap-1 rounded-2xl border border-gray-200 bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setMobileTab("sections")}
            className={`flex h-10 items-center justify-center gap-1.5 rounded-xl text-xs font-black transition active:scale-95 ${
              mobileTab === "sections"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <LayoutTemplate size={15} />
            الأقسام
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("design")}
            className={`flex h-10 items-center justify-center gap-1.5 rounded-xl text-xs font-black transition active:scale-95 ${
              mobileTab === "design"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <SlidersHorizontal size={15} />
            التصميم
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("preview")}
            className={`flex h-10 items-center justify-center gap-1.5 rounded-xl text-xs font-black transition active:scale-95 ${
              mobileTab === "preview"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Smartphone size={15} />
            المعاينة
          </button>
        </div>

        <div className="h-[calc(100vh-370px)] min-h-[380px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {mobileTab === "sections" ? (
            <SectionSidebar
              page={page}
              selectedId={selectedId}
              onSelectGlobal={selectGlobal}
              onSelectSection={selectSection}
              onToggleSection={toggleSection}
              onRemoveSection={removeSection}
              onMoveSection={moveSection}
              onAddSection={addSection}
            />
          ) : mobileTab === "design" ? (
            <div className="custom-scrollbar h-full overflow-y-auto">
              <DesignPanel {...designPanelProps} />
            </div>
          ) : (
            <PreviewCanvas page={page} selectedId={selectedId} />
          )}
        </div>
      </div>
    </div>
  );
}