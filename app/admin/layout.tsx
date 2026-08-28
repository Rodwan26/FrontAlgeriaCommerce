"use client";

import { useState } from "react";

import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [sidebarWidth, setSidebarWidth] =
    useState(220);

  return (
    <div className="admin-app flex min-h-screen overflow-hidden bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        width={sidebarWidth}
        onClose={() => setSidebarOpen(false)}
        onWidthChange={setSidebarWidth}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main
          className="
            min-w-0 flex-1 overflow-auto
            p-4 sm:p-6 lg:p-8
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
