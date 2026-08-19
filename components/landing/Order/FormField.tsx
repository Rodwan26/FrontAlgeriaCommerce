import { LucideIcon } from "lucide-react";

type FormFieldProps = {
  icon: LucideIcon;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  dir?: "rtl" | "ltr";
};

export default function FormField({
  icon: Icon,
  placeholder,
  type = "text",
  value,
  onChange,
  dir = "rtl",
}: FormFieldProps) {
  return (
    <div className="relative w-full">
      <Icon
        size={23}
        strokeWidth={1.8}
        className="pointer-events-none absolute right-5 top-1/2 z-10 -translate-y-1/2 text-white/65"
      />

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        dir={dir}
        className="
          h-[64px]
          w-full
          rounded-[16px]
          border
          border-red-500/70
          bg-[#151719]
          px-14
          text-[17px]
          font-medium
          text-white
          outline-none
          transition-all
          duration-200

          placeholder:text-white/55

          hover:border-red-500

          focus:border-red-500
          focus:bg-[#181a1c]
          focus:ring-2
          focus:ring-red-500/15
        "
      />
    </div>
  );
}