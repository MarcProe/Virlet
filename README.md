# Virlet: Instagram Creator Analytics & Management

Modern Next.js 16 web app for Instagram creators to track, analyze, and optimize performance. Features system-based dark/light mode with dark as the preferred default.

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js | 16.2.7 |
| React | React | 19.0.0 |
| Styling | Tailwind CSS | 3.4.1 |
| Language | TypeScript | 5.5.0 |
| Deployment | Vercel | - |

---

## Project Structure

```
virlet/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── package.json
├── next.config.js
├── tsconfig.json
├── postcss.config.js
├── vercel.json
└── .vercelignore
```

---

## Quick Start

### Prerequisites
- Node.js 20.9.0 or later

### Installation

```bash
npm install
npm run dev
```

---

## Deployment

### Vercel

```bash
vercel
```

### On-Premises

```bash
npm run build
npm start
```

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |

---

## License

MIT
