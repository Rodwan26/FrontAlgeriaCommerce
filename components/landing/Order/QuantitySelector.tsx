import { Minus, Plus } from "lucide-react";

type QuantitySelectorProps = {
  quantity: number;
  onChange: (quantity: number) => void;
};

export default function QuantitySelector({
  quantity,
  onChange,
}: QuantitySelectorProps) {
  return (
    <div
      className="
        flex
        min-h-[64px]
        w-full
        items-center
        justify-between
        rounded-[16px]
        border
        border-red-500/70
        bg-[#151719]
        px-3
      "
    >
      <span className="px-3 text-[17px] font-bold text-white">
        الكمية
      </span>

      <div className="flex h-[50px] items-center overflow-hidden rounded-[12px] bg-[#202225]">
        <button
          type="button"
          onClick={() =>
            onChange(Math.max(1, quantity - 1))
          }
          aria-label="إنقاص الكمية"
          className="
            flex
            h-full
            w-[50px]
            items-center
            justify-center
            text-white
            transition
            hover:bg-red-500
            active:bg-red-600
          "
        >
          <Minus size={21} />
        </button>

        <span className="flex w-[55px] justify-center text-[18px] font-black text-white">
          {String(quantity).padStart(2, "0")}
        </span>

        <button
          type="button"
          onClick={() => onChange(quantity + 1)}
          aria-label="زيادة الكمية"
          className="
            flex
            h-full
            w-[50px]
            items-center
            justify-center
            text-white
            transition
            hover:bg-red-500
            active:bg-red-600
          "
        >
          <Plus size={21} />
        </button>
      </div>
    </div>
  );
}