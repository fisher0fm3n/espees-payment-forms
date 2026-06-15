import type { Metadata } from "next";
import CheckoutGuide, {
  type GuideStep,
} from "@/components/checkout/CheckoutGuide";
import ElementsPreview from "@/components/checkout/previews/ElementsPreview";

export const metadata: Metadata = {
  title: "Elements | Checkout",
  description:
    "Build a fully customized payment page using Stripe Elements and the Checkout Sessions API.",
};

const sessionSnippets: Record<string, string> = {
  "Node.js": `const stripe = require('stripe')('sk_test_...');

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'custom',
    line_items: [
      { price: '{{PRICE_ID}}', quantity: 1 },
    ],
    mode: 'payment',
    return_url: \`\${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}\`,
  });

  res.send({ clientSecret: session.client_secret });
});`,
  Ruby: `session = Stripe::Checkout::Session.create({
  ui_mode: 'custom',
  line_items: [{ price: '{{PRICE_ID}}', quantity: 1 }],
  mode: 'payment',
  return_url: "\#{YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}",
})
{ clientSecret: session.client_secret }.to_json`,
  Python: `session = stripe.checkout.Session.create(
    ui_mode='custom',
    line_items=[{'price': '{{PRICE_ID}}', 'quantity': 1}],
    mode='payment',
    return_url=YOUR_DOMAIN + '/return?session_id={CHECKOUT_SESSION_ID}',
)
return jsonify(clientSecret=session.client_secret)`,
  PHP: `$session = \\Stripe\\Checkout\\Session::create([
  'ui_mode' => 'custom',
  'line_items' => [['price' => '{{PRICE_ID}}', 'quantity' => 1]],
  'mode' => 'payment',
  'return_url' => $YOUR_DOMAIN . '/return?session_id={CHECKOUT_SESSION_ID}',
]);
echo json_encode(['clientSecret' => $session->client_secret]);`,
  Go: `params := &stripe.CheckoutSessionParams{
  UIMode: stripe.String("custom"),
  LineItems: []*stripe.CheckoutSessionLineItemParams{
    {Price: stripe.String("{{PRICE_ID}}"), Quantity: stripe.Int64(1)},
  },
  Mode:      stripe.String(string(stripe.CheckoutSessionModePayment)),
  ReturnURL: stripe.String(domain + "/return?session_id={CHECKOUT_SESSION_ID}"),
}
s, _ := session.New(params)
json.NewEncoder(w).Encode(map[string]string{"clientSecret": s.ClientSecret})`,
  ".NET": `var options = new SessionCreateOptions
{
    UiMode = "custom",
    LineItems = new() { new() { Price = "{{PRICE_ID}}", Quantity = 1 } },
    Mode = "payment",
    ReturnUrl = domain + "/return?session_id={CHECKOUT_SESSION_ID}",
};
var session = new SessionService().Create(options);
return Json(new { clientSecret = session.ClientSecret });`,
  Java: `SessionCreateParams params = SessionCreateParams.builder()
    .setUiMode(SessionCreateParams.UiMode.CUSTOM)
    .addLineItem(SessionCreateParams.LineItem.builder()
        .setPrice("{{PRICE_ID}}").setQuantity(1L).build())
    .setMode(SessionCreateParams.Mode.PAYMENT)
    .setReturnUrl(domain + "/return?session_id={CHECKOUT_SESSION_ID}")
    .build();
Session session = Session.create(params);
return Map.of("clientSecret", session.getClientSecret());`,
};

const mountSnippets: Record<string, string> = {
  React: `import { loadStripe } from '@stripe/stripe-js';
import {
  CheckoutProvider,
  PaymentElement,
  useCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_...');

function PayForm() {
  const checkout = useCheckout();
  return (
    <form onSubmit={(e) => { e.preventDefault(); checkout.confirm(); }}>
      <PaymentElement />
      <button type="submit">Pay {checkout.total.total.amount}</button>
    </form>
  );
}

export default function App() {
  const fetchClientSecret = () =>
    fetch('/create-checkout-session', { method: 'POST' })
      .then((r) => r.json())
      .then((d) => d.clientSecret);

  return (
    <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
      <PayForm />
    </CheckoutProvider>
  );
}`,
  HTML: `<form id="payment-form">
  <div id="payment-element"></div>
  <button id="submit">Pay now</button>
</form>
<script>
  const stripe = Stripe('pk_test_...');
  const res = await fetch('/create-checkout-session', { method: 'POST' });
  const { clientSecret } = await res.json();
  const checkout = await stripe.initCheckout({ clientSecret });
  checkout.createPaymentElement().mount('#payment-element');
  document.querySelector('#payment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    checkout.confirm();
  });
</script>`,
  "Next.js": `'use client';
import { loadStripe } from '@stripe/stripe-js';
import {
  CheckoutProvider,
  PaymentElement,
  useCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export default function Page() {
  const fetchClientSecret = () =>
    fetch('/api/checkout', { method: 'POST' })
      .then((r) => r.json())
      .then((d) => d.clientSecret);

  return (
    <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
      <PaymentElement />
    </CheckoutProvider>
  );
}`,
};

const appearanceSnippet = `const appearance = {
  theme: 'night',
  variables: {
    colorPrimary: '#aebfe0',
    colorBackground: '#262a38',
    borderRadius: '8px',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
};

const checkout = await stripe.initCheckout({ clientSecret, elementsOptions: { appearance } });`;

const steps: GuideStep[] = [
  {
    title: "Install Stripe.js and Elements",
    body: (
      <p>
        Elements gives you low-level UI components you compose yourself. Install
        the server SDK plus Stripe.js and the React bindings.
      </p>
    ),
    code: {
      language: "bash",
      code: "npm install --save stripe @stripe/stripe-js @stripe/react-stripe-js",
    },
  },
  {
    title: "Create a custom Checkout Session",
    body: (
      <p>
        Create a session with <code>ui_mode: &apos;custom&apos;</code> and return
        its <code>client_secret</code>. This unlocks the Checkout Sessions API
        on the client while you own the entire page layout.
      </p>
    ),
    code: {
      language: "javascript",
      group: "backend",
      variants: sessionSnippets,
    },
  },
  {
    title: "Compose your page with Elements",
    body: (
      <p>
        Wrap your form in <code>CheckoutProvider</code> and drop in the{" "}
        <code>PaymentElement</code>. Arrange your own steps — information,
        shipping, payment — and call <code>confirm()</code> to complete the
        payment.
      </p>
    ),
    code: {
      language: "jsx",
      group: "frontend",
      variants: mountSnippets,
    },
  },
  {
    title: "Customise the appearance",
    body: (
      <p>
        Use the Appearance API for full CSS-level control over fonts, colours,
        and spacing so the form matches your brand exactly.
      </p>
    ),
    code: { language: "javascript", code: appearanceSnippet },
  },
];

export default function ElementsGuide() {
  return (
    <CheckoutGuide
      title="Elements"
      intro={
        <p>
          Build a fully customized payment page using Elements. You compose the
          page from low-level UI components and control every pixel, with the
          Checkout Sessions API handling payment logic behind the scenes.
        </p>
      }
      steps={steps}
      preview={<ElementsPreview />}
      demoHref="/checkout-demo/elements"
    />
  );
}
