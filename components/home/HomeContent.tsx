"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart, type NewCartItem } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import {
  WHATSAPP_URL,
  formatPrice,
  whatsappInquiry,
  type Category,
} from "@/lib/products";

const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDpeDka9NFW2Moo0cLYj2cJs6zFCzu-Ou7bgQ-9EpVJUNjWr8NYJ-9AUpC-lcp9bYxH_XhCx9nzpNBUWOizhrQIXF4FbqH7s0kSHGX4O_eirpZXLUpunixy-ks4qC1z19mMzxSIiM8YD0FC7HrT3w6mzRPhLiexeDDlH_undZohTF10jw67BTQH_ebasveqSLpACXQcG8qhVJjvn1uHECxw2YZUfuOMSN84p38-2Ow";
const WATCH_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuByxQtF9uN3uytcxyg2HHNafLtRdoKbX0cF4ngywCDO-JR_wMdbOsOHFrNI6tGQx3RzCnTLjpRZfdmhIwdu6EGLB3PC54iGiVLnf0EgQO46uq2wlGFZKZHeF5x-DIFjl8W9OdNixk-hb3K7hIVJgxCC9LW1ZxPOozgAzWNvHpUT5zzzj3x1cJzG5BAIVKrTYqlTEjYyMy4VYZhUEsdLcigDRCCj7OxVg7Yd5zMjums";
const SHOE_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAjZkPfZ98hj3OwQ315Jvgu7gZIE08kcY-n-392BPxhCQBzTojTtuQBUPg2H4bCfNBQ1D1DjTChj9nFH36rP1xmeqFSwc41nuO792JcrArPCOCeyE8hxD2rEsiOAye6h8iQm0h2wlvQ2jZDj2WFTm_GWBb03C5MKPJeqqMcINywFWfY6riMP_JefV5fxnzC-hZdHu5rHegxk1o22TKKYyXU_YQDPbvdcRjB7aluSWI";
const DRESS_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAK_mpJQX_kRiclwNTR1UrOnEyOpeuHHkjbQ8ONje0lZh8jI9OAxrf0EQlJc5MI1KnzpmN9Dk7y_JolgzClUdy8zmlgzt9Tqwe858ePWyNum8Xu5mr0S3gp4C3zJ5iRvjOKRmeDh3EUZDaZ8VlMBvglA4zVpiutKrgdTA7QVZn1SfJihoOjNm3mOVFVxBl_SgQ_yYGpPd5KhMcDNsZvEjj833hTopOIZQB8xPZqa_o";
const BEAUTY_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCATqPnZdxScZ3lVKqNBsaF-Eu8-THgjewiNtmvLLptKDsTmWlMj92yVOGXFd29GGbnCtaYgbZ0-c7HI6IRMsMyrTVdc0JkHkWv2QRijgPWeSRpI6akc6Zp_XVX_eAg9zFGYNUbdWaSJhDzLxkJfeCd3Pthjawx-xfcDSQFIAZcoKon42ioZ3HpowOOKe4kXl1bRlqmvUcUhjtcO2qQfb3uKZkHp26Qp5xClEgihHE";
const AETHELGARD_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCfFVXZ8Z-BqNR1mAFu5J3D3oL5Hq05kSRXegJpyCCKxmLIlu95Siomen9TyOdnlIY08trWRdgEvj4AQlpa6TtdoY_Rs-6JcB2Y9NIZ2FTWdw_2610rcAUybSWMQ7o8O-20qazxK_-kZDYSe0ofXd1DgV0afe1LrROrxyn_MUrncWfZh2krfZmb3P6HeyK7jTt4lXvYtXfFP1PPEHCEd1xEC_xUSAEkR5fwdBMf9rw";

interface Featured {
  name: string;
  category: Category;
  dept: string;
  badge: string;
  inVault: boolean;
  price: number;
  spec: string;
  description: string;
  image: string;
  alt: string;
  dots: { bg: string; title: string }[];
  href?: string;
}

const FEATURED: Featured[] = [
  {
    name: "Aethelgard Tourbillon Watch",
    category: "watches",
    dept: "Watches",
    badge: "Limited edition",
    inVault: true,
    price: 14200,
    spec: "Automatic movement",
    description:
      "Skeleton dial with a rose-gold case and leather strap.",
    image: AETHELGARD_IMG,
    alt: "Aethelgard Royal Skeleton Tourbillon wristwatch in rose gold case with exposed gears",
    dots: [
      { bg: "#1A1A1A", title: "Obsidian Black" },
      { bg: "#B76E79", title: "Rose Gold" },
    ],
  },
  {
    name: "Aurélia Gold Stilettos",
    category: "shoes",
    dept: "Shoes",
    badge: "Stilettos",
    inVault: true,
    price: 4250,
    spec: "Gold heel",
    description:
      "Gold heels with satin and crystal detailing.",
    image: SHOE_IMG,
    alt: "Luxury designer evening stilettos with sculpted 18k gold stiletto heels, black Italian satin and diamond pavé crystal embellishment",
    dots: [
      { bg: "#1A1A1A", title: "Midnight Satin" },
      { bg: "#B76E79", title: "18K Gold Plated" },
    ],
    href: "/product/aurelia-pave-stilettos",
  },
  {
    name: "Nocturne Brocade Gown",
    category: "dresses",
    dept: "Dresses",
    badge: "Made to order",
    inVault: false,
    price: 12800,
    spec: "Black and gold",
    description:
      "Black silk gown with gold embroidery and a fitted bodice.",
    image: DRESS_IMG,
    alt: "Haute couture black and gold embroidered silk evening gown on an elegant minimalist mannequin",
    dots: [
      { bg: "#1A1A1A", title: "Obsidian Noir" },
      { bg: "#E5E4E2", title: "Gold Bullion Thread" },
    ],
  },
  {
    name: "Aurélia Nocturne Perfume",
    category: "beauty",
    dept: "Beauty",
    badge: "Perfume",
    inVault: true,
    price: 1450,
    spec: "50 ml",
    description:
      "Perfume in a faceted glass bottle with a gold-tone cap.",
    image: BEAUTY_IMG,
    alt: "Prestige luxury crystal perfume bottle with heavy faceted glass and polished solid gold monogram cap",
    dots: [
      { bg: "#B76E79", title: "Liquid Amber" },
      { bg: "#E5E4E2", title: "Faceted Crystal" },
    ],
  },
  {
    name: "Apple iPhone 13 Pro — Silver",
    category: "mobiles",
    dept: "Phones",
    badge: "Refurbished • 128 GB",
    inVault: true,
    price: 465.23,
    spec: "Apple • iPhone 13 Pro",
    description:
      "Silver iPhone 13 Pro. Refurbished 128 GB market estimate; value varies by condition.",
    image: "/products/pexels-amar-19482384.jpg",
    alt: "Silver Apple iPhone 13 Pro with triple rear cameras",
    dots: [
      { bg: "#c6c6c6", title: "Silver" },
      { bg: "#1c1b1b", title: "Triple-camera system" },
    ],
  },
];

const FILTERS: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "watches", label: "Watches" },
  { id: "shoes", label: "Shoes" },
  { id: "dresses", label: "Dresses" },
  { id: "beauty", label: "Beauty" },
  { id: "mobiles", label: "Mobiles" },
];

const CATEGORIES = [
  {
    eyebrow: "Watches",
    title: "Watches",
    description: "Browse automatic and moonphase watches.",
    cta: "Shop watches",
    image: WATCH_IMG,
  },
  {
    eyebrow: "Shoes",
    title: "Shoes",
    description: "Browse heels, loafers, and dress shoes.",
    cta: "Shop shoes",
    image: SHOE_IMG,
  },
  {
    eyebrow: "Dresses",
    title: "Dresses",
    description: "Browse evening gowns and made-to-order styles.",
    cta: "Shop dresses",
    image: DRESS_IMG,
  },
  {
    eyebrow: "Beauty",
    title: "Beauty",
    description: "Browse perfume and skincare.",
    cta: "Shop beauty",
    image: BEAUTY_IMG,
  },
  {
    eyebrow: "Apple iPhone",
    title: "Apple Phones",
    description:
      "Browse Apple iPhone models.",
    cta: "Shop phones",
    image: "/products/pexels-jamie-saw-4619044-12903952.jpg",
  },
];

export default function HomeContent() {
  const { addItem } = useCart();
  const { currency } = useCurrency();
  const [activeFilter, setActiveFilter] = useState<Category | "all">("all");
  const [toast, setToast] = useState<{ title: string; desc: string } | null>(
    null
  );

  const handleAddToCart = (product: Featured) => {
    const unitPrice = product.price;
    const item: NewCartItem = {
      id: `featured-${product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      name: product.name,
      dept: product.dept,
      config: product.spec,
      unitPrice,
      image: product.image,
      alt: product.alt,
      href: product.href,
      maxQty: 3,
    };
    addItem(item, 1);
    setToast({
      title: "Acquisition Staged",
      desc: `${product.name} (${formatPrice(product.price, currency)}) added to private reservation.`,
    });
    window.setTimeout(() => setToast(null), 3500);
  };

  const visibleFeatured = FEATURED.filter(
    (p) => activeFilter === "all" || p.category === activeFilter
  );

  return (
    <div className="flex flex-col w-full">
      {/* ── Cinematic Hero ─────────────────────────────────────────── */}
      <section className="relative w-full -mt-28 overflow-hidden bg-surface-container-lowest">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(212,175,55,0.18),rgba(14,14,14,0.95)_75%)] pointer-events-none z-10" />
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 transform scale-105 transition-transform duration-1000 ease-out"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="relative z-20 max-w-[1600px] mx-auto px-margin pt-44 pb-space-xl flex flex-col justify-center min-h-[942px]">
          <div className="inline-flex items-center gap-space-xs px-3.5 py-1.5 rounded-full bg-surface-container/70 backdrop-blur-md self-start mb-space-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label-badge text-label-badge uppercase tracking-[0.25em] text-primary">
              Private Collection 2025 Edition
            </span>
          </div>

          <div className="max-w-5xl">
            <h1 className="font-display-hero text-display-hero text-on-surface tracking-tight leading-[1.08] mb-space-md">
              AUREATE{" "}
              <span className="italic text-primary font-normal bg-gradient-to-r from-primary via-primary-fixed to-primary-fixed-dim bg-clip-text text-transparent">
                TIMEPIECES
              </span>{" "}
              &amp; OPULENT ARTIFACTS
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl font-light mb-space-lg leading-relaxed">
              Crafted for the discerning collector. Swiss Haute Horlogerie,
              sculpted artisanal footwear, Parisian haute couture gowns, and
              rare prestige elixirs curated for private salons worldwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-md mb-space-xl">
            <Link
              className="px-8 py-4 rounded-full bg-primary text-on-primary font-label-nav text-label-nav uppercase tracking-[0.14em] font-semibold hover:bg-primary-fixed hover:shadow-[0_0_30px_rgba(242,202,80,0.35)] transition-all duration-300 transform hover:-translate-y-0.5"
              href="/catalog"
            >
              Explore The Private Vault
            </Link>
            <a
              className="px-7 py-4 rounded-full bg-surface-container-high/80 backdrop-blur-md text-tertiary font-label-nav text-label-nav uppercase tracking-[0.14em] font-medium hover:bg-surface-container-highest transition-all duration-300 flex items-center gap-2.5 shadow-sm"
              href={whatsappInquiry(
                "Hello JEESTORE VIP Concierge, I would like a private consultation."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[19px] text-tertiary">
                chat
              </span>
              <span>Book WhatsApp VIP Concierge (+91 8590780520)</span>
            </a>
          </div>

          {/* Stats strip */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-gutter pt-space-lg bg-surface-container-low/70 backdrop-blur-xl p-space-md rounded-xl shadow-xl">
            {[
              {
                icon: "verified_user",
                label: "Provenance Verified",
                value: "100% Certified Authentic",
              },
              {
                icon: "flight_takeoff",
                label: "Discrete Logistics",
                value: "Private White-Glove Delivery",
              },
              {
                icon: "auto_fix_high",
                label: "Atelier Heritage",
                value: "Bespoke Customization Available",
              },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 px-4 py-2">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-[24px]">
                    {stat.icon}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-badge text-label-badge text-primary uppercase tracking-widest">
                    {stat.label}
                  </span>
                  <span className="font-headline-sm text-[17px] text-on-surface">
                    {stat.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Curated Categories Mosaic ───────────────────────────────── */}
      <section className="w-full max-w-[1600px] mx-auto px-margin py-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-4">
          <div>
            <span className="font-label-badge text-label-badge text-primary uppercase tracking-[0.25em] block mb-2">
              Architectural Departments
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Curated Categories
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md font-light">
            Every artifact reflects strict artisanal discipline, hand-cut
            metals, and peerless mechanical balance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              className="md:col-span-6 group relative overflow-hidden rounded-xl bg-surface-container-low shadow-xl min-h-[380px] flex flex-col justify-end p-space-lg cursor-pointer"
              href="/catalog"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${cat.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent" />
              <div className="relative z-10 flex flex-col">
                <span className="font-label-badge text-label-badge text-primary uppercase tracking-[0.2em] mb-1">
                  {cat.eyebrow}
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
                  {cat.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md mb-4 font-light">
                  {cat.description}
                </p>
                <span className="inline-flex items-center gap-2 font-label-nav text-label-nav text-primary uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                  {cat.cta}{" "}
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Creations ──────────────────────────────────────── */}
      <section
        className="w-full bg-surface-container-lowest py-space-xl"
        id="curated-catalog"
      >
        <div className="max-w-[1600px] mx-auto px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
            <div>
              <span className="font-label-badge text-label-badge text-primary uppercase tracking-[0.25em] block mb-2">
                Vault Selections
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Signature Creations
              </h2>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0 flex-wrap">
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  className={
                    activeFilter === filter.id
                      ? "px-4 py-1.5 rounded-full bg-primary text-on-primary font-label-badge text-label-badge uppercase tracking-wider font-semibold"
                      : "px-4 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-badge text-label-badge uppercase tracking-wider transition-colors"
                  }
                  onClick={() => setActiveFilter(filter.id)}
                  type="button"
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {visibleFeatured.map((product) => (
              <div
                key={product.name}
                className="group flex flex-col bg-surface-container rounded-xl overflow-hidden shadow-lg hover:shadow-[0_20px_45px_rgba(0,0,0,0.9)] transition-all duration-500"
              >
                <div className="relative w-full aspect-[4/5] bg-surface-container-low overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={product.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    src={product.image}
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md">
                    <span className="font-label-badge text-[10px] uppercase tracking-widest text-primary font-semibold">
                      {product.badge}
                    </span>
                  </div>
                  <div
                    className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md ${
                      product.inVault ? "text-tertiary" : "text-amber-400"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        product.inVault ? "bg-tertiary" : "bg-amber-400"
                      }`}
                    />
                    <span className="font-label-badge text-[10px] uppercase tracking-widest font-semibold">
                      {product.inVault ? "In Vault" : "Bespoke Order"}
                    </span>
                  </div>
                </div>

                <div className="p-space-md flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
                        {product.dept}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {product.dots.map((dot) => (
                          <span
                            key={dot.title}
                            className="w-3 h-3 rounded-full shadow-sm cursor-pointer"
                            style={{ backgroundColor: dot.bg }}
                            title={dot.title}
                          />
                        ))}
                      </div>
                    </div>
                    {product.href ? (
                      <Link
                        className="font-headline-sm text-[20px] text-on-surface group-hover:text-primary transition-colors leading-snug mb-2 block"
                        href={product.href}
                      >
                        {product.name}
                      </Link>
                    ) : (
                      <h3 className="font-headline-sm text-[20px] text-on-surface group-hover:text-primary transition-colors leading-snug mb-2">
                        {product.name}
                      </h3>
                    )}
                    <p className="font-body-sm text-body-sm text-on-surface-variant font-light line-clamp-2 mb-3">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 flex flex-col gap-3">
                    <div className="flex items-baseline justify-between">
                      <span className="font-price-display text-price-display text-primary font-semibold">
                        {formatPrice(product.price, currency)}
                      </span>
                      <span className="font-label-badge text-[10px] text-on-surface-variant uppercase tracking-widest">
                        {product.spec}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        className="w-full py-2.5 rounded-lg bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface font-label-badge text-label-badge uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5"
                        onClick={() => handleAddToCart(product)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          shopping_bag
                        </span>
                        Cart
                      </button>
                      <a
                        className="w-full py-2.5 rounded-lg bg-tertiary-container/30 hover:bg-tertiary-container text-tertiary hover:text-on-tertiary font-label-badge text-label-badge uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5 text-center"
                        href={whatsappInquiry(
                          `I am inquiring about the ${product.name} (${formatPrice(product.price, currency)})`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          chat
                        </span>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Hallmarks ─────────────────────────────────────────── */}
      <section className="w-full max-w-[1600px] mx-auto px-margin py-space-xl">
        <div className="text-center max-w-3xl mx-auto mb-space-lg">
          <span className="font-label-badge text-label-badge text-primary uppercase tracking-[0.25em] block mb-2">
            Uncompromising Standard
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs">
            The JEESTORE Hallmarks
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant font-light">
            A legacy anchored in traditional horological pedigree, discrete
            client protocols, and uncompromising vault security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div className="flex flex-col p-space-lg bg-surface-container rounded-xl shadow-lg hover:shadow-2xl transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center mb-space-md text-primary group-hover:scale-110 transition-transform">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
                <path d="M8 3h8M8 21h8" />
                <circle cx="12" cy="12" fill="currentColor" r="2" />
              </svg>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
              Geneva Seal Standards
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant font-light leading-relaxed">
              Calibres audited for micro-tolerance variance below +2/-2 seconds
              per lunar cycle with hand-finished bevels.
            </p>
          </div>

          <div className="flex flex-col p-space-lg bg-surface-container rounded-xl shadow-lg hover:shadow-2xl transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center mb-space-md text-primary group-hover:scale-110 transition-transform">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
              Bespoke Atelier Customization
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant font-light leading-relaxed">
              Custom monograms, rare meteorite stone dials, and unique case
              alloys fabricated upon individual patron request.
            </p>
          </div>

          <div className="flex flex-col p-space-lg bg-surface-container rounded-xl shadow-lg hover:shadow-2xl transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center mb-space-md text-tertiary group-hover:scale-110 transition-transform">
              <svg
                className="w-8 h-8 text-tertiary"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
              Direct WhatsApp VIP Concierge
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant font-light leading-relaxed mb-3">
              Instant direct dialogue with master curators for private viewings
              and immediate acquisition reserve:{" "}
              <strong className="text-on-surface">+91 8590780520</strong>.
            </p>
          </div>

          <div className="flex flex-col p-space-lg bg-surface-container rounded-xl shadow-lg hover:shadow-2xl transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center mb-space-md text-primary group-hover:scale-110 transition-transform">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <rect height="14" rx="2" ry="2" width="20" x="2" y="3" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
              Insured Armored Courier
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant font-light leading-relaxed">
              100% insured Lloyd&apos;s of London secured transit from Geneva
              and Dubai directly into private hands worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* ── VIP Testimonials ────────────────────────────────────────── */}
      <section className="w-full bg-surface-container-low py-space-xl">
        <div className="max-w-[1600px] mx-auto px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
            <div>
              <span className="font-label-badge text-label-badge text-primary uppercase tracking-[0.25em] block mb-2">
                Private Salon Impressions
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Collector Testimonials
              </h2>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0 text-primary">
              {["star", "star", "star", "star", "star"].map((icon, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {icon}
                </span>
              ))}
              <span className="font-body-sm text-body-sm text-on-surface ml-2 font-medium">
                5.0 VIP Rating
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[
              {
                initials: "HR",
                name: "Henri R.",
                meta: "Geneva • Private Collector",
                quote:
                  "Acquiring the Aethelgard Tourbillon through JEESTORE Concierge was seamless. From private WhatsApp dialogue to armored delivery at my Geneva residence in 48 hours.",
              },
              {
                initials: "MA",
                name: "Marcello A.",
                meta: "Milan • Bespoke Patron",
                quote:
                  "The Damascus steel casing is even more breathtaking in person. The weight, the balance, the gold rotor detail. An artifact that commands the room without whispering a loud word.",
              },
              {
                initials: "SL",
                name: "Sir Lawrence K.",
                meta: "London • Member Since 2021",
                quote:
                  "The direct WhatsApp concierge gave me instantaneous access to the master watchmaker for custom rotor engraving. The highest level of bespoke luxury I have experienced.",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-surface-container p-space-lg rounded-xl shadow-lg flex flex-col justify-between"
              >
                <p className="font-title-editorial text-title-editorial text-on-surface italic font-normal mb-space-md">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-space-sm border-t border-surface-container-highest">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-headline-sm text-[15px] text-primary">
                    {t.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-badge text-label-badge text-on-surface uppercase tracking-wider font-semibold">
                      {t.name}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant font-light">
                      {t.meta}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Private Salon & Contact ─────────────────────────────────── */}
      <section className="w-full max-w-[1600px] mx-auto px-margin py-space-xl">
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-lg md:p-space-xl shadow-2xl">
          <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            <div className="lg:col-span-7 flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high self-start mb-space-sm">
                <span className="material-symbols-outlined text-[15px] text-primary">
                  shield_person
                </span>
                <span className="font-label-badge text-label-badge uppercase tracking-widest text-primary">
                  Confidential Client Membership
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-sm">
                Access The Closed-Circuit Salon
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl font-light mb-space-lg">
                Connect directly with JEESTORE director &amp; lead curator for
                confidential acquisitions, private vault allocations, and
                bespoke commissions.
              </p>
              <div className="flex flex-wrap items-center gap-space-md">
                <a
                  className="px-6 py-3.5 rounded-full bg-tertiary text-on-tertiary font-label-nav text-label-nav uppercase tracking-widest font-semibold hover:bg-tertiary-fixed transition-all flex items-center gap-2 shadow-lg"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chat
                  </span>{" "}
                  WhatsApp: +91 8590780520
                </a>
                <a
                  className="px-6 py-3.5 rounded-full bg-surface-container text-on-surface hover:text-primary font-label-nav text-label-nav uppercase tracking-widest font-medium transition-all flex items-center gap-2 shadow-sm"
                  href="mailto:ajeerjabbarcv85@gmail.com"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    mail
                  </span>{" "}
                  ajeerjabbarcv85@gmail.com
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-surface-container/90 backdrop-blur-xl p-space-lg rounded-xl shadow-xl flex flex-col gap-4">
              <span className="font-label-badge text-label-badge text-primary uppercase tracking-[0.2em]">
                Direct Channel Registry
              </span>

              <div className="flex items-center justify-between p-3.5 rounded-lg bg-surface-container-low hover:bg-surface-container-highest transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">
                      public
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-badge text-[10px] text-on-surface-variant uppercase tracking-widest">
                      Instagram Atelier
                    </span>
                    <span className="font-body-md text-[15px] text-on-surface font-medium">
                      @muhdajeerr
                    </span>
                  </div>
                </div>
                <a
                  className="px-3.5 py-1.5 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-on-primary font-label-badge text-label-badge uppercase tracking-wider transition-all"
                  href="https://instagram.com/muhdajeerr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow
                </a>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-lg bg-surface-container-low hover:bg-surface-container-highest transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-[20px]">
                      call
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-badge text-[10px] text-on-surface-variant uppercase tracking-widest">
                      Direct Salon Line
                    </span>
                    <span className="font-body-md text-[15px] text-on-surface font-medium">
                      +91 8590780520
                    </span>
                  </div>
                </div>
                <a
                  className="px-3.5 py-1.5 rounded-full bg-tertiary/20 text-tertiary hover:bg-tertiary hover:text-on-tertiary font-label-badge text-label-badge uppercase tracking-wider transition-all"
                  href="tel:+918590780520"
                >
                  Dial
                </a>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-lg bg-surface-container-low hover:bg-surface-container-highest transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">
                      lock
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-badge text-[10px] text-on-surface-variant uppercase tracking-widest">
                      Encrypted Transmission
                    </span>
                    <span className="font-body-md text-[14px] text-on-surface font-medium">
                      256-Bit SSL Salon Gateway
                    </span>
                  </div>
                </div>
                <span className="font-label-badge text-[10px] text-tertiary uppercase tracking-widest font-semibold">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Toast Feedback ──────────────────────────────────────────── */}
      <div
        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 pointer-events-none ${
          toast ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"
        }`}
        id="salon-toast"
      >
        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-surface-container-highest/95 backdrop-blur-2xl text-on-surface shadow-2xl">
          <span className="material-symbols-outlined text-primary text-[20px]">
            check_circle
          </span>
          <div className="flex flex-col">
            <span className="font-label-badge text-label-badge text-primary uppercase tracking-widest">
              {toast?.title ?? "Artifact Reserved"}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface font-light">
              {toast?.desc ?? "Added to your private session portfolio."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
