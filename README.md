<p align="center">
  <strong>🏦 LOANFLOW</strong><br/>
  <em>Full Stack Application Development (FSAD) — Frontend Module</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/React_Router-7.13-CA4245?logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Recharts-3.7-22B5BF?logo=chart.js&logoColor=white" alt="Recharts" />
</p>

---

## 📌 Table of Contents

| #  | Section                                                   |
|----|-----------------------------------------------------------|
| 1  | [Project Overview](#-project-overview)                    |
| 2  | [Tech Stack](#-tech-stack)                                |
| 3  | [Getting Started](#-getting-started)                      |
| 4  | [Project Structure](#-project-structure)                  |
| 5  | [Architecture Overview](#-architecture-overview)          |
| 6  | [Authentication & Roles](#-authentication--roles)         |
| 7  | [Route Map](#-route-map)                                  |
| 8  | [Feature Breakdown by Role](#-feature-breakdown-by-role)  |
| 9  | [Reusable Components](#-reusable-components)              |
| 10 | [Mock Data Files](#-mock-data-files)                      |
| 11 | [Design System](#-design-system)                          |
| 12 | [Screenshots Guide](#-screenshots-guide)                  |
| 13 | [Development Phases](#-development-phases)                |
| 14 | [Scripts Reference](#-scripts-reference)                  |
| 15 | [Constraints & Assumptions](#-constraints--assumptions)   |

---

## 🧾 Project Overview

**LoanFlow** is a role-based loan management system frontend built as part of the **Full Stack Application Development (FSAD)** academic course. It simulates a complete fintech platform where different stakeholders — Admins, Lenders, Borrowers, and Analysts — interact with the loan lifecycle through dedicated dashboards, tables, charts, and forms.

This is a **frontend-only prototype** using static mock data. No backend server or API is required. The application is designed to be **backend-integratable** in the future.

### Key Highlights

- ✅ 4 distinct user roles with unique dashboards and feature pages
- ✅ Role-based authentication using React Context API
- ✅ Protected routes with role-gating
- ✅ 20+ pages — dashboards, tables, forms, charts, settings
- ✅ Reusable component library (Table, Card, Pagination, EmptyState, etc.)
- ✅ Recharts-powered analytics (bar, pie, line charts)
- ✅ Fully responsive — sidebar collapses on mobile
- ✅ Dark fintech-style UI with consistent design language

---

## 🛠 Tech Stack

| Layer          | Technology                       | Version  |
|----------------|----------------------------------|----------|
| **Framework**  | React                            | 19.2     |
| **Build Tool** | Vite                             | 7.3      |
| **Styling**    | Tailwind CSS                     | 4.2      |
| **Routing**    | React Router DOM                 | 7.13     |
| **Charts**     | Recharts                         | 3.7      |
| **HTTP**       | Axios (installed, for future use)| 1.13     |
| **Linting**    | ESLint                           | 9.39     |
| **Language**   | JavaScript (ES Modules)          | —        |

> **No external UI libraries** (no Material UI, Ant Design, Chakra, etc.) — all components are custom-built with Tailwind CSS and inline styles.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```powershell
# Clone the repository
git clone <repository-url>
cd loanflow-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app launches at **http://localhost:5173**

### Login

There is **no email/password authentication**. The login page presents 4 role cards — click any role to log in:

| Role       | Accent Color | Access                                     |
|------------|-------------|---------------------------------------------|
| **Admin**    | 🟡 Amber   | System dashboard, users, security, settings |
| **Lender**   | 🟢 Teal    | Loan portfolio, borrowers, payments         |
| **Borrower** | 🟣 Indigo  | Loan applications, EMI, profile             |
| **Analyst**  | 🟢 Green   | Analytics, risk reports, trends, exports    |

---

## 📁 Project Structure

```
loanflow-frontend/
│
├── index.html                          # Vite HTML entry point
├── package.json                        # Dependencies & scripts
├── vite.config.js                      # Vite configuration
├── eslint.config.js                    # ESLint configuration
│
├── public/
│   └── vite.svg                        # Default Vite favicon
│
└── src/
    │
    ├── main.jsx                        # React DOM entry — mounts <App />
    ├── index.css                       # Global styles + Tailwind imports
    │
    ├── app/                            # ── APPLICATION CORE ──
    │   ├── App.jsx                     # Root component — wraps AuthProvider + Routes
    │   ├── routes.jsx                  # All route definitions (BrowserRouter)
    │   └── ProtectedRoute.jsx          # Auth guard + role-based access control
    │
    ├── context/                        # ── STATE MANAGEMENT ──
    │   └── AuthContext.jsx             # Auth context — login(role), logout(), user
    │
    ├── pages/                          # ── PUBLIC PAGES ──
    │   ├── Landing.jsx                 # Homepage — project intro + login CTA
    │   ├── NotFound.jsx                # 404 page
    │   └── auth/
    │       └── Login.jsx               # Role-selection login screen
    │
    ├── components/                     # ── REUSABLE COMPONENTS ──
    │   ├── layout/
    │   │   ├── DashboardLayout.jsx     # Main layout — sidebar + topbar + content
    │   │   ├── Sidebar.jsx             # Role-aware navigation sidebar
    │   │   └── Topbar.jsx              # App header — brand, role badge, logout
    │   │
    │   └── common/
    │       ├── Button.jsx              # Styled button component
    │       ├── Card.jsx                # Glass-morphism card wrapper
    │       ├── StatCard.jsx            # Dashboard stat card
    │       ├── Table.jsx               # DataTable — pagination + filter + empty state
    │       ├── Pagination.jsx          # Page navigation controls
    │       ├── EmptyState.jsx          # "No data" placeholder
    │       └── LoadingSkeleton.jsx     # Animated skeleton loader
    │
    ├── features/                       # ── ROLE-BASED FEATURE MODULES ──
    │   │
    │   ├── admin/
    │   │   ├── AdminDashboard.jsx      # Admin overview — stats, activity, roles
    │   │   ├── LoansOverview.jsx       # Platform-wide loan table
    │   │   ├── Users.jsx               # User management table (read-only)
    │   │   ├── SecurityLogs.jsx        # System activity / audit log table
    │   │   └── Settings.jsx            # System config — toggles + inputs
    │   │
    │   ├── lender/
    │   │   ├── LenderDashboard.jsx     # Portfolio stats, recent loans, collections
    │   │   ├── CreateLoan.jsx          # Loan offer creation form
    │   │   ├── ActiveLoans.jsx         # Issued loans table
    │   │   ├── Borrowers.jsx           # Borrower list with risk levels
    │   │   └── Payments.jsx            # Payment transactions table
    │   │
    │   ├── borrower/
    │   │   ├── BorrowerDashboard.jsx   # Loan progress, EMI schedule, payments
    │   │   ├── ApplyLoan.jsx           # Loan application form
    │   │   ├── MyLoans.jsx             # Borrower's loan list
    │   │   ├── EmiSchedule.jsx         # 36-month EMI breakdown table
    │   │   └── Profile.jsx             # Personal info + documents
    │   │
    │   └── analyst/
    │       ├── AnalystDashboard.jsx    # Risk metrics, alerts, portfolio segments
    │       ├── Analytics.jsx           # Bar chart + pie chart (recharts)
    │       ├── RiskReports.jsx         # Risk score table
    │       ├── Trends.jsx              # Line charts — quarterly growth
    │       └── Exports.jsx             # Report download list (UI-only)
    │
    ├── data/                           # ── MOCK DATA ──
    │   ├── users.mock.js              # Auth user (demo credentials)
    │   ├── platformUsers.mock.js      # 15 platform users for admin table
    │   ├── loans.mock.js              # 7 loans + 7 borrowers + 7 risk reports
    │   ├── emi.mock.js                # 36-month EMI schedule
    │   ├── payments.mock.js           # 12 payment transactions
    │   └── securityLogs.mock.js       # 18 security/audit log entries
    │
    └── utils/                          # ── UTILITIES ──
        ├── formatters.js              # formatCurrency, formatPercent, formatDate
        └── constants.js               # STATUS_COLORS, RISK_COLORS, CHART_COLORS
```

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                        main.jsx                         │
│                    Mounts <App />                        │
└────────────────────────┬────────────────────────────────┘
                         │
              ┌──────────▼──────────┐
              │   AuthProvider      │    ← React Context
              │   (AuthContext)     │       user / login / logout
              └──────────┬──────────┘
                         │
              ┌──────────▼──────────┐
              │    AppRoutes        │    ← React Router DOM
              │   (routes.jsx)     │       BrowserRouter + Routes
              └──────────┬──────────┘
                         │
           ┌─────────────┼─────────────┐
           │             │             │
     ┌─────▼────┐  ┌────▼─────┐  ┌───▼──────────┐
     │  Public   │  │Protected │  │  404 / *     │
     │  Pages    │  │  Routes  │  │  NotFound    │
     │  /, /login│  │  /app/*  │  └──────────────┘
     └──────────┘  └────┬─────┘
                        │
              ┌─────────▼─────────┐
              │  ProtectedRoute   │    ← Auth guard
              │  allowedRoles?    │       Redirects if not logged in
              └─────────┬─────────┘       or wrong role
                        │
              ┌─────────▼─────────┐
              │  DashboardLayout  │    ← Topbar + Sidebar + Content
              └─────────┬─────────┘
                        │
         ┌──────────────┼──────────────┐
         │              │              │
    ┌────▼────┐   ┌────▼────┐   ┌────▼────┐
    │ Sidebar │   │ Topbar  │   │  <main> │
    │ (role-  │   │ (brand, │   │ Feature │
    │  aware) │   │  badge, │   │  Page   │
    │         │   │  logout)│   │         │
    └─────────┘   └─────────┘   └─────────┘
```

---

## 🔐 Authentication & Roles

### How It Works

1. User visits `/login`
2. Clicks one of 4 role cards (Admin / Lender / Borrower / Analyst)
3. `AuthContext.login(role)` stores `{ role }` in state
4. User is redirected to `/app` → `RoleDashboard` renders the correct dashboard
5. `ProtectedRoute` blocks unauthorized access:
   - Not logged in → redirect to `/login`
   - Wrong role → redirect to `/app`
6. `logout()` clears user state → redirect to `/login`

### AuthContext API

```javascript
const { user, login, logout } = useAuth();

// user object
{ role: "ADMIN" | "LENDER" | "BORROWER" | "ANALYST" }

// login — sets role
login("ADMIN");

// logout — clears user
logout();
```

> ⚠️ **No persistence** — refreshing the page logs you out. This is by design for the academic demo.

---

## 🗺 Route Map

### Public Routes

| Path       | Component      | Description                |
|------------|----------------|----------------------------|
| `/`        | `Landing`      | Project homepage           |
| `/login`   | `Login`        | Role-selection login       |
| `*`        | `NotFound`     | 404 catch-all              |

### Protected Routes — Borrower (`/app/*`)

| Path               | Component         | Description                    |
|--------------------|-------------------|--------------------------------|
| `/app`             | `BorrowerDashboard` | Loan progress & stats        |
| `/app/apply-loan`  | `ApplyLoan`       | Loan application form          |
| `/app/my-loans`    | `MyLoans`         | Borrower's loan list           |
| `/app/emi-schedule`| `EmiSchedule`     | 36-month EMI breakdown         |
| `/app/profile`     | `Profile`         | Personal info & documents      |

### Protected Routes — Lender (`/app/*`)

| Path               | Component          | Description                   |
|--------------------|--------------------|-------------------------------|
| `/app`             | `LenderDashboard`  | Portfolio overview             |
| `/app/create-loan` | `CreateLoan`       | Create loan offer form         |
| `/app/active-loans`| `ActiveLoans`      | Issued loans table             |
| `/app/borrowers`   | `Borrowers`        | Borrower list + risk levels    |
| `/app/payments`    | `Payments`         | Payment transaction table      |

### Protected Routes — Admin (`/app/*`)

| Path                | Component         | Description                   |
|---------------------|-------------------|-------------------------------|
| `/app`              | `AdminDashboard`  | System overview & activity     |
| `/app/users`        | `Users`           | Platform user management       |
| `/app/loans-overview`| `LoansOverview`  | All loans across platform      |
| `/app/security`     | `SecurityLogs`    | Audit log / security events    |
| `/app/settings`     | `Settings`        | System config toggles          |

### Protected Routes — Analyst (`/app/*`)

| Path                | Component           | Description                  |
|---------------------|---------------------|------------------------------|
| `/app`              | `AnalystDashboard`  | Risk metrics & alerts        |
| `/app/analytics`    | `Analytics`         | Charts — risk dist. + exposure|
| `/app/risk-reports` | `RiskReports`       | Risk score table             |
| `/app/trends`       | `Trends`            | Quarterly growth line charts |
| `/app/exports`      | `Exports`           | Report download list         |

---

## 👥 Feature Breakdown by Role

### 🟡 Admin

| Feature          | Page             | Description                                           |
|------------------|------------------|-------------------------------------------------------|
| Dashboard        | `AdminDashboard` | 6 KPI stat cards, activity feed, user role breakdown   |
| Users Management | `Users`          | 15-user table with role badges, status, filter by role |
| Loans Overview   | `LoansOverview`  | All platform loans in a filterable table               |
| Security Logs    | `SecurityLogs`   | 18 audit events with severity badges and filter        |
| Settings         | `Settings`       | Toggle switches + numeric inputs (UI-only)             |

### 🟢 Lender

| Feature       | Page              | Description                                          |
|---------------|-------------------|------------------------------------------------------|
| Dashboard     | `LenderDashboard` | 6 portfolio stats, recent loans, collections panel    |
| Create Loan   | `CreateLoan`      | Loan offer form — amount, rate, tenure               |
| Active Loans  | `ActiveLoans`     | Issued loans table with status filter                |
| Borrowers     | `Borrowers`       | Borrower list with risk level badges                 |
| Payments      | `Payments`        | 12 payment records, status filter, 4 summary stats   |

### 🟣 Borrower

| Feature       | Page                | Description                                         |
|---------------|---------------------|-----------------------------------------------------|
| Dashboard     | `BorrowerDashboard` | Loan progress bar, 6 stats, EMI + payment panels     |
| Apply Loan    | `ApplyLoan`         | Loan application form with success confirmation      |
| My Loans      | `MyLoans`           | Borrower's loan list table                           |
| EMI Schedule  | `EmiSchedule`       | 36-row EMI breakdown — principal, interest, balance  |
| Profile       | `Profile`           | Personal info card + 6 document upload statuses      |

### 🟢 Analyst

| Feature       | Page               | Description                                          |
|---------------|--------------------|------------------------------------------------------|
| Dashboard     | `AnalystDashboard`  | 6 risk stats, sparklines, alerts, portfolio segments  |
| Analytics     | `Analytics`         | Risk score bar chart + exposure pie chart (recharts)  |
| Risk Reports  | `RiskReports`       | Risk score + default probability table               |
| Trends        | `Trends`            | 4 KPI cards + 2 line charts (quarterly growth)       |
| Exports       | `Exports`           | 5 downloadable reports list (UI-only demo)           |

---

## 🧩 Reusable Components

### Layout Components (`components/layout/`)

| Component          | Props                            | Description                           |
|--------------------|----------------------------------|---------------------------------------|
| `DashboardLayout`  | `children`                       | Full-screen layout: Topbar + Sidebar + scrollable main area |
| `Sidebar`          | `isOpen`, `onClose`              | Role-aware nav with active route highlighting |
| `Topbar`           | `onToggleSidebar`                | Brand name, role badge, hamburger (mobile), logout |

### Common Components (`components/common/`)

| Component         | Props                                            | Description                             |
|-------------------|--------------------------------------------------|-----------------------------------------|
| `Card`            | `children`, `className`, `glow`                  | Glass-morphism card wrapper              |
| `StatCard`        | —                                                | Dashboard stat display                   |
| `Button`          | —                                                | Styled action button                     |
| `DataTable`       | `columns`, `data`, `filterKey`, `filterOptions`, `pageSize` | Full table with filter dropdown, pagination, empty state |
| `Pagination`      | `currentPage`, `totalPages`, `onPageChange`      | Prev/Next + numbered page buttons        |
| `EmptyState`      | `title`, `message`, `icon`                       | "No data found" placeholder              |
| `LoadingSkeleton` | `rows`, `cols`                                   | Animated pulsing skeleton rows           |

---

## 📊 Mock Data Files

| File                     | Export            | Records | Description                              |
|--------------------------|-------------------|---------|------------------------------------------|
| `users.mock.js`          | `users`           | 1       | Demo auth credential                     |
| `platformUsers.mock.js`  | `platformUsers`   | 15      | All platform users (Admin table)         |
| `loans.mock.js`          | `loans`           | 7       | Loan records with full details           |
|                          | `borrowers`       | 7       | Borrower profiles with risk levels       |
|                          | `riskReports`     | 7       | Risk scores and default probabilities    |
| `emi.mock.js`            | `emiSchedule`     | 36      | Month-by-month EMI breakdown             |
| `payments.mock.js`       | `payments`        | 12      | Payment transactions (Completed/Pending/Failed) |
| `securityLogs.mock.js`   | `securityLogs`    | 18      | Audit events with severity levels        |

---

## 🎨 Design System

### Color Palette

| Usage              | Color   | Hex       |
|--------------------|---------|-----------|
| Background (main)  | Dark Navy | `#0f172a` |
| Background (cards) | Darker   | `rgba(13,20,32,0.85)` |
| Text (primary)     | White    | `#f0f4f8` |
| Text (secondary)   | Slate    | `#64748b` |
| Text (muted)       | Dark Slate| `#334155` |
| Admin accent       | Amber    | `#f59e0b` |
| Lender accent      | Teal     | `#2dd4bf` |
| Borrower accent    | Indigo   | `#818cf8` |
| Analyst accent     | Green    | `#34d399` |
| Success            | Emerald  | `#34d399` |
| Warning            | Orange   | `#fb923c` |
| Danger             | Red      | `#f87171` |

### Typography

| Usage      | Font Family                | Weight    |
|------------|----------------------------|-----------|
| Headings   | **Syne** (Google Fonts)    | 600–800   |
| Body text  | **DM Sans** (Google Fonts) | 300–500   |

### Component Patterns

- **Stat Cards**: Top gradient accent bar + icon + large value + meta text
- **Panels**: `rgba(13,20,32,0.85)` background, subtle `rgba(255,255,255,0.06)` border
- **Badges**: Colored text + tinted background + 1px tinted border
- **Tables**: Dark header row + hover highlight + bottom pagination
- **Hover**: `-2px translateY` + box shadow + border glow

---

## 📸 Screenshots Guide

After running the app, you can capture screenshots for these pages:

| #  | URL                   | Role     | Page Name          |
|----|-----------------------|----------|--------------------|
| 1  | `/`                   | —        | Landing Page       |
| 2  | `/login`              | —        | Login Page         |
| 3  | `/app`                | Admin    | Admin Dashboard    |
| 4  | `/app/users`          | Admin    | Users Management   |
| 5  | `/app/loans-overview` | Admin    | Loans Overview     |
| 6  | `/app/security`       | Admin    | Security Logs      |
| 7  | `/app/settings`       | Admin    | Settings           |
| 8  | `/app`                | Lender   | Lender Dashboard   |
| 9  | `/app/create-loan`    | Lender   | Create Loan        |
| 10 | `/app/active-loans`   | Lender   | Active Loans       |
| 11 | `/app/borrowers`      | Lender   | Borrowers          |
| 12 | `/app/payments`       | Lender   | Payments           |
| 13 | `/app`                | Borrower | Borrower Dashboard |
| 14 | `/app/apply-loan`     | Borrower | Apply Loan         |
| 15 | `/app/my-loans`       | Borrower | My Loans           |
| 16 | `/app/emi-schedule`   | Borrower | EMI Schedule       |
| 17 | `/app/profile`        | Borrower | Profile            |
| 18 | `/app`                | Analyst  | Analyst Dashboard  |
| 19 | `/app/analytics`      | Analyst  | Analytics          |
| 20 | `/app/risk-reports`   | Analyst  | Risk Reports       |
| 21 | `/app/trends`         | Analyst  | Trends             |
| 22 | `/app/exports`        | Analyst  | Exports            |

---

## 📦 Development Phases

### Phase 1 — Project Foundation ✅

- Vite + React + Tailwind CSS setup
- React Router DOM routing
- Landing page, Login page, 404 page
- AuthContext (login / logout / user)
- ProtectedRoute with role gating
- Full-width responsive layout

### Phase 2 — Dashboard Layout & Design System ✅

- DashboardLayout (Sidebar + Topbar + Content)
- Role-aware Sidebar navigation
- Topbar with brand, role badge, logout
- 4 role-specific dashboards (Admin, Lender, Borrower, Analyst)
- Reusable Card, StatCard, Button components
- Dark fintech-style UI theme

### Phase 3 — Core Loan Features ✅

- Borrower: Apply Loan, My Loans, EMI Schedule
- Lender: Create Loan, Active Loans, Borrowers
- Admin: Loans Overview
- Analyst: Risk Reports
- Mock data files: loans, EMI, payments
- All tables with proper column rendering

### Phase 4 — Analytics, Charts & UX Polish ✅

- Recharts integration (bar, pie, line charts)
- Analyst: Analytics page, Trends page, Exports page
- Reusable DataTable with pagination + filter
- EmptyState, LoadingSkeleton, Pagination components
- Utility functions: formatters.js, constants.js

### Phase 5 — Feature Completion ✅

- Admin: Users Management, Security Logs, Settings
- Lender: Payments page
- Borrower: Profile page
- Mock data: platformUsers, securityLogs
- **All sidebar items now resolve to functional pages**

---

## 📜 Scripts Reference

| Command           | Description                              |
|-------------------|------------------------------------------|
| `npm run dev`     | Start Vite dev server (http://localhost:5173) |
| `npm run build`   | Production build to `dist/`              |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint checks                        |

---

## ⚠️ Constraints & Assumptions

| #  | Constraint                                                             |
|----|------------------------------------------------------------------------|
| 1  | **Frontend only** — no backend server, no REST API, no database        |
| 2  | **Mock data** — all data is static JSON; no real CRUD operations       |
| 3  | **No auth persistence** — page refresh logs you out (by design)        |
| 4  | **No real file export** — "Export" and "Download" buttons are UI-only  |
| 5  | **No real form submission** — forms show success messages without saving|
| 6  | **Settings not persisted** — toggle/input changes reset on navigation  |
| 7  | **No external UI library** — all components built with Tailwind + CSS  |
| 8  | **Single-page application** — client-side routing via React Router     |
| 9  | **Academic project** — designed for FSAD review/evaluation context     |

---

<p align="center">
  <strong>LoanFlow</strong> · FSAD Course Project · February 2026<br/>
  <em>Built with React + Vite + Tailwind CSS</em>
</p>

