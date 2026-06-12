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
6. [Prerequisites](#-prerequisites)
7. [Setup](#-setup)
8. [Configuration](#-configuration)
9. [Running the App](#-running-the-app)
10. [Development Workflow](#-development-workflow)
11. [API Integration](#-api-integration)
12. [UI/UX Guidelines](#-uiux-guidelines)
13. [On-Premises Deployment](#-on-premises-deployment)
14. [Data Storage](#-data-storage)
15. [Security](#-security)
16. [Roadmap](#-roadmap)
17. [Contributing](#-contributing)
18. [Troubleshooting](#-troubleshooting)
19. [Changelog](#-changelog)
20. [License](#-license)

---

---
## **📌 Overview**
**Virlet** is a **Next.js-based web app** (frontend + backend in one) for Instagram creators to **measure post impact, analyze audience growth, and manage content professionally**. The app is:
✅ **One-page, adaptive** (works on mobile, tablet, desktop)
✅ **Visually striking** (big, colorful elements, interactive graphs)
✅ **Zero-setup backend** (uses Next.js API routes + LowDB)
✅ **On-premises ready** (self-hosted, no cloud dependencies)
✅ **Data-driven** (real-time analytics, exportable reports)
✅ **Instagram Authentication** (for the app itself and API access to Instagram)

**Target Users**: Sports influencers, athletes, and content creators.

---

---
## **✨ Features**

### Done
| Feature | Description |
|---------|-------------|
| Basic "Hello World" implementation | Placeholder homepage (`pages/index.js`) |

### Todo
| Feature | Description |
|---------|-------------|
| Login via Instagram | OAuth 2.0 authentication with Instagram |

---

---
## **🛠️ Tech Stack**
   Category          | Technology          | Purpose                                                                 | Justification                                                                 |
 |-------------------|---------------------|-------------------------------------------------------------------------|-------------------------------------------------------------------------------|
 | **Frontend**      | **Next.js 16.2.7** | Frontend + Backend (API routes) in one                              | No separate server needed; built-in API routes, SSR, and static export.     |
 | **Database**      | LowDB               | Lightweight JSON file database                                         | Zero setup, file-based, perfect for on-premises and small-scale apps.      |
 | **Authentication**| NextAuth.js         | OAuth 2.0 (Instagram, Google, etc.) + JWT                               | Built for Next.js, supports Instagram OAuth out of the box.                 |
 | **Style Template**  | TypeUI Neumorphism | Style Template | |
 | **Deployment**    | Vercel |                     |                          |
 | **Version Control** | Git            | Code collaboration                                                       | Branch protection, PRs, and CI/CD.                                         |


---

---
## **📁 Project Structure**

| Path | Description |
|------|-------------|
| `/pages/` | Next.js page routes (e.g., `index.js` for homepage) |
| `/pages/api/` | Next.js API routes for backend logic |
| `/.typeui/` | TypeUI design system files (`DESIGN.md`, `SKILL.md`) |
| `package.json` | Project dependencies and scripts |
| `next.config.js` | Next.js configuration |
| `vercel.json` | Vercel deployment configuration |
| `README.md` | Project documentation |

---

---
## 🚀 Dev Rules

- **Never push to main!**
- For every session, create **ONE feature branch** and **ONE PR** that is updated on every push to the branch.

---

---
## **🎨 UI/UX Guidelines**

Design system and styling rules are defined in the `.typeui/` directory:
- **[`.typeui/DESIGN.md`](./.typeui/DESIGN.md)**: Color palettes (light + dark mode), typography, spacing, and rounded corners for the Neumorphism theme.
- **[`.typeui/SKILL.md`](./.typeui/SKILL.md)**: Full design system specification and implementation details.

Follow these guidelines to maintain visual consistency across the app.
