"use client";

import {
  Plus,
  Trash2,
} from "lucide-react";

import type {
  LandingFormField,
  LandingFormFieldType,
  LandingSection,
} from "../../types";

type OrderFormAppearance = {
  sectionBackground: string;
  formBackground: string;
  textColor: string;
  inputBackground: string;
  inputTextColor: string;
  inputBorderColor: string;
  buttonBackground: string;
  buttonTextColor: string;
};

type OrderFormEditorProps = {
  section: LandingSection;
  appearance: OrderFormAppearance;
  formFields: LandingFormField[];
  fallbackButtonText: string;

  updateSectionSetting: (
    sectionId: string,
    key: string,
    value: unknown
  ) => void;

  updateOrderFormAppearance: (
    key: keyof OrderFormAppearance,
    value: string
  ) => void;

  updateFormField: (
    fieldId: string,
    updates: Partial<LandingFormField>
  ) => void;

  addFormField: () => void;
  removeFormField: (
    fieldId: string
  ) => void;
};

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

const APPEARANCE_FIELDS: [
  keyof OrderFormAppearance,
  string
][] = [
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
];

function getStringSetting(
  section: LandingSection,
  key: string,
  fallback: string
) {
  const value = section.settings[key];

  return typeof value === "string"
    ? value
    : fallback;
}

function getNumberValue(
  value: string
) {
  if (value.trim() === "") {
    return undefined;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : undefined;
}

export default function OrderFormEditor({
  section,
  appearance,
  formFields,
  fallbackButtonText,
  updateSectionSetting,
  updateOrderFormAppearance,
  updateFormField,
  addFormField,
  removeFormField,
}: OrderFormEditorProps) {
  return (
    <div className="space-y-5">
      {/* FORM CONTENT */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Form title
        </label>

        <input
          value={getStringSetting(
            section,
            "title",
            "Order now"
          )}
          onChange={(event) =>
            updateSectionSetting(
              section.id,
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
            section,
            "subtitle",
            "Fill in your information and we will contact you."
          )}
          onChange={(event) =>
            updateSectionSetting(
              section.id,
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
            section,
            "buttonText",
            fallbackButtonText
          )}
          onChange={(event) =>
            updateSectionSetting(
              section.id,
              "buttonText",
              event.target.value
            )
          }
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {/* FORM COLORS */}
      <div className="border-t border-gray-100 pt-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Form colors
        </p>

        <div className="space-y-4">
          {APPEARANCE_FIELDS.map(
            ([key, label]) => (
              <div key={key}>
                <label className="mb-2 block text-xs font-medium text-gray-600">
                  {label}
                </label>

                <div className="flex gap-2">
                  <input
                    type="color"
                    value={
                      appearance[key]
                    }
                    onChange={(event) =>
                      updateOrderFormAppearance(
                        key,
                        event.target.value
                      )
                    }
                    className="h-9 w-11 cursor-pointer rounded-lg border border-gray-300 p-1"
                  />

                  <input
                    value={
                      appearance[key]
                    }
                    onChange={(event) =>
                      updateOrderFormAppearance(
                        key,
                        event.target.value
                      )
                    }
                    className="min-w-0 flex-1 rounded-lg border border-gray-300 px-2 py-1.5 font-mono text-xs"
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* FORM FIELDS */}
      <div className="border-t border-gray-100 pt-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Form fields
          </p>

          <button
            type="button"
            onClick={addFormField}
            className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
          >
            <Plus size={13} />
            Add field
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {formFields.map(
            (field, index) => (
              <div
                key={field.id}
                className="rounded-xl border border-gray-200 bg-gray-50 p-3"
              >
                {/* FIELD HEADER */}
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-700">
                    Field {index + 1}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      removeFormField(
                        field.id
                      )
                    }
                    className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                    aria-label={`Remove field ${index + 1}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* ENABLED */}
                <label className="mb-4 flex items-center gap-2 text-xs font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={field.enabled}
                    onChange={(event) =>
                      updateFormField(
                        field.id,
                        {
                          enabled:
                            event.target
                              .checked,
                        }
                      )
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />

                  Enabled
                </label>

                {/* TYPE */}
                <div className="mb-3">
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    Field type
                  </label>

                  <select
                    value={field.type}
                    onChange={(event) =>
                      updateFormField(
                        field.id,
                        {
                          type: event.target
                            .value as LandingFormFieldType,
                        }
                      )
                    }
                    className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-2 text-xs"
                  >
                    {FORM_FIELD_TYPES.map(
                      (type) => (
                        <option
                          key={type.value}
                          value={type.value}
                        >
                          {type.label}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* LABEL */}
                <div className="mb-3">
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    Label
                  </label>

                  <input
                    value={field.label}
                    onChange={(event) =>
                      updateFormField(
                        field.id,
                        {
                          label:
                            event.target
                              .value,
                        }
                      )
                    }
                    className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-2 text-xs"
                  />
                </div>

                {/* PLACEHOLDER */}
                <div className="mb-3">
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    Placeholder
                  </label>

                  <input
                    value={
                      field.placeholder ??
                      ""
                    }
                    onChange={(event) =>
                      updateFormField(
                        field.id,
                        {
                          placeholder:
                            event.target
                              .value,
                        }
                      )
                    }
                    className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-2 text-xs"
                  />
                </div>

                {/* REQUIRED */}
                <label className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(event) =>
                      updateFormField(
                        field.id,
                        {
                          required:
                            event.target
                              .checked,
                        }
                      )
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />

                  Required
                </label>

                {/* MIN/MAX */}
                <div className="mb-3 grid grid-cols-2 gap-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                      Min length
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={
                        field.minLength ??
                        ""
                      }
                      onChange={(event) =>
                        updateFormField(
                          field.id,
                          {
                            minLength:
                              getNumberValue(
                                event.target
                                  .value
                              ),
                          }
                        )
                      }
                      placeholder="Min length"
                      className="w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                      Max length
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={
                        field.maxLength ??
                        ""
                      }
                      onChange={(event) =>
                        updateFormField(
                          field.id,
                          {
                            maxLength:
                              getNumberValue(
                                event.target
                                  .value
                              ),
                          }
                        )
                      }
                      placeholder="Max length"
                      className="w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs"
                    />
                  </div>
                </div>

                {/* PATTERN */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    Validation pattern
                  </label>

                  <input
                    value={
                      field.pattern ??
                      ""
                    }
                    onChange={(event) =>
                      updateFormField(
                        field.id,
                        {
                          pattern:
                            event.target
                              .value,
                        }
                      )
                    }
                    placeholder="Optional regex pattern"
                    className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-2 font-mono text-xs"
                  />
                </div>
              </div>
            )
          )}

          {formFields.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 p-5 text-center">
              <p className="text-xs text-gray-500">
                No form fields.
              </p>

              <button
                type="button"
                onClick={addFormField}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                <Plus size={14} />
                Add first field
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}