"use client";

import { Monitor, Smartphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LandingPageRenderer from "@/components/landing-builder/LandingPageRenderer";
import { LandingPage } from "@/lib/landing-page/types";

type Props = {
  page: LandingPage;
  selectedId?: string;
};

type Device = "desktop" | "mobile";

export default function PreviewCanvas({ page, selectedId }: Props) {
  const [device, setDevice] = useState<Device>("desktop");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    if (!selectedId || selectedId === "global") {
      container.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = container.querySelector<HTMLElement>(
      `[data-section-id="${CSS.escape(selectedId)}"]`
    );
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedId]);

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col bg-gray-100">
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
        <p className="text-sm font-bold text-gray-700">المعاينة المباشرة</p>
        <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-bold transition ${
              device === "desktop" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500"
            }`}
          >
            <Monitor size={14} />
            كمبيوتر
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-bold transition ${
              device === "mobile" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500"
            }`}
          >
            <Smartphone size={14} />
            موبايل
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="landing-builder-scrollbar flex-1 overflow-auto p-4"
      >
        <div
          className={`mx-auto overflow-hidden rounded-2xl border border-gray-300 bg-black shadow-2xl transition-all ${
            device === "mobile" ? "w-[390px]" : "w-full max-w-4xl"
          }`}
        >
          <LandingPageRenderer page={page} />
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white px-4 py-2">
        <p className="text-xs text-gray-500">
          معاينة حية مباشرة لكل التعديلات على الصفحة.
        </p>
      </div>
    </div>
  );
}