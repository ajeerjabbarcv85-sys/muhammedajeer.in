"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart, type NewCartItem } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import { useWishlist, toggleWishlist } from "@/lib/wishlist";
import { formatPrice, whatsappInquiry } from "@/lib/products";

const BASE_PRICE = 8950;

const MAIN_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCfFVXZ8Z-BqNR1mAFu5J3D3oL5Hq05kSRXegJpyCCKxmLIlu95Siomen9TyOdnlIY08trWRdgEvj4AQlpa6TtdoY_Rs-6JcB2Y9NIZ2FTWdw_2610rcAUybSWMQ7o8O-20qazxK_-kZDYSe0ofXd1DgV0afe1LrROrxyn_MUrncWfZh2krfZmb3P6HeyK7jTt4lXvYtXfFP1PPEHCEd1xEC_xUSAEkR5fwdBMf9rw";
const GALLERY_IMGS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBMq7KfxIKj3q3VLq224cVw3E-kaGxgUy_4PKN2v0VfG0eLU3Oqw6hRsPuyn9Ch_tglayot-l11NKHhPGq425_eB_e2-344e14laJaA_SNqgNXLo3xMqTXR48kfOksrAMH1XUK0N-xzd5did5_8PbH40VcVwlXeFEH0RSLDjJD6SD-KowdCnQiRj84_GaVm7XGaCrTSHUQ2j33pOiiJcrc67e6aP_Ic4RNjUJGjJc8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuByxQtF9uN3uytcxyg2HHNafLtRdoKbX0cF4ngywCDO-JR_wMdbOsOHFrNI6tGQx3RzCnTLjpRZfdmhIwdu6EGLB3PC54iGiVLnf0EgQO46uq2wlGFZKZHeF5x-DIFjl8W9OdNixk-hb3K7hIVJgxCC9LW1ZxPOozgAzWNvHpUT5zzzj3x1cJzG5BAIVKrTYqlTEjYyMy4VYZhUEsdLcigDRCCj7OxVg7Yd5zMjums",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB4MYJXfmgd2Co1rJvY1OyAAwjJukA_GsaKgs9EalaPWB_PXz18C3F81wHnetOX2ugWxpn5ipJsQaokoNnOn7CuRcGm17MSlzmO-I4kPqefesbfAIflodeOyQY7VIPWn0MllqGL6l9rrqresltq4d9SNWRMbQBVkyvyEX9zh8YkNiC3pEZdZwurGOHhTCW6NQBdMNh-LZK7aQpV8zSVB3x8r95t57mI5UrX6WEBNoo",
];

const GALLERY = [
  { src: MAIN_IMG, alt: "Sovereign Royal Skeleton Tourbillon full view with exposed movement", label: "Skeleton Face" },
  { src: GALLERY_IMGS[0], alt: "Sovereign tourbillon 18K gold case and micro-tapisserie dial", label: "Gold Case" },
  { src: GALLERY_IMGS[1], alt: "Sovereign tourbillon exhibition sapphire caseback", label: "Caseback" },
  { src: GALLERY_IMGS[2], alt: "Sovereign tourbillon moonphase and strap detail", label: "Strap Detail" },
];

const CASES = [
  { id: "yellow", label: "18K Yellow Gold", delta: 0, dot: "#f2ca50" },
  { id: "rose", label: "18K Everose Gold", delta: 450, dot: "#B76E79" },
  { id: "platinum", label: "950 Platinum", delta: 1850, dot: "#c6c6c6" },
];

const STRAPS = [
  { id: "alligator-noir", label: "Obsidian Alligator Leather", delta: 0 },
  { id: "alligator-cognac", label: "Cognac Alligator Leather", delta: 0 },
  { id: "gold-bracelet", label: "18K Gold Link Bracelet", delta: 2400 },
];

const DIAMETERS = [
  { id: "39", label: "39mm", delta: 0 },
  { id: "41", label: "41mm", delta: 200 },
];

type TabId = "overview" | "movement" | "provenance";

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "visibility" },
  { id: "movement", label: "Movement", icon: "settings" },
  { id: "provenance", label: "Provenance & Warranty", icon: "workspace_premium" },
];

export default function SovereignContent() {
  const { addItem } = useCart();
  const { currency } = useCurrency();
  const [activeImage, setActiveImage] = useState(0);
  const [caseMat, setCaseMat] = useState(CASES[0].id);
  const [strap, setStrap] = useState(STRAPS[0].id);
  const [diameter, setDiameter] = useState(DIAMETERS[0].id);
  const [qty, setQty] = useState(1);
  const { ids: wishlistIds } = useWishlist();
  const wishlisted = wishlistIds.includes("sovereign-royal-oak");
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [toast, setToast] = useState(false);

  const selectedCase = CASES.find((c) => c.id === caseMat)!;
  const selectedStrap = STRAPS.find((s) => s.id === strap)!;
  const selectedDiameter = DIAMETERS.find((d) => d.id === diameter)!;

  const unitPrice = BASE_PRICE + selectedCase.delta + selectedStrap.delta + selectedDiameter.delta;
  const totalPrice = unitPrice * qty;

  const handleAddToBag = () => {
    const item: NewCartItem = {
      id: `sovereign-tourbillon-${caseMat}-${strap}-${diameter}`,
      name: "Sovereign Royal Skeleton Tourbillon 18K",
      dept: "Haute Horlogerie • Vault CH-SOV-8509",
      config: configSummary,
      unitPrice,
      image: MAIN_IMG,
      alt: "Sovereign Royal Skeleton Tourbillon wristwatch in gold with exposed movement",
      href: "/product/sovereign-skeleton-tourbillon",
      maxQty: 3,
    };
    addItem(item, qty);
    setToast(true);
    window.setTimeout(() => setToast(false), 3200);
  };

  const configSummary = `${selectedCase.label}, ${selectedStrap.label}, ${selectedDiameter.label} case`;

  return (
    <div className="flex flex-col w-full">
      {/* ── Product Stage ───────────────────────────────────────────── */}
      <section className="w-full max-w-[1600px] mx-auto px-margin pt-space-md pb-space-lg">
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
            href="/catalog?category=watches"
          >
            Haute Horlogerie
          </Link>
          <span className="material-symbols-outlined text-[12px]">
            chevron_right
          </span>
          <span className="text-primary">Sovereign Skeleton Tourbillon</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-space-sm order-2 lg:order-1">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-lowest shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={GALLERY[activeImage].alt}
                className="w-full h-full object-cover transition-all duration-500"
                id="watch-main-image"
                key={activeImage}
                src={GALLERY[activeImage].src}
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-badge text-label-badge uppercase tracking-widest shadow-sm">
                  Limited Edition • 1 of 15
                </span>
                <span className="px-2.5 py-1 rounded bg-surface-container-lowest/80 backdrop-blur-md text-tertiary font-label-badge text-[10px] uppercase tracking-widest flex items-center gap-1.5 self-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                  In Vault — Geneva
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
          <div className="lg:col-span-5 flex flex-col order-1 lg:order-2">
            <span className="font-label-badge text-label-badge text-primary uppercase tracking-[0.25em] mb-2">
              Haute Horlogerie • Le Locle, Switzerland
            </span>
            <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface tracking-tight mb-3">
              Sovereign Royal Skeleton Tourbillon
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
                5.0 • 8 Collector Reviews
              </span>
            </div>

            {/* Live Price Display */}
            <div className="flex flex-col gap-1 mb-space-md p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
              <div className="flex items-baseline justify-between">
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
                  Vault Valuation
                </span>
                <span className="font-label-badge text-[10px] text-tertiary uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                  Live Configuration
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-price-display text-price-display text-primary font-bold" id="live-price">
                  {formatPrice(totalPrice, currency)}
                </span>
              </div>
              <span className="font-label-badge text-[10px] text-on-surface-variant/60 uppercase tracking-widest" id="price-config-summary">
                {qty} × {formatPrice(unitPrice, currency)} — {configSummary}
              </span>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed mb-space-md">
              A manually wound skeleton tourbillon of uncompromising pedigree.
              Every bridge is hand-chamfered and mirror-polished, opening the
              gaze onto a 72-hour double-barrel calibre beneath double
              anti-reflective sapphire.
            </p>

            {/* Case Material */}
            <div className="mb-space-md">
              <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider block mb-2">
                Case Material —{" "}
                <span className="text-on-surface font-semibold">
                  {selectedCase.label}
                  {selectedCase.delta > 0 && (
                    <span className="text-primary">
                      {" "}
                      (+{formatPrice(selectedCase.delta, currency)})
                    </span>
                  )}
                </span>
              </span>
              <div className="flex items-center gap-3">
                {CASES.map((c) => (
                  <button
                    aria-label={c.label}
                    className={`w-11 h-11 rounded-full shadow-md transition-all duration-300 ${
                      caseMat === c.id
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-surface scale-110"
                        : "hover:scale-105 ring-1 ring-outline-variant/40"
                    }`}
                    key={c.id}
                    onClick={() => setCaseMat(c.id)}
                    style={{ backgroundColor: c.dot }}
                    title={`${c.label}${c.delta > 0 ? ` (+${formatPrice(c.delta, currency)})` : ""}`}
                    type="button"
                  />
                ))}
              </div>
            </div>

            {/* Strap */}
            <div className="mb-space-md">
              <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider block mb-2">
                Strap &amp; Bracelet
              </span>
              <div className="flex flex-col gap-2">
                {STRAPS.map((s) => (
                  <button
                    className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${
                      strap === s.id
                        ? "bg-primary/15 border border-primary/60 shadow-sm"
                        : "bg-surface-container-low border border-outline-variant/30 hover:border-primary/40"
                    }`}
                    key={s.id}
                    onClick={() => setStrap(s.id)}
                    type="button"
                  >
                    <span className="font-body-sm text-body-sm text-on-surface">
                      {s.label}
                    </span>
                    {s.delta > 0 ? (
                      <span className="font-label-badge text-[10px] uppercase tracking-widest text-primary font-semibold">
                        +{formatPrice(s.delta, currency)}
                      </span>
                    ) : (
                      <span
                        className={`font-label-badge text-[10px] uppercase tracking-widest ${
                          strap === s.id ? "text-primary font-semibold" : "text-tertiary"
                        }`}
                      >
                        Included
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Case Diameter */}
            <div className="mb-space-md">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
                  Case Diameter
                </span>
                <button
                  className="font-label-badge text-[11px] text-primary hover:text-primary-fixed uppercase tracking-wider underline underline-offset-2 transition-colors"
                  id="open-watch-size-guide"
                  onClick={() => setShowSizeGuide(true)}
                  type="button"
                >
                  Wrist Guide
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {DIAMETERS.map((d) => (
                  <button
                    className={`py-3 rounded-lg font-label-badge text-label-badge uppercase tracking-wider transition-all duration-300 ${
                      diameter === d.id
                        ? "bg-primary text-on-primary font-bold shadow-md"
                        : "bg-surface-container-low hover:bg-surface-container-high text-on-surface font-semibold"
                    }`}
                    key={d.id}
                    onClick={() => setDiameter(d.id)}
                    type="button"
                  >
                    {d.label}
                    {d.delta > 0 && (
                      <span className="block font-body-sm text-[10px] normal-case tracking-normal opacity-80">
                        +{formatPrice(d.delta, currency)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-space-md">
              <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider block mb-2">
                Allocation Quantity{" "}
                <span className="text-on-surface-variant/50 normal-case tracking-normal">
                  (max 3 per patron)
                </span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  aria-label="Decrease quantity"
                  className="w-11 h-11 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={qty <= 1}
                  id="qty-minus"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    remove
                  </span>
                </button>
                <span className="w-16 h-11 rounded-lg bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center font-price-display text-price-display text-on-surface" id="qty-display">
                  {qty}
                </span>
                <button
                  aria-label="Increase quantity"
                  className="w-11 h-11 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={qty >= 3}
                  id="qty-plus"
                  onClick={() => setQty((q) => Math.min(3, q + 1))}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    add
                  </span>
                </button>
                <span className="font-label-badge text-[10px] text-on-surface-variant/60 uppercase tracking-widest ml-2">
                  {15 - 4} pieces remain worldwide
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-[1fr_auto] gap-2 mb-space-sm">
              <button
                className="w-full py-4 rounded font-label-nav text-label-nav uppercase tracking-[0.14em] font-bold bg-primary hover:bg-primary-fixed text-on-primary shadow-lg hover:shadow-[0_0_30px_rgba(242,202,80,0.35)] transition-all duration-300 flex items-center justify-center gap-2"
                id="watch-add-to-bag"
                onClick={handleAddToBag}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  shopping_bag
                </span>
                Add To Private Bag — {formatPrice(totalPrice, currency)}
              </button>
              <button
                aria-label="Toggle wishlist"
                className={`w-14 h-auto rounded border transition-all flex items-center justify-center ${
                  wishlisted
                    ? "bg-error/10 border-error text-error"
                    : "bg-surface-container-low border-outline-variant/40 text-on-surface-variant hover:text-error hover:border-error/50"
                }`}
                id="watch-wishlist-toggle"
                onClick={() => toggleWishlist("sovereign-royal-oak")}
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
                `VIP Concierge — I am acquiring the Sovereign Royal Skeleton Tourbillon: ${configSummary}, quantity ${qty} (${formatPrice(totalPrice, currency)}).`
              )}
              id="watch-whatsapp-btn"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              Reserve via WhatsApp Concierge
            </a>

            {/* Assurance strip */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: "verified_user", label: "COSC Certified" },
                { icon: "local_shipping", label: "Armored Courier" },
                { icon: "handshake", label: "8-Year Warranty" },
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

        {/* ── Tabs ─────────────────────────────────────────────────── */}
        <div className="mt-space-xl bg-surface-container-low rounded-xl shadow-lg overflow-hidden">
          <div className="flex border-b border-outline-variant/30 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                className={`flex items-center gap-2 px-6 py-4 font-label-nav text-label-nav uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "text-primary border-primary bg-surface-container-highest/40"
                    : "text-on-surface-variant border-transparent hover:text-on-surface hover:bg-surface-container-highest/20"
                }`}
                id={`tab-${tab.id}`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-space-lg">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                <div className="flex flex-col gap-3">
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    An Open Statement of Mastery
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
                    The Sovereign strips away all concealment. Its skeletonised
                    architecture exposes every wheel, bridge and spring — each
                    finished by a single master watchmaker over 210 dedicated
                    hours. The one-minute flying tourbillon at six
                    o&apos;clock rotates in perpetual correction of gravity&apos;s
                    pull upon the escapement.
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
                    Double anti-reflective sapphire crystals on both faces
                    admit unrestricted examination of hand-chamfered interior
                    angles that no machine can replicate.
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 bg-surface-container rounded-lg p-space-md">
                  {[
                    ["Reference", "SVR-TOUR-18K"],
                    ["Edition", "15 Pieces Worldwide"],
                    ["Water Resistance", "50 Metres"],
                    ["Crystal", "Double AR Sapphire"],
                    ["Case Finishing", "Hand-Brushed & Polished"],
                    ["Presentation", "Lacquered Vault Case + Papers"],
                  ].map(([k, v]) => (
                    <div className="flex items-baseline justify-between gap-4" key={k}>
                      <span className="font-label-badge text-[10px] uppercase tracking-widest text-on-surface-variant">
                        {k}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface text-right font-light">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "movement" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                <div className="flex flex-col gap-3">
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Calibre SVT-9 Skeleton
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
                    A manually wound mechanical calibre conceived, decorated
                    and assembled entirely in Le Locle. Two series-coupled
                    barrels deliver 72 hours of power reserve while the flying
                    tourbillon cage, weighing just 0.38 grams, completes one
                    revolution per minute.
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
                    Each calibre is certified across 5 positions and 3
                    temperatures over 15 consecutive days, with rate variance
                    held below +2/−2 seconds per lunar cycle.
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 bg-surface-container rounded-lg p-space-md">
                  {[
                    ["Calibre", "SVT-9 Manual Skeleton"],
                    ["Complication", "One-Minute Flying Tourbillon"],
                    ["Power Reserve", "72 Hours, Twin Barrels"],
                    ["Frequency", "21,600 VPH (3 Hz)"],
                    ["Jewels", "31 Hand-Set Rubies"],
                    ["Components", "219 Individual Parts"],
                  ].map(([k, v]) => (
                    <div className="flex items-baseline justify-between gap-4" key={k}>
                      <span className="font-label-badge text-[10px] uppercase tracking-widest text-on-surface-variant">
                        {k}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface text-right font-light">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "provenance" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                <div className="flex flex-col gap-3">
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Provenance &amp; Warranty
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
                    Each Sovereign is accompanied by a hand-numbered
                    certificate of origin, sealed provenance dossier, and
                    lifetime access to the manufacture archive. The
                    movement&apos;s serial is registered to your private
                    client file upon acquisition.
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
                    An 8-year international warranty covers movement and
                    craftsmanship, with complimentary full restoration service
                    in Le Locle every five years — in perpetuity.
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 bg-surface-container rounded-lg p-space-md">
                  {[
                    ["Certificate", "Numbered Origin Dossier"],
                    ["Warranty", "8 Years International"],
                    ["Restoration", "Complimentary, Perpetual"],
                    ["Registration", "Private Client Archive"],
                    ["Insurance", "Lloyd's of London Transit"],
                    ["Resale", "Manufacture Buy-Back Program"],
                  ].map(([k, v]) => (
                    <div className="flex items-baseline justify-between gap-4" key={k}>
                      <span className="font-label-badge text-[10px] uppercase tracking-widest text-on-surface-variant">
                        {k}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface text-right font-light">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Paired Artifacts ───────────────────────────────────────── */}
      <section className="w-full max-w-[1600px] mx-auto px-margin pb-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
          <div>
            <span className="font-label-badge text-label-badge text-primary uppercase tracking-[0.25em] block mb-2">
              Vault Adjacencies
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Paired Artifacts
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <Link
            className="group bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center gap-space-md"
            href="/product/aurelia-pave-stilettos"
          >
            <div className="relative w-36 h-36 shrink-0 bg-surface-container-lowest overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Aurélia Pavé 18K Gold Stilettos"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={GALLERY_IMGS[0]}
              />
            </div>
            <div className="flex flex-col gap-1.5 pr-space-md py-3">
              <span className="font-label-badge text-label-badge text-secondary-fixed uppercase tracking-wider">
                Artisanal Footwear • Milan
              </span>
              <span className="font-headline-sm text-[18px] text-on-surface group-hover:text-primary transition-colors leading-snug">
                Aurélia Pavé 18K Gold Stilettos
              </span>
              <span className="font-price-display text-price-display text-primary font-semibold">
                {formatPrice(4250, currency)}
              </span>
            </div>
          </Link>
          <Link
            className="group bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center gap-space-md"
            href="/catalog"
          >
            <div className="relative w-36 h-36 shrink-0 bg-surface-container-lowest overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Aurélia Nocturne Pure Parfum Elixir"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={GALLERY_IMGS[2]}
              />
            </div>
            <div className="flex flex-col gap-1.5 pr-space-md py-3">
              <span className="font-label-badge text-label-badge text-secondary-fixed uppercase tracking-wider">
                Prestige Beauty • Grasse
              </span>
              <span className="font-headline-sm text-[18px] text-on-surface group-hover:text-primary transition-colors leading-snug">
                Aurélia Nocturne Pure Parfum Elixir
              </span>
              <span className="font-price-display text-price-display text-primary font-semibold">
                {formatPrice(1450, currency)}
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Wrist Guide Modal ──────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl flex items-center justify-center p-4 transition-opacity duration-300 ${
          showSizeGuide ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        id="watch-size-guide-modal"
        onClick={(e) => {
          if (e.target === e.currentTarget) setShowSizeGuide(false);
        }}
      >
        <div className="bg-surface-container rounded-2xl max-w-lg w-full p-space-md shadow-2xl relative">
          <button
            aria-label="Close wrist guide"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container-high text-on-surface hover:text-primary flex items-center justify-center transition-colors"
            onClick={() => setShowSizeGuide(false)}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          <div className="flex items-center gap-3 mb-space-sm">
            <span className="material-symbols-outlined text-primary text-[24px]">
              watch
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Case Diameter Wrist Guide
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant font-light mb-space-sm">
            Measure your wrist circumference with a soft tailor&apos;s tape,
            then match the recommended case diameter for balanced proportion.
          </p>
          <div className="overflow-x-auto rounded-lg border border-outline-variant/30">
            <table className="w-full font-body-sm text-body-sm">
              <thead>
                <tr className="bg-surface-container-highest text-left">
                  <th className="px-4 py-2.5 font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant">
                    Wrist Circumference
                  </th>
                  <th className="px-4 py-2.5 font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant">
                    Recommended Case
                  </th>
                  <th className="px-4 py-2.5 font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant">
                    Proportion
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["15.0 – 16.5 cm", "39mm", "Classic Presence"],
                  ["16.5 – 18.0 cm", "41mm", "Commanding Presence"],
                  ["18.0 cm and above", "41mm", "Recommended Maximum"],
                ].map(([w, c, p]) => (
                  <tr
                    className={`border-t border-outline-variant/20 ${
                      (diameter === "39" && c === "39mm") || (diameter === "41" && c === "41mm")
                        ? "bg-primary/10"
                        : "bg-surface-container-low hover:bg-surface-container-highest/40"
                    } transition-colors`}
                    key={w}
                  >
                    <td className="px-4 py-2 text-on-surface-variant">{w}</td>
                    <td className="px-4 py-2 text-on-surface font-semibold">{c}</td>
                    <td className="px-4 py-2 text-on-surface-variant">{p}</td>
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

      {/* ── Cart Toast ─────────────────────────────────────────────── */}
      <div
        className={`fixed bottom-24 right-6 z-50 transform transition-all duration-300 pointer-events-none ${
          toast ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"
        }`}
        id="watch-cart-toast"
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
              Sovereign Royal Skeleton Tourbillon ({configSummary}) ×{qty} —{" "}
              {formatPrice(totalPrice, currency)} added to your private reservation.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
