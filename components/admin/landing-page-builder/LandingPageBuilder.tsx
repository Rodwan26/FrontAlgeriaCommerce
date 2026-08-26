"use client";

import {
  useRef,
  useState,
} from "react";

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
  Settings2,
} from "lucide-react";

import {
  useLandingSections,
} from "./hooks/useLandingSections";

import {
  useLandingSettings,
} from "./hooks/useLandingSettings";

import SectionRenderer from "./components/SectionRenderer";
import PreviewCanvas from "./components/PreviewCanvas";

import HeroEditor from "./components/editors/HeroEditor";
import type {
  LandingFormField,
  LandingFormFieldType,
  LandingSection,
  LandingSettings,
  SectionType,
} from "./types";

import {
  SECTION_LABELS,
  SECTION_ICONS,
} from "./constants";

const FORM_FIELD_TYPES: {
  value: LandingFormFieldType;
  label: string;
}[] = [
  {
    value: "text",
    label: "Text",
  },
  {
    value: "phone",
    label: "Phone",
  },
  {
    value: "email",
    label: "Email",
  },
  {
    value: "number",
    label: "Number",
  },
  {
    value: "textarea",
    label: "Textarea",
  },
  {
    value: "select",
    label: "Select",
  },
  {
    value: "address",
    label: "Address",
  },
  {
    value: "wilaya",
    label: "Wilaya",
  },
  {
    value: "commune",
    label: "Commune",
  },
];

const DEFAULT_FORM_FIELDS: LandingFormField[] = [
  {
    id: "customer-name",
    type: "text",
    label: "Full name",
    placeholder: "Enter your full name",
    required: true,
    enabled: true,
  },
  {
    id: "customer-phone",
    type: "phone",
    label: "Phone number",
    placeholder: "05XXXXXXXX",
    required: true,
    enabled: true,
    minLength: 10,
    maxLength: 10,
  },
  {
    id: "customer-wilaya",
    type: "wilaya",
    label: "Wilaya",
    placeholder: "Select Wilaya",
    required: true,
    enabled: true,
  },
  {
    id: "customer-commune",
    type: "commune",
    label: "Commune",
    placeholder: "Select Commune",
    required: true,
    enabled: true,
  },
  {
    id: "customer-address",
    type: "address",
    label: "Address",
    placeholder: "Enter your address",
    required: false,
    enabled: true,
  },
];

const DEFAULT_ORDER_FORM_APPEARANCE = {
  sectionBackground: "#F9FAFB",
  formBackground: "#FFFFFF",
  textColor: "#111827",
  inputBackground: "#FFFFFF",
  inputTextColor: "#111827",
  inputBorderColor: "#D1D5DB",
  buttonBackground: "#EF2028",
  buttonTextColor: "#FFFFFF",
};

function getAppearance(
  section: LandingSection | null
) {
  if (!section) {
    return DEFAULT_ORDER_FORM_APPEARANCE;
  }

  const raw =
    section.settings.appearance;

  if (
    !raw ||
    typeof raw !== "object"
  ) {
    return DEFAULT_ORDER_FORM_APPEARANCE;
  }

  return {
    ...DEFAULT_ORDER_FORM_APPEARANCE,
    ...(raw as Partial<
      typeof DEFAULT_ORDER_FORM_APPEARANCE
    >),
  };
}

function getStringSetting(
  section: LandingSection,
  key: string,
  fallback: string
) {
  const value =
    section.settings[key];

  return typeof value === "string"
    ? value
    : fallback;
}

export default function LandingPageBuilder({ productId }: { productId: string }) {
  const {
    sections,
    selected,
    selectedSection,
    showSectionLibrary,

    setSections,
    setSelectedSection,

    moveSection,
    reorderSections,
    toggleSection,
    removeSection,
    addSection,

    setShowSectionLibrary,
  } = useLandingSections();

  const {
    settings,
    updateSetting,
  } = useLandingSettings();

  const [
    previewMode,
    setPreviewMode,
  ] = useState<
    "desktop" | "mobile"
  >("desktop");


  const [
    formFields,
    setFormFields,
  ] = useState<LandingFormField[]>(
    DEFAULT_FORM_FIELDS
  );

  const [
    draggedSectionId,
    setDraggedSectionId,
  ] = useState<string | null>(null);

  function updateSectionSetting(
    sectionId: string,
    key: string,
    value: unknown
  ) {
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              settings: {
                ...section.settings,
                [key]: value,
              },
            }
          : section
      )
    );
  }

  function updateOrderFormAppearance(
    key: keyof typeof DEFAULT_ORDER_FORM_APPEARANCE,
    value: string
  ) {
    if (
      !selected ||
      selected.type !== "order-form"
    ) {
      return;
    }

    const appearance =
      getAppearance(selected);

    updateSectionSetting(
      selected.id,
      "appearance",
      {
        ...appearance,
        [key]: value,
      }
    );
  }

  function updateFormField(
    fieldId: string,
    updates: Partial<LandingFormField>
  ) {
    setFormFields((current) =>
      current.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              ...updates,
            }
          : field
      )
    );
  }

  function addFormField() {
    const id =
      `field-${Date.now()}`;

    setFormFields((current) => [
      ...current,
      {
        id,
        type: "text",
        label: "New field",
        placeholder: "",
        required: false,
        enabled: true,
      },
    ]);
  }

  function removeFormField(
    fieldId: string
  ) {
    setFormFields((current) =>
      current.filter(
        (field) =>
          field.id !== fieldId
      )
    );
  }

  function scrollToSection(
    sectionId: string
  ) {
    setSelectedSection(sectionId);

    window.requestAnimationFrame(() => {
      const element =
        document.getElementById(
          `landing-section-${sectionId}`
        );

      element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  function handleSectionDragStart(
    event: React.DragEvent<HTMLDivElement>,
    sectionId: string
  ) {
    setDraggedSectionId(sectionId);

    event.dataTransfer.effectAllowed =
      "move";

    event.dataTransfer.setData(
      "text/plain",
      sectionId
    );
  }

  function handleSectionDrop(
    event: React.DragEvent<HTMLDivElement>,
    targetId: string
  ) {
    event.preventDefault();

    const sourceId =
      event.dataTransfer.getData(
        "text/plain"
      ) || draggedSectionId;

    if (
      sourceId &&
      sourceId !== targetId
    ) {
      reorderSections(
        sourceId,
        targetId
      );
    }

    setDraggedSectionId(null);
  }

  function handleSave() {
    console.log(
      "Landing page:",
      {
        sections,
        settings,
        formFields,
      }
    );

    alert(
      "Landing page configuration saved locally for now."
    );
  }

  const isOrderFormSelected =
    selected?.type === "order-form";

  const appearance =
    isOrderFormSelected
      ? getAppearance(selected)
      : DEFAULT_ORDER_FORM_APPEARANCE;

  // Mobile builder panel.
  const [mobilePanel, setMobilePanel] =
    useState<"sections" | "design" | "edit" | null>(null);

  // Mobile bottom-sheet drag system.
  const mobileSheetRef = useRef<HTMLDivElement | null>(null);
  const mobileSheetStartY = useRef(0);
  const mobileSheetDeltaY = useRef(0);
  const mobileSheetDragging = useRef(false);

  function shouldIgnoreMobileSheetDrag(
    target: EventTarget | null
  ) {
    if (!(target instanceof HTMLElement)) {
      return false;
    }

    return Boolean(
      target.closest(
        "button, input, textarea, select, option, a"
      )
    );
  }

  function handleMobileSheetPointerDown(
    event: React.PointerEvent<HTMLDivElement>
  ) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    if (shouldIgnoreMobileSheetDrag(event.target)) {
      return;
    }

    mobileSheetStartY.current = event.clientY;
    mobileSheetDeltaY.current = 0;
    mobileSheetDragging.current = true;

    event.currentTarget.setPointerCapture(
      event.pointerId
    );

    const sheet = mobileSheetRef.current;

    if (sheet) {
      sheet.style.transition = "none";
    }
  }

  function handleMobileSheetPointerMove(
    event: React.PointerEvent<HTMLDivElement>
  ) {
    if (!mobileSheetDragging.current) {
      return;
    }

    const delta =
      event.clientY -
      mobileSheetStartY.current;

    mobileSheetDeltaY.current = delta;

    const sheet = mobileSheetRef.current;

    if (!sheet) {
      return;
    }

    /*
     * Allow the sheet to move both directions.
     * The resistance keeps the interaction natural
     * when the user pulls it beyond its limits.
     */
    const limitedDelta =
      delta < 0
        ? delta * 0.65
        : delta;

    sheet.style.transform =
      `translateY(${limitedDelta}px)`;
  }

  function handleMobileSheetPointerEnd() {
    if (!mobileSheetDragging.current) {
      return;
    }

    mobileSheetDragging.current = false;

    const sheet = mobileSheetRef.current;

    if (!sheet) {
      return;
    }

    const delta =
      mobileSheetDeltaY.current;

    sheet.style.transition =
      "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)";

    if (delta > 140) {
      sheet.style.transform =
        "translateY(100%)";

      window.setTimeout(() => {
        setMobilePanel(null);

        if (mobileSheetRef.current) {
          mobileSheetRef.current.style.transform = "";
          mobileSheetRef.current.style.transition = "";
        }
      }, 220);

      return;
    }

    sheet.style.transform =
      "translateY(0)";
  }

  function closeMobilePanel() {
    setMobilePanel(null);
  }

  function toggleMobilePanel(
    panel: "sections" | "design" | "edit"
  ) {
    setMobilePanel((current) =>
      current === panel ? null : panel
    );
  }

  function openMobileSection(sectionId: string) {
    setSelectedSection(sectionId);
    setMobilePanel("edit");

    window.requestAnimationFrame(() => {
      const element = document.getElementById(
        `landing-section-${sectionId}`
      );

      element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-100">
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
                  setPreviewMode(
                    "desktop"
                  )
                }
                className={`rounded-md p-2 ${
                  previewMode ===
                  "desktop"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-400"
                }`}
              >
                <Monitor
                  size={17}
                />
              </button>

              <button
                type="button"
                onClick={() =>
                  setPreviewMode(
                    "mobile"
                  )
                }
                className={`rounded-md p-2 ${
                  previewMode ===
                  "mobile"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-400"
                }`}
              >
                <Smartphone
                  size={17}
                />
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                selectedSection &&
                scrollToSection(
                  selectedSection
                )
              }
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

      {/* MOBILE BUILDER NAV */}
      <div className="flex border-b border-gray-200 bg-white lg:hidden">
        <button
          type="button"
          onClick={() => toggleMobilePanel("sections")}

          className={`flex-1 px-3 py-3 text-sm font-semibold transition ${
            mobilePanel === "sections"
              ? "bg-indigo-50 text-indigo-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Sections
        </button>

        <button
          type="button"
          onClick={() => toggleMobilePanel("design")}

          className={`flex-1 border-l border-gray-200 px-3 py-3 text-sm font-semibold transition ${
            mobilePanel === "design"
              ? "bg-indigo-50 text-indigo-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Design
        </button>

        <button
          type="button"
          onClick={() => toggleMobilePanel("edit")}

          className={`flex-1 border-l border-gray-200 px-3 py-3 text-sm font-semibold transition ${
            mobilePanel === "edit"
              ? "bg-indigo-50 text-indigo-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Edit
        </button>
      </div>
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside className="hidden w-72 shrink-0 overflow-y-auto border-r border-gray-200 bg-white landing-builder-scrollbar lg:block">
          <div className="border-b border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900">
              Page structure
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Drag sections to rearrange your landing page.
            </p>
          </div>

          <div className="space-y-2 p-3">
            {sections.map(
              (section, index) => {
                const Icon =
                  SECTION_ICONS[
                    section.type
                  ];

                const isDragging =
                  draggedSectionId ===
                  section.id;

                return (
                  <div
                    key={section.id}
                    draggable
                    onDragStart={(event) =>
                      handleSectionDragStart(
                        event,
                        section.id
                      )
                    }
                    onDragOver={(event) =>
                      event.preventDefault()
                    }
                    onDrop={(event) =>
                      handleSectionDrop(
                        event,
                        section.id
                      )
                    }
                    onDragEnd={() =>
                      setDraggedSectionId(
                        null
                      )
                    }
                    className={`rounded-xl border transition ${
                      isDragging
                        ? "scale-[0.98] border-indigo-400 opacity-50"
                        : selectedSection ===
                            section.id
                          ? "border-indigo-300 bg-indigo-50"
                          : "border-gray-200 bg-white"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        scrollToSection(
                          section.id
                        )
                      }
                      className="flex w-full items-center gap-2 px-3 py-3 text-left"
                    >
                      <GripVertical
                        size={16}
                        className="shrink-0 cursor-grab text-gray-400"
                      />

                      <Icon
                        size={16}
                        className="shrink-0 text-gray-500"
                      />

                      <span className="flex-1 text-sm font-medium text-gray-800">
                        {index + 1}.{" "}
                        {section.title}
                      </span>

                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${
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
                          disabled={
                            index === 0
                          }
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
                            sections.length -
                              1
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
                  true
                )
              }
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              <Plus size={16} />
              Add section
            </button>
          </div>
        </aside>


        {/* RIGHT DESIGN PANEL */}
        <aside className="hidden w-72 shrink-0 overflow-y-auto border-l border-gray-200 bg-white landing-builder-scrollbar xl:block">
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

              <input
                type="color"
                value={
                  settings.primaryColor
                }
                onChange={(event) =>
                  updateSetting(
                    "primaryColor",
                    event.target.value
                  )
                }
                className="h-10 w-full cursor-pointer rounded-lg border border-gray-300 p-1"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Secondary color
              </label>

              <input
                type="color"
                value={
                  settings.secondaryColor
                }
                onChange={(event) =>
                  updateSetting(
                    "secondaryColor",
                    event.target.value
                  )
                }
                className="h-10 w-full cursor-pointer rounded-lg border border-gray-300 p-1"
              />
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
                onChange={(event) =>
                  updateSetting(
                    "backgroundColor",
                    event.target.value
                  )
                }
                className="h-10 w-full cursor-pointer rounded-lg border border-gray-300 p-1"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Text color
              </label>

              <input
                type="color"
                value={
                  settings.textColor
                }
                onChange={(event) =>
                  updateSetting(
                    "textColor",
                    event.target.value
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
                value={
                  settings.buttonText
                }
                onChange={(event) =>
                  updateSetting(
                    "buttonText",
                    event.target.value
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
                value={
                  settings.fontFamily
                }
                onChange={(event) =>
                  updateSetting(
                    "fontFamily",
                    event.target.value
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

            {/* ORDER FORM EDITOR */}
            {isOrderFormSelected && (
              <div className="border-t border-gray-200 pt-5">
                <div className="flex items-center gap-2">
                  <Settings2
                    size={16}
                    className="text-indigo-600"
                  />

                  <p className="text-sm font-semibold">
                    Order Form
                  </p>
                </div>

                <div className="mt-5 space-y-5">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Form title
                    </label>

                    <input
                      value={getStringSetting(
                        selected,
                        "title",
                        "Order now"
                      )}
                      onChange={(event) =>
                        updateSectionSetting(
                          selected.id,
                          "title",
                          event.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Form subtitle
                    </label>

                    <textarea
                      value={getStringSetting(
                        selected,
                        "subtitle",
                        "Fill in your information and we will contact you."
                      )}
                      onChange={(event) =>
                        updateSectionSetting(
                          selected.id,
                          "subtitle",
                          event.target.value
                        )
                      }
                      className="min-h-20 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Button text
                    </label>

                    <input
                      value={getStringSetting(
                        selected,
                        "buttonText",
                        settings.buttonText
                      )}
                      onChange={(event) =>
                        updateSectionSetting(
                          selected.id,
                          "buttonText",
                          event.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="border-t border-gray-100 pt-5">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Form colors
                    </p>

                    {(
                      [
                        [
                          "sectionBackground",
                          "Section background",
                        ],
                        [
                          "formBackground",
                          "Form background",
                        ],
                        [
                          "textColor",
                          "Text color",
                        ],
                        [
                          "inputBackground",
                          "Input background",
                        ],
                        [
                          "inputTextColor",
                          "Input text",
                        ],
                        [
                          "inputBorderColor",
                          "Input border",
                        ],
                        [
                          "buttonBackground",
                          "Button background",
                        ],
                        [
                          "buttonTextColor",
                          "Button text",
                        ],
                      ] as [
                        keyof typeof DEFAULT_ORDER_FORM_APPEARANCE,
                        string
                      ][]
                    ).map(
                      ([
                        key,
                        label,
                      ]) => (
                        <div
                          key={key}
                          className="mb-4"
                        >
                          <label className="mb-2 block text-xs font-medium text-gray-600">
                            {label}
                          </label>

                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={
                                appearance[
                                  key
                                ]
                              }
                              onChange={(
                                event
                              ) =>
                                updateOrderFormAppearance(
                                  key,
                                  event
                                    .target
                                    .value
                                )
                              }
                              className="h-9 w-11 cursor-pointer rounded-lg border border-gray-300 p-1"
                            />

                            <input
                              value={
                                appearance[
                                  key
                                ]
                              }
                              onChange={(
                                event
                              ) =>
                                updateOrderFormAppearance(
                                  key,
                                  event
                                    .target
                                    .value
                                )
                              }
                              className="min-w-0 flex-1 rounded-lg border border-gray-300 px-2 py-1.5 font-mono text-xs"
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* FORM FIELDS */}
                  <div className="border-t border-gray-100 pt-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Form fields
                      </p>

                      <button
                        type="button"
                        onClick={
                          addFormField
                        }
                        className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
                      >
                        <Plus
                          size={13}
                        />
                        Add
                      </button>
                    </div>

                    <div className="mt-4 space-y-3">
                      {formFields.map(
                        (
                          field
                        ) => (
                          <div
                            key={
                              field.id
                            }
                            className="rounded-xl border border-gray-200 p-3"
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={
                                  field.enabled
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateFormField(
                                    field.id,
                                    {
                                      enabled:
                                        event
                                          .target
                                          .checked,
                                    }
                                  )
                                }
                              />

                              <input
                                value={
                                  field.label
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateFormField(
                                    field.id,
                                    {
                                      label:
                                        event
                                          .target
                                          .value,
                                    }
                                  )
                                }
                                className="min-w-0 flex-1 rounded-md border border-gray-300 px-2 py-1.5 text-xs font-medium"
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  removeFormField(
                                    field.id
                                  )
                                }
                                className="rounded-md p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2
                                  size={
                                    14
                                  }
                                />
                              </button>
                            </div>

                            <div className="mt-2">
                              <select
                                value={
                                  field.type
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateFormField(
                                    field.id,
                                    {
                                      type:
                                        event
                                          .target
                                          .value as LandingFormFieldType,
                                    }
                                  )
                                }
                                className="w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs"
                              >
                                {FORM_FIELD_TYPES.map(
                                  (
                                    type
                                  ) => (
                                    <option
                                      key={
                                        type.value
                                      }
                                      value={
                                        type.value
                                      }
                                    >
                                      {
                                        type.label
                                      }
                                    </option>
                                  )
                                )}
                              </select>
                            </div>

                            <input
                              value={
                                field.placeholder ??
                                ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateFormField(
                                  field.id,
                                  {
                                    placeholder:
                                      event
                                        .target
                                        .value,
                                  }
                                )
                              }
                              placeholder="Placeholder"
                              className="mt-2 w-full rounded-md border border-gray-300 px-2 py-1.5 text-xs"
                            />

                            <label className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                              <input
                                type="checkbox"
                                checked={
                                  field.required
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateFormField(
                                    field.id,
                                    {
                                      required:
                                        event
                                          .target
                                          .checked,
                                    }
                                  )
                                }
                              />

                              Required
                            </label>

                            <div className="mt-2 grid grid-cols-2 gap-2">
                              <input
                                type="number"
                                min="0"
                                value={
                                  field.minLength ??
                                  ""
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateFormField(
                                    field.id,
                                    {
                                      minLength:
                                        event
                                          .target
                                          .value ===
                                        ""
                                          ? undefined
                                          : Number(
                                              event
                                                .target
                                                .value
                                            ),
                                    }
                                  )
                                }
                                placeholder="Min length"
                                className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-xs"
                              />

                              <input
                                type="number"
                                min="0"
                                value={
                                  field.maxLength ??
                                  ""
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateFormField(
                                    field.id,
                                    {
                                      maxLength:
                                        event
                                          .target
                                          .value ===
                                        ""
                                          ? undefined
                                          : Number(
                                              event
                                                .target
                                                .value
                                            ),
                                    }
                                  )
                                }
                                placeholder="Max length"
                                className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-xs"
                              />
                            </div>

                            <input
                              value={
                                field.pattern ??
                                ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateFormField(
                                  field.id,
                                  {
                                    pattern:
                                      event
                                        .target
                                        .value ||
                                      undefined,
                                  }
                                )
                              }
                              placeholder="Pattern / regex (optional)"
                              className="mt-2 w-full rounded-md border border-gray-300 px-2 py-1.5 font-mono text-[11px]"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selected &&
              !isOrderFormSelected && (
                <div className="border-t border-gray-200 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Selected section
                  </p>

                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    {selected.title}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Section-specific controls can be added here.
                  </p>
                </div>
              )}
          </div>
        </aside>
      </div>


      {/* MOBILE BUILDER SHEET */}
      {mobilePanel && (
        <div
          ref={mobileSheetRef}
          className={
            mobilePanel === "edit"
              ? "fixed inset-0 z-[65] flex flex-col overflow-hidden bg-white lg:hidden"
              : "fixed inset-x-0 bottom-0 z-[65] max-h-[78vh] overflow-hidden rounded-t-3xl border-t border-gray-200 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.18)] lg:hidden"
          }
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                {mobilePanel === "sections"
                  ? "Page structure"
                  : mobilePanel === "design"
                    ? "Design"
                    : selected
                      ? selected.title
                      : "Edit section"}
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                {mobilePanel === "sections"
                  ? "Manage your landing page sections"
                  : mobilePanel === "design"
                    ? "Customize the landing page appearance"
                    : "Edit the selected section"}
              </p>
            </div>

            <button
              type="button"
              onClick={closeMobilePanel}
              className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Close
            </button>
          </div>

          <div
            className={
              mobilePanel === "edit"
                ? "landing-builder-scrollbar h-[calc(100dvh-112px)] overflow-y-auto overscroll-contain p-4 pb-10"
                : "landing-builder-scrollbar max-h-[calc(78vh-76px)] overflow-y-auto overscroll-contain p-4 pb-8"
            }
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "thin",
              scrollbarColor: `${settings.primaryColor} transparent`,
            }}
          >
            {/* MOBILE SECTIONS */}
            {mobilePanel === "sections" && (
              <div className="space-y-2">
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
                        <div className="flex items-center gap-3 p-3">
                          <button
                            type="button"
                            onClick={() =>
                              openMobileSection(
                                section.id
                              )
                            }
                            className="flex min-w-0 flex-1 items-center gap-3 text-left"
                          >
                            <Icon
                              size={18}
                              className="shrink-0 text-gray-500"
                            />

                            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-800">
                              {index + 1}.{" "}
                              {section.title}
                            </span>

                            <span
                              className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                                section.enabled
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            />
                          </button>
                        </div>

                        {selectedSection ===
                          section.id && (
                          <div className="flex items-center gap-2 border-t border-gray-200 p-2">
                            <button
                              type="button"
                              disabled={
                                index === 0
                              }
                              onClick={() =>
                                moveSection(
                                  section.id,
                                  "up"
                                )
                              }
                              className="rounded-lg border border-gray-200 p-2 text-gray-600 disabled:opacity-30"
                            >
                              <ChevronUp
                                size={16}
                              />
                            </button>

                            <button
                              type="button"
                              disabled={
                                index ===
                                sections.length -
                                  1
                              }
                              onClick={() =>
                                moveSection(
                                  section.id,
                                  "down"
                                )
                              }
                              className="rounded-lg border border-gray-200 p-2 text-gray-600 disabled:opacity-30"
                            >
                              <ChevronDown
                                size={16}
                              />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                toggleSection(
                                  section.id
                                )
                              }
                              className="ml-auto rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600"
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
                              className="rounded-lg border border-red-100 p-2 text-red-500"
                            >
                              <Trash2
                                size={16}
                              />
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  }
                )}

                <button
                  type="button"
                  onClick={() => {
                    setMobilePanel(null);
                    setShowSectionLibrary(true);
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600"
                >
                  <Plus size={17} />
                  Add section
                </button>
              </div>
            )}

            {/* MOBILE DESIGN */}
            {mobilePanel === "design" && (
              <div className="space-y-5">
                {(
                  [
                    [
                      "primaryColor",
                      "Primary color",
                    ],
                    [
                      "secondaryColor",
                      "Secondary color",
                    ],
                    [
                      "backgroundColor",
                      "Background",
                    ],
                    [
                      "textColor",
                      "Text color",
                    ],
                  ] as [
                    keyof typeof settings,
                    string
                  ][]
                ).map(
                  ([key, label]) => (
                    <div key={key}>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                        {label}
                      </label>

                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={
                            String(
                              settings[key]
                            )
                          }
                          onChange={(event) =>
                            updateSetting(
                              key,
                              event.target.value
                            )
                          }
                          className="h-11 w-14 cursor-pointer rounded-lg border border-gray-300 p-1"
                        />

                        <input
                          value={String(
                            settings[key]
                          )}
                          onChange={(event) =>
                            updateSetting(
                              key,
                              event.target.value
                            )
                          }
                          className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  )
                )}

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Button text
                  </label>

                  <input
                    value={settings.buttonText}
                    onChange={(event) =>
                      updateSetting(
                        "buttonText",
                        event.target.value
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
                    onChange={(event) =>
                      updateSetting(
                        "fontFamily",
                        event.target.value
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
              </div>
            )}

            {/* MOBILE EDIT */}
            {mobilePanel === "edit" && (
              <div className="space-y-5">
                {selected ? (
                  <>
                    <div className="rounded-xl bg-gray-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Selected section
                      </p>

                      <p className="mt-1 text-base font-bold text-gray-900">
                        {selected.title}
                      </p>
                    </div>


                    {isOrderFormSelected ? (
                      <>
                        <div>
                          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Form title
                          </label>
                          <input
                            value={getStringSetting(
                              selected,
                              "title",
                              "Order now"
                            )}
                            onChange={(event) =>
                              updateSectionSetting(
                                selected.id,
                                "title",
                                event.target.value
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Form subtitle
                          </label>
                          <textarea
                            value={getStringSetting(
                              selected,
                              "subtitle",
                              "Fill in your information and we will contact you."
                            )}
                            onChange={(event) =>
                              updateSectionSetting(
                                selected.id,
                                "subtitle",
                                event.target.value
                              )
                            }
                            className="min-h-24 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Button text
                          </label>
                          <input
                            value={getStringSetting(
                              selected,
                              "buttonText",
                              settings.buttonText
                            )}
                            onChange={(event) =>
                              updateSectionSetting(
                                selected.id,
                                "buttonText",
                                event.target.value
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
                          />
                        </div>

                        <div className="border-t border-gray-200 pt-5">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                              Form fields
                            </p>

                            <button
                              type="button"
                              onClick={addFormField}
                              className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700"
                            >
                              <Plus size={14} />
                              Add
                            </button>
                          </div>

                          <div className="mt-4 space-y-3">
                            {formFields.map((field) => (
                              <div
                                key={field.id}
                                className="rounded-xl border border-gray-200 p-3"
                              >
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={field.enabled}
                                    onChange={(event) =>
                                      updateFormField(
                                        field.id,
                                        {
                                          enabled:
                                            event.target.checked,
                                        }
                                      )
                                    }
                                  />

                                  <input
                                    value={field.label}
                                    onChange={(event) =>
                                      updateFormField(
                                        field.id,
                                        {
                                          label:
                                            event.target.value,
                                        }
                                      )
                                    }
                                    className="min-w-0 flex-1 rounded-md border border-gray-300 px-2 py-2 text-xs font-medium"
                                  />

                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeFormField(field.id)
                                    }
                                    className="rounded-md p-1.5 text-red-500 hover:bg-red-50"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>

                                <select
                                  value={field.type}
                                  onChange={(event) =>
                                    updateFormField(
                                      field.id,
                                      {
                                        type:
                                          event.target.value as LandingFormFieldType,
                                      }
                                    )
                                  }
                                  className="mt-2 w-full rounded-md border border-gray-300 bg-white px-2 py-2 text-xs"
                                >
                                  {FORM_FIELD_TYPES.map((type) => (
                                    <option
                                      key={type.value}
                                      value={type.value}
                                    >
                                      {type.label}
                                    </option>
                                  ))}
                                </select>

                                <input
                                  value={field.placeholder ?? ""}
                                  onChange={(event) =>
                                    updateFormField(
                                      field.id,
                                      {
                                        placeholder:
                                          event.target.value,
                                      }
                                    )
                                  }
                                  placeholder="Placeholder"
                                  className="mt-2 w-full rounded-md border border-gray-300 px-2 py-2 text-xs"
                                />

                                <label className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                                  <input
                                    type="checkbox"
                                    checked={field.required}
                                    onChange={(event) =>
                                      updateFormField(
                                        field.id,
                                        {
                                          required:
                                            event.target.checked,
                                        }
                                      )
                                    }
                                  />
                                  Required
                                </label>

                                <div className="mt-2 grid grid-cols-2 gap-2">
                                  <input
                                    type="number"
                                    min="0"
                                    value={field.minLength ?? ""}
                                    onChange={(event) =>
                                      updateFormField(
                                        field.id,
                                        {
                                          minLength:
                                            event.target.value === ""
                                              ? undefined
                                              : Number(
                                                  event.target.value
                                                ),
                                        }
                                      )
                                    }
                                    placeholder="Min length"
                                    className="w-full rounded-md border border-gray-300 px-2 py-2 text-xs"
                                  />

                                  <input
                                    type="number"
                                    min="0"
                                    value={field.maxLength ?? ""}
                                    onChange={(event) =>
                                      updateFormField(
                                        field.id,
                                        {
                                          maxLength:
                                            event.target.value === ""
                                              ? undefined
                                              : Number(
                                                  event.target.value
                                                ),
                                        }
                                      )
                                    }
                                    placeholder="Max length"
                                    className="w-full rounded-md border border-gray-300 px-2 py-2 text-xs"
                                  />
                                </div>

                                <input
                                  value={field.pattern ?? ""}
                                  onChange={(event) =>
                                    updateFormField(
                                      field.id,
                                      {
                                        pattern:
                                          event.target.value ||
                                          undefined,
                                      }
                                    )
                                  }
                                  placeholder="Pattern / regex (optional)"
                                  className="mt-2 w-full rounded-md border border-gray-300 px-2 py-2 font-mono text-[11px]"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {selected.type === "hero" ? (
                          <HeroEditor
                            section={selected}
                            updateSectionSetting={
                              updateSectionSetting
                            }
                          />
                        ) : (
                          <div className="rounded-xl bg-gray-50 p-4">
                            <p className="text-sm text-gray-600">
                              Section-specific controls can be added here.
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <div className="rounded-xl bg-gray-50 p-5 text-center">
                    <p className="text-sm text-gray-500">
                      Select a section first.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {/* SECTION LIBRARY */}
      {showSectionLibrary && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Add section
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Choose a section to add to your landing page.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowSectionLibrary(
                    false
                  )
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
              ).map(
                (type) => {
                  const Icon =
                    SECTION_ICONS[
                      type
                    ];

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        addSection(
                          type
                        )
                      }
                      className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                        <Icon
                          size={18}
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {
                            SECTION_LABELS[
                              type
                            ]
                          }
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Add{" "}
                          {SECTION_LABELS[
                            type
                          ].toLowerCase()}{" "}
                          section
                        </p>
                      </div>
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



















