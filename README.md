<h1 align="center">🛍️ Storify</h1>
<p align="center">
  <strong>An elegant e-commerce webapp built with Next.js</strong><br/>
  Fast. Scalable. Secure. Beautiful.
</p>

<p align="center">
  <a href="https://vercel.com"><img src="https://img.shields.io/badge/Hosted%20on-Vercel-black?logo=vercel&style=for-the-badge" alt="Vercel Badge"/></a>
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-13+-000?logo=next.js&style=for-the-badge" alt="Next.js Badge"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-blue?logo=typescript&style=for-the-badge" alt="TypeScript Badge"/></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&style=for-the-badge" alt="Tailwind Badge"/></a>
  <a href="https://stripe.com"><img src="https://img.shields.io/badge/Stripe-Payment-blueviolet?logo=stripe&style=for-the-badge" alt="Stripe Badge"/></a>
</p>

---

## 🚀 Overview

**Storify** is a modern e-commerce platform built with **Next.js App Router**, designed to deliver a seamless shopping experience. It features secure authentication, dynamic product browsing, and integrated Stripe payments—all wrapped in a sleek, animated UI.

> ⚡ Built for speed, scalability, and developer joy.

---

## 🧰 Tech Stack

| Category           | Tools & Libraries                                        |
| ------------------ | -------------------------------------------------------- |
| Framework          | Next.js 13+ (App Router)                                 |
| Authentication     | NextAuth.js with JWT token protection                    |
| UI Components      | ShadCN UI, Flowbite React                                |
| Styling            | Tailwind CSS + Framer Motion                             |
| Forms & Validation | React Hook Form + Zod                                    |
| Backend protection | Custom GET endpoints, Server Actions for POST/PUT/DELETE |
| Payments           | Stripe Integration                                       |
| Hosting            | Vercel                                                   |
| Language           | TypeScript                                               |

---

## 🔐 Authentication

-   Secure login via **NextAuth.js**
-   JWT-based session management
-   Middleware protection for sensitive routes
-   Custom token handling for API endpoints

---

## 💳 Payments

-   Integrated **Stripe Checkout**
-   Secure payment flow
-   Dynamic cart and order management

---

## 🎨 UI/UX Highlights

-   Responsive design with **Tailwind CSS**
-   Smooth transitions via **Framer Motion**
-   Custom dropdowns, modals, and pagination
-   Accessible components from **ShadCN** and **Flowbite**

---

## 📦 Features

-   🧾 Cart and checkout flow
-   👤 User authentication and session handling
-   🌐 API endpoints with token protection
-   📦 Server Actions for CRUD operations
-   ⚙️ Admin dashboard (coming soon)
-   🛒 Product listing and filtering (coming soon)
-   🔍 Search and category browsing (coming soon)

---

## 📁 Project Structure

```
📦 storify
├── app/                 # App Router pages and layouts
├── components/          # Reusable UI components
├── lib/                 # Utility functions and helpers
├── middleware.ts        # Route protection logic
├── prisma/              # Database schema and client
├── public/              # Static assets
├── styles/              # Global styles
└── types/               # TypeScript interfaces
```

---

## 🧪 Local Development

```bash
# Clone the repo
git clone https://github.com/HazemShaaban101/next.js-storify.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run the dev server
npm run dev
```

---

## 🌍 Live Demo

🔗 [storify.vercel.app](https://storify.vercel.app)

---

## 🙌 Author

Made with ❤️ by [Hazem Shaaban](https://github.com/HazemShaaban101)

---

## 📜 License

This project is licensed under the **MIT License**.

---

## ⭐️ Show Your Support

If you like this project, give it a ⭐️ on GitHub and share it with your dev friends!

---
