import {
  Headphones,
  ShieldCheck,
  Truck,
  Banknote,
} from "lucide-react";

const benefits = [
  {
    icon: Headphones,
    title: "دعم العملاء",
    description: "خدمة عملاء 24/7",
  },
  {
    icon: ShieldCheck,
    title: "ضمان الجودة",
    description: "منتجات أصلية 100%",
  },
  {
    icon: Truck,
    title: "توصيل سريع",
    description: "إلى جميع الولايات",
  },
  {
    icon: Banknote,
    title: "الدفع عند الاستلام",
    description: "ادفع بعد استلام منتجك",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0c0f11] px-4 py-8">

      <div className="mx-auto max-w-6xl">

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">

          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="text-center"
              >
                <Icon
                  size={30}
                  className="mx-auto text-red-500"
                />

                <h3 className="mt-2 text-sm font-bold text-white">
                  {benefit.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-400">
                  {benefit.description}
                </p>
              </div>
            );
          })}

        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-gray-500">
          © 2026 HOKA Algeria. جميع الحقوق محفوظة.
        </div>

      </div>
    </footer>
  );
}