import type { Metadata } from "next";
import SovereignContent from "@/components/product/SovereignContent";

export const metadata: Metadata = {
  title: "Sovereign Royal Skeleton Tourbillon 18K — JEESTORE",
  description:
    "Manually wound skeleton tourbillon in 18K gold with hand-chamfered bridges, 72-hour power reserve and exhibition sapphire back. Limited edition of 15.",
};

export default function Page() {
  return <SovereignContent />;
}
