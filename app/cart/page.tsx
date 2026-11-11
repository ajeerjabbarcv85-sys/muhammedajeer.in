import type { Metadata } from "next";
import CartContent from "@/components/cart/CartContent";

export const metadata: Metadata = {
  title: "Private Acquisition Bag — JEESTORE",
  description:
    "Review your reserved vault masterpieces and complete confidential acquisition via the WhatsApp VIP concierge desk.",
};

export default function Page() {
  return <CartContent />;
}
