import { TrendingUp, ShoppingBag, Clock3, Box } from "lucide-react";
import StatCard from "./StatCard";

type StatsGridProps = {
  totalSales: number;
  totalOrders: number;
  pendingOrders: number;
  totalProducts: number;
};

export default function StatsGrid({
  totalSales,
  totalOrders,
  pendingOrders,
  totalProducts,
}: StatsGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={TrendingUp}
        label="Revenue"
        title="Total sales"
        value={`${totalSales.toLocaleString()} DA`}
        color="bg-green-50 text-green-600"
      />

      <StatCard
        icon={ShoppingBag}
        label="Orders"
        title="Total orders"
        value={totalOrders}
        color="bg-blue-50 text-blue-600"
      />

      <StatCard
        icon={Clock3}
        label="Attention"
        title="Pending orders"
        value={pendingOrders}
        color="bg-yellow-50 text-yellow-600"
      />

      <StatCard
        icon={Box}
        label="Catalog"
        title="Total products"
        value={totalProducts}
        color="bg-purple-50 text-purple-600"
      />
    </div>
  );
}
