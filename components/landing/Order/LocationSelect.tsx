"use client";

import {
  Building2,
  ChevronDown,
  MapPin,
} from "lucide-react";

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

const communes = [
  "بلدية 1",
  "بلدية 2",
  "بلدية 3",
];

export default function LocationSelect({
  type,
  value,
  onChange,
}: LocationSelectProps) {
  const isWilaya = type === "wilaya";

  const options = isWilaya ? wilayas : communes;

  const Icon = isWilaya ? MapPin : Building2;

  return (
    <div className="relative w-full">
      <Icon
        size={23}
        strokeWidth={1.8}
        className="pointer-events-none absolute right-5 top-1/2 z-10 -translate-y-1/2 text-white/65"
      />

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir="rtl"
        className="
          h-[64px]
          w-full
          appearance-none
          rounded-[16px]
          border
          border-red-500/70
          bg-[#151719]
          px-14
          pl-12
          text-[17px]
          font-medium
          text-white
          outline-none
          transition-all
          duration-200

          focus:border-red-500
          focus:bg-[#181a1c]
          focus:ring-2
          focus:ring-red-500/15

          [&>option]:bg-[#151719]
        "
      >
        <option value="" disabled>
          {isWilaya ? "اختر الولاية" : "اختر البلدية"}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={20}
        strokeWidth={1.8}
        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-white/50"
      />
    </div>
  );
}