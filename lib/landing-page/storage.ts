import { LandingColors, LandingPage } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const URL_PREFIX = "/p/";

type BackendPage = {
  id: number;
  product_id: number | null;
  slug: string;
  title: string;
  brand: string;
  header_colors: Record<string, string>;
  sections: unknown[];
};

function toFrontendPage(raw: BackendPage): LandingPage {
  return {
    id: String(raw.id),
    productId: raw.product_id ?? 0,
    slug: raw.slug,
    title: raw.title,
    brand: raw.brand,
    headerColors: (raw.header_colors ?? {}) as LandingColors,
    sections: (raw.sections ?? []) as LandingPage["sections"],
  };
}

function toBackendPage(page: LandingPage): Record<string, unknown> {
  return {
    product_id: page.productId > 0 ? page.productId : null,
    slug: page.slug,
    title: page.title,
    brand: page.brand,
    header_colors: page.headerColors ?? {},
    sections: page.sections ?? [],
  };
}

export async function getLandingPageBySlug(
  slug: string
): Promise<LandingPage | null> {
  const res = await fetch(`${API_URL}/landing-pages/${slug}`);

  if (!res.ok) {
    return null;
  }

  const raw: BackendPage = await res.json();
  return toFrontendPage(raw);
}

export async function getLandingPageByProduct(
  productId: number
): Promise<LandingPage | null> {
  const pages = await listLandingPages();

  const page = pages.find((p) => p.productId === productId);

  return page ?? null;
}

export async function getLandingPageSlug(
  productId: number
): Promise<string | null> {
  const page = await getLandingPageByProduct(productId);

  return page?.slug ?? null;
}

export async function listLandingPages(): Promise<LandingPage[]> {
  const res = await fetch(`${API_URL}/landing-pages`);

  if (!res.ok) {
    return [];
  }

  const raws: BackendPage[] = await res.json();

  return raws.map(toFrontendPage);
}

export async function saveLandingPage(
  page: LandingPage
): Promise<LandingPage | null> {
  const existing = await getLandingPageBySlug(page.slug);

  const payload = toBackendPage(page);

  let url = `${API_URL}/landing-pages`;
  let method = "POST";

  const knownId = existing
    ? String(existing.id)
    : /^\d+$/.test(page.id)
      ? page.id
      : null;

  if (knownId) {
    url = `${API_URL}/landing-pages/${knownId}`;
    method = "PUT";
  }

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return null;
  }

  const saved: BackendPage = await res.json();
  return toFrontendPage(saved);
}

export async function deleteLandingPage(slug: string): Promise<void> {
  const page = await getLandingPageBySlug(slug);

  if (!page) {
    return;
  }

  await fetch(`${API_URL}/landing-pages/${page.id}`, {
    method: "DELETE",
  });
}

export function productPublicUrl(slug: string): string {
  return `${URL_PREFIX}${slug}`;
}
