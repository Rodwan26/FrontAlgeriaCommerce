"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  Store,
  X,
} from "lucide-react";
import { useRef } from "react";

type SidebarProps = {
  isOpen: boolean;
  width: number;
  onClose: () => void;
  onWidthChange: (width: number) => void;
};

const MIN_WIDTH = 68;
const MAX_WIDTH = 208;
const COLLAPSE_THRESHOLD = 110;

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
    title: "Categories",
    href: "/admin/categories",
    icon: Package,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  isOpen,
  width,
  onClose,
  onWidthChange,
}: SidebarProps) {
  const dragging = useRef(false);
  const wasDragged = useRef(false);

  const collapsed = width <= COLLAPSE_THRESHOLD;

  const startResize = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (window.innerWidth < 1024) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    dragging.current = true;
    wasDragged.current = false;

    const startX = event.clientX;
    const startWidth = width;

    const handleMove = (moveEvent: PointerEvent) => {
      if (!dragging.current) {
        return;
      }

      const delta = moveEvent.clientX - startX;

      if (Math.abs(delta) > 3) {
        wasDragged.current = true;
      }

      const nextWidth = Math.max(
        MIN_WIDTH,
        Math.min(MAX_WIDTH, startWidth + delta)
      );

      onWidthChange(nextWidth);
    };

    const handleUp = () => {
      dragging.current = false;

      window.removeEventListener(
        "pointermove",
        handleMove
      );

      window.removeEventListener(
        "pointerup",
        handleUp
      );
    };

    window.addEventListener(
      "pointermove",
      handleMove
    );

    window.addEventListener(
      "pointerup",
      handleUp
    );
  };

  const handleBarClick = () => {
    if (wasDragged.current) {
      wasDragged.current = false;
      return;
    }

    if (collapsed) {
      onWidthChange(MAX_WIDTH);
    } else {
      onWidthChange(MIN_WIDTH);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: `${width}px`,
        }}
        className={`
          fixed inset-y-0 left-0 z-[9999]
          flex flex-col
          border-r border-gray-200 bg-white
          select-none
          transition-[width,transform] duration-200 ease-out
          lg:static lg:z-auto lg:translate-x-0
          lg:shrink-0
          ${isOpen
            ? "translate-x-0"
            : "-translate-x-full"}
          max-lg:w-52
        `}
      >
        {/* Clickable top bar */}
        <button
          type="button"
          onClick={handleBarClick}
          title={
            collapsed
              ? "Open sidebar"
              : "Collapse sidebar"
          }
          className={`
            flex h-16 w-full shrink-0
            items-center
            border-b border-gray-200
            bg-white
            outline-none
            focus:outline-none
            focus-visible:outline-none
            hover:bg-gray-50
            ${collapsed
              ? "justify-center px-2"
              : "justify-between px-5"}
          `}
        >
          <div
            className={`
              flex min-w-0 items-center
              ${collapsed
                ? "justify-center"
                : "gap-3"}
            `}
          >
            <Store
              className="h-6 w-6 shrink-0 text-indigo-600"
            />

            {!collapsed && (
              <span className="truncate text-xl font-bold text-gray-900">
                My Store
              </span>
            )}
          </div>

          {!collapsed && (
            <span
              role="button"
              tabIndex={0}
              onClick={(event) => {
                event.stopPropagation();
                onClose();
              }}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();
                  event.stopPropagation();
                  onClose();
                }
              }}
              className="
                rounded-lg p-2
                text-gray-500
                outline-none
                hover:bg-gray-100
                lg:hidden
              "
              aria-label="Close menu"
            >
              <X size={20} />
            </span>
          )}
        </button>

        {/* Navigation */}
        <nav
          className={`
            flex-1 overflow-y-auto overflow-x-hidden
            ${collapsed
              ? "space-y-2 p-2"
              : "space-y-2 p-4"}
          `}
        >
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                title={
                  collapsed
                    ? link.title
                    : undefined
                }
                className={`
                  flex items-center rounded-xl
                  text-gray-700
                  outline-none
                  focus:outline-none
                  focus-visible:outline-none
                  transition
                  hover:bg-gray-100
                  hover:text-indigo-600
                  ${collapsed
                    ? "justify-center px-2 py-3"
                    : "gap-3 px-4 py-3"}
                `}
              >
                <Icon
                  size={20}
                  className="shrink-0"
                />

                {!collapsed && (
                  <span className="font-medium">
                    {link.title}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Invisible resize edge */}
        <div
          role="separator"
          aria-label="Resize sidebar"
          aria-orientation="vertical"
          onPointerDown={startResize}
          className="
            absolute right-0 top-0
            hidden h-full w-1
            cursor-col-resize
            select-none
            outline-none
            lg:block
            hover:bg-gray-200/40
            active:bg-gray-300/40
          "
        />
      </aside>
    </>
  );
}

