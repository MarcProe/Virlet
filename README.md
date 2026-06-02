# **Virlet: Instagram Creator Analytics & Management App**
*Modern, adaptive one-page web app for sports creators to track, analyze, and optimize Instagram performance. Dark mode only—because light mode is for n00bs.*

![Virlet Dashboard Preview](https://via.placeholder.com/1200x630/1F2937/3B82F6?text=Virlet+Dashboard) *(Replace with actual dark-themed screenshot later)*

---

## **📌 Table of Contents**
1. [Overview](#-overview)
2. [Tech Stack](#-tech-stack)
3. [Features](#-features)
4. [Project Structure](#-project-structure)
5. [Prerequisites](#-prerequisites)
6. [Setup](#-setup)
7. [Configuration](#-configuration)
8. [Running the App](#-running-the-app)
9. [Development Workflow](#-development-workflow)
10. [API Integration](#-api-integration)
11. [UI/UX Guidelines](#-uiux-guidelines)
12. [On-Premises Deployment](#-on-premises-deployment)
13. [Data Storage](#-data-storage)
14. [Security](#-security)
15. [Roadmap](#-roadmap)
16. [Contributing](#-contributing)
17. [Troubleshooting](#-troubleshooting)
18. [Changelog](#-changelog)
19. [License](#-license)

---

---
## **📌 Overview**
**Virlet** is a **Next.js-based web app** (frontend + backend in one) for Instagram creators to **measure post impact, analyze audience growth, and manage content professionally**. The app is:
✅ **One-page, adaptive** (works on mobile, tablet, desktop)
✅ **Dark mode only** (no light mode—ever)
✅ **Visually striking** (big, colorful elements, interactive graphs)
✅ **Zero-setup backend** (uses Next.js API routes + LowDB)
✅ **On-premises ready** (self-hosted, no cloud dependencies)
✅ **Data-driven** (real-time analytics, exportable reports)

**Target Users**: Sports influencers, athletes, and content creators who **hate light mode**.

---

---
## **🛠️ Tech Stack**
   Category          | Technology          | Purpose                                                                 | Justification                                                                 |
 |-------------------|---------------------|-------------------------------------------------------------------------|-------------------------------------------------------------------------------|
 | **Frontend**      | **Next.js (App Router)** | Frontend + Backend (API routes) in one                              | No separate server needed; built-in API routes, SSR, and static export.     |
 | **Database**      | LowDB               | Lightweight JSON file database                                         | Zero setup, file-based, perfect for on-premises and small-scale apps.      |
 | **Authentication**| NextAuth.js         | OAuth 2.0 (Instagram, Google, etc.) + JWT                               | Built for Next.js, supports Instagram OAuth out of the box.                 |
 | **Styling**       | **Tailwind CSS**    | Custom, responsive design                                                | Rapid development, utility-first, and highly customizable.               |
 | **Charts**        | Chart.js            | Interactive graphs (line, bar, pie)                                       | Lightweight, easy to integrate, and supports animations.                  |
 | **State Management** | Zustand         | Global state for React                                                   | Simpler than Redux, good for medium-sized apps.                           |
 | **Deployment**    | On-Premises (Node.js)| Self-hosted on any machine with Node.js                                  | Full control over data and infrastructure.                               |
 | **Reverse Proxy** | Nginx/Apache        | (Optional) For HTTPS, load balancing, and static file serving           | Recommended for production.                                                |
 | **Process Manager** | PM2              | (Optional) Keep the Next.js app running in production                   | Ensures uptime and auto-restarts.                                          |
 | **Version Control** | Git            | Code collaboration                                                       | Branch protection, PRs, and CI/CD.                                         |

> **🔹 Note for AI**:
> - **Frontend framework is locked to Next.js** (no alternatives).
> - **Dark mode is enforced**—no light mode toggles or support.

---

---
## **✨ Features**
### **🎯 Core Features**
 | Feature               | Description                                                                                     | Status       | API Endpoint               |
 |-----------------------|-------------------------------------------------------------------------------------------------|--------------|-----------------------------|
 | **OAuth 2.0 Login**   | Secure Instagram login with NextAuth.js (`instagram_basic`, `instagram_insights`).           | ✅ Done      | `/api/auth/[...nextauth]`  |
 | **Dark Mode Dashboard** | One-page overview with **big, high-contrast cards** for metrics (followers, engagement, etc.). | ✅ Done      | `/dashboard`                |
 | **Post Analytics**    | **Graphs** (line/bar) for likes, comments, reach, impressions over time (dark-themed).        | ✅ Done      | `/api/posts/analytics`      |
 | **Audience Insights**| Follower growth, demographics, and activity peaks (mock data for now).                        | ⚠️ In Progress | `/api/audience`            |
 | **Post Scheduler**   | Calendar view to **plan posts** (stores in LowDB, posts via Instagram API later).              | ❌ Planned   | `/api/posts/schedule`       |
 | **Media Library**     | Upload, preview, and manage images/videos (stored in `/public/uploads`).                     | ❌ Planned   | `/api/media`                |
 | **Alerts**            | In-app notifications for **engagement drops/spikes** (no SMS/email for now).                | ❌ Planned   | `/api/alerts`               |
 | **Export Data**       | Generate **CSV/JSON reports** for offline analysis.                                            | ❌ Planned   | `/api/export`               |

---

---
## **🗂️ Project Structure**
```bash
virlet/
├── app/                              # Next.js App Router
│   ├── api/                          # API Routes (backend)
│   │   ├── auth/                     # NextAuth.js config
│   │   │   └── [...nextauth]/route.js
│   │   ├── posts/
│   │   │   ├── analytics/route.js    # Post metrics
│   │   │   └── schedule/route.js     # Post scheduling
│   │   ├── audience/route.js         # Audience insights
│   │   └── export/route.js           # Data export
│   ├── dashboard/                    # Dashboard page (dark mode only)
│   │   └── page.jsx
│   ├── auth/                         # Auth pages (login, callback)
│   │   └── page.jsx
│   ├── layout.jsx                    # Root layout (dark mode enforced)
│   └── globals.css                   # Global styles (dark mode only)
│
├── components/                       # Reusable UI (dark-themed)
│   ├── analytics/                    # Chart components (dark-themed)
│   ├── layout/                       # Sidebar, Navbar (dark)
│   └── ui/                           # Buttons, Modals, Cards (dark)
│
├── lib/                              # Utilities
│   ├── db.js                         # LowDB setup
│   ├── auth.js                       # NextAuth config
│   └── instagram.js                  # Instagram API helpers
│
├── data/                             # LowDB data
│   └── db.json                       # JSON database file (auto-created)
│
├── public/                           # Static files
│   ├── uploads/                      # Media library
│   └── favicon.ico
│
├── .github/
│   └── workflows/
│       └── test.yml                  # CI: Run tests on PRs (optional)
│
├── .gitignore
├── package.json
├── next.config.js
├── tailwind.config.js               # Tailwind config (dark mode only)
├── README.md                         # This file
├── CHANGELOG.md
└── .env.local.example               # Example env file
