"use client";

import {
  useCallback,
  useState,
} from "react";

import {
  DEFAULT_LANDING_SETTINGS,
} from "../constants";

import type {
  LandingSettings,
} from "../types";

export function useLandingSettings() {
  const [settings, setSettings] =
    useState<LandingSettings>(
      DEFAULT_LANDING_SETTINGS
    );

  const updateSetting = useCallback(
    (
      key: keyof LandingSettings,
      value: string
    ) => {
      setSettings((current) => ({
        ...current,
        [key]: value,
      }));
    },
    []
  );

  const updateSettings = useCallback(
    (
      updates: Partial<LandingSettings>
    ) => {
      setSettings((current) => ({
        ...current,
        ...updates,
      }));
    },
    []
  );

  const resetSettings = useCallback(() => {
    setSettings(
      DEFAULT_LANDING_SETTINGS
    );
  }, []);

  return {
    settings,
    setSettings,

    updateSetting,
    updateSettings,
    resetSettings,
  };
}
