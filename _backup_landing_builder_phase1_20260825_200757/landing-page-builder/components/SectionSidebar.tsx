"use client";

import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react";

import { SECTION_ICONS } from "../constants";
import type {
  LandingSection,
  SectionMoveDirection,
} from "../types";

type SectionSidebarProps = {
  sections: LandingSection[];
  selectedSection: string | null;
  showSectionLibrary: boolean;

  onSelectSection: (
    sectionId: string
  ) => void;

  onMoveSection: (
    sectionId: string,
    direction: SectionMoveDirection
  ) => void;

  onToggleSection: (
    sectionId: string
  ) => void;

  onRemoveSection: (
    sectionId: string
  ) => void;

  onToggleSectionLibrary: () => void;
};

export default function SectionSidebar({
  sections,
  selectedSection,
  showSectionLibrary,
  onSelectSection,
  onMoveSection,
  onToggleSection,
  onRemoveSection,
  onToggleSectionLibrary,
}: SectionSidebarProps) {
  return (
    <aside
      className="
        flex h-full min-h-0 w-full
        flex-col overflow-hidden
        border-r border-gray-200
        bg-white
      "
    >
      <div className="shrink-0 border-b border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-900">
          Page structure
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Arrange and manage your sections.
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto landing-builder-scrollbar p-3">
        <div className="space-y-2">
          {sections.map((section, index) => {
            const Icon =
              SECTION_ICONS[section.type];

            const isSelected =
              selectedSection === section.id;

            return (
              <div
                key={section.id}
                className={`
                  rounded-xl border
                  ${
                    isSelected
                      ? "border-indigo-300 bg-indigo-50"
                      : "border-gray-200 bg-white"
                  }
                `}
              >
                <button
                  type="button"
                  onClick={() =>
                    onSelectSection(section.id)
                  }
                  className="
                    flex w-full items-center
                    gap-2 rounded-xl
                    px-3 py-3 text-left
                    outline-none
                    focus:outline-none
                  "
                >
                  <GripVertical
                    size={15}
                    className="shrink-0 text-gray-400"
                  />

                  <Icon
                    size={16}
                    className="shrink-0 text-gray-500"
                  />

                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800">
                    {section.title}
                  </span>

                  <span
                    className={`
                      h-2 w-2 shrink-0 rounded-full
                      ${
                        section.enabled
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }
                    `}
                  />
                </button>

                {isSelected && (
                  <div className="flex items-center border-t border-gray-200 px-2 py-2">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() =>
                        onMoveSection(
                          section.id,
                          "up"
                        )
                      }
                      className="
                        rounded p-1.5
                        text-gray-500
                        outline-none
                        hover:bg-white
                        focus:outline-none
                        disabled:opacity-30
                      "
                      aria-label="Move section up"
                    >
                      <ChevronUp size={15} />
                    </button>

                    <button
                      type="button"
                      disabled={
                        index ===
                        sections.length - 1
                      }
                      onClick={() =>
                        onMoveSection(
                          section.id,
                          "down"
                        )
                      }
                      className="
                        rounded p-1.5
                        text-gray-500
                        outline-none
                        hover:bg-white
                        focus:outline-none
                        disabled:opacity-30
                      "
                      aria-label="Move section down"
                    >
                      <ChevronDown size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onToggleSection(
                          section.id
                        )
                      }
                      className="
                        ml-auto rounded
                        px-2 py-1
                        text-xs font-medium
                        text-gray-500
                        outline-none
                        hover:bg-white
                        focus:outline-none
                      "
                    >
                      {section.enabled
                        ? "Hide"
                        : "Show"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onRemoveSection(
                          section.id
                        )
                      }
                      className="
                        rounded p-1.5
                        text-gray-400
                        outline-none
                        hover:bg-red-50
                        hover:text-red-600
                        focus:outline-none
                      "
                      aria-label="Remove section"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="button"
            onClick={onToggleSectionLibrary}
            aria-expanded={showSectionLibrary}
            className="
              mt-2 flex w-full
              items-center justify-center
              gap-2 rounded-xl
              border border-dashed
              border-gray-300
              px-4 py-3
              text-sm font-semibold
              text-gray-600
              outline-none
              hover:bg-gray-50
              focus:outline-none
            "
          >
            <Plus size={16} />
            Add section
          </button>
        </div>
      </div>
    </aside>
  );
}

