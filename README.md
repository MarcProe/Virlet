# **Virlet: Instagram Creator Analytics & Management App**
*Modern, adaptive one-page web app for sports creators to track, analyze, and optimize Instagram performance.*

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
✅ **Visually striking** (big, colorful elements, interactive graphs)
✅ **Zero-setup backend** (uses Next.js API routes + LowDB)
✅ **On-premises ready** (self-hosted, no cloud dependencies)
✅ **Data-driven** (real-time analytics, exportable reports)
✅ **Instagram Authentication** (for the app itself and API access to Instagram)

**Target Users**: Sports influencers, athletes, and content creators.

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

## 🚀 Dev Rules

- **Never push to main!**
- For every session, create **ONE feature branch** and **ONE PR** that is updated on every push to the branch.
