[![Node.js CI](https://github.com/hello-ccchen/next-web/actions/workflows/ci.yml/badge.svg)](https://github.com/hello-ccchen/next-web/actions/workflows/ci.yml)  
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Running Tests

```bash
npm test
# Watch mode
npm test -- --watch
```

## What is File-Based Routing?

File-based routing is a convention where the file and folder structure in your `src/app` directory automatically creates routes in your application. You don't need to manually configure routes—the structure itself defines them.

### Key Concepts:

- **Folders = Route Segments**: Each folder in `src/app` represents a URL segment
- **Special Files**:
  - `page.tsx` - Creates a publicly accessible page at that route
  - `layout.tsx` - Wraps child routes with a shared layout
  - `route.ts` - API endpoints
  - `not-found.tsx` - Custom 404 page

## Project Structure & Routing

### Core Routes

```
src/app/
├── page.tsx              → "/" (Home page)
├── layout.tsx            → Root layout wrapping all pages
├── not-found.tsx         → Custom 404 page
├── globals.css           → Global styles
```

**Routes:**

- `http://localhost:3000/` - Home page

### Feature-Based Routes

#### Users Module

```
src/app/users/
├── page.tsx              → GET /users (List users)
├── page.module.css       → Scoped styles
└── api/
    └── route.ts          → API endpoints for users
        └── [id]/
            └── route.ts  → GET /api/users/[id] (User by ID)
```

**Routes:**

- `http://localhost:3000/users` - Users listing page
- `GET /api/users` - Fetch all users
- `GET /api/users/:id` - Fetch specific user by ID

#### Products Module

```
src/app/products/
├── page.tsx              → GET /products (List products)
├── page.module.css       → Scoped styles
└── api/
    └── route.ts          → API endpoints for products
```

**Routes:**

- `http://localhost:3000/products` - Products listing page
- `GET /api/products` - Fetch all products

#### Authentication Module

```
src/app/api/auth/
└── [...nextauth]/
    ├── auth-options.ts   → NextAuth configuration
    └── route.ts          → NextAuth API route
```

**Routes:**

- `GET/POST /api/auth/signin` - Sign in
- `GET/POST /api/auth/callback/[provider]` - OAuth callbacks
- `GET /api/auth/session` - Get session info
- `POST /api/auth/signout` - Sign out

#### Login Page

```
src/app/login/
├── page.tsx              → GET /login (Login page)
└── page.module.css       → Scoped styles
```

**Routes:**

- `http://localhost:3000/login` - Login page

### Dynamic Routes

**Dynamic Route Segments** use square brackets `[paramName]`:

- `[id]` - Single dynamic segment
- `[...slug]` - Catch-all segment (matches multiple path segments)

Example:

- `/api/users/[id]/route.ts` matches `/api/users/1`, `/api/users/2`, etc.
- `/api/auth/[...nextauth]/route.ts` matches `/api/auth/signin`, `/api/auth/callback/google`, etc.

## Components Organization

```
src/components/
├── core/                 → Layout components
│   ├── auth-button.tsx   → Authentication button
│   ├── navbar.tsx        → Navigation bar
│   └── footer.tsx        → Footer
├── users/                → User-specific components
│   ├── user-card.tsx     → Display user info
│   └── email-mask.tsx    → Email masking utility
└── products/             → Product-specific components
    ├── product-card.tsx  → Display product
    └── product-form.tsx  → Product form
```

## Services & State Management

```
src/services/
├── users/
│   └── users-service.ts  → User API calls
└── products/
    └── products-service.ts → Product API calls

src/store/
├── store.ts              → Redux/store configuration
├── store-provider.tsx    → Store provider wrapper
├── users/
│   └── users-slice.ts    → User state management
└── products/
    └── products-slice.ts → Product state management
```

## Testing Structure

Tests mirror the source structure:

```
__tests__/
├── components/
│   ├── auth-button.test.tsx
│   ├── navbar.test.tsx
│   ├── footer.test.tsx
│   ├── user-card.test.tsx
│   ├── email-mask.test.tsx
│   └── __snapshots__/
├── pages/
│   ├── home.test.tsx
│   ├── login.test.tsx
│   ├── users.test.tsx
│   ├── not-found.test.tsx
│   └── __snapshots__/
├── services/
│   └── users-service.test.ts
├── store/
│   └── users-slice.test.ts
└── config/
    └── mocks/
        └── users-data.mock.ts
```

## Routing Features Demonstrated

### 1. **Simple Routes**

- Pages created just by adding `page.tsx` files
- Automatic URL generation based on folder structure

### 2. **API Routes**

- `route.ts` files create API endpoints
- Support for HTTP methods (GET, POST, PUT, DELETE, etc.)

### 3. **Dynamic Routes**

- Square bracket syntax `[paramName]` for dynamic segments
- Catch-all routes with `[...slug]` for flexible matching

### 4. **Layouts**

- `layout.tsx` creates shared UI across routes
- Supports nested layouts for feature-based organization

### 5. **Error Handling**

- `not-found.tsx` for custom 404 pages
- Error boundaries for handling runtime errors

## Rendering Strategies in This Project

This project demonstrates different rendering approaches in Next.js 13+:

### Server-Side Rendering (SSR) / Server Components

**Default in Next.js 13+** - Components are rendered on the server unless marked with `"use client"`.

**SSR Pages:**

- **Home Page** (`src/app/page.tsx`) ✅ SSR
  - No `"use client"` directive
  - Static content rendered on server
  - **When**: Initial page load, SEO optimization needed
  - **How**: Rendered on server, HTML sent to browser

**Server Components Benefits:**

- Access to databases, APIs, secrets directly
- Better SEO (complete HTML on first load)
- Reduced JavaScript sent to browser
- Secure operations without exposing credentials

### Client-Side Rendering (CSR)

Marked with **`"use client"`** directive - Components run in the browser.

**CSR Pages:**

1. **Users Page** (`src/app/users/page.tsx`) ❌ CSR
   - Uses `"use client"` directive
   - Uses Redux with `useAppDispatch` & `useAppSelector`
   - Fetches user data with `useEffect`
   - **When**: Interactive features, client-side state
   - **Pattern**: Renders empty shell, loads data client-side

2. **Products Page** (`src/app/products/page.tsx`) ❌ CSR
   - Uses `"use client"` directive
   - Uses Redux store, session, and state management
   - Interactive form toggle with `useState`
   - Fetches products with `useEffect`
   - **When**: Complex interactions, user authentication

3. **Login Page** (`src/app/login/page.tsx`) ❌ CSR
   - Uses `"use client"` directive
   - Uses `useSearchParams()` for URL params
   - Interactive OAuth sign-in with `next-auth/react`
   - **When**: Authentication flows, dynamic redirects

**CSR Components:**

- **AuthButton** (`src/components/core/auth-button.tsx`) ❌ CSR
  - Uses `"use client"` directive
  - Uses `useSession()` hook
  - Interactive sign-out functionality

**CSR Benefits:**

- Rich interactivity and real-time updates
- Client-side state management (Redux)
- Dynamic user experiences
- No page reload for UI updates

### API Routes (Always Server-Side)

API routes in `src/app/api/` are **always server-side**:

- **`GET /api/users`** - Fetch all users (server-side)
- **`GET /api/users/[id]`** - Fetch user by ID (server-side)
- **`GET /api/products`** - Fetch products (server-side)
- **`POST /api/products`** - Add products (server-side)
- **`POST /api/auth/[...nextauth]`** - Authentication (server-side)

### Root Layout (Server Component)

**`src/app/layout.tsx`** ✅ SSR

- Server component (no `"use client"`)
- Wraps all pages with providers
- Uses `StoreProvider` (client wrapper)
- Uses `AuthProvider` (client wrapper)
- Sets metadata for SEO

### Middleware (Always Server-Side)

**`src/middleware.ts`** ✅ Server-Side

- Runs on every request
- Protects routes: `/users` and `/api/users`
- Requires authentication via NextAuth

## Rendering Decision Guide

| Scenario                                | Choose                            |
| --------------------------------------- | --------------------------------- |
| Static content, SEO critical            | ✅ **Server Component** (SSR)     |
| Interactive features, real-time updates | ❌ **Client Component** (CSR)     |
| Using React hooks (useState, useEffect) | ❌ **Client Component**           |
| Using session, auth features            | ❌ **Client Component**           |
| Accessing databases, secrets            | ✅ **Server Component**           |
| Handling form submissions               | Both (Server action or API route) |
| Third-party OAuth                       | ❌ **Client Component** (for UI)  |

## Data Flow in This Project

### CSR Pattern (Users & Products)

```
Browser → useEffect() → Dispatch Redux Action
→ Fetch from API Route → Server fetches data
→ JSON response → Redux store update → Re-render
```

### SSR + CSR Pattern (Root Layout)

```
Server renders layout with Providers
→ Client-side components hydrate with state
→ Pages can be CSR or SSR
```

### Authentication Flow

```
User clicks "Continue with Google"
→ Client-side: nextAuth signIn()
→ Server-side: NextAuth route handler
→ OAuth provider → Session created
→ Redirects to protected page
→ Middleware verifies session
```

## Key Advantages of File-Based Routing

✅ **Intuitive Structure** - Folder structure matches URL paths  
✅ **No Config Needed** - Routes are automatic  
✅ **Co-location** - Related files stay together  
✅ **Type-Safe** - Full TypeScript support  
✅ **Scalable** - Easy to add new routes  
✅ **SEO-Friendly** - Clean URL structure  
✅ **Flexible Rendering** - Mix SSR and CSR as needed  
✅ **Built-in Middleware** - Route protection and auth

## Learn More

To learn more about Next.js file-based routing:

- [Next.js App Router Documentation](https://nextjs.org/docs/app) - Comprehensive guide to App Router
- [File Conventions](https://nextjs.org/docs/app/api-reference/file-conventions) - Special file names and their purposes
- [Routing Fundamentals](https://nextjs.org/docs/app/building-your-application/routing) - Core routing concepts
- [Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes) - Using dynamic segments
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) - Creating API endpoints

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
