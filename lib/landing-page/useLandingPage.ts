import { useEffect, useState } from "react";
import {
  applyProductToDefaults,
  createDefaultLandingPage,
  DEMO_PRODUCT,
  SellerProduct,
} from "./defaults";
import { getLandingPageByProduct, getLandingPageBySlug } from "./storage";
import { LandingPage } from "./types";

export function useLandingPage(productId: number, product?: SellerProduct | null) {
  const [page, setPage] = useState<LandingPage | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const existing = getLandingPageByProduct(productId);
    if (existing) {
      setPage(existing);
    } else {
      const base = createDefaultLandingPage(productId);
      setPage(
        applyProductToDefaults(
          base,
          product ?? { ...DEMO_PRODUCT, id: productId }
        )
      );
    }
    setReady(true);
  }, [productId, product]);

  return { page, setPage, ready };
}

export function usePublicLandingPage(slug: string) {
  const [page, setPage] = useState<LandingPage | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPage(getLandingPageBySlug(slug));
    setReady(true);
  }, [slug]);

  return { page, ready };
}