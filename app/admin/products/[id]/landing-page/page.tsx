"use client";

import { useParams } from "next/navigation";

import LandingPageBuilder from "../../../../../components/admin/landing-page-builder/LandingPageBuilder";

export default function ProductLandingPage() {
  const params = useParams();

  const productId = String(params.id);

  return (
    <LandingPageBuilder productId={productId} />
  );
}
