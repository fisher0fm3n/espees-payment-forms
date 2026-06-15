import type { Metadata } from "next";
import CheckoutGuide, {
  type GuideStep,
} from "@/components/checkout/CheckoutGuide";
import FullPagePreview from "@/components/checkout/previews/FullPagePreview";

export const metadata: Metadata = {
  title: "Full page (Stripe-hosted) | Checkout",
  description:
    "Build a full-page checkout with a redirect to a Stripe-hosted payment page.",
};

const sessionSnippets: Record<string, string> = {
  "Node.js": `const stripe = require('stripe')('sk_test_...');
const express = require('express');
const app = express();

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    ui_mode: 'hosted',
    success_url: \`\${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}\`,
    cancel_url: \`\${YOUR_DOMAIN}/cancel\`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));`,
  Ruby: `require 'stripe'
Stripe.api_key = 'sk_test_...'

post '/create-checkout-session' do
  session = Stripe::Checkout::Session.create({
    line_items: [{ price: '{{PRICE_ID}}', quantity: 1 }],
    mode: 'payment',
    ui_mode: 'hosted',
    success_url: "\#{YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "\#{YOUR_DOMAIN}/cancel",
  })
  redirect session.url, 303
end`,
  Python: `import stripe
stripe.api_key = 'sk_test_...'

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    session = stripe.checkout.Session.create(
        line_items=[{'price': '{{PRICE_ID}}', 'quantity': 1}],
        mode='payment',
        ui_mode='hosted',
        success_url=YOUR_DOMAIN + '/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url=YOUR_DOMAIN + '/cancel',
    )
    return redirect(session.url, code=303)`,
  PHP: `<?php
\\Stripe\\Stripe::setApiKey('sk_test_...');

$session = \\Stripe\\Checkout\\Session::create([
  'line_items' => [['price' => '{{PRICE_ID}}', 'quantity' => 1]],
  'mode' => 'payment',
  'ui_mode' => 'hosted',
  'success_url' => $YOUR_DOMAIN . '/success?session_id={CHECKOUT_SESSION_ID}',
  'cancel_url' => $YOUR_DOMAIN . '/cancel',
]);

header('Location: ' . $session->url, true, 303);`,
  Go: `params := &stripe.CheckoutSessionParams{
  LineItems: []*stripe.CheckoutSessionLineItemParams{
    {Price: stripe.String("{{PRICE_ID}}"), Quantity: stripe.Int64(1)},
  },
  Mode:       stripe.String(string(stripe.CheckoutSessionModePayment)),
  UIMode:     stripe.String("hosted"),
  SuccessURL: stripe.String(domain + "/success?session_id={CHECKOUT_SESSION_ID}"),
  CancelURL:  stripe.String(domain + "/cancel"),
}
s, _ := session.New(params)
http.Redirect(w, r, s.URL, http.StatusSeeOther)`,
  ".NET": `var options = new SessionCreateOptions
{
    LineItems = new List<SessionLineItemOptions>
    {
        new() { Price = "{{PRICE_ID}}", Quantity = 1 },
    },
    Mode = "payment",
    UiMode = "hosted",
    SuccessUrl = domain + "/success?session_id={CHECKOUT_SESSION_ID}",
    CancelUrl = domain + "/cancel",
};
var session = new SessionService().Create(options);
Response.Headers.Add("Location", session.Url);
return new StatusCodeResult(303);`,
  Java: `SessionCreateParams params = SessionCreateParams.builder()
    .addLineItem(SessionCreateParams.LineItem.builder()
        .setPrice("{{PRICE_ID}}").setQuantity(1L).build())
    .setMode(SessionCreateParams.Mode.PAYMENT)
    .setUiMode(SessionCreateParams.UiMode.HOSTED)
    .setSuccessUrl(domain + "/success?session_id={CHECKOUT_SESSION_ID}")
    .setCancelUrl(domain + "/cancel")
    .build();
Session session = Session.create(params);
response.sendRedirect(session.getUrl());`,
};

const redirectSnippets: Record<string, string> = {
  React: `import { loadStripe } from '@stripe/stripe-js';

export default function CheckoutButton() {
  const handleClick = async () => {
    const res = await fetch('/create-checkout-session', { method: 'POST' });
    const { url } = await res.json();
    window.location.href = url; // redirect to Stripe-hosted page
  };

  return <button onClick={handleClick}>Checkout</button>;
}`,
  HTML: `<form action="/create-checkout-session" method="POST">
  <button type="submit">Checkout</button>
</form>`,
  "Next.js": `'use server';
import { redirect } from 'next/navigation';

export async function checkout() {
  const res = await fetch(\`\${process.env.URL}/create-checkout-session\`, {
    method: 'POST',
  });
  const { url } = await res.json();
  redirect(url);
}`,
};

const steps: GuideStep[] = [
  {
    title: "Install the Stripe library",
    body: (
      <p>
        Install the package on your server. Keep your secret API key on the
        server — never expose it in client code.
      </p>
    ),
    code: { language: "bash", code: "npm install --save stripe" },
  },
  {
    title: "Create a Checkout Session",
    body: (
      <p>
        Add an endpoint that creates a Checkout Session with{" "}
        <code>ui_mode: &apos;hosted&apos;</code>. It controls what the customer
        sees on the payment page — line items, amount, currency, and accepted
        payment methods. Return a 303 redirect to{" "}
        <code>session.url</code>.
      </p>
    ),
    code: {
      language: "javascript",
      group: "backend",
      variants: sessionSnippets,
    },
  },
  {
    title: "Redirect to Checkout",
    body: (
      <p>
        From your front end, call the endpoint and redirect the browser to the
        Stripe-hosted page. Stripe handles the entire payment experience.
      </p>
    ),
    code: {
      language: "jsx",
      group: "frontend",
      variants: redirectSnippets,
    },
  },
  {
    title: "Handle the result",
    body: (
      <p>
        Stripe redirects the customer to your <code>success_url</code> after
        payment. Confirm fulfilment by listening to the{" "}
        <code>checkout.session.completed</code> webhook event.
      </p>
    ),
    code: {
      language: "javascript",
      code: `app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const event = req.body;
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Fulfil the order for session.id
  }
  res.json({ received: true });
});`,
    },
  },
];

export default function FullPageGuide() {
  return (
    <CheckoutGuide
      title="Full page"
      tag={{ label: "Recommended", tone: "recommended" }}
      intro={
        <p>
          Customers enter their payment details in a fully-featured payment
          page, either embedded on your site or via a redirect to a
          Stripe-hosted page. This guide uses the hosted redirect flow — the
          lowest-maintenance option.
        </p>
      }
      steps={steps}
      preview={<FullPagePreview />}
      demoHref="/checkout-demo/full-page"
    />
  );
}
