"use client";

import { ReactNode } from "react";

type ProductSidebarProps = {
  children: ReactNode;
};

export default function ProductSidebar({
  children,
}: ProductSidebarProps) {
  return (
    <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      {children}
    </div>
  );
}
