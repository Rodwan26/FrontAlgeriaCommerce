"use client";

import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  LayoutTemplate,
  Plus,
  Trash2,
} from "lucide-react";
import { LandingPage, LandingSection, SectionType } from "@/lib/landing-page/types";
import { getSectionLabel } from "./DesignPanel";

const AVAILABLE_TYPES: SectionType[] = [
  "hero",
  "features",
  "gallery",
  "testimonials",
  "faq",
  "order-form",
  "footer",
];

type Props = {
  page: LandingPage;
  selectedId: string;
  variant?: "panel" | "chips";
  onSelectGlobal: () => void;
  onSelectSection: (id: string) => void;
  onToggleSection: (id: string) => void;
  onRemoveSection: (id: string) => void;
  onMoveSection: (id: string, direction: -1 | 1) => void;
  onAddSection: (type: SectionType) => void;
};

export default function SectionSidebar({
  page,
  selectedId,
  variant = "panel",
  onSelectGlobal,
  onSelectSection,
  onToggleSection,
  onRemoveSection,
  onMoveSection,
  onAddSection,
}: Props) {
  if (variant === "chips") {
    return (
      <div className="flex h-full shrink-0 items-center gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap px-3 py-2">
        <Chip
          active={selectedId === "global"}
          label="الرأس"
          onClick={onSelectGlobal}
        />
        {page.sections.map((section) => (
          <Chip
            key={section.id}
            active={selectedId === section.id}
            label={getSectionLabel(section.type)}
            enabled={section.enabled}
            onClick={() => onSelectSection(section.id)}
          />
        ))}
      </div>
    );
  }

  const count = (type: SectionType) => page.sections.filter((s) => s.type === type).length;

  const canAdd = (type: SectionType) => {
    if (type === "hero" || type === "footer") return count(type) === 0;
    if (type === "order-form") return count(type) === 0;
    return true;
  };

  return (
    <aside className="flex h-full flex-col bg-white">
      <div className="border-b border-gray-200 px-4 py-3">
        <h3 className="text-sm font-bold text-gray-900">الأقسام</h3>
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto p-3">
        <button
          type="button"
          onClick={onSelectGlobal}
          className={`mb-2 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-right text-sm font-bold transition ${
            selectedId === "global"
              ? "bg-indigo-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <LayoutTemplate size={16} />
          الرأس والإعدادات العامة
        </button>

        <div className="space-y-2">
          {page.sections.map((section) => (
            <SectionItem
              key={section.id}
              section={section}
              selected={selectedId === section.id}
              onSelect={() => onSelectSection(section.id)}
              onToggle={() => onToggleSection(section.id)}
              onRemove={() => onRemoveSection(section.id)}
              onMoveUp={() => onMoveSection(section.id, -1)}
              onMoveDown={() => onMoveSection(section.id, 1)}
              canRemove={page.sections.length > 1}
            />
          ))}
        </div>

        <div className="mt-5 border-t border-gray-200 pt-4">
          <p className="mb-2 text-xs font-bold text-gray-500">إضافة قسم</p>
          <div className="grid grid-cols-2 gap-2">
            {AVAILABLE_TYPES.filter(canAdd).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onAddSection(type)}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-2 py-2 text-xs font-semibold text-gray-700 transition hover:border-indigo-300 hover:text-indigo-600"
              >
                <Plus size={13} />
                {getSectionLabel(type)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function Chip({
  active,
  label,
  enabled,
  onClick,
}: {
  active: boolean;
  label: string;
  enabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition ${
        active
          ? "border-indigo-600 bg-indigo-600 text-white"
          : "border-gray-200 bg-white text-gray-700 hover:border-indigo-300"
      }`}
    >
      {enabled !== undefined ? (
        <span
          className={`h-1.5 w-1.5 rounded-full ${enabled ? "bg-green-500" : "bg-gray-300"}`}
        />
      ) : null}
      {label}
    </button>
  );
}

function SectionItem({
  section,
  selected,
  onSelect,
  onToggle,
  onRemove,
  onMoveUp,
  onMoveDown,
  canRemove,
}: {
  section: LandingSection;
  selected: boolean;
  onSelect: () => void;
  onToggle: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canRemove: boolean;
}) {
  return (
    <div
      className={`group rounded-xl border transition ${
        selected
          ? "border-indigo-300 bg-indigo-50"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full items-center gap-2 px-3 py-2.5 text-right"
      >
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${section.enabled ? "bg-green-500" : "bg-gray-300"}`}
        />
        <span className="min-w-0 flex-1 truncate text-sm font-bold text-gray-800">
          {getSectionLabel(section.type)}
        </span>
      </button>

      {selected ? (
        <div className="flex items-center gap-0.5 border-t border-gray-200 bg-white/60 px-2 py-1.5">
          <button type="button" onClick={onToggle} title={section.enabled ? "إخفاء" : "إظهار"}>
            {section.enabled ? <Eye size={14} className="text-gray-500" /> : <EyeOff size={14} className="text-gray-500" />}
          </button>
          <button type="button" onClick={onMoveUp} title="تحريك لأعلى">
            <ChevronUp size={14} className="text-gray-500" />
          </button>
          <button type="button" onClick={onMoveDown} title="تحريك لأسفل">
            <ChevronDown size={14} className="text-gray-500" />
          </button>
          {canRemove ? (
            <button type="button" onClick={onRemove} title="حذف" className="mr-auto">
              <Trash2 size={14} className="text-red-500" />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}