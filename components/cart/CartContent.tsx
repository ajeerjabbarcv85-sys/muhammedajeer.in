"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import { formatPrice, whatsappInquiry } from "@/lib/products";

const DEFAULT_DOSSIER = {
  name: "Alexander Vance",
  phone: "1 917 555 8820",
  email: "alexander.vance@privatevault.ch",
  address: "New York 740 Park Avenue",
};

export default function CartContent() {
  const { items, setQty, removeItem, itemCount, subtotal } = useCart();
  const { currency } = useCurrency();
  const [removed, setRemoved] = useState<{ name: string } | null>(null);
  const [dossier, setDossier] = useState(DEFAULT_DOSSIER);

  const handleRemove = (id: string) => {
    const item = items.find((i) => i.id === id);
    removeItem(id);
    setRemoved(item ? { name: item.name } : null);
    window.setTimeout(() => setRemoved(null), 3200);
  };

  const orderMessage = () => {
    const lines = items.map(
      (i) =>
        `• ${i.name} — ${i.config} — ${i.qty} × ${formatPrice(i.unitPrice, currency)}`
    );
    return [
      "VIP Concierge — I am confirming my private acquisition:",
      "",
      ...lines,
      "",
      `TOTAL: ${formatPrice(subtotal, currency)} (${itemCount} pieces)`,
      "",
      "Client Dossier:",
      `Name: ${dossier.name}`,
      `Phone: ${dossier.phone}`,
      `Email: ${dossier.email}`,
      `Delivery: ${dossier.address}`,
    ].join("\n");
  };

  const field = (
    label: string,
    key: keyof typeof dossier,
    type: string,
    icon: string
  ) => (
    <label className="flex flex-col gap-1.5">
      <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
        {label}
      </span>
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[17px] text-primary pointer-events-none">
          {icon}
        </span>
        <input
          className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md pl-11 pr-4 py-3 rounded-lg outline-none focus:ring-1 focus:ring-primary shadow-inner transition-all"
          onChange={(e) =>
            setDossier((prev) => ({ ...prev, [key]: e.target.value }))
          }
          type={type}
          value={dossier[key]}
        />
      </div>
    </label>
  );

  return (
    <div className="flex flex-col w-full">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1600px] mx-auto px-margin pt-space-md pb-space-lg">
        <nav className="flex items-center gap-2 font-label-badge text-label-badge uppercase tracking-widest text-on-surface-variant mb-space-md">
          <Link className="hover:text-primary transition-colors" href="/">
            Home
          </Link>
          <span className="material-symbols-outlined text-[12px]">
            chevron_right
          </span>
          <span className="text-primary">Private Acquisition Bag</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
          <div>
            <span className="font-label-badge text-label-badge text-primary uppercase tracking-[0.25em] block mb-2">
              Reserved Vault Holdings
            </span>
            <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface tracking-tight">
              Private Acquisition Bag
            </h1>
          </div>
          <div className="flex items-center gap-space-md self-start lg:self-auto bg-surface-container-low px-space-md py-space-sm rounded-xl shadow-md">
            <div className="flex flex-col">
              <span className="font-label-badge text-label-badge text-on-surface-variant uppercase">
                Holdings
              </span>
              <span className="font-price-display text-price-display text-primary">
                {itemCount} {itemCount === 1 ? "Piece" : "Pieces"}
              </span>
            </div>
            <div className="w-px h-8 bg-surface-container-highest" />
            <div className="flex flex-col">
              <span className="font-label-badge text-label-badge text-on-surface-variant uppercase">
                Total Valuation
              </span>
              <span className="font-price-display text-price-display text-primary">
                {formatPrice(subtotal, currency)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Layout ───────────────────────────────────────────── */}
      <section className="w-full max-w-[1600px] mx-auto px-margin pb-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Items */}
          <div className="lg:col-span-8 flex flex-col gap-space-md">
            {items.length === 0 ? (
              <div className="bg-surface-container-low rounded-xl p-space-xl flex flex-col items-center gap-4 text-center shadow-lg">
                <span className="material-symbols-outlined text-primary text-[48px]">
                  lock
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Your Vault Reservation is Empty
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant font-light max-w-md">
                  Reserved masterpieces await in the curated catalog. Stage
                  your acquisitions and complete them via the WhatsApp
                  concierge desk.
                </p>
                <Link
                  className="px-8 py-4 rounded-full bg-primary text-on-primary font-label-nav text-label-nav uppercase tracking-[0.14em] font-semibold hover:bg-primary-fixed transition-all shadow-lg"
                  href="/catalog"
                >
                  Explore The Private Vault
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <article
                  className="bg-surface-container-low rounded-xl overflow-hidden shadow-lg flex flex-col sm:flex-row group"
                  key={item.id}
                >
                  <div className="relative w-full sm:w-52 h-52 sm:h-auto shrink-0 bg-surface-container-lowest overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={item.image}
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-surface-container-lowest/85 backdrop-blur-md font-label-badge text-[9px] uppercase tracking-widest text-tertiary flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                      Reserved
                    </span>
                  </div>

                  <div className="flex flex-col flex-1 p-space-md gap-3 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="font-label-badge text-label-badge text-secondary-fixed uppercase tracking-wider">
                          {item.dept}
                        </span>
                        {item.href ? (
                          <Link
                            className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors leading-snug"
                            href={item.href}
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <h2 className="font-headline-md text-headline-md text-on-surface leading-snug">
                            {item.name}
                          </h2>
                        )}
                        <span className="font-body-sm text-body-sm text-on-surface-variant font-light">
                          {item.config}
                        </span>
                      </div>
                      <button
                        aria-label={`Remove ${item.name}`}
                        className="p-2 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors shrink-0"
                        onClick={() => handleRemove(item.id)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          delete
                        </span>
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 mt-auto pt-3 border-t border-surface-container-highest">
                      <div className="flex items-center gap-2">
                        <button
                          aria-label="Decrease quantity"
                          className="w-9 h-9 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          disabled={item.qty <= 1}
                          onClick={() => setQty(item.id, item.qty - 1)}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            remove
                          </span>
                        </button>
                        <span className="w-12 h-9 rounded-lg bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center font-body-md text-body-md text-on-surface">
                          {item.qty}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          className="w-9 h-9 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          disabled={item.qty >= item.maxQty}
                          onClick={() => setQty(item.id, item.qty + 1)}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            add
                          </span>
                        </button>
                        <span className="font-label-badge text-[10px] text-on-surface-variant/60 uppercase tracking-widest ml-1">
                          max {item.maxQty}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-label-badge text-[10px] text-on-surface-variant uppercase tracking-widest">
                          {item.qty} × {formatPrice(item.unitPrice, currency)}
                        </span>
                        <span className="font-price-display text-price-display text-primary font-bold">
                          {formatPrice(item.unitPrice * item.qty, currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}

            {/* Assurance strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
              {[
                { icon: "verified_user", label: "100% Authenticity Certified" },
                { icon: "local_shipping", label: "Complimentary Insured Courier" },
                { icon: "lock", label: "Encrypted Private Checkout" },
                { icon: "workspace_premium", label: "Lifetime Atelier Service" },
              ].map((item) => (
                <div
                  className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl bg-surface-container-low text-center"
                  key={item.label}
                >
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    {item.icon}
                  </span>
                  <span className="font-label-badge text-[10px] uppercase tracking-wider text-on-surface-variant">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary + Dossier */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="bg-surface-container-low rounded-xl p-space-md shadow-xl flex flex-col gap-3 sticky top-32">
              <div className="flex items-center gap-2 pb-3 border-b border-surface-container-highest">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  receipt_long
                </span>
                <h2 className="font-headline-sm text-[17px] text-on-surface uppercase tracking-wide font-medium">
                  Acquisition Summary
                </h2>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Vault Subtotal ({itemCount}{" "}
                  {itemCount === 1 ? "piece" : "pieces"})
                </span>
                <span className="font-body-md text-body-md text-on-surface font-medium">
                  {formatPrice(subtotal, currency)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  International Duties
                </span>
                <span className="font-label-badge text-label-badge text-tertiary uppercase font-semibold">
                  Complimentary
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Insured Armored Courier
                </span>
                <span className="font-label-badge text-label-badge text-tertiary uppercase font-semibold">
                  Complimentary
                </span>
              </div>

              <div className="w-full h-px bg-surface-container-highest my-1" />

              <div className="flex items-center justify-between">
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
                  Total Valuation
                </span>
                <span className="font-price-display text-price-display text-primary font-bold">
                  {formatPrice(subtotal, currency)}
                </span>
              </div>

              {/* Client Dossier */}
              <div className="w-full h-px bg-surface-container-highest my-1" />

              <div className="flex flex-col gap-3">
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[15px]">
                    badge
                  </span>
                  Confidential Client Dossier
                </span>
                {field("Full Name", "name", "text", "person")}
                {field("Direct Line", "phone", "tel", "call")}
                {field("Private Email", "email", "email", "mail")}
                {field("Delivery Address", "address", "text", "location_on")}
              </div>

              <a
                className={`w-full py-4 rounded font-label-nav text-label-nav uppercase tracking-[0.14em] font-bold transition-all flex items-center justify-center gap-2 ${
                  items.length > 0
                    ? "bg-tertiary hover:bg-tertiary-fixed text-on-tertiary shadow-lg hover:shadow-[0_0_30px_rgba(71,234,122,0.25)]"
                    : "bg-surface-container-highest text-on-surface-variant/40 cursor-not-allowed"
                }`}
                href={
                  items.length > 0 ? whatsappInquiry(orderMessage()) : undefined
                }
                id="whatsapp-order-btn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[19px]">
                  chat
                </span>
                Confirm Acquisition via WhatsApp
              </a>

              <span className="font-label-badge text-[10px] text-on-surface-variant/60 uppercase tracking-widest text-center">
                Concierge desk: +91 8590780520 • Muhd Ajeer
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Removed Toast ──────────────────────────────────────────── */}
      <div
        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 pointer-events-none ${
          removed ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"
        }`}
        id="cart-toast"
      >
        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-surface-container-highest/95 backdrop-blur-2xl text-on-surface shadow-2xl">
          <span className="material-symbols-outlined text-primary text-[20px]">
            delete
          </span>
          <div className="flex flex-col">
            <span className="font-label-badge text-label-badge text-primary uppercase tracking-widest">
              Holding Released
            </span>
            <span className="font-body-sm text-body-sm text-on-surface font-light">
              {removed?.name ?? ""} removed from your private reservation.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
