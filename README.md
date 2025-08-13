# Sohoj Cart - E‑Commerce CMS

### Project Title
**Sohoj Cart** — A Comprehensive Retail Commerce OS for Bangladesh (BDT‑first)

### Project Objective
Build a unified platform that streamlines **POS**, **Inventory/Warehouse**, **Orders & Delivery**, **CRM**, **Promotions**, **Reports/Analytics**, a Shopify‑style **Theme & Content Editor**, and an **AI Assistant**. The goal is a fast, role‑aware CMS that reduces operational friction, supports **offline POS**, and localizes experiences for Bangladeshi retailers in **BDT** with **BN/EN**.

### Target Audience
- **Primary:** SMEs & multi‑branch retailers seeking reliable POS + inventory + delivery in one system
- **Secondary:** D2C brands and online sellers expanding to physical stores
- **Tertiary:** POS cashiers, warehouse staff, delivery ops needing touch/scan‑first tools

### Details of Core Features

#### POS & Billing (Touch‑First, Offline)
- Scan/search products, quick keypad, discounts (৳/%), split/partial payments
- **bKash/Nagad**/**cards/COD**; thermal receipts (BN/EN); **offline queue & sync**

#### Inventory & Warehouse Management
- Multi‑warehouse stock, per‑branch levels, **transfers (create → pick → ship → receive)**
- Batch/lot/expiry, cycle counts, variance alerts, audit trail

#### Orders, Returns & Delivery
- Omnichannel orders (POS + online), returns/refunds with stock adjustment
- Delivery **kanban board** (Pending/Booked/In transit/Exception/Delivered)
- Courier integrations (rate shop, AWB print, tracking timeline, SLA badges)

#### AI Assistant (Gemini‑Ready)
- Price suggestions, demand/restock plans, draft customer replies
- **Explainability panel** (top factors, confidence); **preview → confirm → audit log**

#### Theme & Content Editor (Shopify‑Style)
- Drag‑drop sections/blocks, live preview, version history, schedule publish
- Global theme settings; Liquid‑like templating with **BDT money filters**

#### CRM, Promotions & Reports
- Customer profiles, LTV (BDT), segments, loyalty
- Coupons, campaigns, **dynamic price rules** with impact preview
- Sales/inventory/staff/courier analytics with CSV/PDF export

### Technology Stack

#### Frontend
- **Framework:** React 18 + Vite, Tailwind CSS
- **State/Data:** React Query, TanStack Table, Zustand/Redux for POS cart
- **i18n & A11y:** i18next (BN/EN), AA contrast, keyboard navigable
- **PWA & Performance:** responsive, skeleton loaders, LCP ≤ 2.5s

#### Backend
- **Framework:** Laravel 10 (PHP 8.2+), RESTful API with Sanctum (SPA auth)
- **Database:** MySQL 8; Redis (queues/cache) optional
- **Rendering:** Client‑side SPAs (Admin & Storefront), API‑driven

#### Activity‑Based Intelligence
- Purchase/return patterns, item velocity, stock‑outs, promo lift
- Contextual insights: low‑stock alerts, slow movers, repeat‑buyer behavior

#### External Integrations
- **Payments:** bKash, Nagad, SSLCommerz (cards); COD rules
- **Couriers:** (e.g.) Pathao, RedX, Steadfast (extensible)
- **Auth:** OAuth (Google) optional; SMS/email providers for notifications

#### Development Tools
- Git + GitHub; ESLint/Prettier; Laravel Pint/PHP-CS-Fixer; PHPUnit/Pest; Vitest

### Database Architecture

#### Core Entity Relationship Design (high‑level)
**Primary Tables**
- **users** (UUID, roles/permissions, BN/EN prefs)
- **products**, **product_variants** (SKU, barcode, price BDT, attributes)
- **warehouses** / **branches**
- **warehouse_stock** (product_variant_id, warehouse_id, qty, reorder_level)
- **transfers** / **transfer_items**
- **orders**, **order_items**, **payments** (method, txn refs), **refunds**
- **shipments** (courier, awb, status, events)
- **customers** (profile, addresses, LTV)
- **coupons**, **price_rules**
- **audit_logs** (who/what/when), **activities** (events for analytics)

**Relationships**
- products 1‑to‑many variants; variants many‑to‑many warehouses via stock
- orders 1‑to‑many items/payments/shipments; customers 1‑to‑many orders
- transfers link warehouses with items; audit logs polymorphically reference entities

### UI Design
**Figma**: Component library (tokens, inputs, tables), admin screens (≈38–44), storefront (Home/PLP/PDP/Cart/Checkout/Track/Account), dark/light, BN/EN microcopy samples.

### Project Architecture Design Principles

#### System Architecture
- **Modular & API‑first**, clear separation (admin/storefront/api)
- **Scalability:** queue workers, cache, horizontal web scaling
- **Database:** indexing, pagination, N+1 avoidance, soft deletes
- **Security:** Sanctum, policies, validation, audit logs, rate limits

#### UI/UX Principles
- **Role‑aware nav**, shortest path to task, scan/touch‑first ops
- **Responsive**, **accessible**, and **performant**; skeletons & optimistic UI where safe
- **Consistent design system** with tokens and reusable patterns

### Development Phases
1. **Phase 1:** Auth, products, inventory core, POS MVP (offline basics)
2. **Phase 2:** Orders/returns, warehouses/transfers, delivery kanban
3. **Phase 3:** CRM, promotions, reports; payments & courier integrations
4. **Phase 4:** Theme editor + storefront; AI assistant (pricing/restock)
5. **Phase 5:** App marketplace, advanced analytics & explainability

### Team Roles & Responsibilities
- **Frontend:** React admin/storefront, design system, accessibility
- **Backend:** Laravel API, DB schema, payments/couriers, policies
- **UI/UX:** flows, wireframes, prototypes, Figma tokens, usability tests
- **DevOps:** CI/CD, envs, logs, monitoring, backups, CDN/assets

### Contributors
| Name | ID |
|------|------|
| Mohammad Rafid Ahad | 20220204062 |
| Mohammed Faiyaz Alam | 20220204066 |
| Shinjon Das | 20220204056 |
| Md. Ahsan Habib Hridoy | 20220204064 |

### License
MIT — see `LICENSE`.

---

**Sohoj Cart** — From counter to courier, one system for modern Bangladeshi retail.
