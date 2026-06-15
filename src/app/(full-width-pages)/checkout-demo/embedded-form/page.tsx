import type { Metadata } from "next";
import DemoEmbeddedForm from "@/components/checkout/demos/DemoEmbeddedForm";

export const metadata: Metadata = {
  title: "Embedded form demo | Checkout",
  description: "Customer-facing demo of the embedded checkout form.",
};

export default function EmbeddedFormDemo() {
  return <DemoEmbeddedForm />;
}
