import { LucideIcon } from "lucide-react";

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  title: string;
  value: string | number;
  color: string;
};

export default function StatCard({
  icon: Icon,
  label,
  title,
  value,
  color,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
          <Icon size={21} />
        </div>

        <span className="text-xs font-medium text-gray-400">
          {label}
        </span>
      </div>

      <p className="mt-6 text-sm font-medium text-gray-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
        {value}
      </p>

      <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-green-50 transition group-hover:scale-125" />
    </div>
  );
}
