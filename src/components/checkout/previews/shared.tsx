// Lightweight, presentational building blocks shared across the three
// checkout previews. Everything here is static — this is a POC mock of the
// Espees-rendered surfaces, not a live integration.

export function Field({
  placeholder,
  dark = false,
}: {
  placeholder: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex h-10 items-center rounded-md border px-3 text-sm ${
        dark
          ? "border-white/10 bg-white/[0.04] text-white/40"
          : "border-gray-200 bg-white text-gray-400"
      }`}
    >
      {placeholder}
    </div>
  );
}

export function CountryField({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`flex h-10 items-center justify-between rounded-md border px-3 text-sm ${
        dark
          ? "border-white/10 bg-white/[0.04] text-white/80"
          : "border-gray-200 bg-white text-gray-700"
      }`}
    >
      <span>United States</span>
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
        <path
          d="M6 8l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function UsernameGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 20c0-3.5 3.13-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CardGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2 9h20" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function VoucherGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 7a1 1 0 011-1h16a1 1 0 011 1v3a2 2 0 000 4v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a2 2 0 000-4V7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 6v12" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" />
    </svg>
  );
}

const methods = [
  { id: "username", label: "Espees username", glyph: <UsernameGlyph /> },
  { id: "card", label: "Espees card", glyph: <CardGlyph /> },
  { id: "voucher", label: "Espees voucher", glyph: <VoucherGlyph /> },
];

export function PaymentMethods({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`divide-y overflow-hidden rounded-md border ${
        dark ? "divide-white/10 border-white/10" : "divide-gray-200 border-gray-200"
      }`}
    >
      {methods.map((m, i) => (
        <div key={m.id}>
          <div className="flex items-center gap-3 px-3 py-2.5">
            <span
              className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
                i === 0
                  ? "border-brand-500"
                  : dark
                  ? "border-white/30"
                  : "border-gray-300"
              }`}
            >
              {i === 0 && (
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              )}
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
          </div>
          {i === 0 && (
            <div className="space-y-2 px-3 pb-3">
              <Field placeholder="Espees username" dark={dark} />
              <Field placeholder="PIN" dark={dark} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function ProductThumb({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-[#aebfe0] ${className}`}
    >
      <div className="flex items-end gap-1">
        <div className="h-10 w-6 rounded-sm bg-[#2b2f3a]" />
        <div className="h-12 w-8 rounded-sm bg-[#d8c9b8]" />
      </div>
    </div>
  );
}
