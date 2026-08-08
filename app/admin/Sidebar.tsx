"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  Store,
} 
from "lucide-react";

const links = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
 
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white">
      <div className="flex h-16 items-center gap-3 border-b px-6">
        <Store className="h-6 w-6 text-indigo-600" />

        <span className="text-xl font-bold">
          My Store
        </span>
      </div>

      <nav className="space-y-2 p-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-gray-100"
            >
              <Icon size={20} />

              <span>{link.title}</span>
            </Link>
          );
        })}
        <Link
  href="/admin/categories"
  className="..."
>
  Categories
</Link>
      </nav>
    </aside>
  );
}