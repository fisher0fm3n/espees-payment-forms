import type { Metadata } from "next";
import CheckoutGuide, {
  type GuideStep,
} from "@/components/checkout/CheckoutGuide";
import EmbeddedFormPreview from "@/components/checkout/previews/EmbeddedFormPreview";

export const metadata: Metadata = {
  title: "Embedded form | Checkout",
  description:
    "Embed a Stripe-rendered payment form directly on your site without redirection.",
};

const sessionSnippets: Record<string, string> = {
  "Node.js": `const stripe = require('stripe')('sk_test_...');

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      { price: '{{PRICE_ID}}', quantity: 1 },
    ],
    mode: 'payment',
    return_url: \`\${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}\`,
  });

  res.send({ clientSecret: session.client_secret });
});`,
  Ruby: `session = Stripe::Checkout::Session.create({
  ui_mode: 'embedded',
  line_items: [{ price: '{{PRICE_ID}}', quantity: 1 }],
  mode: 'payment',
  return_url: "\#{YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}",
})

{ clientSecret: session.client_secret }.to_json`,
  Python: `session = stripe.checkout.Session.create(
    ui_mode='embedded',
    line_items=[{'price': '{{PRICE_ID}}', 'quantity': 1}],
    mode='payment',
    return_url=YOUR_DOMAIN + '/return?session_id={CHECKOUT_SESSION_ID}',
)
return jsonify(clientSecret=session.client_secret)`,
  PHP: `$session = \\Stripe\\Checkout\\Session::create([
  'ui_mode' => 'embedded',
  'line_items' => [['price' => '{{PRICE_ID}}', 'quantity' => 1]],
  'mode' => 'payment',
  'return_url' => $YOUR_DOMAIN . '/return?session_id={CHECKOUT_SESSION_ID}',
]);
echo json_encode(['clientSecret' => $session->client_secret]);`,
  Go: `params := &stripe.CheckoutSessionParams{
  UIMode: stripe.String("embedded"),
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
    UiMode = "embedded",
    LineItems = new() { new() { Price = "{{PRICE_ID}}", Quantity = 1 } },
    Mode = "payment",
    ReturnUrl = domain + "/return?session_id={CHECKOUT_SESSION_ID}",
};
var session = new SessionService().Create(options);
return Json(new { clientSecret = session.ClientSecret });`,
  Java: `SessionCreateParams params = SessionCreateParams.builder()
    .setUiMode(SessionCreateParams.UiMode.EMBEDDED)
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
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_...');

export default function Checkout() {
  const fetchClientSecret = () =>
    fetch('/create-checkout-session', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => data.clientSecret);

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}`,
  HTML: `<div id="checkout"></div>
<script>
  const stripe = Stripe('pk_test_...');
  const res = await fetch('/create-checkout-session', { method: 'POST' });
  const { clientSecret } = await res.json();
  const checkout = await stripe.initEmbeddedCheckout({ clientSecret });
  checkout.mount('#checkout');
</script>`,
  "Next.js": `'use client';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export default function Page() {
  const fetchClientSecret = () =>
    fetch('/api/checkout', { method: 'POST' })
      .then((r) => r.json())
      .then((d) => d.clientSecret);

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}`,
};

const steps: GuideStep[] = [
  {
    title: "Install the Stripe library",
    body: <p>Install the server SDK and keep your secret key server-side.</p>,
    code: { language: "bash", code: "npm install --save stripe @stripe/stripe-js @stripe/react-stripe-js" },
  },
  {
    title: "Create an embedded Checkout Session",
    body: (
      <p>
        Create a session with <code>ui_mode: &apos;embedded&apos;</code> and a{" "}
        <code>return_url</code>. Return the session&apos;s{" "}
        <code>client_secret</code> to the browser instead of redirecting.
      </p>
    ),
    code: {
      language: "javascript",
      group: "backend",
      variants: sessionSnippets,
    },
  },
  {
    title: "Mount the embedded form",
    body: (
      <p>
        Initialise Embedded Checkout with the <code>client_secret</code> and
        mount it into a container on your page. The form renders inline — no
        redirect required.
      </p>
    ),
    code: {
      language: "jsx",
      group: "frontend",
      variants: mountSnippets,
    },
  },
  {
    title: "Show the return page",
    body: (
      <p>
        After payment, Stripe redirects to your <code>return_url</code>.
        Retrieve the session to read its <code>status</code> and display a
        confirmation.
      </p>
    ),
    code: {
      language: "javascript",
      code: `app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  res.send({ status: session.status, email: session.customer_details?.email });
});`,
    },
  },
];

export default function EmbeddedFormGuide() {
  return (
    <CheckoutGuide
      title="Embedded form"
      tag={{ label: "Private preview", tone: "preview" }}
      intro={
        <p>
          Customers enter their payment details in an embedded form on your site
          without redirection. You keep your own page layout while Stripe renders
          and secures the payment form.
        </p>
      }
      steps={steps}
      preview={<EmbeddedFormPreview />}
      demoHref="/checkout-demo/embedded-form"
    />
  );
}
