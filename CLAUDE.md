# Finance Tracker Client

A personal finance tracking web application built with React + TypeScript.

## Tech Stack

- **React** 19.2 with TypeScript 5.9
- **React Router** v7 for routing
- **Tailwind CSS** v4 for styling
- **Axios** for HTTP requests
- **Vite** + SWC for build tooling
- **jwt-decode** for JWT handling
- **react-select** for dropdown components

## Development

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # TypeScript check + production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

**Required backends:**
- API server: `http://localhost:8080` (set via `VITE_API_BASE_URL`)
- Auth server: `http://localhost:8090` (set via `VITE_AUTH_API_BASE_URL`)

## Project Structure

```
src/
├── component/
│   ├── auth/           # Login, Register, OAuthSuccess
│   ├── account/        # AccountList, AddAccount, EditAccount, EachAccount
│   ├── category/       # CategoryList, AddCategory, EditCategory, EachCategory
│   ├── transaction/    # TransactionList, AddTransaction, EachTransaction
│   ├── dashboard/      # Sidebar
│   ├── layout/         # Layout (uses React Router Outlet)
│   └── ProtectedRoute.tsx
├── js/                 # API service layer
│   ├── apiConstants.ts
│   ├── Authentication.ts
│   ├── Account.ts
│   ├── Category.ts
│   ├── Transaction.ts
│   └── JWTUtils.ts
├── types/              # TypeScript interfaces
│   ├── finance.types.ts
│   ├── transaction.types.ts
│   ├── account.types.ts
│   ├── category.types.ts
│   ├── auth.types.ts
│   ├── page.types.ts
│   └── addaccount.types.ts
├── interceptor/
│   └── AuthenticationInterceptor.tsx  # Axios interceptor, adds JWT to headers
├── App.tsx             # Route definitions
└── main.tsx            # Entry point
```

## Key Patterns

**API Layer:** All API calls go through service files in `src/js/`. An Axios interceptor (`src/interceptor/AuthenticationInterceptor.tsx`) automatically attaches the JWT from `localStorage` to every request and redirects to `/login` on token expiration.

**Routing:** Protected routes are wrapped with `ProtectedRoute.tsx`. Layout uses a shared sidebar with `<Outlet />` for nested routes.

**State:** Local component state only (useState/useEffect/useRef). No global state manager.

**Pagination:** API responses use a `Page<T>` interface with `content`, `totalElements`, `totalPages`, `number` fields.

**Forms:** Controlled components with local state. Validation is done client-side before API calls.

## Domain Concepts

- **Accounts:** CASH, BANK, FD, RECEIVABLE types. Have opening balance and active status.
- **Categories:** Tagged as INCOME or EXPENSE type.
- **Transactions:** Three types — INCOME, EXPENSE, TRANSFER. Each links to categories and from/to accounts.

## Backend

The backend source code is at `D:\Personal Java Project\finance-tracker-service`.

When in doubt about API contracts, request/response shapes, endpoints, or query parameters — read the backend source directly instead of guessing.

## Auth Flow

1. JWT stored in `localStorage` after login.
2. Every Axios request has the token injected via interceptor.
3. If token is expired, user is redirected to `/login`.
4. Google OAuth supported via `/oauth2/success` callback route.
