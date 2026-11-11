import type { Metadata } from "next";
import WishlistContent from "@/components/wishlist/WishlistContent";

export const metadata: Metadata = {
  title: "Wishlist — JEESTORE",
  description: "View and manage your saved products.",
};

export default function Page() {
  return <WishlistContent />;
}
