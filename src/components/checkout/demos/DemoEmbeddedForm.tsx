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

export default function DemoEmbeddedForm() {
  const router = useRouter();
  const [method, setMethod] = useState<Method>("username");

  return (
    <DemoStorefront>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/success");
        }}
        className="space-y-5 rounded-xl border border-white/10 bg-[#262a38] p-5"
      >
        <div className="space-y-2">
          <p className="text-sm font-medium">Contact</p>
          <DemoInput placeholder="Email" type="email" dark />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Shipping</p>
          <DemoInput placeholder="Full name" dark />
          <DemoCountrySelect label="Country or region" dark />
          <DemoInput placeholder="Address" dark />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Payment</p>
          <PaymentMethods value={method} onChange={setMethod} dark />
          <MethodFields method={method} dark />
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-3 text-sm">
          <span className="text-white/70">Total due</span>
          <span className="font-medium">Espees 77.35</span>
        </div>

        <button
          type="submit"
          className="h-11 w-full rounded-md bg-[#aebfe0] text-sm font-semibold text-[#1f2330] transition hover:bg-[#c3d0ea]"
        >
          Pay Espees 77.35
        </button>
      </form>
    </DemoStorefront>
  );
}
