# **Virlet: Instagram Creator Analytics & Management App**
*Modern, adaptive dashboard for sports creators to track, analyze, and optimize Instagram performance.*

---

## **Table of Contents**
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Widget System](#widget-system)
5. [Database Schema](#database-schema)
6. [Project Structure](#project-structure)
7. [Dev Rules](#dev-rules)
8. [Dev Tooling](#dev-tooling)
9. [Authentication](#authentication)
10. [UI/UX Guidelines](#uiux-guidelines)
11. [License](#license)

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
| Widget registry | Central registry maps widget types to components, config fields, singleton rules, and default column spans |
| Singleton widgets | Widgets flagged as singleton can only be added once; greyed out in catalog when present |
| Mandatory widgets | Profile widget auto-seeded on first load — cannot be fully removed |
| Auto-reload | Per-widget configurable reload interval (e.g. `30s`, `5m`, `1h`); progress shown as pie ring |
| Manual reload | Click the progress ring to reload immediately and restart the auto-reload timer |
| Last-updated timestamp | Each widget title bar shows a relative timestamp of the last successful data fetch |
| Drag-and-drop with ghost preview | Reorder widgets via drag; visual ghost follows cursor; drop zones show insertion point; widgets clamp to grid boundaries |
| Shared token inheritance | Profile widget's access token automatically shared with all other widgets |
| Instagram profile widget | Compact card: avatar (with bio tooltip on hover), name, handle, follower count, post count, logout button |
| Viewport-safe tooltips | Reusable `Tooltip` component: always fully visible, flips above/below and clamps to viewport edges; used for bio display on avatar hover |
| Number formatting | `fmt()` utility displays K/M suffixes (e.g., `1.5K`, `2.3M`) for large numbers |
| Instagram token auth | Paste a long-lived access token in the widget settings gear; stored in widget config in Dexie |
| Logout | Profile widget has a dedicated logout button that clears the token from Dexie |
| Reel Monitor widget | Pick one reel via built-in thumbnail picker; tracks likes and comments on every reload; persists snapshots in IndexedDB (`reelSnapshots` table) and renders a sparkline of likes over time; thumbnail opens permalink in new tab; change reel button |
| Engagement Timeline widget | Configurable chart with metrics: engagement rate (%), total interactions, likes only, comments only; trend line with linear regression; highlight top N posts; comparison periods (last N vs prev N); click chart points to open posts; summary stats: average, trend percentage, peak |

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
| **Database Hooks** | dexie-react-hooks 1.x | Reactive Dexie queries via `useLiveQuery` |
| **Charts** | recharts 3.8.1 | Chart rendering: line charts, sparklines, tooltips |
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
- Close button — removes the widget instance from Dexie (except mandatory widgets)

### Registry (`components/widgets/WidgetRegistry.tsx`)
Maps a `type` string to everything needed to render and configure a widget:

```ts
{
  type: 'profile',
  label: 'Instagram Profile',
  singleton: true,          // only one instance allowed
  mandatory: true,          // auto-seeded on first load, cannot be fully removed
  defaultColSpan: 2,        // default columns to span in grid
  configFields: [           // rendered as form fields in the sidebar
    { key: 'token', label: 'Access Token', type: 'password' }
  ],
  component: ProfileWidget,
}
```

### Shared Token
The Profile widget's `token` is automatically propagated to all other widgets via the `sharedToken` prop. Widgets can use either their own config token or the shared one.

### Adding a new widget type
1. Create `components/widgets/YourWidget.tsx` implementing `WidgetContentProps`
2. Add an entry to `REGISTRY` in `WidgetRegistry.tsx`
3. That's it — the sidebar, shell, persistence, auto-reload, and drag-and-drop all work automatically

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

### Grid Layout
- 10-column CSS grid system
- Widgets can span 1-N columns (clamped to available space)
- Drag-and-drop: ghost preview follows cursor; drop zones show insertion point
- Y-axis sorting: lower `y` value = higher on page
- Column clamping: widgets cannot be dragged outside grid boundaries

---

## **Database Schema**

Virlet uses **Dexie.js** as an IndexedDB wrapper with the following schema:

### Version 1
```ts
widgets: 'id, type, x, y'
```

### Version 2 (current)
```ts
widgets: 'id, type, x, y'
reelSnapshots: '++id, widgetId, timestamp'
```

### Tables

| Table | Purpose | Indexes |
|-------|---------|---------|
| `widgets` | Widget instances (position, config, state) | `id` (primary), `type`, `x`, `y` |
| `reelSnapshots` | Historical like/comment counts per monitored reel | `++id` (auto-increment), `widgetId`, `timestamp` |

### Interfaces

```ts
// WidgetInstance
{
  id: string;
  type: string;
  minimized: boolean;
  x: number;
  y: number;
  colSpan?: number;
  config: Record<string, unknown>;
  lastUpdated?: number;
  interval?: string;
}

// ReelSnapshot
{
  id?: number;         // auto-incremented
  widgetId: string;    // references widget instance
  mediaId: string;     // Instagram media ID
  timestamp: number;   // epoch ms when snapshot was taken
  likeCount: number;
  commentsCount: number;
}
```

---

## **Project Structure**

```
/
├── pages/
│   ├── _app.tsx              # App shell, fonts, global head
│   ├── index.tsx             # Dashboard — grid layout, widget rendering, drag-and-drop
│   ├── index.module.css      # Dashboard styles (10-col grid)
│   ├── api/
│   │   └── helloworld.ts      # Example Next.js API route
│   └── 404.tsx               # Custom 404
├── components/
│   ├── Tooltip.tsx           # Reusable viewport-safe tooltip (position: fixed, auto-clamp)
│   ├── Tooltip.module.css
│   ├── widgets/
│   │   ├── Widget.tsx        # Generic widget shell
│   │   ├── Widget.module.css
│   │   ├── WidgetRegistry.tsx  # Central widget type registry
│   │   ├── ProfileWidget.tsx   # Instagram profile widget
│   │   ├── ProfileWidget.module.css
│   │   ├── EngagementWidget.tsx  # Engagement timeline chart with configurable metrics
│   │   ├── EngagementWidget.module.css
│   │   ├── ReelMonitorWidget.tsx  # Single-reel stats monitor with snapshot history and sparkline
│   │   └── ReelMonitorWidget.module.css
│   └── sidebar/
│       ├── Sidebar.tsx       # Slide-in config/add panel with catalog and config views
│       └── Sidebar.module.css
├── lib/
│   ├── db.ts                 # Dexie database definition (widgets + reelSnapshots)
│   └── parseInterval.ts      # Parses "30s" / "5m" / "1h" to milliseconds
├── types/
│   └── widget.ts             # WidgetInstance, ConfigField, WidgetContentProps
├── styles/
│   └── globals.css           # CSS custom properties, dark mode, base reset
├── .githooks/
│   ├── pre-commit            # Runs typecheck before commit
│   └── pre-push              # Runs typecheck before push
├── .github/
│   └── workflows/
│       └── typecheck.yml     # GitHub Actions: typecheck on push/PR
├── .typeui/
│   ├── DESIGN.md             # Color palettes, typography, spacing tokens
│   └── SKILL.md              # Full TypeUI neumorphism design system spec
├── package.json
├── next.config.js
└── vercel.json
```

---

## **Dev Rules**

- **Never push to main directly**
- For every session, create **one feature branch** and **one PR**

---

## **Dev Tooling**

### Git Hooks
Pre-commit and pre-push hooks enforce TypeScript type checking:
- `pre-commit`: Runs `npm run typecheck` — aborts commit if type errors exist
- `pre-push`: Runs `npm run typecheck` — aborts push if type errors exist

### CI/CD
- **GitHub Actions Workflow** (`/.github/workflows/typecheck.yml`): Runs `npm ci` and `npm run typecheck` on every push and PR
- **Vercel**: Automatic deployments on every push to main or feature branches

### Scripts
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "typecheck": "tsc --noEmit"
}
```

---

## **Authentication**

Virlet uses **direct Instagram API token auth** — no OAuth flow, no server-side session. Generate a long-lived access token once and paste it into the Profile widget settings. It is stored in the widget's Dexie config record, not in `localStorage`.

The Profile widget's token is automatically shared with all other widgets via the `sharedToken` prop, so you only need to set it once.

### How to get your Instagram access token
**[How To Get Instagram API Key (Access Token)](https://www.youtube.com/watch?v=sPjlyDSNYQs)**

---

## **UI/UX Guidelines**

Design system and styling rules are defined in the `.typeui/` directory:
- **[`.typeui/DESIGN.md`](./.typeui/DESIGN.md)**: Color palettes (light + dark mode), typography, spacing, and shadow tokens
- **[`.typeui/SKILL.md`](./.typeui/SKILL.md)**: Full neumorphism design system specification

### Component Interactions
- **Tooltip**: Viewport-safe positioning — auto-flips above/below and clamps to viewport edges; bio appears on avatar hover in Profile widget
- **Chart points**: Clickable dots in Engagement widget open the corresponding post in a new tab
- **Reel thumbnail**: Click opens the reel permalink in a new tab
- **Number formatting**: Large numbers display with K/M suffixes (e.g., `1.5K`, `2.3M`)

---

## **License**

This project is licensed under the **MIT License**. See **[`LICENSE.md`](./LICENSE.md)** for the full license text.
