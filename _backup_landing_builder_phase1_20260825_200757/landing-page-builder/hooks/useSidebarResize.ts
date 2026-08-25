"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  SIDEBAR_RESIZE_LIMITS,
} from "../constants";

type UseSidebarResizeOptions = {
  initialWidth?: number;
};

export function useSidebarResize({
  initialWidth = 280,
}: UseSidebarResizeOptions = {}) {
  const [width, setWidth] =
    useState(initialWidth);

  const [isCollapsed, setIsCollapsed] =
    useState(false);

  const [isResizing, setIsResizing] =
    useState(false);

  const startResize = useCallback(() => {
    setIsResizing(true);
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
  }, []);

  const stopResize = useCallback(() => {
    setIsResizing(false);
    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  }, []);

  const resize = useCallback(
    (clientX: number, startX: number, startWidth: number) => {
      const nextWidth =
        startWidth + (clientX - startX);

      const clampedWidth = Math.min(
        SIDEBAR_RESIZE_LIMITS.max,
        Math.max(
          SIDEBAR_RESIZE_LIMITS.min,
          nextWidth
        )
      );

      setWidth(clampedWidth);

      if (
        clampedWidth >
        SIDEBAR_RESIZE_LIMITS.collapsed + 20
      ) {
        setIsCollapsed(false);
      }
    },
    []
  );

  const collapse = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  const expand = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  const toggle = useCallback(() => {
    setIsCollapsed((current) => !current);
  }, []);

  useEffect(() => {
    if (!isResizing) {
      return;
    }

    return () => {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isResizing]);

  return {
    width: isCollapsed
      ? SIDEBAR_RESIZE_LIMITS.collapsed
      : width,

    isCollapsed,
    isResizing,

    setWidth,

    startResize,
    stopResize,
    resize,

    collapse,
    expand,
    toggle,
  };
}
