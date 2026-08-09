"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  Star,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  category_id?: number;
};

type Category = {
  id: number;
  name: string;
};

/* ------------------------------------------------------------------ */
/* Small reusable hook: reveals an element once it scrolls into view. */
/* ------------------------------------------------------------------ */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const categoriesReveal = useReveal<HTMLDivElement>();
  const productsReveal = useReveal<HTMLDivElement>();

  async function loadStore() {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
      ]);

      if (!productsRes.ok || !categoriesRes.ok) {
        throw new Error("Failed to load store data");
      }

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Failed to load store:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStore();
  }, []);

  /* Header shrinks + gains a shadow once the page scrolls */
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Soft cursor spotlight that follows the pointer across the page */
  useEffect(() => {
    let raf = 0;

    function handleMove(e: MouseEvent) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.background = `radial-gradient(500px circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.05), transparent 40%)`;
        }
      });
    }

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Ambient particle network in the hero, drawn on a canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let animationId: number;

    const particles = Array.from({ length: 55 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.4,
    }));

    function resize() {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener("resize", resize);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.55)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(255,255,255,${0.1 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  function scrollCategories(direction: "left" | "right") {
    if (!categoriesRef.current) return;

    categoriesRef.current.scrollBy({
      left: direction === "right" ? 320 : -320,
      behavior: "smooth",
    });
  }

  /* Mouse-driven parallax for the hero orbs + floating trust cards */
  function handleHeroMove(e: React.MouseEvent<HTMLElement>) {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroRef.current.style.setProperty("--mx", x.toFixed(3));
    heroRef.current.style.setProperty("--my", y.toFixed(3));
  }

  function handleHeroLeave() {
    if (!heroRef.current) return;
    heroRef.current.style.setProperty("--mx", "0");
    heroRef.current.style.setProperty("--my", "0");
  }

  /* Product card 3D tilt + glare-following-cursor effect */
  function handleCardMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
      scale(1.02)
    `;

    card.style.setProperty("--glare-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--glare-y", `${(y / rect.height) * 100}%`);

    const image = card.querySelector(".product-image") as HTMLElement | null;
    const content = card.querySelector(".product-content") as HTMLElement | null;
    const badge = card.querySelector(".product-badge") as HTMLElement | null;

    if (image) image.style.transform = "scale(1.1) translateZ(25px)";
    if (content) content.style.transform = "translateZ(18px)";
    if (badge) badge.style.transform = "translateZ(35px)";
  }

  function handleCardLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    const card = e.currentTarget;
    card.style.transform = "";

    const image = card.querySelector(".product-image") as HTMLElement | null;
    const content = card.querySelector(".product-content") as HTMLElement | null;
    const badge = card.querySelector(".product-badge") as HTMLElement | null;

    if (image) image.style.transform = "";
    if (content) content.style.transform = "";
    if (badge) badge.style.transform = "";
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === null || product.category_id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="relative min-h-screen bg-[#f8f8f6] text-gray-900">

      {/* Cursor spotlight, follows the pointer across the whole page */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-40 hidden md:block"
      />

      {/* Header */}
      <header
        className={`sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-xl transition-all duration-300 ${
          scrolled ? "py-1 shadow-md" : "py-0"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 ${
            scrolled ? "py-3" : "py-4"
          }`}
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-sm font-bold text-white transition-transform duration-300 hover:rotate-[8deg]">
              AC
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Algeria Commerce
              </h1>
              <p className="text-xs text-gray-500">Shop with confidence</p>
            </div>
          </Link>

          <nav className="flex items-center gap-3 md:gap-8">
            <div className="hidden items-center gap-8 md:flex">
              <a
                href="#products"
                className="relative text-sm font-medium text-gray-600 transition hover:text-black after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                Products
              </a>

              <a
                href="#categories"
                className="relative text-sm font-medium text-gray-600 transition hover:text-black after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                Categories
              </a>
            </div>

            <Link
              href="/cart"
              className="group flex shrink-0 items-center gap-2 rounded-full border border-black/10 px-3 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-lg sm:px-4"
            >
              <ShoppingCart
                size={17}
                className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
              />
              <span className="hidden sm:inline">Cart</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMove}
        onMouseLeave={handleHeroLeave}
        className="group relative overflow-hidden bg-black text-white [perspective:1200px]"
        style={{ ["--mx" as string]: 0, ["--my" as string]: 0 }}
      >
        {/* particle network */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.14),transparent_35%)]" />

        <div
          className="pointer-events-none absolute -left-1/2 top-[-30%] h-[160%] w-[45%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent blur-3xl transition-transform duration-[2500ms] ease-out group-hover:translate-x-[330%]"
        />

        {/* mouse-reactive glow orbs */}
        <div
          className="pointer-events-none absolute right-[10%] top-[16%] h-56 w-56 rounded-full bg-white/[0.05] blur-3xl transition-[background-color] duration-700 group-hover:bg-white/[0.09]"
          style={{
            transform:
              "translate3d(calc(var(--mx) * 50px), calc(var(--my) * 50px), 0)",
          }}
        />
        <div
          className="pointer-events-none absolute left-[8%] bottom-[10%] h-40 w-40 rounded-full bg-white/[0.04] blur-3xl"
          style={{
            transform:
              "translate3d(calc(var(--mx) * -35px), calc(var(--my) * -35px), 0)",
          }}
        />

        <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col items-center gap-14 px-6 py-24 lg:flex-row lg:items-center lg:justify-between">

          <div
            className="max-w-2xl animate-[fadeUp_0.9s_ease-out]"
            style={{
              transform:
                "translate3d(calc(var(--mx) * -8px), calc(var(--my) * -8px), 0)",
            }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-gray-200 backdrop-blur-xl transition duration-500 hover:border-white/30 hover:bg-white/15">
              <Sparkles size={16} className="animate-[spin_5s_linear_infinite]" />
              Premium shopping experience
            </div>

            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Everything you need.
              <span className="block text-gray-400">All in one place.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Discover carefully selected products at Algeria Commerce.
              Simple shopping, great products, and a seamless experience.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#products"
                className="group/button flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-gray-200 hover:shadow-xl"
              >
                Explore products
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover/button:translate-x-1"
                />
              </a>

              <a
                href="#categories"
                className="rounded-full border border-white/20 px-7 py-3.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                Browse categories
              </a>
            </div>
          </div>

          {/* floating 3D trust cards */}
          <div className="relative hidden h-72 w-72 shrink-0 [transform-style:preserve-3d] lg:block">
            <div
              className="absolute left-1/2 top-4 flex w-56 -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out"
              style={{
                transform:
                  "translate3d(calc(var(--mx) * 22px), calc(var(--my) * 22px), 60px) rotateX(calc(var(--my) * -8deg)) rotateY(calc(var(--mx) * 8deg))",
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <Truck size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold">Fast delivery</p>
                <p className="text-xs text-gray-300">Across all wilayas</p>
              </div>
            </div>

            <div
              className="absolute left-2 top-32 flex w-52 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out"
              style={{
                transform:
                  "translate3d(calc(var(--mx) * 40px), calc(var(--my) * 40px), 100px) rotateX(calc(var(--my) * -8deg)) rotateY(calc(var(--mx) * 8deg))",
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold">Secure checkout</p>
                <p className="text-xs text-gray-300">Cash on delivery</p>
              </div>
            </div>

            <div
              className="absolute right-0 top-52 flex w-48 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out"
              style={{
                transform:
                  "translate3d(calc(var(--mx) * 15px), calc(var(--my) * 15px), 140px) rotateX(calc(var(--my) * -8deg)) rotateY(calc(var(--mx) * 8deg))",
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <Star size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold">4.9 rated</p>
                <p className="text-xs text-gray-300">By happy shoppers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl px-6 py-16">
        <div
          ref={categoriesReveal.ref}
          className={`mb-8 flex items-end justify-between transition-all duration-700 ${
            categoriesReveal.visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
              Explore
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Shop by category
            </h2>
          </div>

          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollCategories("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 hover:-translate-x-1 hover:bg-black hover:text-white hover:shadow-md"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() => scrollCategories("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 hover:translate-x-1 hover:bg-black hover:text-white hover:shadow-md"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-[#f8f8f6] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[#f8f8f6] to-transparent" />

          <div
            ref={categoriesRef}
            className="flex gap-3 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className={`shrink-0 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                selectedCategory === null
                  ? "scale-105 bg-black text-white shadow-lg shadow-black/20"
                  : "border border-black/10 bg-white text-gray-700 hover:-translate-y-1 hover:shadow-md"
              }`}
            >
              All Products
            </button>

            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`shrink-0 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "scale-105 bg-black text-white shadow-lg shadow-black/20"
                    : "border border-black/10 bg-white text-gray-700 hover:-translate-y-1 hover:shadow-md"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="mx-auto max-w-7xl px-6 pb-24">
        <div
          ref={productsReveal.ref}
          className={`mb-8 flex flex-col gap-5 transition-all duration-700 md:flex-row md:items-end md:justify-between ${
            productsReveal.visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
              Collection
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Featured products
            </h2>
          </div>

          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-black/10 bg-white py-3 pl-11 pr-5 text-sm outline-none transition-all duration-300 focus:border-black focus:shadow-md"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="shimmer h-96 rounded-2xl bg-gray-200"
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-black/5 bg-white px-6 py-20 text-center">
            <p className="text-gray-500">No products found.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                onMouseMove={handleCardMove}
                onMouseLeave={handleCardLeave}
                className="product-card group relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm animate-[fadeUp_0.7s_ease-out_forwards] [transform-style:preserve-3d] [will-change:transform]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* glare that follows the cursor */}
                <span
                  className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(220px circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.5), transparent 60%)",
                  }}
                />

                {/* Product image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  {product.image ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
                      alt={product.name}
                      className="product-image h-full w-full object-cover transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                      No Image
                    </div>
                  )}

                  <div className="product-badge absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur-xl transition-transform duration-300">
                    New
                  </div>
                </div>

                {/* Product content */}
                <div className="product-content p-5 transition-transform duration-300">
                  <h3 className="font-semibold text-gray-900">
                    {product.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                    {product.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-900">
                      {product.price.toLocaleString()} DA
                    </p>

                    <span className="flex items-center gap-1 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition-all duration-300 group-hover:gap-2 group-hover:bg-gray-800">
                      View
                      <ArrowRight
                        size={12}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-bold">Algeria Commerce</p>
            <p className="mt-1 text-sm text-gray-500">
              Your trusted online shopping destination.
            </p>
          </div>

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Algeria Commerce
          </p>
        </div>
      </footer>

      <style jsx>{`
        .shimmer {
          position: relative;
          overflow: hidden;
        }
        .shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          animation: shimmerMove 1.6s infinite;
        }
        @keyframes shimmerMove {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </main>
  );
}