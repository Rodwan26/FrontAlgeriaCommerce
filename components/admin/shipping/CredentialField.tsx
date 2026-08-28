import { Eye, EyeOff, HelpCircle } from "lucide-react";
import { useState } from "react";

import { t } from "../../../lib/shipping/translations";
import type { CredField } from "../../../lib/shipping/types";

type Props = {
  field: CredField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onHelp: (field: CredField) => void;
  showHelpLink?: boolean;
};

export default function CredentialField({
  field,
  value,
  error,
  onChange,
  onHelp,
  showHelpLink = true,
}: Props) {
  const [visible, setVisible] = useState(false);
  const isPassword = field.type === "password";
  const inputId = `cred-${field.key}`;

  const inputClass =
    "h-11 w-full rounded-xl border bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 " +
    (error ? "border-red-300" : "border-gray-200");

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        {field.label}
        {field.required ? <span className="text-red-500"> •</span> : null}
      </label>

      {field.type === "select" && field.options ? (
        <select
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir={field.dir}
          className={inputClass}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
        >
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            id={inputId}
            dir={field.dir}
            type={isPassword && !visible ? "password" : "text"}
            inputMode={field.type === "url" ? "url" : "text"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={inputClass + " " + (isPassword ? "pe-11" : "")}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
          />
          {isPassword ? (
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? "إخفاء" : "إظهار"}
              className="absolute end-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-400 transition hover:text-gray-600"
            >
              {visible ? (
                <EyeOff size={17} />
              ) : (
                <Eye size={17} />
              )}
            </button>
          ) : null}
        </div>
      )}

      <div className="mt-1.5 flex items-center justify-between gap-2">
        {error ? (
          <p
            id={`${inputId}-error`}
            className="text-xs font-medium text-red-600"
          >
            {error}
          </p>
        ) : field.hint ? (
          <p className="text-xs text-gray-500">{field.hint}</p>
        ) : (
          <span />
        )}

        {field.help && showHelpLink ? (
          <button
            type="button"
            onClick={() => onHelp(field)}
            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-indigo-600 transition hover:text-indigo-800"
          >
            <HelpCircle size={14} />
            {t("whereFind")}
          </button>
        ) : null}
      </div>
    </div>
  );
}