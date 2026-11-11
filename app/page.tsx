import type { Metadata } from "next";
import HomeContent from "@/components/home/HomeContent";

export const metadata: Metadata = {
  title: "JEESTORE — Haute Luxury Home",
  description:
    "Aureate timepieces and opulent artifacts: Swiss Haute Horlogerie, artisanal footwear, Parisian haute couture and rare prestige elixirs.",
};

export default function Page() {
  return <HomeContent />;
}
