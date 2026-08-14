"use client";

import {
  Bell,
  Menu,
  Search,
  UserCircle2,
} from "lucide-react";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-white/95 px-4 
backdrop-blur-sm sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl p-2 text-gray-600 transition hover:bg-gray-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold text-gray-800 sm:text-xl">
            Dashboard
          </h1>

          <p className="hidden text-xs text-gray-500 sm:block">
            Manage your store
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        <button
          type="button"
          className="hidden rounded-xl p-2 text-gray-500 transition hover:bg-gray-100 sm:block"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        <button
          type="button"
          className="rounded-xl p-2 text-gray-500 transition hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>

        <UserCircle2 className="h-8 w-8 text-indigo-600" />
      </div>
    </header>
  );
}
