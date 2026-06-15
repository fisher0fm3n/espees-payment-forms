import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import InvoiceListTable from "@/components/invoice/InvoiceList";
import InvoiceMetrics from "@/components/invoice/InvoiceMetrics";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce  Invoices | Espees Max - Next.js Dashboard Template",
  description:
    "This is Next.js E-commerce  Invoices Espees Max Dashboard Template",
};

export default function InvoicesPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Invoices" />
      <InvoiceMetrics />
      <InvoiceListTable />
    </div>
  );
}
