import OtpForm from "@/components/auth/OtpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Next.js Two Step Verification Page | Espees Max - Next.js Dashboard Template",
  description: "This is Next.js SignUp Page Espees Max Dashboard Template",
  // other metadata
};

export default function OtpVerification() {
  return <OtpForm />;
}
