"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DemoStorefront from "./DemoStorefront";
import {
  DemoInput,
  DemoCountrySelect,
  PaymentMethods,
  MethodFields,
  type Method,
} from "./demoShared";

const STEPS = ["Information", "Shipping", "Payment method"] as const;

export default function DemoElements() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState<Method>("username");

  return (
    <DemoStorefront>
      <div className="space-y-5">
        <div className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-[#262a38]">
          {STEPS.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div key={label} className="px-4">
                <div className="flex items-center gap-2 py-3">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold ${
                      done || active
                        ? "bg-brand-500 text-white"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-white/90">
                    {label}
                  </span>
                  {done && (
                    <button
                      onClick={() => setStep(i)}
                      className="ml-auto text-xs text-white/40 hover:text-white/70"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {active && (
                  <div className="space-y-3 pb-4">
                    {i === 0 && (
                      <DemoInput placeholder="Email" type="email" dark />
                    )}
                    {i === 1 && (
                      <div className="space-y-2 rounded-lg border border-white/10 bg-white/[0.03] p-3">
                        <DemoInput placeholder="Full name" dark />
                        <DemoCountrySelect label="Country or region" dark />
                        <DemoInput placeholder="Address" dark />
                      </div>
                    )}
                    {i === 2 && (
                      <>
                        <PaymentMethods
                          value={method}
                          onChange={setMethod}
                          dark
                        />
                        <MethodFields method={method} dark />
                      </>
                    )}

                    {i < STEPS.length - 1 ? (
                      <button
                        onClick={() => setStep(i + 1)}
                        className="h-10 w-full rounded-md bg-brand-500 text-sm font-semibold text-white transition hover:bg-brand-600"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        onClick={() => router.push("/success")}
                        className="h-11 w-full rounded-md bg-[#aebfe0] text-sm font-semibold text-[#1f2330] transition hover:bg-[#c3d0ea]"
                      >
                        Pay Espees 77.35
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </DemoStorefront>
  );
}
