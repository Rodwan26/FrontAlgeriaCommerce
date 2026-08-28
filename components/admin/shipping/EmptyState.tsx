import { Truck } from "lucide-react";

type Props = {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
};

export default function EmptyState({
  title,
  body,
  actionLabel,
  onAction,
  icon: Icon = Truck,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
        <Icon size={24} className="text-gray-400" />
      </div>
      <div>
        <h3 className="font-bold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{body}</p>
      </div>
      {actionLabel && onAction ? (
        <button
          onClick={onAction}
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}