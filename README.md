# 🐝 BrandHive — Egypt's Local Brand Marketplace

> A Smart Digital Marketplace for Egyptian Local Brands — Graduation Project 2026

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com)
[![React](https://img.shields.io/badge/Frontend-React_18-blue)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)](https://mongodb.com)

## 🚀 Live Demo

🌐 **Frontend**: [brandhive.vercel.app](https://brandhive.vercel.app)  
🔧 **API**: Deployed on Railway/Render

## 📸 Features

- 🏪 **Brand Bazaars** — Every brand has its own mini-storefront
- 🔍 **Smart Search & Filtering** — Filter by governorate, price, rating, category
- 🛒 **Full Cart & Checkout** — With promo codes and multiple payment methods
- 💬 **Support Chat** — Real-time messaging with brands and support
- 📊 **Dashboards** — Customer, Seller, and Admin dashboards
- 🤖 **AI Recommendations** — Personalized product suggestions
- ✅ **Verified Sellers** — Manual brand verification system
- 🇪🇬 **Gen Z Egyptian Identity** — Local & Proud section
- 📱 **Fully Responsive** — Mobile, tablet, desktop

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Icons | Lucide React |
| Routing | React Router v6 |
| State | Context API |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Deployment | Vercel (frontend) + Railway (backend) |

## 🎭 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| 👤 Customer | nadia@example.com | password123 |
| 🏪 Seller | ahmed@luxorcrafts.com | password123 |
| ⚙️ Admin | admin@brandhive.com | admin123 |

## 📁 Project Structure

```
BrandHive/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Navbar, Footer, ProductCard, BrandCard
│   │   ├── context/        # AuthContext, CartContext, WishlistContext
│   │   ├── data/           # Mock data (products, brands, categories)
│   │   ├── pages/          # All page components
│   │   │   └── dashboards/ # User, Seller, Admin dashboards
│   │   └── utils/          # Helper functions
│   └── vercel.json         # Vercel routing config
│
├── server/                 # Node.js Backend
│   ├── models/             # MongoDB schemas (User, Brand, Product, Order)
│   ├── routes/             # API routes (auth, brands, products, orders)
│   ├── middleware/         # JWT auth middleware
│   └── server.js           # Express app entry
│
└── README.md
```

## ⚡ Quick Start

### Frontend Only (No backend needed for demo)

```bash
cd client
npm install
npm run dev
# Visit http://localhost:5173
```

### Full Stack

```bash
# Terminal 1 - Backend
cd server
npm install
npm run dev   # Runs on http://localhost:5000

# Terminal 2 - Frontend
cd client
npm install
npm run dev   # Runs on http://localhost:5173
```

### Environment Variables (server/.env)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/brandhive
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
```

## 🚀 Deploy to Vercel

1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Set **Root Directory** to `client`
4. Set **Build Command** to `npm run build`
5. Set **Output Directory** to `dist`
6. Deploy!

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing with hero, categories, trending |
| Explore | `/explore` | Browse all brands with filters |
| Brand Bazaar | `/brand/:slug` | Brand storefront |
| Products | `/products` | Product listing with filters |
| Product | `/product/:slug` | Product details |
| Cart | `/cart` | Cart + checkout flow |
| Login | `/login` | Authentication |
| Register | `/register` | Sign up |
| Sell | `/sell` | Seller registration |
| Account | `/account` | Customer dashboard |
| Seller | `/seller/dashboard` | Seller analytics |
| Admin | `/admin/dashboard` | Admin console |
| Chat | `/chat` | Support chat |

## 🎨 Design System

- **Primary**: `#1A2040` (Deep Navy)
- **Gold**: `#C8922A` (Pharaonic Gold)
- **Gen Z Gradient**: Purple → Pink → Orange
- **Background**: `#FAF8F4` (Warm White)
- **Fonts**: Playfair Display (headings) + Inter (body)

## 👥 Team

- Graduation Project — Egypt 2026
- University: [University Name]
- Department: [Department Name]

---
🇪🇬 **Made in Egypt** · BrandHive Inc. © 2025
