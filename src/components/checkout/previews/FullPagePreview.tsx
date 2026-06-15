import {
  Field,
  CountryField,
  PaymentMethods,
  ProductThumb,
} from "./shared";

export default function FullPagePreview() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-800 dark:bg-gray-900">
        <span className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
        <span className="ml-3 text-[11px] text-gray-400">
          checkout.espees.com
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left: Espees-hosted product panel */}
        <div className="bg-[#30313d] p-6 text-white">
          <div className="mb-6 flex items-center gap-2 text-sm text-white/70">
            <span>&larr;</span>
            <span className="font-medium">Espeecart</span>
          </div>
          <p className="text-sm text-white/60">Pure kit</p>
          <p className="mt-1 text-3xl font-semibold">Espees 65.00</p>
          <ProductThumb className="mt-6 aspect-square w-full max-w-[220px]" />
        </div>

        {/* Right: payment form */}
        <div className="space-y-4 bg-white p-6 text-gray-800">
          <div>
            <p className="mb-1.5 text-sm font-medium">Shipping information</p>
            <p className="mb-1 text-xs text-gray-500">Email</p>
            <Field placeholder="you@example.com" />
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-500">Shipping address</p>
            <Field placeholder="First and last name" />
            <CountryField />
            <Field placeholder="Street address" />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Payment method</p>
            <PaymentMethods />
          </div>

          <button className="h-10 w-full rounded-md bg-[#30313d] text-sm font-semibold text-white">
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
