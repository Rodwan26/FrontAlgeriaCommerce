import { Minus, Plus } from "lucide-react";

type QuantitySelectorProps = {
  quantity: number;
  onChange: (quantity: number) => void;
};

export default function QuantitySelector({
  quantity,
  onChange,
}: QuantitySelectorProps) {
  const decrease = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const increase = () => {
    onChange(quantity + 1);
  };

  return (
    <div className="flex items-center justify-between">

      <span className="text-lg font-bold text-white">
        الكمية
      </span>

      <div className="flex h-14 items-center overflow-hidden rounded-xl border border-red-600/70 bg-[#151719]">

        <button
          type="button"
          onClick={decrease}
          className="flex h-full w-14 items-center justify-center bg-red-600 text-white transition hover:bg-red-500"
        >
          <Minus size={22} />
        </button>

        <span className="flex w-16 justify-center text-lg font-black text-white">
          {String(quantity).padStart(2, "0")}
        </span>

        <button
          type="button"
          onClick={increase}
          className="flex h-full w-14 items-center justify-center bg-red-600 text-white transition hover:bg-red-500"
        >
          <Plus size={22} />
        </button>

      </div>
    </div>
  );
}