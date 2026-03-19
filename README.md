# Product Catalog Management System

A robust, spec-compliant product catalog management system built with Next.js 15, Redux Toolkit, and Tailwind CSS.

## 🚀 Features

### Storefront
- **Dynamic Product Grid**: Filter by category, brand, condition, and price range.
- **Product Details**: Server-rendered pages with client-side interactive "islands" for variant selection and wishlist management.
- **Wishlist**: Persistent favorites using `localStorage`.
- **Reviews**: Interactive star ratings and product feedback system.
- **Multi-Currency**: Support for USD, EUR, GBP, and INR with automated price formatting.

### Admin Dashboard
- **Catalog Overview**: High-level statistics on stock, active products, and top-rated items.
- **Product Management**: Full CRUD operations for products and their variants.
- **Variant Logic**: Supports multiple variants per product with unique SKUs and stock tracking.
- **Draft/Publish System**: Conditional save actions for product visibility.

## 🛠️ Technical Stack
- **Framework**: Next.js 15 (App Router)
- **State Management**: Redux Toolkit + React Context (Storefront preferences)
- **Styling**: Tailwind CSS (Medium complexity tier)
- **Validation**: Custom validation hooks for product and review forms.
- **Security**: Next.js Middleware for admin route protection.

## 📋 Data Constraints & Types
- **Price Architecture**: All prices are stored as **integers (cents)** to avoid floating-point errors.
- **Strict Typing**: No `any` types allowed. Full TypeScript coverage for all entities.
- **Validation**: 
  - Every product must have at least **1 variant**.
  - SKUs must be unique and match `[A-Z0-9-]+`.
  - Product names must be at least 3 characters.

## 🏁 Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

## 📂 Project Structure
- `/app`: Next.js 15 App Router pages and API routes.
- `/components`: Reusable UI components (ProductCard, Navbar, Forms).
- `/hooks`: Custom React hooks for data fetching and state management.
- `/store`: Redux Toolkit store and slices.
- `/types`: Shared TypeScript interfaces and types.
- `/lib`: Shared utilities and mock data.
