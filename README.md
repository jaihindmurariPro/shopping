# StyleHub — E-Commerce App (Myntra Clone)

A **production-grade** React + Vite e-commerce frontend, fully designed for real-world use and easy backend integration with **Java Spring Boot + SQL**.

---

## 🚀 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, Vite 5, React Router v6   |
| State      | React Context + useReducer          |
| Styling    | CSS Modules (zero external UI lib)  |
| Fonts      | Google Fonts (Playfair + DM Sans)   |
| Toast      | react-hot-toast                     |
| Deploy     | Vercel / GitHub Pages               |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/         # Navbar, SubNav, Footer, MobileNav
│   ├── product/        # ProductCard, ProductGrid
│   ├── filters/        # FilterSidebar
│   └── common/         # PageLoader, RatingStars, ScrollToTop
├── pages/
│   ├── HomePage        # Hero banner, categories, offers, trending
│   ├── CategoryPage    # Filter + sort + pagination
│   ├── ProductPage     # Gallery, size selector, reviews, similar
│   ├── CartPage        # Cart management + coupon
│   ├── WishlistPage    # Saved items
│   ├── SearchPage      # Live search + history
│   ├── OffersPage      # Deals, coupons, bank offers
│   ├── CheckoutPage    # 3-step: address → summary → payment
│   ├── OrderSuccessPage
│   ├── ProfilePage     # Account, addresses, coupons, settings
│   ├── OrdersPage      # Order history + tracking
│   ├── LoginPage
│   ├── RegisterPage
│   └── NotFoundPage
├── context/
│   └── AppContext.jsx  # Global state: cart, wishlist, auth
├── data/
│   └── products.js     # Mock data (swap for API calls)
└── index.css           # Design system (CSS variables)
```

---

## ⚡ Getting Started

```bash
# Clone / unzip the project
cd myntra-clone

# Install dependencies
npm install

# Start dev server
npm run dev
# → Opens at http://localhost:5173

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deploy to Vercel (Free)

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit: StyleHub e-commerce app"
git remote add origin https://github.com/YOUR_USERNAME/myntra-clone.git
git push -u origin main

# 2. Go to vercel.com → Import your GitHub repo
# 3. Framework: Vite (auto-detected)
# 4. Click Deploy — done in ~60 seconds!
```

The `vercel.json` handles SPA routing so all routes work on refresh.

---

## 🔗 Backend Integration Guide (Spring Boot)

This frontend is designed to swap mock data for API calls seamlessly.

### API Base URL
```js
// src/utils/api.js  (create this file for backend)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
```

### Where to Swap Mock Data

| File | Current (Mock) | Replace With |
|------|----------------|--------------|
| `src/data/products.js` | Static arrays | `GET /api/products` |
| `CartPage.jsx` coupon check | Local COUPONS array | `POST /api/coupons/validate` |
| `LoginPage.jsx` | Simulated delay | `POST /api/auth/login` |
| `RegisterPage.jsx` | Simulated delay | `POST /api/auth/register` |
| `CheckoutPage.jsx` | `setTimeout` | `POST /api/orders` |
| `OrdersPage.jsx` | Hardcoded orders | `GET /api/orders/me` |

### Example API Call Pattern
```js
// Replace mock data with:
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(BASE_URL + url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(r => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url]);
  return { data, loading };
}
```

### Recommended Spring Boot Endpoints

```
POST /api/auth/login           → { token, user }
POST /api/auth/register        → { token, user }
GET  /api/products             → Page<Product>
GET  /api/products/{id}        → Product
GET  /api/products?category=   → Page<Product>
GET  /api/products?search=     → Page<Product>
GET  /api/categories           → List<Category>
POST /api/cart/sync            → CartResponse
POST /api/orders               → Order
GET  /api/orders/me            → List<Order>
POST /api/coupons/validate     → CouponResponse
GET  /api/offers               → List<Offer>
```

---

## ✅ Features Checklist

- [x] **Homepage** — Hero slider, category circles, offer strip, product sections, brand marquee, promo banners, testimonials
- [x] **Category Page** — Sidebar filters (price, discount, brand, rating, availability), sort options, mobile drawer, pagination
- [x] **Product Detail** — Image gallery, size selector, quantity, delivery check, wishlist, reviews & ratings, Q&A, similar products
- [x] **Cart** — Quantity update, remove, move to wishlist, coupon code, order summary
- [x] **Wishlist** — Save/remove items, move to bag
- [x] **Search** — Live results dropdown, search history, trending searches, category navigation
- [x] **Offers Page** — Coupon cards, flash sale, bank offers, copy code
- [x] **Checkout** — 3-step flow: address → order summary → payment (UPI, Card, COD, NetBanking)
- [x] **Order Success** — Animated confirmation with tracking bar
- [x] **Profile** — Edit info, addresses, coupons, notifications, settings
- [x] **Orders** — Filter by status, order tracking
- [x] **Auth** — Login + Register with validation
- [x] **Mobile Nav** — Bottom navigation bar for mobile
- [x] **Mega Menu** — Hover dropdowns with subcategories
- [x] **Responsive** — Works on all screen sizes
- [x] **Persistent State** — Cart + wishlist survive page refresh (localStorage)
- [x] **Toast Notifications** — User feedback on every action
- [x] **404 Page** — Branded not found page

---

## 🎨 Design System

All colors, fonts, and spacing live in `src/index.css` as CSS variables:

```css
--primary: #ff3f6c        /* Brand pink */
--secondary: #1a1a2e      /* Dark navy */
--accent: #f5a623         /* Gold/amber */
--accent-green: #03a685   /* Success green */
--font-display: 'Playfair Display'
--font-body: 'DM Sans'
```

Change `--primary` to instantly rebrand the entire app.

---

## 📱 PWA Ready (Optional)

Add `vite-plugin-pwa` to make it installable:
```bash
npm install vite-plugin-pwa
```

---

Made with ❤️ | StyleHub E-Commerce Platform
