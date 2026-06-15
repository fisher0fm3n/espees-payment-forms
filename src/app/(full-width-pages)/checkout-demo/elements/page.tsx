import type { Metadata } from "next";
import DemoElements from "@/components/checkout/demos/DemoElements";

export const metadata: Metadata = {
  title: "Elements demo | Checkout",
  description: "Customer-facing demo of a custom Elements checkout.",
};

export default function ElementsDemo() {
  return <DemoElements />;
}
