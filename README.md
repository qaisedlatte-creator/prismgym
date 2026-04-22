# PRISM INDIA — E-Commerce Platform

Full-stack e-commerce site for PRISM INDIA (prismindia.co) — a streetwear × gym wear brand from India.

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Prisma · PostgreSQL · Razorpay · NextAuth

---

## Environment Variables

Copy `.env.local` and fill in your values:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Supabase/Railway) |
| `NEXTAUTH_SECRET` | Random secret: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your domain (e.g. `http://localhost:3000`) |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID (optional) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret (optional) |
| `RAZORPAY_KEY_ID` | Razorpay Key ID from dashboard |
| `RAZORPAY_KEY_SECRET` | Razorpay Key Secret from dashboard |
| `SMTP_HOST` | SMTP host (e.g. `smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port (e.g. `587`) |
| `SMTP_USER` | SMTP email address |
| `SMTP_PASS` | SMTP password / App Password |

---

## Running Locally

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment
```bash
cp .env.local .env.local
# Fill in DATABASE_URL and other variables
```

### 3. Set up the database
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with all products
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
```

### 4. Run dev server
```bash
npm run dev
```

Open http://localhost:3000

---

## Deploying to Vercel

1. Push to GitHub
2. Connect repo to Vercel (vercel.com/new)
3. Add all environment variables in Vercel Project Settings → Environment Variables
4. Set `NEXTAUTH_URL` to your production domain
5. Deploy — Vercel auto-detects Next.js

### Post-deploy
- Run `npx prisma db push` with your production DATABASE_URL to migrate schema
- Run seed script against production DB if needed

---

## Adding New Products

### Via seed file
Edit `prisma/seed.ts` and add a new product object to the `products` array, then re-run the seed.

### Via Prisma Studio
```bash
npx prisma studio
```
Opens a GUI at localhost:5555 to add/edit products directly.

### Via API (future admin)
```bash
POST /api/products
Content-Type: application/json
{ "name": "...", "slug": "...", "price": 999, ... }
```

---

## Project Structure

```
prism-india/
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Login / Register
│   ├── account/            # User account & orders
│   ├── about/              # About page
│   ├── cart/               # Cart page
│   ├── catalog/            # Product catalog with filters
│   ├── checkout/           # Checkout flow
│   ├── order/[id]/         # Order confirmation
│   ├── product/[slug]/     # Product detail page
│   └── api/                # API routes
├── components/
│   ├── home/               # Homepage sections
│   ├── layout/             # Navbar, Footer, CartDrawer
│   ├── product/            # ProductCard, etc.
│   └── ui/                 # shadcn-style UI components
├── lib/
│   ├── prisma.ts           # Prisma client
│   ├── auth.ts             # NextAuth config
│   ├── razorpay.ts         # Razorpay client
│   ├── email.ts            # Nodemailer
│   ├── store.ts            # Zustand cart store
│   └── utils.ts            # Utilities & constants
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Product seed data
└── public/
    └── logo.svg            # PRISM logo
```

---

## COD Logic

- ₹100 COD fee added at checkout when payment method = COD
- Shown as line item in cart summary, checkout summary, and order confirmation
- Stored as `codFee: 100` on Order model
- Badge shown on all product pages

## Shipping Logic

- FREE shipping on orders ≥ ₹999
- ₹79 flat fee for orders below ₹999
- Shown at cart, checkout, and order confirmation
