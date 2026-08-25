"use client";

import type { ReactNode } from "react";

import type { PreviewMode } from "../types";

type PreviewCanvasProps = {
  previewMode: PreviewMode;
  children: ReactNode;
};

export default function PreviewCanvas({
  previewMode,
  children,
}: PreviewCanvasProps) {
  return (
    <main
      className="
        relative min-w-0 min-h-0
        flex-1 overflow-auto landing-builder-scrollbar
        bg-[#eef0f3]
        overscroll-contain
        outline-none
        focus:outline-none
      "
    >
      <div
        className="
          flex min-h-full
          w-full justify-center
          px-4 py-6
          sm:px-6 sm:py-8
          lg:px-10
        "
      >
        <div
          className={`
            min-h-0
            overflow-hidden
            bg-white
            shadow-2xl
            transition-[width]
            duration-200
            ${
              previewMode === "mobile"
                ? "w-[390px] max-w-full"
                : "w-full max-w-6xl"
            }
          `}
        >
          {children}
        </div>
      </div>
    </main>
  );
}

