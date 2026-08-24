"use client";

import { useCallback, useRef } from "react";

type ResizeHandleProps = {
  width: number;
  minWidth: number;
  maxWidth: number;
  onResize: (width: number) => void;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
};

export default function ResizeHandle({
  width,
  minWidth,
  maxWidth,
  onResize,
  onResizeStart,
  onResizeEnd,
}: ResizeHandleProps) {
  const startX = useRef(0);
  const startWidth = useRef(width);
  const resizing = useRef(false);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (!resizing.current) {
        return;
      }

      const delta =
        event.clientX - startX.current;

      const nextWidth = Math.min(
        maxWidth,
        Math.max(
          minWidth,
          startWidth.current + delta
        )
      );

      onResize(nextWidth);
    },
    [maxWidth, minWidth, onResize]
  );

  const handlePointerUp = useCallback(() => {
    if (!resizing.current) {
      return;
    }

    resizing.current = false;

    document.body.style.userSelect = "";
    document.body.style.cursor = "";

    window.removeEventListener(
      "pointermove",
      handlePointerMove
    );

    window.removeEventListener(
      "pointerup",
      handlePointerUp
    );

    onResizeEnd?.();
  }, [handlePointerMove, onResizeEnd]);

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();

    startX.current = event.clientX;
    startWidth.current = width;
    resizing.current = true;

    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    window.addEventListener(
      "pointerup",
      handlePointerUp
    );

    onResizeStart?.();
  };

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize sidebar"
      onPointerDown={handlePointerDown}
      className="
        absolute inset-y-0 right-0 z-20
        w-2
        cursor-col-resize
        touch-none
        select-none
        outline-none
        focus:outline-none
      "
    >
      <div
        className="
          absolute inset-y-0 right-0
          w-px
          bg-transparent
          transition-colors
          hover:bg-gray-300
        "
      />
    </div>
  );
}
