"use client";

import { MapPin, Building2 } from "lucide-react";

type LocationSelectProps = {
  type: "wilaya" | "commune";
  value: string;
  onChange: (value: string) => void;
};

const wilayas = [
  "الجزائر",
  "وهران",
  "تيارت",
  "سطيف",
  "قسنطينة",
  "عنابة",
  "البليدة",
  "تلمسان",
  "باتنة",
  "بجاية",
];

export default function LocationSelect({
  type,
  value,
  onChange,
}: LocationSelectProps) {
  const isWilaya = type === "wilaya";

  return (
    <div className="relative">
      {isWilaya ? (
        <MapPin
          size={22}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-gray-300"
        />
      ) : (
        <Building2
          size={22}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-gray-300"
        />
      )}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-16 w-full appearance-none rounded-xl border border-red-600/80 bg-[#151719] px-14 text-right text-base text-white outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
      >
        <option value="" disabled>
          {isWilaya ? "اختر الولاية" : "اختر البلدية"}
        </option>

        {wilayas.map((wilaya) => (
          <option key={wilaya} value={wilaya}>
            {wilaya}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
       ⌄
      </span>
    </div>
  );
}