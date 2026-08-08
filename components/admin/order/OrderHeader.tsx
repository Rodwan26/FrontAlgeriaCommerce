"use client";

export default function OrderHeader() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Order #1001
          </h1>

          <p className="mt-2 text-gray-500">
            Created on 06 Aug 2026
          </p>
        </div>

        <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
          Pending
        </span>
      </div>
    </div>
  );
}