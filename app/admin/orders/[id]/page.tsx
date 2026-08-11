"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
};

type OrderItem = {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: Product;
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
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params.id;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  async function loadOrder() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`
      );

      if (!res.ok) {
        throw new Error("Failed to load order");
      }

      const data = await res.json();

      setOrder(data);
    } catch (error) {
      console.error("Failed to load order:", error);
    } finally {
      setLoading(false);
    }
  }
  async function updateStatus(newStatus: string) {
  setUpdatingStatus(true);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}/status?status=${newStatus}`,
      {
        method: "PUT",
      }
    );

    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(
        errorData.detail || "Failed to update order status"
      );
    }

    setOrder((currentOrder) =>
      currentOrder
        ? {
            ...currentOrder,
            status: newStatus,
          }
        : null
    );
  } catch (error) {
    console.error("Failed to update order status:", error);
  } finally {
    setUpdatingStatus(false);
  }
}

  useEffect(() => {
    if (id) {
      loadOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-500">Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-500">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Order #{order.id}
        </h1>

        <p className="mt-1 text-gray-500">
          Order details and customer information
        </p>
      </div>

      {/* Customer + Order information */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* Customer */}
        <div className="rounded-xl border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Customer Information
          </h2>

          <div className="space-y-4">

            <div>
              <p className="text-sm text-gray-500">
                Name
              </p>

              <p className="font-medium text-gray-900">
                {order.customer_name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Phone
              </p>

              <p className="font-medium text-gray-900">
                {order.customer_phone}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Address
              </p>

              <p className="font-medium text-gray-900">
                {order.customer_address}
              </p>
            </div>

          </div>
        </div>

        {/* Order information */}
        <div className="rounded-xl border bg-white p-6">

          <h2 className="mb-4 text-lg font-semibold">
            Order Information
          </h2>

          <div className="space-y-4">

            {/* Status */}
            <div>
              <p className="mb-2 text-sm text-gray-500">
                Status
              </p>

              <select
                value={order.status}
                onChange={(e) => updateStatus(e.target.value)}
                disabled={updatingStatus}
                className="rounded-lg border px-4 py-2 text-sm font-medium outline-none focus:border-blue-500"
              >
                {statuses.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status.charAt(0).toUpperCase() +
                      status.slice(1)}
                  </option>
                ))}
              </select>

              {updatingStatus && (
                <p className="mt-2 text-sm text-gray-500">
                  Updating status...
                </p>
              )}
            </div>

            {/* Total */}
            <div>
              <p className="text-sm text-gray-500">
                Total
              </p>

              <p className="text-2xl font-bold text-gray-900">
                {order.total} DA
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Products */}
      <div className="overflow-hidden rounded-xl border bg-white">

        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            Products
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Quantity
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  Total
                </th>

              </tr>

            </thead>

            <tbody>

              {order.items.map((item) => (

                <tr
                  key={item.id}
                  className="border-t"
                >

                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">
                      {item.product.name}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    {item.price} DA
                  </td>

                  <td className="px-6 py-4">
                    {item.quantity}
                  </td>

                  <td className="px-6 py-4 text-right font-semibold">
                    {item.price * item.quantity} DA
                  </td>

                </tr>

              ))}

            </tbody>

            <tfoot>

              <tr className="border-t">

                <td
                  colSpan={3}
                  className="px-6 py-4 text-right font-semibold"
                >
                  Grand Total
                </td>

                <td className="px-6 py-4 text-right text-lg font-bold">
                  {order.total} DA
                </td>

              </tr>

            </tfoot>

          </table>

        </div>

      </div>

    </div>
  );
}