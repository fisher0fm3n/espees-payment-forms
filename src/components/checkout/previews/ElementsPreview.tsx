import StorefrontFrame from "./StorefrontFrame";
import {
  Field,
  CountryField,
  PaymentMethods,
} from "./shared";

function StepHeader({
  step,
  label,
  done = false,
}: {
  step: number;
  label: string;
  done?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 py-3">
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold ${
          done ? "bg-brand-500 text-white" : "bg-white/10 text-white/60"
        }`}
      >
        {step}
      </span>
      <span className="text-sm font-medium text-white/90">{label}</span>
      {done && (
        <button className="ml-auto text-xs text-white/40">Edit</button>
      )}
    </div>
  );
}

export default function ElementsPreview() {
  return (
    <StorefrontFrame>
      <div className="space-y-4 text-white">
        <div className="divide-y divide-white/10 rounded-lg border border-white/10 bg-[#262a38] px-4">
          {/* Step 1 - collapsed */}
          <StepHeader step={1} label="Information" done />

          {/* Step 2 - expanded shipping */}
          <div className="pb-4">
            <StepHeader step={2} label="Shipping" />
            <div className="space-y-2 rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <Field placeholder="Full name" dark />
              <div>
                <p className="mb-1 text-[11px] text-white/40">
                  Country or region
                </p>
                <CountryField dark />
              </div>
              <Field placeholder="Address" dark />
            </div>
          </div>

          {/* Step 3 - payment */}
          <div className="pb-4">
            <StepHeader step={3} label="Payment method" />
            <PaymentMethods dark />
          </div>
        </div>

        <button className="h-10 w-full rounded-md bg-[#aebfe0] text-sm font-semibold text-[#1f2330]">
          Pay
        </button>
      </div>
    </StorefrontFrame>
  );
}
