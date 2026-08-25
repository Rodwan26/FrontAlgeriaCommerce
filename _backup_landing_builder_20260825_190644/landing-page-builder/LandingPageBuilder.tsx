"use client";
import { useLandingSections } from "./hooks/useLandingSections";
import { useLandingSettings } from "./hooks/useLandingSettings";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  GripVertical,
  Monitor,
  Palette,
  Plus,
  Smartphone,
  Trash2,
} from "lucide-react";

import { useState } from "react";

import SectionRenderer from "./components/SectionRenderer";
import PreviewCanvas from "./components/PreviewCanvas";

import type {
  LandingSection,
  LandingSettings,
  SectionType,
} from "./types";

import {
  SECTION_LABELS,
  SECTION_ICONS,
} from "./constants";




export default function LandingPageBuilder() {
  const {
    sections,
    selected,
    selectedSection,
    showSectionLibrary,

    setSections,
    selectSection,
    setSelectedSection,

    moveSection,
    toggleSection,
    removeSection,
    addSection,

    toggleSectionLibrary,
    setShowSectionLibrary,
  } = useLandingSections();

  const {
    settings,
    setSettings,
    updateSetting,
    updateSettings,
    resetSettings,
  } = useLandingSettings();

  const [previewMode, setPreviewMode] =
    useState<"desktop" | "mobile">("desktop");

  function handleSave() {
    console.log("Landing page:", {
      sections,
      settings,
    });

    alert(
      "Landing page configuration saved locally for now."
    );
  }
  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="flex h-16 items-center justify-between px-5">
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Landing Page Builder
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Create a custom landing page for your product
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center rounded-lg border border-gray-200 p-1 sm:flex">
              <button
                type="button"
                onClick={() =>
                  setPreviewMode("desktop")
                }
                className={`rounded-md p-2 ${
                  previewMode === "desktop"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-400"
                }`}
              >
                <Monitor size={17} />
              </button>

              <button
                type="button"
                onClick={() =>
                  setPreviewMode("mobile")
                }
                className={`rounded-md p-2 ${
                  previewMode === "mobile"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-400"
                }`}
              >
                <Smartphone size={17} />
              </button>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Eye size={16} />
              Preview
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
              style={{
                backgroundColor:
                  settings.primaryColor,
              }}
            >
              Save
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* Left sidebar */}
        <aside className="hidden w-72 shrink-0 overflow-y-auto landing-builder-scrollbar border-r border-gray-200 bg-white lg:block">
          <div className="border-b border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900">
              Page structure
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Arrange and manage your sections.
            </p>
          </div>

          <div className="space-y-2 p-3">
            {sections.map(
              (section, index) => {
                const Icon =
                  SECTION_ICONS[
                    section.type
                  ];

                return (
                  <div
                    key={section.id}
                    className={`rounded-xl border ${
                      selectedSection ===
                      section.id
                        ? "border-indigo-300 bg-indigo-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedSection(
                          section.id
                        )
                      }
                      className="flex w-full items-center gap-2 px-3 py-3 text-left"
                    >
                      <GripVertical
                        size={15}
                        className="text-gray-400"
                      />

                      <Icon
                        size={16}
                        className="text-gray-500"
                      />

                      <span className="flex-1 text-sm font-medium text-gray-800">
                        {section.title}
                      </span>

                      <span
                        className={`h-2 w-2 rounded-full ${
                          section.enabled
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                    </button>

                    {selectedSection ===
                      section.id && (
                      <div className="flex border-t border-gray-200 px-2 py-2">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() =>
                            moveSection(
                              section.id,
                              "up"
                            )
                          }
                          className="rounded p-1.5 text-gray-500 hover:bg-white disabled:opacity-30"
                        >
                          <ChevronUp
                            size={15}
                          />
                        </button>

                        <button
                          type="button"
                          disabled={
                            index ===
                            sections.length - 1
                          }
                          onClick={() =>
                            moveSection(
                              section.id,
                              "down"
                            )
                          }
                          className="rounded p-1.5 text-gray-500 hover:bg-white disabled:opacity-30"
                        >
                          <ChevronDown
                            size={15}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            toggleSection(
                              section.id
                            )
                          }
                          className="ml-auto rounded px-2 py-1 text-xs font-medium text-gray-500 hover:bg-white"
                        >
                          {section.enabled
                            ? "Hide"
                            : "Show"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            removeSection(
                              section.id
                            )
                          }
                          className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2
                            size={15}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                );
              }
            )}

            <button
              type="button"
              onClick={() =>
                setShowSectionLibrary(
                  (current) => !current
                )
              }
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              <Plus size={16} />
              Add section
            </button>
          </div>
        </aside>

        {/* Preview */}
        <PreviewCanvas previewMode={previewMode}>
  {sections.map((section) => (
    <SectionRenderer
      key={section.id}
      section={section}
      settings={settings}
    />
  ))}
</PreviewCanvas>

        {/* Right sidebar */}
        <aside className="hidden w-56 shrink-0 overflow-y-auto landing-builder-scrollbar border-l border-gray-200 bg-white xl:block">
          <div className="border-b border-gray-200 p-5">
            <div className="flex items-center gap-2">
              <Palette
                size={17}
                className="text-gray-500"
              />

              <h2 className="text-sm font-semibold text-gray-900">
                Design
              </h2>
            </div>
          </div>

          <div className="space-y-6 p-4 text-gray-900">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Primary color
              </label>

              <div className="flex gap-2">
                <input
                  type="color"
                  value={
                    settings.primaryColor
                  }
                  onChange={(e) =>
                    updateSetting(
                      "primaryColor",
                      e.target.value
                    )
                  }
                  className="h-10 w-12 cursor-pointer rounded-lg border border-gray-300 p-1"
                />

                <input
                  value={
                    settings.primaryColor
                  }
                  onChange={(e) =>
                    updateSetting(
                      "primaryColor",
                      e.target.value
                    )
                  }
                  className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Secondary color
              </label>

              <div className="flex gap-2">
                <input
                  type="color"
                  value={
                    settings.secondaryColor
                  }
                  onChange={(e) =>
                    updateSetting(
                      "secondaryColor",
                      e.target.value
                    )
                  }
                  className="h-10 w-12 cursor-pointer rounded-lg border border-gray-300 p-1"
                />

                <input
                  value={
                    settings.secondaryColor
                  }
                  onChange={(e) =>
                    updateSetting(
                      "secondaryColor",
                      e.target.value
                    )
                  }
                  className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Background
              </label>

              <input
                type="color"
                value={
                  settings.backgroundColor
                }
                onChange={(e) =>
                  updateSetting(
                    "backgroundColor",
                    e.target.value
                  )
                }
                className="h-10 w-full cursor-pointer rounded-lg border border-gray-300 p-1"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Button text
              </label>

              <input
                value={settings.buttonText}
                onChange={(e) =>
                  updateSetting(
                    "buttonText",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Font
              </label>

              <select
                value={settings.fontFamily}
                onChange={(e) =>
                  updateSetting(
                    "fontFamily",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm"
              >
                <option value="Inter">
                  Inter
                </option>

                <option value="Arial">
                  Arial
                </option>

                <option value="Georgia">
                  Georgia
                </option>

                <option value="system-ui">
                  System
                </option>
              </select>
            </div>

            {selected && (
              <div className="border-t border-gray-200 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Selected section
                </p>

                <p className="mt-2 text-sm font-semibold text-gray-900">
                  {selected.title}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Section customization will be
                  expanded here.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Section library */}
      {showSectionLibrary && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Add section
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Choose a section to add to your
                  landing page.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowSectionLibrary(false)
                }
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <Trash2 size={17} />
              </button>
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-2">
              {(
                Object.keys(
                  SECTION_LABELS
                ) as SectionType[]
              ).map((type) => {
                const Icon =
                  SECTION_ICONS[type];

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      addSection(type)
                    }
                    className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      <Icon size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {SECTION_LABELS[type]}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Add {SECTION_LABELS[type].toLowerCase()} section
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
