# Virlet: Instagram Creator Analytics & Management

Modern Next.js 16 web app for Instagram creators to track, analyze, and optimize performance. Features system-based dark/light mode with dark as the preferred default.

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | Next.js | 16.2.7 | App Router, API routes, Turbopack |
| React | React | 19.0.0 | UI components |
| Styling | Tailwind CSS | 3.4.1 | Utility-first CSS |
| Language | TypeScript | 5.5.0 | Type safety |
| Deployment | Vercel | - | Recommended hosting |
| Analytics | Vercel Speed Insights | ^1.0.0 | Performance monitoring |

---

## Project Structure

```
virlet/
├── app/
│   ├── globals.css           # Global styles + CSS variables for dark/light mode
│   ├── layout.tsx            # Root layout with ThemeProvider
│   └── page.tsx              # Home page with Hello World
├── components/
│   └── ThemeProvider.tsx     # System-based theme detection
├── public/                   # Static assets
├── __tests__/
│   └── home.test.tsx         # Jest tests
├── .vercelignore             # Files to exclude from Vercel deployments
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind with darkMode: 'class'
├── postcss.config.js         # PostCSS for Tailwind
├── tsconfig.json             # TypeScript configuration
├── jest.config.js            # Jest test configuration
├── jest.setup.js             # Jest setup file
└── package.json              # Dependencies and scripts
```

---

## Quick Start

### Prerequisites
- Node.js 20.9.0 or later (required for Next.js 16)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/MarcProe/Virlet.git
cd Virlet

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

---

## Theme System (Dark/Light Mode)

The app uses **system preference detection** for dark/light mode:

- `tailwind.config.ts`: `darkMode: 'class'` - generates `.dark` prefixed utility classes
- `components/ThemeProvider.tsx`: Detects `prefers-color-scheme` and applies `dark` class to `<html>`
- `app/globals.css`: Defines CSS variables for both modes:
  - `:root` - Light mode colors
  - `.dark` - Dark mode colors
- `app/layout.tsx`: Wraps app with `<ThemeProvider>`

### CSS Variables

**Light Mode (`:root`):**
```css
--bg-base: #ffffff;
--bg-raised: #f3f4f6;
--text-primary: #111827;
--text-secondary: #4b5563;
--primary: #0d9488;
```

**Dark Mode (`.dark`):**
```css
--bg-base: #111827;
--bg-raised: #1f2937;
--text-primary: #f9fafb;
--text-secondary: #9ca3af;
--primary: #0d9488;
```

---

## Neumorphism Design System

Custom neumorphism components using CSS variables:

- `.neumorphism-page` - Full-page container
- `.neumorphism-card` - Card with neumorphism shadow effect
- `.neumorphism-btn` - Button with neumorphism styling
- `.neumorphism-h1`, `.neumorphism-h2` - Typography
- `.neumorphism-body`, `.neumorphism-muted` - Text styles

Shadows adapt to light/dark mode via CSS variables.

---

## Current Page Content

`app/page.tsx` displays:
- Virlet branding header
- "Hello, World!" message
- App description
- Footer with copyright

All styled with neumorphism design system and responsive to system theme.

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Configuration files:
- `vercel.json` - Project settings
- `.vercelignore` - Excludes test files, git config, etc.

### On-Premises

```bash
# Build
npm run build

# Start production server
npm start

# With PM2 (recommended)
npm install -g pm2
pm2 start npm --name virlet -- start
```

---

## Testing

```bash
# Run tests
npm test
```

Uses Jest with React Testing Library.

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |

---

## Configuration Files

### next.config.js
```javascript
module.exports = {
  reactStrictMode: true,
}
```

### tailwind.config.ts
```typescript
{
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', ...],
  theme: {
    extend: {
      colors: { primary, surface, text },
      boxShadow: { neumorphism, neumorphism-hover, ... },
      fontFamily: { sans: ['Inter', ...], mono: ['JetBrains Mono', ...] },
    }
  }
}
```

### postcss.config.js
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

---

## AI Agent Instructions

### To Rebuild This Project From Scratch

1. **Create Next.js 16 app:**
   ```bash
   npx create-next-app@latest virlet --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
   cd virlet
   ```

2. **Install additional dependencies:**
   ```bash
   npm install @vercel/speed-insights
   npm install -D @types/node @types/react @types/react-dom
   ```

3. **Update Next.js to 16.2.7:**
   ```bash
   npm install next@16.2.7 react@19 react-dom@19
   ```

4. **Create ThemeProvider component:**
   ```tsx
   // components/ThemeProvider.tsx
   'use client'
   import { useEffect } from 'react'
   export function ThemeProvider({ children }: { children: React.ReactNode }) {
     useEffect(() => {
       const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
       if (systemPrefersDark) {
         document.documentElement.classList.add('dark')
       }
       const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
       const handler = (e: MediaQueryListEvent) => {
         e.matches ? document.documentElement.classList.add('dark') 
                   : document.documentElement.classList.remove('dark')
       }
       mediaQuery.addEventListener('change', handler)
       return () => mediaQuery.removeEventListener('change', handler)
     }, [])
     return <>{children}</>
   }
   ```

5. **Update layout.tsx:**
   ```tsx
   import { ThemeProvider } from '@/components/ThemeProvider'
   import './globals.css'
   
   export default function RootLayout({ children }) {
     return (
       <html lang="en" suppressHydrationWarning>
         <body>
           <ThemeProvider>{children}</ThemeProvider>
         </body>
       </html>
     )
   }
   ```

6. **Update globals.css:**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   :root {
     --bg-base: #ffffff;
     --bg-raised: #f3f4f6;
     --text-primary: #111827;
     --primary: #0d9488;
   }
   .dark {
     --bg-base: #111827;
     --bg-raised: #1f2937;
     --text-primary: #f9fafb;
     --primary: #0d9488;
   }
   html { color-scheme: light dark; }
   body { background: var(--bg-base); color: var(--text-primary); }
   ```

7. **Update tailwind.config.ts:**
   ```typescript
   import type { Config } from 'tailwindcss'
   export default {
     darkMode: 'class',
     content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
     theme: { extend: { ... } },
     plugins: [],
   } satisfies Config
   ```

8. **Create page.tsx:**
   ```tsx
   export default function Home() {
     return (
       <main className="min-h-screen p-8">
         <h1 className="text-4xl font-bold">Virlet</h1>
         <p>Instagram Creator Analytics & Management</p>
       </main>
     )
   }
   ```

9. **Add Vercel config:**
   ```json
   // vercel.json
   { "version": 2, "builds": [{ "src": "package.json", "use": "@vercel/next" }] }
   ```

10. **Add .vercelignore:**
    ```
    __tests__/
    .git/
    node_modules/
    ```

### Development Workflow

- Always use feature branches: `git checkout -b vibe/feature-name`
- Create draft PRs for review
- Run `npm run build` before committing
- Test on Vercel preview deployments

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a draft PR

---

## License

MIT
