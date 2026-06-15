import type { Metadata } from "next";
import Link from "next/link";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CheckoutComparisonTable from "@/components/checkout/CheckoutComparisonTable";
import FullPagePreview from "@/components/checkout/previews/FullPagePreview";
import EmbeddedFormPreview from "@/components/checkout/previews/EmbeddedFormPreview";
import ElementsPreview from "@/components/checkout/previews/ElementsPreview";

export const metadata: Metadata = {
  title: "Build a payments page | Checkout",
  description:
    "Create a payments page with prebuilt UIs using the Checkout Sessions API.",
};

const options = [
  {
    title: "Full page",
    href: "/checkout/full-page",
    demoHref: "/checkout-demo/full-page",
    tag: { label: "Recommended", tone: "recommended" as const },
    description:
      "Customers enter their payment details in a fully-featured payment page, either embedded on your site or via a redirect to a Stripe-hosted page.",
    preview: <FullPagePreview />,
  },
  {
    title: "Embedded form",
    href: "/checkout/embedded-form",
    demoHref: "/checkout-demo/embedded-form",
    tag: { label: "Private preview", tone: "preview" as const },
    description:
      "Customers enter their payment details in an embedded form on your site without redirection.",
    preview: <EmbeddedFormPreview />,
  },
  {
    title: "Elements",
    href: "/checkout/elements",
    demoHref: "/checkout-demo/elements",
    description:
      "Build a fully customized payment page using Elements composed from low-level UI components.",
    preview: <ElementsPreview />,
  },
];

export default function CheckoutOverview() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Build a payments page" />

      <div className="mb-8 max-w-3xl">
        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          Create a payments page with prebuilt UIs using the{" "}
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Checkout Sessions API
          </span>
          . Pick the integration type that best fits how much control and
          customisation you need, then follow the guide to go live.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {options.map((opt) => (
          <div
            key={opt.title}
            className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="mb-4 overflow-hidden">{opt.preview}</div>
            <div className="mb-1 flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                {opt.title}
              </h3>
              {opt.tag && (
                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                    opt.tag.tone === "recommended"
                      ? "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
                      : "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                  }`}
                >
                  {opt.tag.label}
                </span>
              )}
            </div>
            <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {opt.description}
            </p>
            <div className="flex gap-2">
              <Link
                href={opt.href}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-lg bg-brand-500 px-4 text-sm font-medium text-white transition hover:bg-brand-600"
              >
                Use this integration
              </Link>
              <Link
                href={opt.demoHref}
                target="_blank"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.03]"
              >
                Demo
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Compare integration types
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          All three are built on the same Checkout Sessions API.
        </p>
      </div>
      <CheckoutComparisonTable />
    </div>
  );
}
