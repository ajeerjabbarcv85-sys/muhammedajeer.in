"use client";

import Link from "next/link";
import { useCart, type NewCartItem } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import { catalogProducts, formatPrice } from "@/lib/products";
import { removeFromWishlist, useWishlist } from "@/lib/wishlist";

export default function WishlistContent() {
  const { ids } = useWishlist();
  const { addItem } = useCart();
  const { currency } = useCurrency();
  const products = ids
    .map((id) => catalogProducts.find((product) => product.id === id))
    .filter((product) => product !== undefined);

  const addToCart = (product: (typeof catalogProducts)[number]) => {
    const item: NewCartItem = {
      id: product.id,
      name: product.name,
      dept: product.dept,
      config: product.badge,
      unitPrice: product.price,
      image: product.image,
      alt: product.alt,
      href: product.href,
      maxQty: product.status === "bespoke" ? 1 : 3,
    };
    addItem(item, 1);
  };

  return (
    <section className="mx-auto w-full max-w-[1400px] px-margin py-12">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm text-on-surface-variant">Your saved items</p>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">
            Wishlist
          </h1>
        </div>
        <span className="text-sm text-on-surface-variant">
          {products.length} {products.length === 1 ? "item" : "items"}
        </span>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-10 text-center">
          <span className="material-symbols-outlined mb-3 text-4xl text-on-surface-variant">
            favorite_border
          </span>
          <h2 className="mb-2 font-headline-sm text-headline-sm text-on-surface">
            Your wishlist is empty
          </h2>
          <p className="mb-5 text-sm text-on-surface-variant">
            Save products you like and find them here later.
          </p>
          <Link
            className="inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-fixed"
            href="/catalog"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-low"
              key={product.id}
            >
              <Link
                aria-label={`View ${product.name}`}
                className="block aspect-[4/3] overflow-hidden bg-surface-container-lowest"
                href={product.href ?? "/catalog"}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={product.alt}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  src={product.image}
                />
              </Link>
              <div className="space-y-3 p-4">
                <div>
                  <p className="mb-1 text-xs text-on-surface-variant">
                    {product.dept}
                  </p>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    {product.name}
                  </h2>
                </div>
                <p className="text-sm font-semibold text-primary">
                  {formatPrice(product.price, currency)}
                </p>
                <div className="flex gap-2">
                  <button
                    className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-fixed"
                    onClick={() => addToCart(product)}
                    type="button"
                  >
                    Add to cart
                  </button>
                  <button
                    aria-label={`Remove ${product.name} from wishlist`}
                    className="rounded-lg border border-outline-variant/40 px-3 py-2 text-on-surface-variant transition-colors hover:border-error hover:text-error"
                    onClick={() => removeFromWishlist(product.id)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
