"use client";

import { useState } from "react";
import {
  LandingColors,
  LandingSection,
  LandingPage,
} from "@/lib/landing-page/types";
import {
  ColorField,
  ImageField,
  NumberField,
  TextAreaField,
  TextField,
  ToggleField,
} from "./controls";

type Props = {
  global: {
    brand: string;
    title: string;
    slug: string;
    colors: LandingColors;
    onPatch: (patch: Partial<Pick<LandingPage, "brand" | "title" | "slug">>) => void;
    onPatchColors: (patch: Partial<LandingColors>) => void;
  };
  selectedSection: LandingSection | null;
  onPatchSection: (sectionId: string, patch: Record<string, any>) => void;
};

const COLOR_LABELS: Array<[keyof LandingColors, string]> = [
  ["bg", "الخلفية"],
  ["surface", "سطح البطاقات"],
  ["primary", "اللون الرئيسي"],
  ["primaryHover", "اللون الرئيسي (Hover)"],
  ["text", "النص"],
  ["mutedText", "النص الثانوي"],
  ["border", "الحدود"],
];

export default function DesignPanel({ global, selectedSection, onPatchSection }: Props) {
  const [showColors, setShowColors] = useState(true);

  const renderColors = (colors: LandingColors, onPatchColors: (patch: Partial<LandingColors>) => void) => (
    <div className="space-y-2">
      {COLOR_LABELS.map(([key, label]) => (
        <ColorField
          key={key}
          label={label}
          value={colors[key]}
          onChange={(value) => onPatchColors({ [key]: value })}
        />
      ))}
    </div>
  );

  return (
    <aside className="flex h-full flex-col bg-white">
      <div className="border-b border-gray-200 px-4 py-3">
        <h3 className="text-sm font-bold text-gray-900">
          {selectedSection ? getSectionLabel(selectedSection.type) : "إعدادات الرأس"}
        </h3>
      </div>

      <div className="custom-scrollbar flex-1 space-y-5 overflow-y-auto p-4">
        {!selectedSection ? (
          <>
            <TextField
              label="اسم العلامة"
              value={global.brand}
              onChange={(value) => global.onPatch({ brand: value })}
            />
            <TextField
              label="عنوان الصفحة"
              value={global.title}
              onChange={(value) => global.onPatch({ title: value })}
            />
            <div dir="ltr">
              <TextField
                label="رابط الصفحة (slug)"
                value={global.slug}
                onChange={(value) => global.onPatch({ slug: value })}
              />
            </div>

            <div>
              <button
                type="button"
                onClick={() => setShowColors((s) => !s)}
                className="mb-2 flex w-full items-center justify-between text-xs font-bold text-gray-700"
              >
                ألوان الرأس
                <span className="text-gray-400">{showColors ? "▲" : "▼"}</span>
              </button>
              {showColors && renderColors(global.colors, global.onPatchColors)}
            </div>
          </>
        ) : (
          <SectionPanel
            key={selectedSection.id}
            section={selectedSection}
            onPatch={(patch) => onPatchSection(selectedSection.id, patch)}
          />
        )}
      </div>
    </aside>
  );
}

function SectionPanel({ section, onPatch }: { section: LandingSection; onPatch: (patch: Record<string, any>) => void }) {
  return (
    <>
      <div>
        <p className="mb-2 text-xs font-bold text-gray-700">حالة القسم</p>
        <ToggleField
          label="القسم مفعّل"
          checked={section.enabled}
          onChange={(enabled) => onPatch({ enabled })}
        />
      </div>

      <div>
        <p className="mb-2 text-xs font-bold text-gray-700">ألوان القسم</p>
        <div className="space-y-2">
          {COLOR_LABELS.map(([key, label]) => (
            <ColorField
              key={key}
              label={label}
              value={section.colors[key]}
              onChange={(value) =>
                onPatch({ colors: { ...section.colors, [key]: value } })
              }
            />
          ))}
        </div>
      </div>

      {sectionContent(section, onPatch)}
    </>
  );
}

function sectionContent(section: LandingSection, onPatch: (patch: Record<string, any>) => void) {
  switch (section.type) {
    case "hero":
      return (
        <>
          <TextField label="العلامة" value={section.brand} onChange={(brand) => onPatch({ brand })} />
          <TextField label="العنوان" value={section.title} onChange={(title) => onPatch({ title })} />
          <TextField label="العنوان المميز" value={section.highlightedTitle} onChange={(highlightedTitle) => onPatch({ highlightedTitle })} />
          <TextAreaField label="الوصف" value={section.description} onChange={(description) => onPatch({ description })} />
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="السعر" value={section.price} onChange={(price) => onPatch({ price })} />
            <TextField label="العملة" value={section.currency} onChange={(currency) => onPatch({ currency })} />
          </div>
          <TextField label="نص الزر" value={section.buttonText} onChange={(buttonText) => onPatch({ buttonText })} />

          <div>
            <p className="mb-2 text-xs font-bold text-gray-700">الصور ({section.slides.length})</p>
            <div className="space-y-2">
              {section.slides.map((slide, i) => (
                <ImageField
                  key={i}
                  label={`صورة ${i + 1}`}
                  value={slide.image}
                  onChange={(image) => {
                    const slides = [...section.slides];
                    slides[i] = { ...slides[i], image };
                    onPatch({ slides });
                  }}
                />
              ))}
            </div>
          </div>
        </>
      );

    case "features":
      return (
        <>
          <TextField label="العنوان" value={section.title} onChange={(title) => onPatch({ title })} />
          <TextAreaField label="النص التعريفي" value={section.subtitle} onChange={(subtitle) => onPatch({ subtitle })} />
          {section.items.map((item, i) => (
            <div key={item.id} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
              <p className="mb-2 text-xs font-bold text-gray-600">ميزة {i + 1}</p>
              <div className="space-y-2">
                <TextField label="العنوان" value={item.title} onChange={(title) => {
                  const items = [...section.items];
                  items[i] = { ...items[i], title };
                  onPatch({ items });
                }} />
                <TextAreaField label="الوصف" value={item.description} onChange={(description) => {
                  const items = [...section.items];
                  items[i] = { ...items[i], description };
                  onPatch({ items });
                }} />
                <ImageField label="الصورة" value={item.image} onChange={(image) => {
                  const items = [...section.items];
                  items[i] = { ...items[i], image };
                  onPatch({ items });
                }} />
              </div>
            </div>
          ))}
        </>
      );

    case "gallery":
      return (
        <>
          <TextField label="العنوان" value={section.title} onChange={(title) => onPatch({ title })} />
          {section.items.map((item, i) => (
            <div key={item.id} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
              <p className="mb-2 text-xs font-bold text-gray-600">صورة {i + 1}</p>
              <div className="space-y-2">
                <ImageField label="الصورة" value={item.image} onChange={(image) => {
                  const items = [...section.items];
                  items[i] = { ...items[i], image };
                  onPatch({ items });
                }} />
                <TextField label="التسمية" value={item.caption} onChange={(caption) => {
                  const items = [...section.items];
                  items[i] = { ...items[i], caption };
                  onPatch({ items });
                }} />
              </div>
            </div>
          ))}
        </>
      );

    case "testimonials":
      return (
        <>
          <TextField label="العنوان" value={section.title} onChange={(title) => onPatch({ title })} />
          {section.items.map((item, i) => (
            <div key={item.id} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
              <p className="mb-2 text-xs font-bold text-gray-600">تقييم {i + 1}</p>
              <div className="space-y-2">
                <TextField label="الاسم" value={item.name} onChange={(name) => {
                  const items = [...section.items];
                  items[i] = { ...items[i], name };
                  onPatch({ items });
                }} />
                <TextAreaField label="التعليق" value={item.text} onChange={(text) => {
                  const items = [...section.items];
                  items[i] = { ...items[i], text };
                  onPatch({ items });
                }} />
                <NumberField label="التقييم (1-5)" value={item.rating} onChange={(rating) => {
                  const items = [...section.items];
                  items[i] = { ...items[i], rating: Math.min(5, Math.max(1, rating)) };
                  onPatch({ items });
                }} />
              </div>
            </div>
          ))}
        </>
      );

    case "faq":
      return (
        <>
          <TextField label="العنوان" value={section.title} onChange={(title) => onPatch({ title })} />
          {section.items.map((item, i) => (
            <div key={item.id} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
              <p className="mb-2 text-xs font-bold text-gray-600">سؤال {i + 1}</p>
              <div className="space-y-2">
                <TextField label="السؤال" value={item.question} onChange={(question) => {
                  const items = [...section.items];
                  items[i] = { ...items[i], question };
                  onPatch({ items });
                }} />
                <TextAreaField label="الجواب" value={item.answer} onChange={(answer) => {
                  const items = [...section.items];
                  items[i] = { ...items[i], answer };
                  onPatch({ items });
                }} />
              </div>
            </div>
          ))}
        </>
      );

    case "order-form":
      return (
        <>
          <TextField label="العنوان" value={section.title} onChange={(title) => onPatch({ title })} />
          <TextAreaField label="النص التعريفي" value={section.subtitle} onChange={(subtitle) => onPatch({ subtitle })} />
          <TextField label="نص الزر" value={section.buttonText} onChange={(buttonText) => onPatch({ buttonText })} />
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="سعر المنتج" value={section.price} onChange={(price) => onPatch({ price })} />
            <TextField label="العملة" value={section.currency} onChange={(currency) => onPatch({ currency })} />
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
            <p className="mb-2 text-xs font-bold text-gray-700">أسعار التوصيل</p>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <TextField label="توصيل المنزل" value={section.delivery.homeLabel} onChange={(homeLabel) => onPatch({ delivery: { ...section.delivery, homeLabel } })} />
                <NumberField label="سعره" value={section.delivery.homePrice} onChange={(homePrice) => onPatch({ delivery: { ...section.delivery, homePrice } })} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <TextField label="تسليم المكتب" value={section.delivery.officeLabel} onChange={(officeLabel) => onPatch({ delivery: { ...section.delivery, officeLabel } })} />
                <NumberField label="سعره" value={section.delivery.officePrice} onChange={(officePrice) => onPatch({ delivery: { ...section.delivery, officePrice } })} />
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold text-gray-700">حقول النموذج</p>
            <div className="space-y-2">
              {section.fields.map((fa) => (
                <ToggleField
                  key={fa.id}
                  label={fa.label}
                  checked={fa.enabled}
                  onChange={(enabled) => {
                    const fields = section.fields.map((f) =>
                      f.id === fa.id ? { ...f, enabled } : f
                    );
                    onPatch({ fields });
                  }}
                />
              ))}
            </div>
          </div>
        </>
      );

    case "footer":
      return (
        <>
          <TextField label="النص السفلي (حقوق)" value={section.copyright} onChange={(copyright) => onPatch({ copyright })} />
          {section.benefits.map((b, i) => (
            <div key={b.id} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
              <p className="mb-2 text-xs font-bold text-gray-600">ميزة {i + 1}</p>
              <div className="space-y-2">
                <TextField label="العنوان" value={b.title} onChange={(title) => {
                  const benefits = [...section.benefits];
                  benefits[i] = { ...benefits[i], title };
                  onPatch({ benefits });
                }} />
                <TextField label="الوصف" value={b.description} onChange={(description) => {
                  const benefits = [...section.benefits];
                  benefits[i] = { ...benefits[i], description };
                  onPatch({ benefits });
                }} />
              </div>
            </div>
          ))}
        </>
      );
  }
}

export function getSectionLabel(type: string): string {
  const labels: Record<string, string> = {
    hero: "القسم الرئيسي (Hero)",
    features: "المميزات",
    gallery: "معرض الصور",
    testimonials: "آراء العملاء",
    faq: "الأسئلة الشائعة",
    "order-form": "نموذج الطلب",
    footer: "التذييل",
  };
  return labels[type] ?? type;
}