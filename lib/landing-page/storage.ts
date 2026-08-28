import { LandingPage } from "./types";

const STORAGE_KEY = "landing-pages:v1";
const URL_PREFIX = "/p/";

type StoreShape = {
  bySlug: Record<string, LandingPage>;
  byProduct: Record<string, string>;
};

function readStore(): StoreShape {
  if (typeof window === "undefined") {
    return { bySlug: {}, byProduct: {} };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bySlug: {}, byProduct: {} };
    const parsed = JSON.parse(raw);
    return {
      bySlug: parsed?.bySlug ?? {},
      byProduct: parsed?.byProduct ?? {},
    };
  } catch {
    return { bySlug: {}, byProduct: {} };
  }
}

function writeStore(store: StoreShape) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function getLandingPageBySlug(slug: string): LandingPage | null {
  return readStore().bySlug[slug] ?? null;
}

export function getLandingPageByProduct(productId: number): LandingPage | null {
  const store = readStore();
  const slug = store.byProduct[String(productId)];
  if (!slug) return null;
  return store.bySlug[slug] ?? null;
}

export function getLandingPageSlug(productId: number): string | null {
  return readStore().byProduct[String(productId)] ?? null;
}

export function getLandingPages(): LandingPage[] {
  return Object.values(readStore().bySlug);
}

export function saveLandingPage(page: LandingPage): void {
  const store = readStore();
  store.bySlug[page.slug] = page;
  store.byProduct[String(page.productId)] = page.slug;
  writeStore(store);
}

export function deleteLandingPage(slug: string): void {
  const store = readStore();
  const page = store.bySlug[slug];
  if (page) {
    delete store.byProduct[String(page.productId)];
  }
  delete store.bySlug[slug];
  writeStore(store);
}

export function productPublicUrl(slug: string): string {
  return `${URL_PREFIX}${slug}`;
}