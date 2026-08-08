"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";

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

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-gray-500">
          Loading orders...
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-gray-500">
          No orders found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
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

            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-t transition hover:bg-gray-50"
              >

                {/* Order ID */}
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
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                </td>

                {/* Total */}
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {order.total} DA
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
  );
}