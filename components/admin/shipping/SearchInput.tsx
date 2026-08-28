import { Search } from "lucide-react";

import { t } from "../../../lib/shipping/translations";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="search"
        dir="auto"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("searchPlaceholder")}
        aria-label={t("searchPlaceholder")}
        className="h-11 w-full rounded-xl border border-gray-200 bg-white py-3 ps-4 pe-10 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}