// Interactive form atoms for the customer-facing checkout demos. Presentational
// only — selection state is owned by the parent demo component. Still a static
// POC: the "Pay" buttons route to the existing /success page.

import type { ReactNode } from "react";

export type Method = "username" | "card" | "voucher";

export function DemoInput({
  label,
  placeholder,
  type = "text",
  dark = false,
}: {
  label?: string;
  placeholder: string;
  type?: string;
  dark?: boolean;
}) {
  return (
    <label className="block">
      {label && (
        <span
          className={`mb-1 block text-xs ${
            dark ? "text-white/50" : "text-gray-500"
          }`}
        >
          {label}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`h-10 w-full rounded-md border px-3 text-sm outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500 ${
          dark
            ? "border-white/10 bg-white/[0.04] text-white placeholder:text-white/30"
            : "border-gray-200 bg-white text-gray-800 placeholder:text-gray-400"
        }`}
      />
    </label>
  );
}

export function DemoCountrySelect({
  label,
  dark = false,
}: {
  label?: string;
  dark?: boolean;
}) {
  return (
    <label className="block">
      {label && (
        <span
          className={`mb-1 block text-xs ${
            dark ? "text-white/50" : "text-gray-500"
          }`}
        >
          {label}
        </span>
      )}
      <select
        defaultValue="US"
        className={`h-10 w-full rounded-md border px-3 text-sm outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500 ${
          dark
            ? "border-white/10 bg-white/[0.04] text-white"
            : "border-gray-200 bg-white text-gray-800"
        }`}
      >
        <option value="US">United States</option>
        <option value="GB">United Kingdom</option>
        <option value="CA">Canada</option>
        <option value="AU">Australia</option>
      </select>
    </label>
  );
}

function UsernameGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 20c0-3.5 3.13-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function CardGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2 9h20" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function VoucherGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 7a1 1 0 011-1h16a1 1 0 011 1v3a2 2 0 000 4v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a2 2 0 000-4V7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 6v12" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" />
    </svg>
  );
}

const methodList: { id: Method; label: string; glyph: ReactNode }[] = [
  { id: "username", label: "Espees username", glyph: <UsernameGlyph /> },
  { id: "card", label: "Espees card", glyph: <CardGlyph /> },
  { id: "voucher", label: "Espees voucher", glyph: <VoucherGlyph /> },
];

export function PaymentMethods({
  value,
  onChange,
  dark = false,
}: {
  value: Method;
  onChange: (m: Method) => void;
  dark?: boolean;
}) {
  return (
    <div
      className={`divide-y overflow-hidden rounded-md border ${
        dark ? "divide-white/10 border-white/10" : "divide-gray-200 border-gray-200"
      }`}
    >
      {methodList.map((m) => {
        const selected = value === m.id;
        return (
          <button
            type="button"
            key={m.id}
            onClick={() => onChange(m.id)}
            className={`flex w-full items-center gap-3 px-3 py-3 text-left transition ${
              selected
                ? dark
                  ? "bg-white/[0.04]"
                  : "bg-brand-50/60"
                : ""
            }`}
          >
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                selected
                  ? "border-brand-500"
                  : dark
                  ? "border-white/30"
                  : "border-gray-300"
              }`}
            >
              {selected && <span className="h-2 w-2 rounded-full bg-brand-500" />}
            </span>
            <span className={dark ? "text-white/70" : "text-gray-500"}>
              {m.glyph}
            </span>
            <span
              className={`text-sm font-medium ${
                dark ? "text-white/90" : "text-gray-800"
              }`}
            >
              {m.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function MethodFields({
  method,
  dark = false,
}: {
  method: Method;
  dark?: boolean;
}) {
  return (
    <div className="space-y-2 pt-1">
      {method === "username" && (
        <DemoInput placeholder="Espees username" dark={dark} />
      )}
      {method === "card" && (
        <DemoInput placeholder="Espees card number" dark={dark} />
      )}
      {method === "voucher" && (
        <DemoInput placeholder="Espees voucher code" dark={dark} />
      )}
      <DemoInput placeholder="PIN" type="password" dark={dark} />
    </div>
  );
}
