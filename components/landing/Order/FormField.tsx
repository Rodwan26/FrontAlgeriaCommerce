import { LucideIcon } from "lucide-react";

type FormFieldProps = {
  icon: LucideIcon;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
};

export default function FormField({
  icon: Icon,
  placeholder,
  type = "text",
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div className="relative">
      <Icon
        size={22}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
      />

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-16 w-full rounded-xl border border-red-600/80 bg-[#151719] px-14 text-right text-base text-white outline-none transition placeholder:text-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
      />
    </div>
  );
}