"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart, type NewCartItem } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import { useWishlist, toggleWishlist } from "@/lib/wishlist";
import { formatPrice, whatsappInquiry } from "@/lib/products";

const PRICE = 4250;

const SHOE_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAjZkPfZ98hj3OwQ315Jvgu7gZIE08kcY-n-392BPxhCQBzTojTtuQBUPg2H4bCfNBQ1D1DjTChj9nFH36rP1xmeqFSwc41nuO792JcrArPCOCeyE8hxD2rEsiOAye6h8iQm0h2wlvQ2jZDj2WFTm_GWBb03C5MKPJeqqMcINywFWfY6riMP_JefV5fxnzC-hZdHu5rHegxk1o22TKKYyXU_YQDPbvdcRjB7aluSWI";
const DRESS_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAK_mpJQX_kRiclwNTR1UrOnEyOpeuHHkjbQ8ONje0lZh8jI9OAxrf0EQlJc5MI1KnzpmN9Dk7y_JolgzClUdy8zmlgzt9Tqwe858ePWyNum8Xu5mr0S3gp4C3zJ5iRvjOKRmeDh3EUZDaZ8VlMBvglA4zVpiutKrgdTA7QVZn1SfJihoOjNm3mOVFVxBl_SgQ_yYGpPd5KhMcDNsZvEjj833hTopOIZQB8xPZqa_o";
const BEAUTY_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCATqPnZdxScZ3lVKqNBsaF-Eu8-THgjewiNtmvLLptKDsTmWlMj92yVOGXFd29GGbnCtaYgbZ0-c7HI6IRMsMyrTVdc0JkHkWv2QRijgPWeSRpI6akc6Zp_XVX_eAg9zFGYNUbdWaSJhDzLxkJfeCd3Pthjawx-xfcDSQFIAZcoKon42ioZ3HpowOOKe4kXl1bRlqmvUcUhjtcO2qQfb3uKZkHp26Qp5xClEgihHE";

const GALLERY = [
  { src: SHOE_IMG, alt: "Aurélia Pavé stilettos full profile view", label: "Profile" },
  { src: SHOE_IMG, alt: "Aurélia Pavé sculpted 18K gold heel detail", label: "Heel Detail" },
  { src: SHOE_IMG, alt: "Aurélia Pavé pavé crystal embroidery close-up", label: "Pavé Detail" },
  { src: SHOE_IMG, alt: "Aurélia Pavé duchess satin toe silhouette", label: "Satin Toe" },
];

const FINISHES = [
  { id: "obsidian", label: "Midnight Obsidian", bg: "#1A1A1A" },
  { id: "champagne", label: "Champagne Ivory", bg: "#E5E4E2" },
  { id: "ruby", label: "Bordeaux Ruby", bg: "#5C1A2B" },
];

const HEELS = [
  { id: "85", label: "85mm Architectural Stiletto", note: "Signature Silhouette" },
  { id: "100", label: "100mm Vertiginous Stiletto", note: "Atelier Exclusive" },
  { id: "70", label: "70mm Sculpted Evening", note: "Graceful Balance" },
];

const SIZES = [
  { eu: "35", us: "US 5", uk: "UK 2.5", stock: true },
  { eu: "36", us: "US 6", uk: "UK 3.5", stock: false },
  { eu: "37", us: "US 6.5", uk: "UK 4", stock: true },
  { eu: "38", us: "US 7.5", uk: "UK 5", stock: true },
  { eu: "39", us: "US 8.5", uk: "UK 6", stock: true },
  { eu: "40", us: "US 9", uk: "UK 6.5", stock: false },
  { eu: "41", us: "US 10", uk: "UK 7.5", stock: true },
];

const DOSSIER = [
  {
    icon: "diamond",
    title: "Materials & Embellishment",
    rows: [
      ["Upper", "Italian Duchess Silk Satin"],
      ["Sculpted Heel", "Solid 18K Gold-Plated Brass Core"],
      ["Embellishment", "3,200 Hand-Set Swarovski Pavé Crystals"],
      ["Insole", "Padded Kid Leather, Gold Foil Monogram"],
    ],
  },
  {
    icon: "construction",
    title: "Atelier Construction",
    rows: [
      ["Origin", "Milan Cordwainery Atelier No. 7"],
      ["Craft Hours", "62 Hours Per Pair"],
      ["Technique", "Goodyear-Hand-Welted, 14 Operations"],
      ["Numbering", "Hand-Etched Serial, 1 of 20 Pairs"],
    ],
  },
  {
    icon: "spa",
    title: "Care & Longevity",
    rows: [
      ["Cleaning", "Soft Goat-Hair Brush & Neutral Silk Soap"],
      ["Storage", "Included Flannel Pouch & Cedar Shoe Trees"],
      ["Service", "Lifetime Atelier Refurbishment Entitlement"],
      ["Warranty", "5-Year Structural Guarantee"],
    ],
  },
];

const ENSEMBLE = [
  {
    name: "Nocturne Gilded Brocade Gown",
    dept: "Haute Couture • Paris Atelier",
    price: 12800,
    image: DRESS_IMG,
    alt: "Haute couture black and gold embroidered gown",
  },
  {
    name: "Aurélia Nocturne Pure Parfum Elixir",
    dept: "Prestige Beauty • Grasse",
    price: 1450,
    image: BEAUTY_IMG,
    alt: "Crystal perfume flacon with gold stopper",
  },
];

const REVIEWS = [
  {
    name: "Isabella M.",
    meta: "Monaco • Verified Salon Client",
    rating: 5,
    quote:
      "The sculpted heel is a genuine work of art — the weight of the gold, the way the pavé catches candlelight. I wore them to the Vienna Opera Ball and received three private acquisition inquiries.",
  },
  {
    name: "Catherine D.",
    meta: "Paris • Member Since 2022",
    rating: 5,
    quote:
      "Atelier fitting was flawless. The monogrammed insole in gold foil is exquisite. The most comfortable architectural stiletto I have ever worn — 62 hours of craft is evident in every step.",
  },
  {
    name: "Ariana V.",
    meta: "New York • Bespoke Patron",
    rating: 5,
    quote:
      "Ordered the Champagne Ivory finish for my gallery opening. Delivery was hand-carried by courier in a lacquered presentation case. JEESTORE concierge coordinated everything over WhatsApp.",
  },
];

export default function AureliaContent() {
  const { addItem } = useCart();
  const { currency } = useCurrency();
  const [activeImage, setActiveImage] = useState(0);
  const [finish, setFinish] = useState(FINISHES[0].id);
  const [heel, setHeel] = useState(HEELS[0].id);
  const [size, setSize] = useState<string | null>(null);
  const [monogram, setMonogram] = useState("");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const { ids: wishlistIds } = useWishlist();
  const wishlisted = wishlistIds.includes("aurelia-pave-stilettos");
  const [toast, setToast] = useState(false);

  const selectedFinish = FINISHES.find((f) => f.id === finish)!;
  const selectedHeel = HEELS.find((h) => h.id === heel)!;
  const canPurchase = size !== null;

  const handleAddToBag = () => {
    if (!canPurchase || !size) return;
    const monogramLabel = monogram.trim()
      ? ` • Monogram ${monogram.trim().toUpperCase()}`
      : "";
    const item: NewCartItem = {
      id: `aurelia-stilettos-${finish}-${heel}-${size}-${monogram.trim().toUpperCase()}`,
      name: "Aurélia Pavé 18K Gold Stilettos",
      dept: "Artisanal Footwear • Numbered Pair 1 of 20",
      config: `${selectedFinish.label} • ${selectedHeel.label} • EU ${size}${monogramLabel}`,
      unitPrice: PRICE,
      image: SHOE_IMG,
      alt: "Aurélia Pavé 18K Gold Stilettos with sculpted gold heels",
      href: "/product/aurelia-pave-stilettos",
      maxQty: 2,
    };
    addItem(item, 1);
    setToast(true);
    window.setTimeout(() => setToast(false), 3200);
  };

  return (
    <div className="flex flex-col w-full">
      {/* ── Product Stage ───────────────────────────────────────────── */}
      <section className="w-full max-w-[1600px] mx-auto px-margin pt-space-md pb-space-lg">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-label-badge text-label-badge uppercase tracking-widest text-on-surface-variant mb-space-md flex-wrap">
          <Link className="hover:text-primary transition-colors" href="/">
            Home
          </Link>
          <span className="material-symbols-outlined text-[12px]">
            chevron_right
          </span>
          <Link className="hover:text-primary transition-colors" href="/catalog">
            Curated Catalog
          </Link>
          <span className="material-symbols-outlined text-[12px]">
            chevron_right
          </span>
          <Link
            className="hover:text-primary transition-colors"
            href="/catalog?category=shoes"
          >
            Artisanal Footwear
          </Link>
          <span className="material-symbols-outlined text-[12px]">
            chevron_right
          </span>
          <span className="text-primary">Aurélia Pavé Stilettos</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-space-sm">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-lowest shadow-2xl group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={GALLERY[activeImage].alt}
                className="w-full h-full object-cover transition-all duration-500"
                id="main-product-image"
                key={activeImage}
                src={GALLERY[activeImage].src}
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-badge text-label-badge uppercase tracking-widest shadow-sm">
                  Numbered Salon Pair • 1 of 20
                </span>
                <span className="px-2.5 py-1 rounded bg-surface-container-lowest/80 backdrop-blur-md text-tertiary font-label-badge text-[10px] uppercase tracking-widest flex items-center gap-1.5 self-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                  Available in Vault
                </span>
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  aria-label="Previous image"
                  className="w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface hover:text-primary flex items-center justify-center transition-colors"
                  onClick={() =>
                    setActiveImage((i) => (i - 1 + GALLERY.length) % GALLERY.length)
                  }
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_left
                  </span>
                </button>
                <button
                  aria-label="Next image"
                  className="w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface hover:text-primary flex items-center justify-center transition-colors"
                  onClick={() => setActiveImage((i) => (i + 1) % GALLERY.length)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_right
                  </span>
                </button>
              </div>
              <span className="absolute bottom-4 left-4 font-label-badge text-[10px] uppercase tracking-widest text-on-surface-variant bg-surface-container-lowest/80 backdrop-blur-md px-2 py-1 rounded">
                {GALLERY[activeImage].label} — {activeImage + 1}/{GALLERY.length}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-gutter">
              {GALLERY.map((img, i) => (
                <button
                  className={`relative aspect-[4/3] rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
                    activeImage === i
                      ? "ring-2 ring-primary scale-[1.02]"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  key={img.label}
                  onClick={() => setActiveImage(i)}
                  type="button"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    src={img.src}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="font-label-badge text-label-badge text-primary uppercase tracking-[0.25em] mb-2">
              Artisanal Footwear • Milan Atelier No. 7
            </span>
            <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface tracking-tight mb-3">
              Aurélia Pavé 18K Gold Stilettos
            </h1>

            <div className="flex items-center gap-3 mb-space-sm">
              <div className="flex items-center gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    className="material-symbols-outlined text-primary text-[16px]"
                    key={i}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                5.0 • 12 Collector Reviews
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-space-md">
              <span className="font-price-display text-price-display text-primary font-bold">
                {formatPrice(PRICE, currency)}
              </span>
              <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
                incl. duties &amp; insured courier
              </span>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed mb-space-md">
              Sculpted 18K gold architectural stiletto heels crowned with
              hand-set pavé crystal florets. Lustrous Italian duchess satin
              wraps the silhouette, each pair numbered and hand-finished over
              62 hours in our Milan cordwainery.
            </p>

            {/* Finish Selection */}
            <div className="mb-space-md">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
                  Satin Finish — <span className="text-on-surface font-semibold">{selectedFinish.label}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {FINISHES.map((f) => (
                  <button
                    aria-label={f.label}
                    className={`w-11 h-11 rounded-full shadow-md transition-all duration-300 ${
                      finish === f.id
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-surface scale-110"
                        : "hover:scale-105 ring-1 ring-outline-variant/40"
                    }`}
                    key={f.id}
                    onClick={() => setFinish(f.id)}
                    style={{ backgroundColor: f.bg }}
                    title={f.label}
                    type="button"
                  />
                ))}
              </div>
            </div>

            {/* Heel Selection */}
            <div className="mb-space-md">
              <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider block mb-2">
                Heel Architecture
              </span>
              <div className="flex flex-col gap-2">
                {HEELS.map((h) => (
                  <button
                    className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${
                      heel === h.id
                        ? "bg-primary/15 border border-primary/60 shadow-sm"
                        : "bg-surface-container-low border border-outline-variant/30 hover:border-primary/40"
                    }`}
                    key={h.id}
                    onClick={() => setHeel(h.id)}
                    type="button"
                  >
                    <span className="font-body-sm text-body-sm text-on-surface">
                      {h.label}
                    </span>
                    <span
                      className={`font-label-badge text-[10px] uppercase tracking-widest ${
                        heel === h.id ? "text-primary font-semibold" : "text-on-surface-variant"
                      }`}
                    >
                      {h.note}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-space-md">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
                  Salon Size (EU){" "}
                  {size && <span className="text-primary font-semibold">— EU {size} Selected</span>}
                </span>
                <button
                  className="font-label-badge text-[11px] text-primary hover:text-primary-fixed uppercase tracking-wider underline underline-offset-2 transition-colors"
                  id="open-size-guide"
                  onClick={() => setShowSizeGuide(true)}
                  type="button"
                >
                  Size &amp; Fit Guide
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {SIZES.map((s) => (
                  <button
                    className={`relative py-2.5 rounded font-label-badge text-[11px] uppercase transition-all duration-300 ${
                      !s.stock
                        ? "bg-surface-container-lowest text-on-surface-variant/30 cursor-not-allowed line-through"
                        : size === s.eu
                          ? "bg-primary text-on-primary font-bold shadow-md"
                          : "bg-surface-container-low hover:bg-surface-container-high text-on-surface font-semibold"
                    }`}
                    disabled={!s.stock}
                    key={s.eu}
                    onClick={() => setSize(s.eu)}
                    title={
                      s.stock
                        ? `EU ${s.eu} • ${s.us} • ${s.uk}`
                        : `EU ${s.eu} Reserved`
                    }
                    type="button"
                  >
                    {s.eu}
                  </button>
                ))}
              </div>
              {!canPurchase && (
                <span className="font-label-badge text-[10px] text-amber-400/80 uppercase tracking-widest block mt-2">
                  Select a size to continue acquisition
                </span>
              )}
            </div>

            {/* Monogram */}
            <div className="mb-space-md">
              <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider block mb-2">
                Gold Foil Insole Monogram{" "}
                <span className="text-on-surface-variant/50 normal-case tracking-normal">
                  (complimentary)
                </span>
              </span>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-lowest text-on-surface font-headline-sm text-headline-sm tracking-[0.4em] uppercase px-4 py-3 rounded-lg outline-none focus:ring-1 focus:ring-primary shadow-inner placeholder:tracking-[0.4em] placeholder:text-on-surface-variant/30"
                  id="monogram-input"
                  maxLength={3}
                  onChange={(e) =>
                    setMonogram(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))
                  }
                  placeholder="ABC"
                  type="text"
                  value={monogram}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-label-badge text-[10px] text-on-surface-variant/50 uppercase tracking-widest">
                  {monogram.length}/3
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-[1fr_auto] gap-2 mb-space-sm">
              <button
                className={`w-full py-4 rounded font-label-nav text-label-nav uppercase tracking-[0.14em] font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  canPurchase
                    ? "bg-primary hover:bg-primary-fixed text-on-primary shadow-lg hover:shadow-[0_0_30px_rgba(242,202,80,0.35)]"
                    : "bg-surface-container-highest text-on-surface-variant/40 cursor-not-allowed"
                }`}
                disabled={!canPurchase}
                id="add-to-bag-btn"
                onClick={handleAddToBag}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  shopping_bag
                </span>
                Add To Private Bag — {formatPrice(PRICE, currency)}
              </button>
              <button
                aria-label="Toggle wishlist"
                className={`w-14 h-auto rounded border transition-all flex items-center justify-center ${
                  wishlisted
                    ? "bg-error/10 border-error text-error"
                    : "bg-surface-container-low border-outline-variant/40 text-on-surface-variant hover:text-error hover:border-error/50"
                }`}
                id="wishlist-toggle"
                onClick={() => toggleWishlist("aurelia-pave-stilettos")}
                type="button"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
              </button>
            </div>

            <a
              className="w-full py-3.5 rounded bg-tertiary hover:bg-tertiary-fixed text-on-tertiary font-label-nav text-label-nav uppercase tracking-[0.14em] font-semibold transition-all flex items-center justify-center gap-2 shadow-lg mb-space-md"
              href={whatsappInquiry(
                `VIP Concierge — I am acquiring the Aurélia Pavé 18K Gold Stilettos (${formatPrice(PRICE, currency)}), EU size ${size ?? "TBD"}, ${selectedFinish.label} satin, ${selectedHeel.label}${monogram ? `, monogram "${monogram}"` : ""}.`
              )}
              id="whatsapp-inquiry-btn"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              Inquire via WhatsApp Concierge
            </a>

            {/* Assurance strip */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: "verified_user", label: "Certified Authentic" },
                { icon: "local_shipping", label: "Insured Courier" },
                { icon: "handshake", label: "5-Year Guarantee" },
              ].map((item) => (
                <div
                  className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg bg-surface-container-low"
                  key={item.label}
                >
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    {item.icon}
                  </span>
                  <span className="font-label-badge text-[10px] uppercase tracking-wider text-on-surface-variant text-center">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Technical Dossier ───────────────────────────────────────── */}
      <section className="w-full bg-surface-container-lowest py-space-xl">
        <div className="max-w-[1600px] mx-auto px-margin">
          <div className="text-center max-w-2xl mx-auto mb-space-lg">
            <span className="font-label-badge text-label-badge text-primary uppercase tracking-[0.25em] block mb-2">
              Atelier Documentation
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Technical Dossier
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {DOSSIER.map((card) => (
              <div
                className="bg-surface-container rounded-xl p-space-md shadow-lg flex flex-col gap-3"
                key={card.title}
              >
                <div className="flex items-center gap-3 pb-2 border-b border-surface-container-highest">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[20px]">
                      {card.icon}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-[17px] text-on-surface uppercase tracking-wide">
                    {card.title}
                  </h3>
                </div>
                {card.rows.map(([k, v]) => (
                  <div
                    className="flex items-baseline justify-between gap-4"
                    key={k}
                  >
                    <span className="font-label-badge text-[10px] uppercase tracking-widest text-on-surface-variant">
                      {k}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface text-right font-light">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ensemble Cross-Sell ────────────────────────────────────── */}
      <section className="w-full max-w-[1600px] mx-auto px-margin py-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
          <div>
            <span className="font-label-badge text-label-badge text-primary uppercase tracking-[0.25em] block mb-2">
              Curated Companions
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Complete the Ensemble
            </h2>
          </div>
          <Link
            className="font-label-nav text-label-nav text-primary uppercase tracking-widest hover:translate-x-1 transition-transform inline-flex items-center gap-2 mt-4 md:mt-0"
            href="/catalog"
          >
            View Full Vault{" "}
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
          {ENSEMBLE.map((item) => (
            <Link
              className="group bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center gap-space-md"
              href="/catalog"
              key={item.name}
            >
              <div className="relative w-36 h-36 shrink-0 bg-surface-container-lowest overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={item.image}
                />
              </div>
              <div className="flex flex-col gap-1.5 pr-space-md py-3">
                <span className="font-label-badge text-label-badge text-secondary-fixed uppercase tracking-wider">
                  {item.dept}
                </span>
                <span className="font-headline-sm text-[18px] text-on-surface group-hover:text-primary transition-colors leading-snug">
                  {item.name}
                </span>
                <span className="font-price-display text-price-display text-primary font-semibold">
                  {formatPrice(item.price, currency)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Collector Reviews ──────────────────────────────────────── */}
      <section className="w-full bg-surface-container-low py-space-xl">
        <div className="max-w-[1600px] mx-auto px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
            <div>
              <span className="font-label-badge text-label-badge text-primary uppercase tracking-[0.25em] block mb-2">
                Salon Impressions
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Collector Reviews
              </h2>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              {["star", "star", "star", "star", "star"].map((icon, i) => (
                <span
                  className="material-symbols-outlined text-primary text-[20px]"
                  key={i}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {icon}
                </span>
              ))}
              <span className="font-body-sm text-body-sm text-on-surface ml-2 font-medium">
                5.0 • 12 Reviews
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {REVIEWS.map((r) => (
              <div
                className="bg-surface-container p-space-lg rounded-xl shadow-lg flex flex-col justify-between"
                key={r.name}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <span
                        className="material-symbols-outlined text-primary text-[16px]"
                        key={i}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="font-title-editorial text-title-editorial text-on-surface italic font-normal leading-relaxed">
                    &ldquo;{r.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-space-sm mt-4 border-t border-surface-container-highest">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-headline-sm text-[15px] text-primary">
                    {r.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-badge text-label-badge text-on-surface uppercase tracking-wider font-semibold">
                      {r.name}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant font-light">
                      {r.meta}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Size & Fit Modal ───────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl flex items-center justify-center p-4 transition-opacity duration-300 ${
          showSizeGuide ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        id="size-guide-modal"
        onClick={(e) => {
          if (e.target === e.currentTarget) setShowSizeGuide(false);
        }}
      >
        <div className="bg-surface-container rounded-2xl max-w-lg w-full p-space-md shadow-2xl relative">
          <button
            aria-label="Close size guide"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container-high text-on-surface hover:text-primary flex items-center justify-center transition-colors"
            onClick={() => setShowSizeGuide(false)}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          <div className="flex items-center gap-3 mb-space-sm">
            <span className="material-symbols-outlined text-primary text-[24px]">
              straighten
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Size &amp; Fit Guide
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant font-light mb-space-sm">
            The Aurélia last runs true to EU sizing with a slightly narrow
            toe box. For half sizes, our atelier recommends sizing up.
          </p>
          <div className="overflow-x-auto rounded-lg border border-outline-variant/30">
            <table className="w-full font-body-sm text-body-sm">
              <thead>
                <tr className="bg-surface-container-highest text-left">
                  <th className="px-4 py-2.5 font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant">
                    EU
                  </th>
                  <th className="px-4 py-2.5 font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant">
                    US
                  </th>
                  <th className="px-4 py-2.5 font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant">
                    UK
                  </th>
                  <th className="px-4 py-2.5 font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant">
                    Foot (cm)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["35", "5", "2.5", "22.3"],
                  ["36", "6", "3.5", "23.0"],
                  ["37", "6.5", "4", "23.6"],
                  ["38", "7.5", "5", "24.3"],
                  ["39", "8.5", "6", "25.0"],
                  ["40", "9", "6.5", "25.7"],
                  ["41", "10", "7.5", "26.3"],
                ].map(([eu, us, uk, cm]) => (
                  <tr
                    className={`border-t border-outline-variant/20 ${
                      size === eu ? "bg-primary/10" : "bg-surface-container-low hover:bg-surface-container-highest/40"
                    } transition-colors`}
                    key={eu}
                  >
                    <td className="px-4 py-2 text-on-surface font-semibold">{eu}</td>
                    <td className="px-4 py-2 text-on-surface-variant">{us}</td>
                    <td className="px-4 py-2 text-on-surface-variant">{uk}</td>
                    <td className="px-4 py-2 text-on-surface-variant">{cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className="w-full mt-space-sm py-3 rounded bg-primary hover:bg-primary-fixed text-on-primary font-label-badge text-label-badge uppercase tracking-wider font-bold transition-all"
            onClick={() => setShowSizeGuide(false)}
            type="button"
          >
            Confirm &amp; Continue
          </button>
        </div>
      </div>

      {/* ── Sticky Acquisition Bar ─────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-surface-container-lowest/95 backdrop-blur-2xl border-t border-outline-variant/30 shadow-[0_-8px_30px_rgba(0,0,0,0.6)]">
        <div className="max-w-[1600px] mx-auto px-margin py-3 flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-lg overflow-hidden bg-surface-container-low shrink-0 hidden sm:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Aurélia Pavé stilettos thumbnail"
                className="w-full h-full object-cover"
                src={SHOE_IMG}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-badge text-[10px] text-primary uppercase tracking-widest truncate">
                Aurélia Pavé • {selectedFinish.label}
              </span>
              <span className="font-price-display text-price-display text-on-surface font-semibold truncate">
                {formatPrice(PRICE, currency)}
                <span className="font-label-badge text-[10px] text-on-surface-variant uppercase tracking-widest ml-2">
                  {size ? `EU ${size}` : "Select Size"}
                </span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              className={`hidden md:flex px-5 py-2.5 rounded font-label-badge text-label-badge uppercase tracking-wider font-semibold transition-all ${
                canPurchase
                  ? "bg-surface-container-high hover:bg-surface-bright text-on-surface"
                  : "bg-surface-container-high text-on-surface-variant/40 cursor-not-allowed"
              }`}
              disabled={!canPurchase}
              onClick={() => setShowSizeGuide(true)}
              type="button"
            >
              Size Guide
            </button>
            <button
              className={`px-6 py-2.5 rounded font-label-nav text-label-nav uppercase tracking-wider font-bold transition-all flex items-center gap-2 ${
                canPurchase
                  ? "bg-primary hover:bg-primary-fixed text-on-primary shadow-md"
                  : "bg-surface-container-highest text-on-surface-variant/40 cursor-not-allowed"
              }`}
              disabled={!canPurchase}
              onClick={handleAddToBag}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                shopping_bag
              </span>
              Acquire Now
            </button>
          </div>
        </div>
      </div>

      {/* ── Cart Toast ─────────────────────────────────────────────── */}
      <div
        className={`fixed bottom-24 right-6 z-50 transform transition-all duration-300 pointer-events-none ${
          toast ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"
        }`}
        id="cart-toast"
      >
        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-surface-container-highest/95 backdrop-blur-2xl text-on-surface shadow-2xl">
          <span className="material-symbols-outlined text-primary text-[20px]">
            check_circle
          </span>
          <div className="flex flex-col">
            <span className="font-label-badge text-label-badge text-primary uppercase tracking-widest">
              Acquisition Staged
            </span>
            <span className="font-body-sm text-body-sm text-on-surface font-light">
              Aurélia Pavé Stilettos — EU {size}, {selectedFinish.label}
              {monogram ? `, monogram "${monogram}"` : ""} added to your private
              reservation.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
