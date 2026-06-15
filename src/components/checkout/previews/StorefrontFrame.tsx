import React from "react";
import { ProductThumb } from "./shared";

// Dark "Espeecart" storefront chrome used by the embedded-form and elements
// previews, with an order summary rail on the right.
export default function StorefrontFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-[#1f2330] shadow-sm dark:border-gray-800">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 bg-[#171a24] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 text-[11px] text-white/40">espeecart.com</span>
      </div>

      {/* Site header */}
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-3 text-white">
        <svg width="16" height="14" viewBox="0 0 18 14" fill="none">
          <path d="M1 1h16M1 7h16M1 13h16" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <span className="text-base font-medium tracking-wide">Espeecart</span>
        <div className="flex gap-3 text-white/60">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
            <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
            <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-[1.4fr_1fr]">
        <div>{children}</div>
        <OrderSummary />
      </div>
    </div>
  );
}

function OrderSummary() {
  return (
    <div className="text-white">
      <p className="mb-4 text-sm font-medium">Order summary</p>
      <div className="mb-4 flex items-center gap-3">
        <ProductThumb className="h-12 w-12" />
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
