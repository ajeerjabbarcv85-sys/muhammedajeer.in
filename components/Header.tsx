"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";
import { useCurrency, type Currency } from "@/lib/currency";
import { formatPrice } from "@/lib/products";
import { useWishlist } from "@/lib/wishlist";

const WHATSAPP = "https://wa.me/918590780520";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/catalog" },
];

export default function Header() {
  const pathname = usePathname();
  const { itemCount, subtotal } = useCart();
  const { ids: wishlistIds } = useWishlist();
  const { currency, setCurrency } = useCurrency();

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-outline-variant/30 bg-surface-container-lowest/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-margin">
        <div className="flex min-w-0 items-center gap-8">
          <Link
            className="flex shrink-0 items-center gap-2 group"
            href="/"
          >
            <Image
              alt="JS logo"
              className="h-8 w-8 object-contain"
              src="/logo.svg"
              width={32}
              height={32}
              priority
            />
            <span className="font-headline-sm text-[16px] tracking-[0.12em] uppercase text-on-surface group-hover:text-primary transition-colors">
              JEESTORE
            </span>
          </Link>
          <nav aria-label="Main navigation" className="flex items-center gap-5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "text-sm text-primary font-medium"
                      : "text-sm text-on-surface-variant hover:text-on-surface transition-colors"
                  }
                  href={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="relative">
            <select
              aria-label="Currency Selector"
              className="cursor-pointer rounded border-0 bg-transparent py-1 pl-1 pr-5 text-xs font-medium text-on-surface-variant outline-none hover:text-on-surface"
              onChange={(event) => setCurrency(event.target.value as Currency)}
              value={currency}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>

          <Link
            aria-label={`Wishlist, ${wishlistIds.length} saved products`}
            className="relative flex items-center gap-1 text-on-surface-variant transition-colors hover:text-primary"
            href="/wishlist"
          >
            <span className="material-symbols-outlined text-[21px]">favorite</span>
            <span className="text-xs font-medium">{wishlistIds.length}</span>
          </Link>

          <Link
            aria-label={`Shopping cart, ${itemCount} items, ${formatPrice(subtotal, currency)}`}
            className="flex items-center gap-1.5 text-on-surface-variant transition-colors hover:text-primary"
            href="/cart"
          >
            <span className="material-symbols-outlined text-[21px]">
              shopping_bag
            </span>
            <span className="text-xs font-medium">{itemCount}</span>
          </Link>

          <a
            aria-label="Contact us on WhatsApp"
            className="hidden items-center text-on-surface-variant transition-colors hover:text-primary sm:flex"
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
          </a>
        </div>
      </div>
    </header>
  );
}
