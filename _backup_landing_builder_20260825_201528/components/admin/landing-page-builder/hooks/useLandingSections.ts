"use client";

import {
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  DEFAULT_SECTION_TYPES,
  SECTION_LABELS,
} from "../constants";

import type {
  LandingSection,
  SectionMoveDirection,
  SectionType,
} from "../types";

function createSection(
  type: SectionType,
  index: number
): LandingSection {
  return {
    id: `${type}-${Date.now()}-${index}`,
    type,
    title: SECTION_LABELS[type],
    enabled: true,
    settings: {},
  };
}

function createInitialSections(): LandingSection[] {
  return DEFAULT_SECTION_TYPES.map(
    (type, index) =>
      createSection(type, index)
  );
}

export function useLandingSections() {
  const [sections, setSections] =
    useState<LandingSection[]>(
      createInitialSections
    );

  const [selectedSection, setSelectedSection] =
    useState<string | null>(
      sections[0]?.id ?? null
    );

  const [showSectionLibrary, setShowSectionLibrary] =
    useState(false);

  const selected = useMemo(
    () =>
      sections.find(
        (section) =>
          section.id === selectedSection
      ) ?? null,
    [sections, selectedSection]
  );

  const selectSection = useCallback(
    (sectionId: string) => {
      setSelectedSection(sectionId);
    },
    []
  );

  const moveSection = useCallback(
    (
      sectionId: string,
      direction: SectionMoveDirection
    ) => {
      setSections((current) => {
        const index = current.findIndex(
          (section) =>
            section.id === sectionId
        );

        if (index === -1) {
          return current;
        }

        const targetIndex =
          direction === "up"
            ? index - 1
            : index + 1;

        if (
          targetIndex < 0 ||
          targetIndex >= current.length
        ) {
          return current;
        }

        const next = [...current];

        const [
          movedSection,
        ] = next.splice(index, 1);

        next.splice(
          targetIndex,
          0,
          movedSection
        );

        return next;
      });
    },
    []
  );

  const toggleSection = useCallback(
    (sectionId: string) => {
      setSections((current) =>
        current.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                enabled: !section.enabled,
              }
            : section
        )
      );
    },
    []
  );

  const removeSection = useCallback(
    (sectionId: string) => {
      setSections((current) => {
        const index = current.findIndex(
          (section) =>
            section.id === sectionId
        );

        if (index === -1) {
          return current;
        }

        const next = current.filter(
          (section) =>
            section.id !== sectionId
        );

        setSelectedSection((currentSelected) => {
          if (
            currentSelected !== sectionId
          ) {
            return currentSelected;
          }

          return (
            next[index]?.id ??
            next[index - 1]?.id ??
            null
          );
        });

        return next;
      });
    },
    []
  );

  const addSection = useCallback(
    (type: SectionType) => {
      const newSection = createSection(
        type,
        sections.length
      );

      setSections((current) => [
        ...current,
        newSection,
      ]);

      setSelectedSection(newSection.id);

      setShowSectionLibrary(false);
    },
    [sections.length]
  );

  const toggleSectionLibrary =
    useCallback(() => {
      setShowSectionLibrary(
        (current) => !current
      );
    }, []);

  return {
    sections,
    selected,
    selectedSection,
    showSectionLibrary,

    setSections,

    selectSection,
    setSelectedSection,

    moveSection,
    toggleSection,
    removeSection,
    addSection,

    toggleSectionLibrary,
    setShowSectionLibrary,
  };
}






