import Image from "next/image";
import { product } from "../../data/product";

export default function ProductVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[500px]">

      {/* Visual atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.18)_0%,rgba(239,68,68,0.05)_35%,transparent_70%)]" />

      {/* Product image */}
      <div className="relative">

        <Image
          src={product.heroImage}
          alt={product.name}
          width={754}
          height={590}
          priority
          className="
            relative
            z-10
            h-auto
            w-full
            object-contain
          "
        />

        {/* Top fade */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-20
            h-16
            bg-gradient-to-b
            from-[#080a0b]
            to-transparent
          "
        />

        {/* Bottom fade */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-20
            h-24
            bg-gradient-to-t
            from-[#080a0b]
            via-[#080a0b]/60
            to-transparent
          "
        />

        {/* Left fade */}
        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-20
            w-16
            bg-gradient-to-r
            from-[#080a0b]
            to-transparent
          "
        />

        {/* Right fade */}
        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-20
            w-16
            bg-gradient-to-l
            from-[#080a0b]
            to-transparent
          "
        />
      </div>

    </div>
  );
}