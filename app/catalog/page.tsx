import type { Metadata } from "next";
import CatalogContent from "@/components/catalog/CatalogContent";

export const metadata: Metadata = {
  title: "Curated Vault & Luxury Catalog — JEESTORE",
  description:
    "An exclusive multi-category vault spanning Haute Horlogerie, artisanal footwear, haute couture dresses and prestige beauty elixirs.",
};

export default function Page() {
  return <CatalogContent />;
}
