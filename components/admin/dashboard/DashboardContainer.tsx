"use client";

import { useEffect, useState } from "react";

import DashboardHeader from "./DashboardHeader";
import StatsGrid from "./StatsGrid";
import SecondaryStats from "./SecondaryStats";
import RecentProducts from "./RecentProducts";
import QuickActions from "./QuickActions";
import LoadingSkeleton from "./LoadingSkeleton";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
};

type Category = {
  id: number;
  name: string;
};

type DashboardStats = {
  total_sales: number;
  total_orders: number;
  pending_orders: number;
  total_products: number;
};

export default function DashboardContainer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    try {
      setLoading(true);

      const [productsRes, categoriesRes, statsRes] =
        await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`),
        ]);

      if (
        !productsRes.ok ||
        !categoriesRes.ok ||
        !statsRes.ok
      ) {
        throw new Error("Failed to load dashboard data");
      }

      const [productsData, categoriesData, statsData] =
        await Promise.all([
          productsRes.json(),
          categoriesRes.json(),
          statsRes.json(),
        ]);

      setProducts(productsData);
      setCategories(categoriesData);
      setStats(statsData);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  const totalProducts =
    stats?.total_products ?? products.length;

  const totalCategories = categories.length;

  const averagePrice =
    products.length > 0
      ? products.reduce(
          (total, product) => total + product.price,
          0
        ) / products.length
      : 0;

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <StatsGrid
        totalSales={stats?.total_sales ?? 0}
        totalOrders={stats?.total_orders ?? 0}
        pendingOrders={stats?.pending_orders ?? 0}
        totalProducts={totalProducts}
      />

      <SecondaryStats
        totalCategories={totalCategories}
        averagePrice={averagePrice}
      />

      <RecentProducts products={products} />

      <QuickActions />
    </div>
  );
}
