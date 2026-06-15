import Link from "next/link";
import type { ReactNode } from "react";

type Col = {
  key: string;
  title: string;
  href: string;
  tag?: { label: string; tone: "recommended" | "preview" };
};

const columns: Col[] = [
  {
    key: "full-page",
    title: "Full page",
    href: "/checkout/full-page",
    tag: { label: "Recommended", tone: "recommended" },
  },
  {
    key: "embedded-form",
    title: "Embedded form",
    href: "/checkout/embedded-form",
    tag: { label: "Private preview", tone: "preview" },
  },
  { key: "elements", title: "Elements", href: "/checkout/elements" },
];

type Row = {
  label: string;
  cells: Record<string, ReactNode>;
};

function Dots({ filled }: { filled: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-2.5 w-2.5 rounded-full ${
            i < filled ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"
          }`}
        />
      ))}
    </div>
  );
}

const rows: Row[] = [
  {
    label: "API",
    cells: {
      "full-page": "Checkout Sessions",
      "embedded-form": "Checkout Sessions",
      elements: "Checkout Sessions",
    },
  },
  {
    label: "Feature list",
    cells: {
      "full-page":
        "Built-in UI support for Billing, Tax, Adaptive Pricing, Stripe Managed Payments, Onelink, dynamic payment methods, Surcharging, Split-tender",
      "embedded-form":
        "Built-in UI support for Billing, Tax, Adaptive Pricing, Stripe Managed Payments, Onelink, dynamic payment methods, Surcharging",
      elements:
        "Built-in UI support for Adaptive Pricing, Onelink, dynamic payment methods",
    },
  },
  {
    label: "Order summary",
    cells: {
      "full-page":
        "Includes full order summary with subtotals (including tax and shipping costs), cross-sells & upsells, free trials, discounts and promo codes",
      "embedded-form":
        "Limited order summary with subtotals (including tax and shipping costs), discounts and promo codes",
      elements: "No order summary",
    },
  },
  {
    label: "Ongoing maintenance required",
    cells: {
      "full-page": <Dots filled={1} />,
      "embedded-form": <Dots filled={2} />,
      elements: <Dots filled={3} />,
    },
  },
  {
    label: "Hosting",
    cells: {
      "full-page": "Hosted or Embedded",
      "embedded-form": "Embedded",
      elements: "Embedded",
    },
  },
  {
    label: "Complexity",
    cells: {
      "full-page": "Low",
      "embedded-form": "Some",
      elements: "Most",
    },
  },
  {
    label: "Customisation",
    cells: {
      "full-page": "15 configurable settings via brand settings",
      "embedded-form": "70 configurable settings via the Appearance API",
      elements: "Full CSS customisation via the Appearance API",
    },
  },
];

export default function CheckoutComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <table className="w-full min-w-[820px] border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-800">
            <th className="w-44 bg-gray-50 px-6 py-5 dark:bg-white/[0.02]" />
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-5 align-top">
                <Link
                  href={col.href}
                  className="text-sm font-semibold uppercase tracking-wide text-brand-500 hover:underline"
                >
                  {col.title}
                </Link>
                {col.tag && (
                  <span
                    className={`ml-2 inline-block rounded-md px-2 py-0.5 text-xs font-medium ${
                      col.tag.tone === "recommended"
                        ? "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
                        : "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                    }`}
                  >
                    {col.tag.label}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-b border-gray-100 align-top dark:border-gray-800"
            >
              <th className="bg-gray-50 px-6 py-5 text-sm font-medium text-gray-700 dark:bg-white/[0.02] dark:text-gray-300">
                {row.label}
              </th>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400"
                >
                  {row.cells[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
