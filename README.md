# **Virlet: Instagram Creator Analytics & Management App**
*Modern, adaptive dashboard for sports creators to track, analyze, and optimize Instagram performance.*

---

## **Table of Contents**
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Widget System](#widget-system)
5. [Project Structure](#project-structure)
6. [Dev Rules](#dev-rules)
7. [Authentication](#authentication)
8. [UI/UX Guidelines](#uiux-guidelines)
9. [License](#license)

---

## **Overview**
**Virlet** is a **Next.js-based web app** for Instagram creators to measure post impact, analyze audience growth, and manage content professionally. The app is:
- **Widget-based dashboard** — add, remove, resize, and configure widgets freely
- **One-page, adaptive** — works on mobile, tablet, desktop
- **Visually striking** — neumorphic design with light/dark mode
- **Zero-setup backend** — Next.js API routes + Dexie.js for client-side persistence (IndexedDB)
- **Deployed on Vercel** — automatic CI/CD on every push

**Target Users**: Sports influencers, athletes, and content creators.

---

## **Features**

### Done
| Feature | Description |
|---------|-------------|
| Widget dashboard | 10-column grid; widgets can span multiple columns and be freely positioned |
| Widget shell | Every widget has a title bar with a progress ring (reload indicator), settings gear, minimize, and close |
| Widget persistence | All widget state (position, config, minimized) stored in IndexedDB via Dexie — survives page refresh |
| Sidebar panel | Slide-in panel for adding new widgets and editing their settings at runtime |
| Widget registry | Central registry maps widget types to components, config fields, and singleton rules |
| Singleton widgets | Widgets flagged as singleton can only be added once; greyed out in catalog when present |
| Auto-reload | Per-widget configurable reload interval (e.g. `30s`, `5m`, `1h`); progress shown as pie ring |
| Manual reload | Click the progress ring to reload immediately and restart the auto-reload timer |
| Last-updated timestamp | Each widget title bar shows a relative timestamp of the last successful data fetch |
| Instagram profile widget | Compact card: avatar (with bio tooltip on hover), name, handle, follower count, post count |
| Viewport-safe tooltips | Reusable `Tooltip` component: always fully visible, flips above/below and clamps to viewport edges |
| Instagram token auth | Paste a long-lived access token in the widget settings gear; stored in widget config in Dexie |
| Logout | Profile widget has a dedicated logout button that clears the token from Dexie |

| Collaborator metrics | Collab posts marked on chart (orange dot); tooltip shows co-author + follower count via Business Discovery API; summary bar shows collab vs. solo avg engagement |

### Todo
| Feature | Description |
|---------|-------------|
| Analytics widget | Post performance, reach, engagement rate over time |
| Media feed widget | Grid view of recent posts with per-post stats |
| Engagement rate | Computed from recent media: (avg likes + comments) / followers |
| Profile insights | Reach, impressions, profile views, website clicks (requires `instagram_manage_insights`) |

---

## **Tech Stack**

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend** | Next.js 16.2.9 | Full-stack framework (frontend + API routes) |
| **Database** | Dexie.js 4.x | IndexedDB wrapper for client-side widget persistence |
| **Styling** | TypeUI Neumorphism | Design system: colors, typography, spacing, shadows |
| **Deployment** | Vercel | Automatic CI/CD, preview deployments per branch |
| **Version Control** | Git / GitHub | Branch-per-feature, PR-per-feature workflow |

---

## **Widget System**

Widgets are the core building block of Virlet. Every widget consists of two parts:

### Shell (`components/widgets/Widget.tsx`)
The generic wrapper every widget lives in. Provides:
- Title bar with label and last-updated timestamp
- Progress ring — fills as time passes toward the next auto-reload; click to reload now
- Settings gear — opens the sidebar in config mode for this widget
- Minimize toggle — collapses the widget body; title bar remains
- Close button — removes the widget instance from Dexie

### Registry (`components/widgets/WidgetRegistry.tsx`)
Maps a `type` string to everything needed to render and configure a widget:

```ts
{
  type: 'profile',
  label: 'Instagram Profile',
  singleton: true,          // only one instance allowed
  configFields: [           // rendered as form fields in the sidebar
    { key: 'token', label: 'Access Token', type: 'password' }
  ],
  component: ProfileWidget,
}
```

### Adding a new widget type
1. Create `components/widgets/YourWidget.tsx` implementing `WidgetContentProps`
2. Add an entry to `REGISTRY` in `WidgetRegistry.tsx`
3. That's it — the sidebar, shell, persistence, and auto-reload all work automatically

### Instance storage (Dexie)
Each widget instance is stored as:

```ts
{
  id: string;         // uuid
  type: string;       // maps to registry
  minimized: boolean;
  x: number;          // start column (0-indexed)
  y: number;          // sort order (lower = higher on page)
  colSpan?: number;   // columns to span (default 1)
  config: Record<string, unknown>;  // widget-specific settings
  lastUpdated?: number;             // epoch ms of last successful fetch
  interval?: string;                // auto-reload interval e.g. "5m"
}
```

---

## **Project Structure**

```
/
├── pages/
│   ├── _app.tsx              # App shell, fonts, global head
│   ├── index.tsx             # Dashboard — grid layout, widget rendering
│   ├── index.module.css      # Dashboard styles (10-col grid)
│   └── 404.tsx               # Custom 404
├── components/
│   ├── Tooltip.tsx           # Reusable viewport-safe tooltip (position: fixed, auto-clamp)
│   ├── Tooltip.module.css
│   ├── widgets/
│   │   ├── Widget.tsx        # Generic widget shell
│   │   ├── Widget.module.css
│   │   ├── WidgetRegistry.tsx  # Central widget type registry
│   │   ├── ProfileWidget.tsx   # Instagram profile widget
│   │   └── ProfileWidget.module.css
│   └── sidebar/
│       ├── Sidebar.tsx       # Slide-in config/add panel
│       └── Sidebar.module.css
├── lib/
│   ├── db.ts                 # Dexie database definition
│   └── parseInterval.ts      # Parses "30s" / "5m" / "1h" to ms
├── types/
│   └── widget.ts             # WidgetInstance, ConfigField, WidgetContentProps
├── styles/
│   └── globals.css           # CSS custom properties, dark mode, base reset
└── .typeui/
    ├── DESIGN.md             # Color palettes, typography, spacing tokens
    └── SKILL.md              # Full TypeUI neumorphism design system spec
```

---

## **Dev Rules**

- **Never push to main directly**
- For every session, create **one feature branch** and **one PR**

---

## **Authentication**

Virlet uses **direct Instagram API token auth** — no OAuth flow, no server-side session. Generate a long-lived access token once and paste it into the Profile widget settings. It is stored in the widget's Dexie config record, not in `localStorage`.

### How to get your Instagram access token
**[How To Get Instagram API Key (Access Token)](https://www.youtube.com/watch?v=sPjlyDSNYQs)**

---

## **UI/UX Guidelines**

Design system and styling rules are defined in the `.typeui/` directory:
- **[`.typeui/DESIGN.md`](./.typeui/DESIGN.md)**: Color palettes (light + dark mode), typography, spacing, and shadow tokens
- **[`.typeui/SKILL.md`](./.typeui/SKILL.md)**: Full neumorphism design system specification

---

## **License**

This project is licensed under the **MIT License**. See **[`LICENSE.md`](./LICENSE.md)** for the full license text.
