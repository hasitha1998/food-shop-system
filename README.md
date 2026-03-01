# 🍛 Food Shop Website System

A production-ready dynamic food shop website with full admin dashboard.  
Built for rice shops, cake shops, restaurants, takeaways, and home food businesses.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
```
Fill in your values:
- **MONGODB_URI** — MongoDB Atlas connection string
- **NEXTAUTH_SECRET** — Random 32+ character secret (use `openssl rand -base64 32`)
- **NEXTAUTH_URL** — `http://localhost:3000` for local / your domain for production
- **CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET** — From cloudinary.com dashboard

### 3. Seed Demo Data
```bash
npm run seed
```
Creates admin user + demo categories, products, and testimonials.

**Admin Login:**
- Email: `admin@foodshop.com`
- Password: `admin123`

### 4. Run Development Server
```bash
npm run dev
```
Visit:
- Public site: http://localhost:3000
- Admin panel: http://localhost:3000/admin

---

## 📁 Folder Structure

```
food-shop/
├── app/
│   ├── (auth)/admin/login/    # Login page
│   ├── admin/                 # Protected admin dashboard
│   │   ├── dashboard/         # Stats overview
│   │   ├── settings/          # Site settings
│   │   ├── categories/        # Food categories CRUD
│   │   ├── products/          # Products CRUD
│   │   ├── offers/            # Offers CRUD
│   │   ├── gallery/           # Gallery management
│   │   ├── testimonials/      # Reviews CRUD
│   │   └── seo/               # SEO settings
│   ├── api/                   # API routes
│   └── page.tsx               # Public homepage
├── components/
│   ├── admin/                 # Admin components
│   └── public/                # Public site sections
├── models/                    # MongoDB/Mongoose models
├── services/                  # Data fetching services
├── lib/                       # MongoDB, Auth, Cloudinary utils
└── scripts/seed.ts            # Demo data seeder
```

---

## 🌐 Vercel Deployment

1. Push to GitHub
2. Import project on vercel.com
3. Add all environment variables from `.env.example`
4. Deploy

---

## 🔮 Future Features (Architecture Ready)

- Online ordering system
- Stripe / PayHere payment gateway
- Resend email notifications
- Multi-tenant (multiple shops)
- Custom domain per client

---

## 🧩 Tech Stack

- **Next.js 14** App Router + Server Components
- **TypeScript** — Full type safety
- **Tailwind CSS** — Mobile-first styling
- **MongoDB + Mongoose** — Database
- **NextAuth.js** — Authentication
- **Cloudinary** — Image uploads
- **React Hook Form + Zod** — Form validation
