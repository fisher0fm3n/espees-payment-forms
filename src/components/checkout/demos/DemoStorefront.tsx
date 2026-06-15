import React from "react";
import { ProductThumb } from "../previews/shared";

// Full-screen "Espeecart" storefront chrome for the embedded-form and elements
// demos, with an order summary rail on the right.
export default function DemoStorefront({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#1f2330] text-white">
      {/* Site header */}
      <header className="flex items-center justify-between border-b border-white/5 px-6 py-4 md:px-10">
        <svg width="20" height="16" viewBox="0 0 18 14" fill="none">
          <path d="M1 1h16M1 7h16M1 13h16" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <span className="text-lg font-medium tracking-wide">Espeecart</span>
        <div className="flex gap-4 text-white/60">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
            <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
            <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-[1.4fr_1fr] md:px-10">
        <div>{children}</div>
        <OrderSummary />
      </div>
    </div>
  );
}

function OrderSummary() {
  return (
    <div className="md:pt-1">
      <p className="mb-4 text-sm font-medium">Order summary</p>
      <div className="mb-4 flex items-center gap-3">
        <ProductThumb className="h-14 w-14" />
        <div className="flex flex-1 items-center justify-between text-sm">
          <span className="text-white/80">Pure kit</span>
          <span className="text-white/50">Espees 65.00</span>
        </div>
      </div>
      <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
        <Row label="Sub total" value="Espees 65.00" muted />
        <Row label="Shipping" value="Espees 12.35" muted />
        <Row label="Total" value="Espees 77.35" />
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={muted ? "text-white/50" : "font-medium text-white/90"}>
        {label}
      </span>
      <span className={muted ? "text-white/50" : "font-medium text-white/90"}>
        {value}
      </span>
    </div>
  );
}
