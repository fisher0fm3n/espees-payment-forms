"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductThumb } from "../previews/shared";
import {
  DemoInput,
  DemoCountrySelect,
  PaymentMethods,
  MethodFields,
  type Method,
} from "./demoShared";

export default function DemoFullPage() {
  const router = useRouter();
  const [method, setMethod] = useState<Method>("username");

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Left: Espees-hosted product panel */}
      <div className="flex flex-col bg-[#30313d] px-6 py-10 text-white md:px-16 md:py-16">
        <div className="mb-10 flex items-center gap-2 text-sm text-white/70">
          <button onClick={() => router.back()} className="hover:text-white">
            &larr;
          </button>
          <span className="font-medium">Espeecart</span>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <p className="text-sm text-white/60">Pure kit</p>
          <p className="mt-1 text-4xl font-semibold">Espees 65.00</p>
          <ProductThumb className="mt-8 aspect-square w-full" />
        </div>
      </div>

      {/* Right: payment form */}
      <div className="flex justify-center bg-white px-6 py-10 md:px-16 md:py-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/success");
          }}
          className="w-full max-w-sm space-y-5 text-gray-800"
        >
          <div className="space-y-2">
            <p className="text-sm font-medium">Shipping information</p>
            <DemoInput label="Email" placeholder="you@example.com" type="email" />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Shipping address</p>
            <DemoInput placeholder="First and last name" />
            <DemoCountrySelect />
            <DemoInput placeholder="Street address" />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Payment method</p>
            <PaymentMethods value={method} onChange={setMethod} />
            <MethodFields method={method} />
          </div>

          <button
            type="submit"
            className="h-11 w-full rounded-md bg-[#30313d] text-sm font-semibold text-white transition hover:bg-black"
          >
            Pay Espees 65.00
          </button>
        </form>
      </div>
    </div>
  );
}
