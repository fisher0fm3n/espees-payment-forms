import type { Metadata } from "next";
import DemoFullPage from "@/components/checkout/demos/DemoFullPage";

export const metadata: Metadata = {
  title: "Full page demo | Checkout",
  description: "Customer-facing demo of the full-page Stripe checkout.",
};

export default function FullPageDemo() {
  return <DemoFullPage />;
}
