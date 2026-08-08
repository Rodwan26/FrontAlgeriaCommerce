"use client";

import { User, Mail, Phone } from "lucide-react";

export default function CustomerCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900">
        Customer
      </h2>

      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
            <User className="text-indigo-600" size={22} />
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              Ahmed Ali
            </p>

            <p className="text-sm text-gray-500">
              Customer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <Mail size={18} />

          <span>ahmed@example.com</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <Phone size={18} />

          <span>+213 555 00 00 00</span>
        </div>
      </div>
    </div>
  );
}