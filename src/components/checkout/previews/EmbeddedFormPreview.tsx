import StorefrontFrame from "./StorefrontFrame";
import {
  Field,
  CountryField,
  PaymentMethods,
} from "./shared";

export default function EmbeddedFormPreview() {
  return (
    <StorefrontFrame>
      <div className="space-y-4 rounded-lg border border-white/10 bg-[#262a38] p-4 text-white">
        <div>
          <p className="mb-2 text-sm font-medium">Contact</p>
          <Field placeholder="Email" dark />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Shipping</p>
          <Field placeholder="Full name" dark />
          <div>
            <p className="mb-1 text-[11px] text-white/40">Country or region</p>
            <CountryField dark />
          </div>
          <Field placeholder="Address" dark />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Payment</p>
          <PaymentMethods dark />
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-3 text-sm">
          <span className="flex items-center gap-1 text-white/70">
            Total due
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
              <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-medium">Espees 77.35</span>
        </div>

        <button className="h-10 w-full rounded-md bg-[#aebfe0] text-sm font-semibold text-[#1f2330]">
          Pay
        </button>
      </div>
    </StorefrontFrame>
  );
}
