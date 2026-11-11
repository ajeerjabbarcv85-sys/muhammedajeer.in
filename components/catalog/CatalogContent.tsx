"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart, type NewCartItem } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import { useWishlist, toggleWishlist } from "@/lib/wishlist";
import {
  catalogProducts,
  categoryLabels,
  formatPrice,
  whatsappInquiry,
  type Category,
  type MetalId,
  type Product,
} from "@/lib/products";

type CatFilter = Category | "all";
type SortMode = "curator" | "price-desc" | "price-asc" | "newest" | "limited";

const MODAL_DEFAULT_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBL1we4smjEp49j7O1wyTayRU4nEGsovvxobWzAApoGA0Wd7XlPK0ygCdxI0yhtWd3rdZqWHLYsdF7Qo7L_aelyFJ6avqyCnaSlAeHC2vLMs2SauHMtYYolVcsMKKNVqd3bpB6whEUQQyUEo-xHRBd-JZmJe2rMOXy7OokN-0fJ4n66ZGnM-iNMjQ7692DgfN_BCfZJ4ZDjwcmJcD3ILuU-Ys2J27G0SJE8svsdYBQ";

const METAL_FILTERS: { id: MetalId; label: string }[] = [
  { id: "yellow-gold", label: "18K Yellow Gold" },
  { id: "rose-gold", label: "Rose Gold 18K" },
  { id: "platinum", label: "950 Platinum" },
  { id: "titanium", label: "Brushed Titanium" },
  { id: "obsidian-ceramic", label: "Obsidian Ceramic" },
];

const DEPARTMENT_FILTERS: { label: string; category: Category }[] = [
  { label: "Watches (Haute Horlogerie)", category: "watches" },
  { label: "Artisanal Footwear (Shoes)", category: "shoes" },
  { label: "Haute Couture (Dresses)", category: "dresses" },
  { label: "Prestige Beauty (Elixirs)", category: "beauty" },
  { label: "Luxury Mobiles (Phones)", category: "mobiles" },
];

const MOVEMENT_OPTIONS = [
  { id: "all", label: "All Calibres" },
  { id: "automatic", label: "Automatic Self-Winding" },
  { id: "tourbillon", label: "Manual Tourbillon" },
  { id: "quartz", label: "High-Precision Quartz" },
] as const;

type MovementId = (typeof MOVEMENT_OPTIONS)[number]["id"];

const CASE_SIZES = ["38mm", "40mm", "42mm", "44mm"];

const PER_PAGE = 6;

const normalizeSearchText = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

export default function CatalogContent() {
  const { addItem } = useCart();
  const { currency } = useCurrency();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CatFilter>("all");
  const [departments, setDepartments] = useState<Category[]>(
    DEPARTMENT_FILTERS.map((d) => d.category)
  );
  const [maxPrice, setMaxPrice] = useState(25000);
  const [sort, setSort] = useState<SortMode>("curator");
  const [caseSize, setCaseSize] = useState<string | null>(null);
  const [movement, setMovement] = useState<MovementId>("all");
  const [metals, setMetals] = useState<MetalId[]>(
    METAL_FILTERS.map((m) => m.id)
  );
  const [statuses, setStatuses] = useState<Product["status"][]>([
    "vault",
    "bespoke",
  ]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const { ids: wishlisted } = useWishlist();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [page, setPage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(true);

  const toggleMetal = (id: MetalId) => {
    setMetals((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
    setPage(0);
    setShowAll(false);
  };

  const toggleStatus = (status: Product["status"]) => {
    setStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
    setPage(0);
    setShowAll(false);
  };

  const facetBase = useMemo(
    () =>
      catalogProducts.filter((p) => {
        const searchableText = normalizeSearchText(
          [
            p.name,
            p.dept,
            p.badge,
            p.description,
            categoryLabels[p.category],
            ...(p.metals ?? []),
            ...p.dots.map((dot) => dot.title),
          ].join(" ")
        );
        const searchTerms = normalizeSearchText(search).split(/\s+/).filter(Boolean);
        const matchesSearch = searchTerms.every((term) =>
          searchableText.includes(term)
        );
        const matchesCategory = category === "all" || p.category === category;
        const matchesDepartment = departments.includes(p.category);
        const matchesPrice = p.price <= maxPrice;
        const matchesStatus = statuses.includes(p.status);
        const matchesMovement = movement === "all" || p.movement === movement;
        const matchesCase =
          caseSize === null ||
          (p.caseMm !== undefined && p.caseMm === Number(caseSize.replace("mm", "")));
        return (
          matchesSearch &&
          matchesCategory &&
          matchesDepartment &&
          matchesPrice &&
          matchesStatus &&
          matchesMovement &&
          matchesCase
        );
      }),
    [search, category, departments, maxPrice, statuses, movement, caseSize]
  );

  const visible = useMemo(() => {
    let items = facetBase.filter((p) =>
      metals.some((m) => p.metals?.includes(m))
    );

    if (sort === "price-desc") items = [...items].sort((a, b) => b.price - a.price);
    if (sort === "price-asc") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "newest") items = items.reverse();
    if (sort === "limited")
      items = items.filter((p) => p.badge.toLowerCase().includes("limited"));

    return items;
  }, [facetBase, metals, sort]);

  const deptCount = (category: Category) =>
    catalogProducts.filter((p) => p.category === category).length;

  const statusCount = (status: Product["status"]) =>
    catalogProducts.filter((p) => p.status === status).length;

  const handleAddToBag = (product: Product) => {
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
    setAddedId(product.id);
    window.setTimeout(() => setAddedId(null), 1500);
  };

  const priceLabel =
    maxPrice >= 25000
      ? `${formatPrice(1500, currency)} – ${formatPrice(25000, currency)}+`
      : `${formatPrice(1500, currency)} – ${formatPrice(maxPrice, currency)}`;

  const totalPages = Math.max(1, Math.ceil(visible.length / PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const paged = showAll
    ? visible
    : visible.slice(safePage * PER_PAGE, (safePage + 1) * PER_PAGE);

  const goToPage = (idx: number) => {
    setPage(Math.max(0, Math.min(totalPages - 1, idx)));
    setShowAll(false);
    document
      .getElementById("vault-grid")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setDepartments(DEPARTMENT_FILTERS.map((d) => d.category));
    setMaxPrice(25000);
    setSort("curator");
    setCaseSize(null);
    setMovement("all");
    setMetals(METAL_FILTERS.map((m) => m.id));
    setStatuses(["vault", "bespoke"]);
    setPage(0);
    setShowAll(false);
  };

  return (
    <div className="flex flex-col w-full">
      {/* ── Ambient Glow + Editorial Header ─────────────────────────── */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-80 right-10 w-80 h-80 bg-tertiary-container/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-margin pt-space-md pb-space-lg">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-space-xs">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-label-badge text-label-badge uppercase tracking-[0.25em] text-primary">
                  Private Collection • Geneva &amp; Zurich Vaults
                </span>
              </div>
              <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface tracking-tight">
                Curated Vault &amp; Luxury Catalog
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl font-light mt-space-xs">
                An exclusive multi-category vault spanning Haute Horlogerie,
                Artisanal Footwear, Haute Couture Dresses, and Prestige Beauty
                Elixirs reserved for discerning patrons.
              </p>
            </div>

            <div className="flex items-center gap-space-md self-start lg:self-auto bg-surface-container-low px-space-md py-space-sm rounded-xl shadow-md">
              <div className="flex flex-col">
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase">
                  Certified Masterpieces
                </span>
                <span className="font-price-display text-price-display text-primary">
                  {catalogProducts.length} Items
                </span>
              </div>
              <div className="w-px h-8 bg-surface-container-highest" />
              <div className="flex flex-col">
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase">
                  Global Dispatch
                </span>
                <span className="font-body-md text-body-md text-tertiary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">
                    lock
                  </span>
                  Insured Air
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Search & Quick Filter Bar ─────────────────────────────── */}
        <div className="mt-space-lg bg-surface-container rounded-xl p-space-sm shadow-xl flex flex-col gap-space-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-space-sm">
            <div className="relative w-full md:w-96 group">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[19px] text-primary transition-transform group-focus-within:scale-110">
                search
              </span>
              <input
                className="w-full bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/50 font-body-sm text-body-sm pl-10 pr-9 py-2.5 rounded-lg outline-none focus:ring-1 focus:ring-primary shadow-inner transition-all"
                id="vault-search-input"
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                  setShowAll(false);
                }}
                aria-label="Search products by name, brand, model, category, or details"
                placeholder="Search products, brands, models, colors..."
                type="text"
                value={search}
              />
              {search.length > 0 && (
                <button
                  aria-label="Clear Search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                  id="search-clear-btn"
                  onClick={() => setSearch("")}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    close
                  </span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1">
              {(Object.keys(categoryLabels) as CatFilter[]).map((cat) => (
                <button
                  key={cat}
                  className={`px-3.5 py-1.5 rounded-full font-label-nav text-label-nav uppercase tracking-wider transition-all whitespace-nowrap ${
                    category === cat
                      ? "bg-primary text-on-primary font-semibold shadow-sm"
                      : "bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-bright"
                  }`}
                  onClick={() => {
                    setCategory(cat);
                    setPage(0);
                    setShowAll(false);
                  }}
                  type="button"
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="font-label-badge text-label-badge uppercase text-on-surface-variant whitespace-nowrap">
                Sort:
              </span>
              <div className="relative w-full md:w-48">
                <select
                  className="w-full appearance-none bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-3.5 py-2 rounded-lg outline-none cursor-pointer focus:ring-1 focus:ring-primary shadow-inner"
                  id="sort-selector"
                  onChange={(e) => {
                    setSort(e.target.value as SortMode);
                    setPage(0);
                  }}
                  value={sort}
                >
                  <option value="curator">Curator&apos;s Choice</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="limited">Limited Editions Only</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[18px]">
                  expand_more
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Catalog Layout ────────────────────────────────────── */}
      <div className="max-w-[1600px] mx-auto px-margin pb-space-xl w-full">
        <div
          className={
            filtersExpanded
              ? "grid grid-cols-1 lg:grid-cols-12 gap-space-lg"
              : "block"
          }
        >
          {/* Sidebar Filters */}
          <aside
            className={`lg:col-span-3 flex flex-col gap-space-md ${
              filtersExpanded ? "" : "hidden"
            }`}
          >
            <div className="bg-surface-container-low rounded-xl p-space-md shadow-md sticky top-32">
              <div className="flex items-center justify-between pb-space-sm">
                <button
                  aria-controls="vault-filter-options"
                  aria-expanded={filtersExpanded}
                  className="flex items-center gap-2 text-left"
                  onClick={() => setFiltersExpanded((expanded) => !expanded)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    tune
                  </span>
                  <span className="font-headline-sm text-[17px] text-on-surface font-medium uppercase tracking-wider">
                    Refine Vault
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                    {filtersExpanded ? "expand_less" : "expand_more"}
                  </span>
                </button>
                <button
                  className="font-label-badge text-label-badge text-primary hover:text-primary-fixed uppercase tracking-wider transition-colors"
                  id="reset-filters-btn"
                  onClick={resetFilters}
                  type="button"
                >
                  Reset
                </button>
              </div>

              {filtersExpanded && <div id="vault-filter-options">
              {/* Price Range */}
              <div className="py-space-sm flex flex-col gap-2">
                <div className="flex items-center justify-between font-label-badge text-label-badge uppercase">
                  <span className="text-on-surface-variant">Price Range</span>
                  <span className="text-primary font-semibold">
                    {priceLabel}
                  </span>
                </div>
                <input
                  className="w-full accent-primary bg-surface-container-highest h-1.5 rounded-lg appearance-none cursor-pointer"
                  id="price-slider"
                  max={25000}
                  min={1500}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setPage(0);
                    setShowAll(false);
                  }}
                  step={500}
                  type="range"
                  value={maxPrice}
                />
                <div className="flex justify-between font-label-badge text-[10px] text-on-surface-variant/60">
                  <span>{formatPrice(1500, currency)}</span>
                  <span>{formatPrice(12000, currency)}</span>
                  <span>{formatPrice(25000, currency)}+</span>
                </div>
              </div>

              <div className="w-full h-px bg-surface-container-highest my-2" />

              {/* Metal & Finish */}
              <div className="py-space-sm flex flex-col gap-2.5">
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
                  Metal &amp; Finish
                </span>
                {METAL_FILTERS.map((metal) => {
                  const count = facetBase.filter((p) =>
                    p.metals?.includes(metal.id)
                  ).length;
                  const active = metals.includes(metal.id);
                  return (
                    <label
                      className={`flex items-center gap-2.5 cursor-pointer group transition-opacity ${
                        active ? "" : "opacity-45"
                      }`}
                      key={metal.id}
                    >
                      <input
                        checked={active}
                        className="accent-primary rounded w-4 h-4 bg-surface-container-highest cursor-pointer"
                        onChange={() => toggleMetal(metal.id)}
                        type="checkbox"
                      />
                      <span
                        className={`font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors ${
                          count === 0
                            ? "line-through decoration-on-surface-variant/40"
                            : ""
                        }`}
                      >
                        {metal.label}
                      </span>
                      <span className="ml-auto font-label-badge text-[10px] text-on-surface-variant/60">
                        {count}
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="w-full h-px bg-surface-container-highest my-2" />

              {/* Luxury Department */}
              <div className="py-space-sm flex flex-col gap-2.5">
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
                  Luxury Department
                </span>
                {DEPARTMENT_FILTERS.map((dept) => (
                  <label
                    className="flex items-center gap-2.5 cursor-pointer group"
                    key={dept.category}
                  >
                    <input
                      checked={departments.includes(dept.category)}
                      className="accent-primary rounded w-4 h-4 bg-surface-container-highest cursor-pointer"
                        onChange={(e) => {
                          setDepartments((prev) =>
                            e.target.checked
                              ? [...prev, dept.category]
                              : prev.filter((c) => c !== dept.category)
                          );
                          setPage(0);
                          setShowAll(false);
                        }}
                      type="checkbox"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">
                      {dept.label}
                    </span>
                    <span className="ml-auto font-label-badge text-[10px] text-on-surface-variant/60">
                      {deptCount(dept.category)}
                    </span>
                  </label>
                ))}
              </div>

              <div className="w-full h-px bg-surface-container-highest my-2" />

              {/* Movement Calibre */}
              <div className="py-space-sm flex flex-col gap-2.5">
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
                  Movement Calibre
                </span>
                {MOVEMENT_OPTIONS.map((m) => (
                  <label
                    className="flex items-center gap-2.5 cursor-pointer group"
                    key={m.id}
                  >
                    <input
                      checked={movement === m.id}
                      className="accent-primary cursor-pointer"
                      name="movement-radio"
                      onChange={() => {
                        setMovement(m.id);
                        setPage(0);
                        setShowAll(false);
                      }}
                      type="radio"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">
                      {m.label}
                    </span>
                  </label>
                ))}
              </div>

              <div className="w-full h-px bg-surface-container-highest my-2" />

              {/* Case Diameter */}
              <div className="py-space-sm flex flex-col gap-2">
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
                  Case Diameter
                </span>
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {CASE_SIZES.map((size) => (
                    <button
                      className={`py-1.5 rounded font-label-badge text-[11px] text-center transition-colors ${
                        caseSize === size
                          ? "bg-primary text-on-primary font-bold shadow-sm"
                          : "bg-surface-container-high hover:bg-surface-bright text-on-surface font-semibold"
                      }`}
                      key={size}
                      onClick={() => {
                        setCaseSize((prev) => (prev === size ? null : size));
                        setPage(0);
                        setShowAll(false);
                      }}
                      type="button"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full h-px bg-surface-container-highest my-2" />

              {/* Vault Status */}
              <div className="py-space-sm flex flex-col gap-2.5">
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
                  Vault Status
                </span>
                {(["vault", "bespoke"] as const).map((status) => (
                  <label
                    className="flex items-center gap-2.5 cursor-pointer group"
                    key={status}
                  >
                    <input
                      checked={statuses.includes(status)}
                      className="accent-primary rounded w-4 h-4 bg-surface-container-highest cursor-pointer"
                      onChange={() => toggleStatus(status)}
                      type="checkbox"
                    />
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        status === "vault"
                          ? "bg-tertiary"
                          : "bg-primary-fixed-dim"
                      }`}
                    />
                    <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">
                      {status === "vault"
                        ? "Immediate Dispatch"
                        : "Bespoke Made-to-Order"}
                    </span>
                    <span className="ml-auto font-label-badge text-[10px] text-on-surface-variant/60">
                      {statusCount(status)}
                    </span>
                  </label>
                ))}
              </div>

              {/* Bespoke Notice */}
              <div className="mt-space-sm p-space-sm rounded-lg bg-surface-container-highest flex items-start gap-2.5">
                <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">
                  workspace_premium
                </span>
                <div className="flex flex-col">
                  <span className="font-label-badge text-[11px] uppercase tracking-wider text-on-surface font-semibold">
                    Bespoke Customizer
                  </span>
                  <span className="font-body-sm text-[12px] text-on-surface-variant">
                    Looking for a custom sapphire dial or engraved monograms?
                    Talk to Master Horologist.
                  </span>
                </div>
              </div>
              </div>}
            </div>
          </aside>

          {/* Product Grid */}
          <div
            className={`flex flex-col gap-space-lg ${
              filtersExpanded ? "lg:col-span-9" : "w-full"
            }`}
          >
            <div className="flex items-center justify-between pb-space-xs">
              {!filtersExpanded && (
                <button
                  aria-expanded={false}
                  className="inline-flex items-center gap-2 rounded-lg bg-surface-container px-3 py-2 font-label-badge text-label-badge uppercase tracking-wider text-primary hover:bg-surface-container-high transition-colors"
                  onClick={() => setFiltersExpanded(true)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    tune
                  </span>
                  Refine Vault
                </button>
              )}
              <span className="font-label-badge text-label-badge uppercase tracking-widest text-on-surface-variant">
                Displaying{" "}
                <strong className="text-primary font-semibold">
                  {paged.length} of {visible.length}
                </strong>{" "}
                Vault Masterpieces
              </span>
              <div className="flex items-center gap-2">
                <button
                  aria-label="Grid View"
                  className={`p-1.5 rounded transition-colors ${
                    view === "grid"
                      ? "bg-surface-container-high text-primary"
                      : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                  }`}
                  onClick={() => setView("grid")}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    grid_view
                  </span>
                </button>
                <button
                  aria-label="List View"
                  className={`p-1.5 rounded transition-colors ${
                    view === "list"
                      ? "bg-surface-container-high text-primary"
                      : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                  }`}
                  onClick={() => setView("list")}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    view_agenda
                  </span>
                </button>
              </div>
            </div>

            <div
              className={`grid grid-cols-1 ${
                view === "grid" ? "md:grid-cols-2 xl:grid-cols-2" : ""
              } gap-space-md`}
              id="vault-grid"
            >
              {visible.length === 0 ? (
                <div className="col-span-full py-space-lg px-space-md flex flex-col items-center justify-center gap-3 bg-surface-container-low rounded-xl border border-outline-variant/20 shadow-md">
                  <span className="material-symbols-outlined text-primary text-[42px]">
                    diamond
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface text-center">
                    No Masterpieces Match This Refinement
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant max-w-md text-center">
                    Your current vault criteria are too exclusive. Adjust or
                    reset the filters to reveal more treasures.
                  </span>
                  <button
                    className="mt-2 px-6 py-2.5 rounded bg-primary hover:bg-primary-fixed text-on-primary font-label-badge text-label-badge uppercase tracking-wider font-bold transition-all shadow-md"
                    onClick={resetFilters}
                    type="button"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                paged.map((product) => (
                <article
                  className="group bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col relative"
                  key={product.id}
                >
                  <div className="relative w-full aspect-[4/3] bg-surface-container-lowest overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={product.alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      src={product.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="px-2.5 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-badge text-label-badge uppercase tracking-widest shadow-sm">
                        {product.badge}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md font-label-badge text-[10px] uppercase flex items-center gap-1 ${
                          product.status === "vault"
                            ? "text-tertiary"
                            : "text-primary-fixed-dim"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            product.status === "vault"
                              ? "bg-tertiary animate-ping"
                              : "bg-primary-fixed-dim"
                          }`}
                        />
                        {product.status === "vault" ? "In Vault" : "Bespoke Order"}
                      </span>
                    </div>
                    <button
                      aria-label={`${wishlisted.includes(product.id) ? "Remove from" : "Add to"} wishlist: ${product.name}`}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md hover:scale-110 flex items-center justify-center transition-all shadow-md ${
                        wishlisted.includes(product.id)
                          ? "text-error"
                          : "text-on-surface-variant hover:text-error"
                      }`}
                      onClick={() => toggleWishlist(product.id)}
                      type="button"
                    >
                      <span
                        className="material-symbols-outlined text-[19px]"
                        style={{
                          fontVariationSettings: wishlisted.includes(product.id)
                            ? "'FILL' 1"
                            : "'FILL' 0",
                        }}
                      >
                        favorite
                      </span>
                    </button>
                  </div>

                  <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-badge text-label-badge uppercase tracking-wider text-secondary-fixed">
                          {product.dept}
                        </span>
                        <div className="flex items-center gap-1">
                          <span
                            className="material-symbols-outlined text-primary text-[14px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          <span className="font-label-badge text-[11px] text-on-surface font-semibold">
                            5.0
                          </span>
                        </div>
                      </div>
                      {product.href ? (
                        <Link
                          className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors block"
                          href={product.href}
                        >
                          {product.name}
                        </Link>
                      ) : (
                        <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      )}
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1.5">
                        {product.dots.map((dot) => (
                          <span
                            className="w-3.5 h-3.5 rounded-full shadow-sm"
                            key={dot.title}
                            style={{ backgroundColor: dot.bg }}
                            title={dot.title}
                          />
                        ))}
                      </div>
                      <div className="text-right">
                        <span className="font-price-display text-price-display text-primary font-semibold">
                          {formatPrice(product.price, currency)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        className="quick-view-btn py-2.5 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-badge text-label-badge uppercase tracking-wider font-semibold transition-all"
                        onClick={() => setQuickView(product)}
                        type="button"
                      >
                        Quick View
                      </button>
                      <button
                        className={`add-cart-btn py-2.5 rounded font-label-badge text-label-badge uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5 ${
                          addedId === product.id
                            ? "bg-tertiary text-on-tertiary"
                            : "bg-primary hover:bg-primary-fixed text-on-primary shadow-md hover:shadow-primary/20"
                        }`}
                        onClick={() => handleAddToBag(product)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {addedId === product.id ? "check" : "shopping_bag"}
                        </span>
                        {addedId === product.id ? "Added" : "Add to Bag"}
                      </button>
                    </div>

                    <a
                      className="w-full py-2 rounded bg-surface-container hover:bg-on-tertiary-fixed-variant text-tertiary hover:text-white font-label-badge text-label-badge uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                      href={whatsappInquiry(
                        `Inquiry regarding ${product.name} (${formatPrice(product.price, currency)})`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        chat
                      </span>{" "}
                      Inquire &amp; Secure via Concierge
                    </a>
                  </div>
                </article>
                ))
              )}
            </div>

            {/* Pagination */}
            {visible.length > 0 && (
            <div className="mt-space-md p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-space-sm shadow-md">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-label-badge text-label-badge uppercase tracking-widest text-on-surface-variant">
                  Displaying{" "}
                  <span className="text-on-surface font-bold">
                    {visible.length === 0
                      ? "0 of 0"
                      : showAll
                        ? `${visible.length} of ${visible.length}`
                        : `${safePage * PER_PAGE + 1}–${safePage * PER_PAGE + paged.length} of ${visible.length}`}
                  </span>{" "}
                  Masterpieces
                </span>
              </div>
              {!showAll && totalPages > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Previous page"
                    className={`p-2 rounded transition-colors ${
                      safePage === 0
                        ? "bg-surface-container text-on-surface-variant/40 cursor-not-allowed"
                        : "bg-surface-container hover:bg-surface-container-high text-on-surface cursor-pointer"
                    }`}
                    disabled={safePage === 0}
                    onClick={() => goToPage(safePage - 1)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      chevron_left
                    </span>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      className={`w-9 h-9 rounded font-label-badge text-label-badge transition-colors ${
                        i === safePage
                          ? "bg-primary text-on-primary font-bold shadow-sm cursor-default"
                          : "bg-surface-container hover:bg-surface-container-high text-on-surface cursor-pointer"
                      }`}
                      key={i}
                      onClick={() => goToPage(i)}
                      type="button"
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    aria-label="Next page"
                    className={`p-2 rounded transition-colors ${
                      safePage >= totalPages - 1
                        ? "bg-surface-container text-on-surface-variant/40 cursor-not-allowed"
                        : "bg-surface-container hover:bg-surface-container-high text-on-surface cursor-pointer"
                    }`}
                    disabled={safePage >= totalPages - 1}
                    onClick={() => goToPage(safePage + 1)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      chevron_right
                    </span>
                  </button>
                </div>
              )}
              {visible.length > paged.length || showAll ? (
                <button
                  className="px-5 py-2.5 rounded bg-surface-container-high hover:bg-surface-bright text-primary font-label-badge text-label-badge uppercase tracking-widest font-semibold transition-all shadow-sm"
                  id="load-all-vault-btn"
                  onClick={() => {
                    setShowAll((prev) => !prev);
                    document
                      .getElementById("vault-grid")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  type="button"
                >
                  {showAll
                    ? "Return to Paginated View"
                    : `Load All Vault Holdings (${visible.length - paged.length} More)`}
                </button>
              ) : (
                <span className="px-5 py-2.5 font-label-badge text-[11px] uppercase tracking-widest text-on-surface-variant/60">
                  All {visible.length} Holdings Displayed
                </span>
              )}
            </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Quick View Modal ────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl flex items-center justify-center p-4 transition-opacity duration-300 ${
          quickView ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        id="quick-view-modal"
        onClick={(e) => {
          if (e.target === e.currentTarget) setQuickView(null);
        }}
      >
        <div className="bg-surface-container rounded-2xl max-w-3xl w-full p-space-md shadow-2xl relative flex flex-col md:flex-row gap-space-md">
          <button
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container-high text-on-surface hover:text-primary flex items-center justify-center transition-colors"
            id="close-modal-btn"
            onClick={() => setQuickView(null)}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              close
            </span>
          </button>

          <div className="w-full md:w-1/2 aspect-square rounded-xl bg-surface-container-lowest overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={quickView?.alt ?? "Vault masterpiece"}
              className="w-full h-full object-cover"
              id="modal-img"
              src={quickView?.image ?? MODAL_DEFAULT_IMG}
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-between py-1">
            <div>
              <span className="font-label-badge text-label-badge text-primary uppercase tracking-widest">
                {quickView?.status === "bespoke"
                  ? "Bespoke Atelier Commission"
                  : "Swiss Chronometer Certified"}
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface mt-1">
                {quickView?.name ?? "Masterpiece Reference"}
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 font-light">
                {quickView?.description ??
                  "Each timepiece is rigorously tested across 5 physical positions and 3 temperatures over 15 consecutive days."}
              </p>
              <div className="mt-4 p-3 rounded-lg bg-surface-container-low flex flex-col gap-1.5">
                <div className="flex justify-between font-label-badge text-[11px] uppercase">
                  <span className="text-on-surface-variant">
                    Calibre Provenance
                  </span>
                  <span className="text-on-surface font-semibold">
                    Le Locle, Switzerland
                  </span>
                </div>
                <div className="flex justify-between font-label-badge text-[11px] uppercase">
                  <span className="text-on-surface-variant">Power Reserve</span>
                  <span className="text-on-surface font-semibold">
                    72 Hours Double-Barrel
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-label-badge text-label-badge uppercase text-on-surface-variant">
                  Vault Valuation
                </span>
                <span className="font-price-display text-price-display text-primary font-bold">
                  {quickView
                    ? formatPrice(quickView.price, currency)
                    : formatPrice(18500, currency)}
                </span>
              </div>
              <Link
                className="w-full py-3 rounded bg-primary hover:bg-primary-fixed text-on-primary font-label-badge text-label-badge uppercase tracking-wider font-bold transition-all shadow-md text-center"
                href="/cart"
                id="modal-bag-btn"
                onClick={() => {
                  if (quickView) handleAddToBag(quickView);
                  setQuickView(null);
                }}
              >
                Confirm &amp; Place in Private Bag
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
