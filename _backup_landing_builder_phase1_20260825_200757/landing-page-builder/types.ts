export type {
  LandingSectionType,
  LandingSection,
  LandingTheme,
  LandingFormField,
  LandingPage,
} from "../../../lib/landing-page/types";

import type {
  LandingSectionType,
  LandingSection,
  LandingTheme,
  LandingFormField,
  LandingPage,
} from "../../../lib/landing-page/types";

export type SectionType = LandingSectionType;

export type LandingSettings = {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  buttonText: string;
  fontFamily: string;
};

export type PreviewMode = "desktop" | "mobile";

export type SectionMoveDirection = "up" | "down";
