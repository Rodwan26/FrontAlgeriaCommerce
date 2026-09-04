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
    let cancelled = false;

    getLandingPageByProduct(productId)
      .then((existing) => {
        if (cancelled) return;

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
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [productId, product]);

  return { page, setPage, ready };
}

export function usePublicLandingPage(slug: string) {
  const [page, setPage] = useState<LandingPage | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getLandingPageBySlug(slug)
      .then((loaded) => {
        if (cancelled) return;
        setPage(loaded);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { page, ready };
}
