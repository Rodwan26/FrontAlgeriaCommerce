"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Eye, Search } from "lucide-react";

type OrderItem = {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
};

type Order = {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total: number;
  status: string;
  items: OrderItem[];
};

const statuses = [
  "all",
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  async function loadOrders() {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`
      );

      if (!res.ok) {
        throw new Error("Failed to load orders");
      }

      const data = await res.json();

      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  function getStatusStyle(status: string) {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "shipped":
        return "bg-purple-100 text-purple-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function formatStatus(status: string) {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        searchValue === "" ||
        order.id.toString().includes(searchValue) ||
        order.customer_name
          .toLowerCase()
          .includes(searchValue) ||
        order.customer_phone
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const statistics = {
    total: orders.length,

    pending: orders.filter(
      (order) => order.status === "pending"
    ).length,

    confirmed: orders.filter(
      (order) => order.status === "confirmed"
    ).length,

    shipped: orders.filter(
      (order) => order.status === "shipped"
    ).length,

    delivered: orders.filter(
      (order) => order.status === "delivered"
    ).length,

    cancelled: orders.filter(
      (order) => order.status === "cancelled"
    ).length,
  };

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-gray-500">
          Loading orders...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {statistics.total}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-yellow-600">
            Pending
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {statistics.pending}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-blue-600">
            Confirmed
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {statistics.confirmed}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-purple-600">
            Shipped
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {statistics.shipped}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-green-600">
            Delivered
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {statistics.delivered}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-red-600">
            Cancelled
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {statistics.cancelled}
          </p>
        </div>

      </div>

      {/* Search + Filter */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 md:flex-row">

          {/* Search */}
          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by order ID, customer name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border px-4 py-2.5 text-sm font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {statuses.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status === "all"
                  ? "All statuses"
                  : formatStatus(status)}
              </option>
            ))}
          </select>

        </div>

      </div>

      {/* Orders table */}
      {filteredOrders.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center">

          <p className="font-medium text-gray-700">
            No orders found.
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or status filter.
          </p>

        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Order
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Phone
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Items
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Total
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredOrders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-t transition hover:bg-gray-50"
                  >

                    {/* Order */}
                    <td className="px-6 py-4">

                      <p className="font-semibold text-gray-900">
                        #{order.id}
                      </p>

                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4">

                      <p className="font-medium text-gray-900">
                        {order.customer_name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {order.customer_address}
                      </p>

                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4">

                      <p className="text-gray-700">
                        {order.customer_phone}
                      </p>

                    </td>

                    {/* Items */}
                    <td className="px-6 py-4">

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                        {order.items.reduce(
                          (total, item) =>
                            total + item.quantity,
                          0
                        )}
                      </span>

                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 font-semibold text-gray-900">

                      {order.total.toLocaleString()} DA

                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {formatStatus(order.status)}
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">

                      <div className="flex justify-center">

                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                          title="View order"
                        >
                          <Eye size={18} />
                        </Link>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
}

