"use client";

import { ChevronDown } from "lucide-react";

type Props = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  className?: string;
};

export default function AdminSelect({
  label,
  value,
  onChange,
  options,
  className = "",
}: Props) {
  return (
    <label className={`block ${className}`}>
      {label ? (
        <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-gray-600">
          {label}
        </span>
      ) : null}

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-white pr-3 pl-9 text-sm font-medium text-gray-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          strokeWidth={2.5}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </label>
  );
}