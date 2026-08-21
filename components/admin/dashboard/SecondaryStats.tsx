import { FolderOpen, Package } from "lucide-react";

type SecondaryStatsProps = {
  totalCategories: number;
  averagePrice: number;
};

export default function SecondaryStats({
  totalCategories,
  averagePrice,
}: SecondaryStatsProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
            <FolderOpen size={19} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Categories
            </p>

            <p className="text-xl font-bold text-gray-900">
              {totalCategories}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
            <Package size={19} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Average product price
            </p>

            <p className="text-xl font-bold text-gray-900">
              {Math.round(averagePrice).toLocaleString()} DA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
