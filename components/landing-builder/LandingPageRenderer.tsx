"use client";

import { LandingPage } from "@/lib/landing-page/types";
import BuilderHeader from "./sections/BuilderHeader";
import BuilderHero from "./sections/BuilderHero";
import BuilderFeatures from "./sections/BuilderFeatures";
import BuilderGallery from "./sections/BuilderGallery";
import BuilderTestimonials from "./sections/BuilderTestimonials";
import BuilderFaq from "./sections/BuilderFaq";
import BuilderOrderForm from "./sections/BuilderOrderForm";
import BuilderFooter from "./sections/BuilderFooter";

export default function LandingPageRenderer({ page }: { page: LandingPage }) {
  return (
    <div dir="rtl" className="min-h-screen bg-black">
      <BuilderHeader brand={page.brand} colors={page.headerColors} />

      {page.sections
        .filter((section) => section.enabled)
        .map((section) => {
          const content = (() => {
            switch (section.type) {
              case "hero":
                return <BuilderHero key={section.id} section={section} />;
              case "features":
                return <BuilderFeatures key={section.id} section={section} />;
              case "gallery":
                return <BuilderGallery key={section.id} section={section} />;
              case "testimonials":
                return <BuilderTestimonials key={section.id} section={section} />;
              case "faq":
                return <BuilderFaq key={section.id} section={section} />;
              case "order-form":
                return <BuilderOrderForm key={section.id} section={section} />;
              case "footer":
                return <BuilderFooter key={section.id} section={section} />;
              default:
                return null;
            }
          })();
          return (
            <div key={section.id} data-section-id={section.id}>
              {content}
            </div>
          );
        })}
    </div>
  );
}