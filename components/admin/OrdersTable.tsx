"use client";

import {
  Search,
  Eye,
} from "lucide-react";

const orders = [
  {
    id: "#1001",
    customer: "Ahmed Ali",
    total: "$120.00",
    status: "Delivered",
    date: "06 Aug 2026",
  },
  {
    id: "#1002",
    customer: "Sara Mohamed",
    total: "$75.00",
    status: "Pending",
    date: "05 Aug 2026",
  },
  {
    id: "#1003",
    customer: "John Smith",
    total: "$220.00",
    status: "Confirmed",
    date: "04 Aug 2026",
  },
];

function statusStyle(status: string) {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";

    case "Confirmed":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

export default function OrdersTable() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage all customer orders.
          </p>
        </div>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search orders..."
          className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-gray-900 outline-none focus:border-indigo-600"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left text-gray-600">
              <th className="py-4">Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-5 font-semibold text-gray-900">
                  {order.id}
                </td>

                <td className="text-gray-700">
                  {order.customer}
                </td>

                <td className="font-medium text-gray-900">
                  {order.total}
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="text-gray-600">
                  {order.date}
                </td>

                <td>
                  <div className="flex justify-center">
                    <button className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50">
                      <Eye size={18} />
                    </button>
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