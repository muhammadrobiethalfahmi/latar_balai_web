# Latar Balai Mulyoarjo Digital Platform — Implementation Plan

## Overview

A village digital platform built with **React + Vite + Tailwind CSS + Firebase** that serves three pillars:
- **E-Education**: Goat farming & freshwater fishing learning content
- **Tourism**: Fishing tourism promotion and visitor info
- **Marketplace**: Village product catalog + WhatsApp checkout

The platform has two audiences: public visitors and BUMDes administrators.

---

## User Review Required

> [!IMPORTANT]
> **Firebase Configuration**: You will need to provide your Firebase project credentials (API Key, Auth Domain, Project ID, etc.) before the app can connect to Firebase services. I'll scaffold the config with placeholder values and include setup instructions.

> [!IMPORTANT]
> **WhatsApp Number**: The checkout system redirects to a WhatsApp number for order placement. Please confirm the BUMDes admin WhatsApp number to embed in the app.

> [!WARNING]
> **Product Images**: Firebase Storage will be used for product images. In the MVP, I'll include placeholder/generated images. Real images should be uploaded via the admin dashboard after deployment.

---

## Open Questions

> [!IMPORTANT]
> **Language**: Should the website be in **Bahasa Indonesia** only, or bilingual (Indonesian + English)?

> [!IMPORTANT]
> **Initial Product Data**: Should I seed Firestore with sample data (2 eggs SKUs + 1 ayam afkir) on first run, or leave the database empty for admin to fill in?

> [!IMPORTANT]
> **Admin Email**: What email address should be used as the initial admin account? (Firebase Auth will require this during setup)

---

## Proposed Architecture

```
latar_balai_mulyoarjo/
├── public/
├── src/
│   ├── assets/                 # Static images/icons
│   ├── components/             # Shared UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CartDrawer.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   ├── AuthContext.jsx     # Firebase auth state
│   │   └── CartContext.jsx     # Shopping cart state
│   ├── firebase/
│   │   ├── config.js           # Firebase initialization
│   │   ├── auth.js             # Auth helpers
│   │   ├── firestore.js        # Firestore CRUD helpers
│   │   └── storage.js          # Firebase Storage helpers
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── Education.jsx       # Goat farming education
│   │   ├── Tourism.jsx         # Fishing tourism info
│   │   ├── Marketplace.jsx     # Product catalog
│   │   ├── Cart.jsx            # Cart + checkout flow
│   │   └── admin/
│   │       ├── Login.jsx       # Admin login
│   │       ├── Dashboard.jsx   # Admin overview
│   │       └── Products.jsx    # Product CRUD
│   ├── App.jsx                 # Router setup
│   ├── main.jsx
│   └── index.css              # Global styles + Tailwind
├── .env                        # Firebase config (gitignored)
├── firebase.json               # Firebase Hosting config
├── firestore.rules             # Security rules
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Proposed Changes

### Project Bootstrap

#### [NEW] Project scaffold via Vite + React
- Run `npx create-vite@latest ./ --template react` in workspace directory
- Install dependencies: `tailwindcss`, `postcss`, `autoprefixer`, `react-router-dom`, `firebase`, `react-hot-toast`, `lucide-react`

---

### Firebase Layer

#### [NEW] `src/firebase/config.js`
Firebase initialization using `.env` variables:
- `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, etc.

#### [NEW] `src/firebase/auth.js`
- `signInWithEmail`, `signOut`, `onAuthChanged`

#### [NEW] `src/firebase/firestore.js`
- `getProducts`, `getProduct`, `addProduct`, `updateProduct`, `deleteProduct`
- Products collection schema:
  ```
  products/{id}:
    name: string
    description: string
    price: number
    unit: string        // "kg" | "ekor"
    stock: number
    available: boolean  // auto-computed: stock > 0
    imageUrl: string
    category: string    // "telur" | "ayam_afkir"
    weightOptions: array // for eggs: [250, 500, 1000]
  ```

#### [NEW] `src/firebase/storage.js`
- `uploadProductImage`, `deleteProductImage`

#### [NEW] `firestore.rules`
- Public read for `products`
- Admin-only write for `products`

---

### Context / State

#### [NEW] `src/context/AuthContext.jsx`
- Wraps Firebase auth observer
- Exposes `user`, `loading`, `isAdmin`

#### [NEW] `src/context/CartContext.jsx`
- Cart state: items array with `{productId, name, price, qty, unit, weightOption}`
- Actions: `addItem`, `removeItem`, `updateQty`, `clearCart`
- WhatsApp message generator

---

### Components

#### [NEW] `src/components/Navbar.jsx`
- Responsive navigation with mobile hamburger menu
- Links: Home, Edukasi, Wisata, Marketplace
- Admin button (if authenticated)

#### [NEW] `src/components/Footer.jsx`
- Village info, social links, contact

#### [NEW] `src/components/ProductCard.jsx`
- Image, name, price, stock badge, weight selector (for eggs), Add to Cart button

#### [NEW] `src/components/CartDrawer.jsx`
- Slide-in cart panel
- Item list with qty controls
- Checkout button

#### [NEW] `src/components/ProtectedRoute.jsx`
- Redirects unauthenticated users to `/admin/login`

---

### Public Pages

#### [NEW] `src/pages/Home.jsx`
Sections:
1. **Hero**: Full-viewport background, slogan, CTA buttons
2. **About**: Brief village history, vision & mission cards
3. **Village Potential**: 4 interactive cards (Goat Ed, Fishing Tourism, Marketplace, Contact)
4. **Location**: Embedded Google Maps iframe + contact info

#### [NEW] `src/pages/Education.jsx`
- Hero banner for goat farming
- Article sections with icons
- Photo gallery grid
- Learning materials cards
- Clear note: "Kambing tidak dijual — hanya untuk edukasi"

#### [NEW] `src/pages/Tourism.jsx`
- Fishing tourism hero
- Fish species cards (Lele, Nila)
- Visitor regulations accordion
- Rental info table
- Photo gallery

#### [NEW] `src/pages/Marketplace.jsx`
- Filter tabs: All / Telur / Ayam Afkir
- Product grid (fetched from Firestore)
- Loading skeletons
- Empty state

#### [NEW] `src/pages/Cart.jsx`
- Cart item list
- Customer form: Nama, Alamat, Pickup/Delivery radio
- "Pesan via WhatsApp" button → generates message → redirects to `wa.me/`

---

### Admin Pages

#### [NEW] `src/pages/admin/Login.jsx`
- Email + password form
- Firebase Auth sign-in
- Redirect to dashboard on success

#### [NEW] `src/pages/admin/Dashboard.jsx`
- Stats: total products, low stock alerts, out-of-stock count
- Quick links to product management

#### [NEW] `src/pages/admin/Products.jsx`
- Products table with inline edit for price/stock
- Add product modal (name, description, price, unit, stock, image upload, category)
- Delete with confirmation

---

### Styling & Design System

#### [NEW] `src/index.css`
- Tailwind directives
- Custom CSS variables for brand colors
- Font imports (Google Fonts: Outfit + Merriweather)

#### [NEW] `tailwind.config.js`
Brand color palette:
- Primary: `#2D6A4F` (forest green — village/nature)
- Accent: `#F4A261` (warm orange — community/warmth)
- Surface: `#FAF7F2` (cream — traditional/warm)
- Dark: `#1B2D27`

#### Design Style
- Earthy, nature-inspired palette befitting a village platform
- Glassmorphism cards on hero sections
- Subtle animations (fade-in on scroll, hover lifts)
- Mobile-first responsive layout

---

### Configuration Files

#### [NEW] `.env`
```
VITE_FIREBASE_API_KEY=YOUR_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
VITE_WHATSAPP_NUMBER=628XXXXXXXXXX
```

#### [NEW] `firebase.json`
Firebase Hosting config pointing to `dist/`

#### [NEW] `.env.example`
Safe version to commit to source control

---

## Page Routes

| Route | Component | Access |
|---|---|---|
| `/` | Home | Public |
| `/edukasi` | Education | Public |
| `/wisata` | Tourism | Public |
| `/marketplace` | Marketplace | Public |
| `/cart` | Cart | Public |
| `/admin/login` | Login | Public |
| `/admin/dashboard` | Dashboard | Admin only |
| `/admin/products` | Products | Admin only |

---

## Verification Plan

### Automated Tests
- `npm run build` — confirm zero build errors
- `npm run dev` — confirm all routes render

### Manual Verification
- [ ] Homepage hero, about, and cards render correctly
- [ ] Education page shows goat farming content with "no-sale" notice
- [ ] Tourism page shows fish types and rental info
- [ ] Marketplace loads products from Firestore (or empty state)
- [ ] Cart drawer adds/removes items correctly
- [ ] WhatsApp checkout generates correct order message
- [ ] Admin login blocks unauthenticated access
- [ ] Admin can create, update, delete products
- [ ] Stock → 0 automatically marks product as "Out of Stock"
- [ ] Responsive on mobile (375px), tablet (768px), desktop (1280px)
