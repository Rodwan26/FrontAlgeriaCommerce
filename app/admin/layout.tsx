import type { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}