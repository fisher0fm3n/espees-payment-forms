import AiLayout from "@/components/ai/AiLayout";
import AiPageBreadcrumb from "@/components/ai/AiPageBreadcrumb";
import TextGeneratorContent from "@/components/ai/TextGeneratorContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Next.js AI Text Generator | Espees Max - Next.js Admin Dashboard Template",
  description:
    "This is AI Next.js Text Generator page for Espees Max - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function TextGeneratorPage() {
  return (
    <div>
      <AiPageBreadcrumb pageTitle="Text Generator" />
      <AiLayout>
        <TextGeneratorContent />
      </AiLayout>
    </div>
  );
}
