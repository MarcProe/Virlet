# **Virlet: Instagram Creator Analytics & Management App**
*Modern, adaptive one-page web app for sports creators to track, analyze, and optimize Instagram performance.*

![Virlet Dashboard Preview](https://via.placeholder.com/1200x630/1F2937/3B82F6?text=Virlet+Dashboard) *(Replace with actual dark-themed screenshot later)*

---

## **📌 Table of Contents**
1. [Overview](#-overview)
2. [Tech Stack](#-tech-stack)
3. [Features](#-features)
4. [Dev Rules](#-dev-rules)
5. [Project Structure](#-project-structure)
6. [Authentication](#-authentication)
7. [UI/UX Guidelines](#-uiux-guidelines)
8. [On-Premises Deployment](#-on-premises-deployment)
9. [Data Storage](#-data-storage)
10. [License](#-license)

---

## **📌 Overview**
**Virlet** is a **Next.js-based web app** (frontend + backend in one) for Instagram creators to **measure post impact, analyze audience growth, and manage content professionally**. The app is:
- **One-page, adaptive** (works on mobile, tablet, desktop)
- **Visually striking** (big, colorful elements, interactive graphs)
- **Zero-setup backend** (uses Next.js API routes + Dexie.js for client-side persistence)
- **On-premises ready** (self-hosted, no cloud dependencies)
- **Data-driven** (real-time analytics, exportable reports)
- **Token-based Instagram auth** (paste your long-lived access token once, stored in the browser)

**Target Users**: Sports influencers, athletes, and content creators.

---

## **✨ Features**

### Done
| Feature | Description |
|---------|-------------|
| Instagram token auth | Paste a long-lived Instagram API token; profile card shown on connect |
| Profile card | Shows avatar, name, @handle, bio, follower count, post count, website |

### Todo
| Feature | Description |
|---------|-------------|
| Analytics dashboard | Post performance, reach, engagement over time |
| Media feed | Grid view of recent posts with stats |

---

## **🛠️ Tech Stack**

| Category          | Technology          | Purpose                                                                 | Justification                                                                 |
|-------------------|---------------------|-------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| **Frontend**      | **Next.js 16.2.9** | Full-stack framework (frontend + API routes) in one                   | Built-in API routes, SSR, static export, and React integration. No separate server required. |
| **Database**      | **Dexie.js**       | Lightweight IndexedDB wrapper for browser-based NoSQL persistence       | SQL-like syntax, transactions, and offline-first storage. Ideal for client-side data with zero server dependencies. |
| **Styling**       | **TypeUI Neumorphism** | Design system for neumorphic UI (colors, typography, spacing)      | Pre-configured theme with light/dark palettes, compact spacing, and rounded corners. |
| **Deployment**    | **Vercel**         | Cloud platform for Next.js apps                                        | Optimized for Next.js, with automatic CI/CD, edge functions, and zero-config deployments. |
| **Version Control** | **Git**         | Code collaboration and versioning                                      | Enables branch protection, pull requests, and CI/CD pipelines. Hosted on GitHub. |

---

## **📁 Project Structure**

| Path | Description |
|------|-------------|
| `/pages/` | Next.js page routes (`index.tsx`, `404.tsx`, `_app.tsx`) |
| `/pages/api/` | Next.js API routes for backend logic |
| `/components/` | Shared React components (e.g., `CenteredCard.tsx`) |
| `/styles/` | Global CSS tokens and base styles (`globals.css`) |
| `/.typeui/` | TypeUI design system files (`DESIGN.md`, `SKILL.md`) |
| `package.json` | Project dependencies and scripts |
| `next.config.js` | Next.js configuration |
| `vercel.json` | Vercel deployment configuration |
| `README.md` | Project documentation |

---

## 🚀 Dev Rules

- **Never push to main!**
- For every session, create **ONE feature branch** and **ONE PR** that is updated on every push to the branch.

---

## **🔑 Authentication**

Virlet uses **direct Instagram API token auth** — no OAuth flow, no server-side session. You generate a long-lived access token once and paste it into the app. It is stored in `localStorage` and used for all Graph API calls.

### How to get your Instagram access token

Follow this guide: **[How To Get Instagram API Key (Access Token)](https://www.youtube.com/watch?v=sPjlyDSNYQs)**

Key steps:
1. Go to [Meta for Developers](https://developers.facebook.com) and create an app
2. Add the **Instagram Business Login** use case
3. Open the **Graph API Explorer** (Tools → Graph API Explorer)
4. Select your app, add the `instagram_business_basic` permission
5. Click **Generate Access Token** and complete the authorization
6. Click **Extend Access Token** to convert the 1-hour token to a **60-day long-lived token**
7. Copy the token (starts with `IGA...`) and paste it into the Virlet connect screen

### Token notes
- **Short-lived tokens** expire after **1 hour** — always extend to long-lived
- **Long-lived tokens** expire after **60 days** — paste a fresh one when it expires
- The token is stored in your browser's `localStorage` under the key `ig_token`
- Clicking **Disconnect** in the app removes it

---

## **🎨 UI/UX Guidelines**

Design system and styling rules are defined in the `.typeui/` directory:
- **[`.typeui/DESIGN.md`](./.typeui/DESIGN.md)**: Color palettes (light + dark mode), typography, spacing, and rounded corners for the Neumorphism theme.
- **[`.typeui/SKILL.md`](./.typeui/SKILL.md)**: Full design system specification and implementation details.

Follow these guidelines to maintain visual consistency across the app.

---

## **📜 License**

This project is licensed under the **MIT License**. See **[`LICENSE.md`](./LICENSE.md)** for the full license text.
