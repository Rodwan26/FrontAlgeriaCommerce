"use client";

import {
  Clock3,
  CircleCheckBig,
  Package,
  Truck,
} from "lucide-react";

const steps = [
  {
    title: "Pending",
    date: "06 Aug 2026 • 09:15",
    completed: true,
    icon: Clock3,
  },
  {
    title: "Confirmed",
    date: "06 Aug 2026 • 09:25",
    completed: true,
    icon: CircleCheckBig,
  },
  {
    title: "Processing",
    date: "06 Aug 2026 • 10:00",
    completed: true,
    icon: Package,
  },
  {
    title: "Shipped",
    date: "--",
    completed: false,
    icon: Truck,
  },
];

export default function OrderTimeline() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-8 text-xl font-bold text-gray-900">
        Order Timeline
      </h2>

      <div className="space-y-8">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="relative flex gap-4"
            >
              {index !== steps.length - 1 && (
                <div
                  className={`absolute left-5 top-10 h-14 w-0.5 ${
                    step.completed
                      ? "bg-indigo-500"
                      : "bg-gray-300"
                  }`}
                />
              )}

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  step.completed
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                <Icon size={18} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {step.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}