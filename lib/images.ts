const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function imageUrl(path?: string | null): string {
  if (!path) {
    return "/images/product.png";
  }

  if (path.startsWith("http")) {
    return path;
  }

  return `${API_URL}${path}`;
}