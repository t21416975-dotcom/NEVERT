# NEVERT — handcrafted bags store

Astro + Tailwind + Supabase storefront. Orders are recorded in the database and
confirmed with the customer over WhatsApp — no online payment.

## Files you will need to set up

Copy `.env.example` to `.env` and fill in:

| Variable | Where it comes from |
|---|---|
| `PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API (server only) |
| `PUBLIC_WHATSAPP_NUMBER` | Workshop number, digits only, e.g. `201234567890` |

Then run `supabase/schema.sql` in the Supabase SQL editor. It creates
`collections`, `products`, `product_variants` and `orders`, and leaves `orders`
readable only by the server. If saving an order ever fails with
`permission denied for table orders`, re-run the same file — its `grant`
block at the end is idempotent and fixes it.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build for Vercel
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Hero, collections, featured pieces, how ordering works |
| `/collections` | All three lines |
| `/collections/[slug]` | One line and its pieces |
| `/products/[slug]` | Gallery, colour + size picker, add to bag |
| `/cart` | Bag, customer form, sends the order |
| `/about`, `/contact` | Brand story, WhatsApp contact |
| `POST /api/order` | Saves the order (prices read server-side) |
| `/admin/login` | Sign in |
| `/admin` | New orders, in conversation, delivered value |
| `/admin/orders`, `/admin/orders/[id]` | Filter, open the WhatsApp chat, move the status |
| `/admin/products`, `/admin/products/[id]` | Add, edit and delete pieces |
| `/admin/collections` | Edit the lines and their cover images |

## Admin access

Two ways to make the first account:

**A. SQL (no dashboard clicks)** — open `supabase/admin.sql`, change
`admin_email` and `admin_password` at the top, run it in the SQL editor and
sign in at `/admin/login`. The account is confirmed straight away and running
the file again resets that password.

**B. Supabase dashboard** — Authentication → Users → **Add user** → *Create new
user*, tick *Auto Confirm User*, then sign in at `/admin/login`.

Then:

1. Open **Products** in the panel and press **Import into the database** to copy
   the starter catalogue into Supabase. From then on the site reads from the
   database and you edit everything from the panel.
2. Orders appear under **Orders** with a WhatsApp button that opens a chat
   pre-filled with the pieces, total and a question about delivery.

Until the keys are set, `/admin` shows the code catalogue read-only and the
storefront keeps working on it — nothing breaks, you simply cannot edit yet.

## Where the content lives

`src/data/catalog.ts` is the starter catalogue: it seeds Supabase and is the
fallback when no keys are set. Once rows exist in Supabase, they take over.
