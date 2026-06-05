# **Virlet: Instagram Creator Analytics & Management App**
*Modern, adaptive one-page web app for sports creators to track, analyze, and optimize Instagram performance. Dark mode only—because light mode is for n00bs.*

![Virlet Dashboard Preview](https://via.placeholder.com/1200x630/1F2937/3B82F6?text=Virlet+Dashboard) *(Replace with actual dark-themed screenshot later)*

---

## **📌 Table of Contents**
1. [Overview](#-overview)
2. [Tech Stack](#-tech-stack)
3. [Project Structure](#-project-structure)
4. [Prerequisites](#-prerequisites)
5. [Setup](#-setup)
6. [Running the App](#-running-the-app)
7. [Development Workflow](#-development-workflow)
8. [Testing](#-testing)
9. [API Integration](#-api-integration)
10. [UI/UX Guidelines](#-uiux-guidelines)
11. [On-Premises Deployment](#-on-premises-deployment)
12. [Data Storage](#-data-storage)
13. [Security](#-security)
14. [Roadmap](#-roadmap)
15. [Contributing](#-contributing)
16. [Troubleshooting](#-troubleshooting)
17. [Changelog](#-changelog)
18. [License](#-license)

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

| Category          | Technology          | Purpose                                                                 | Justification                                                                 |
|-------------------|---------------------|-------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| **Frontend**      | **Next.js 16.2.7 (App Router)** | Frontend + Backend (API routes) in one                              | No separate server needed; built-in API routes, SSR, and static export. Turbopack by default. |
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
## **🤖 AI Agent Guidelines**

### General Directives

When working on this project, AI agents **MUST** follow these rules:

1. **Always use feature branches** for new work, fixes, or changes
   - Create a new branch: `git checkout -b feature/your-feature-name` or `vibe/your-task-slug`
   - Never work directly on `main` branch
   - Push your branch and create a **draft PR** for review

2. **Check official documentation online** when unsure
   - Always verify information from official sources
   - Do not rely solely on cached or outdated knowledge

3. **Follow best practices**
   - Write clean, maintainable code
   - Add tests for new functionality
   - Update documentation as needed
   - Keep commits focused and descriptive

### Official Documentation & Resources

Always refer to these official sources for accurate, up-to-date information:

| Resource | URL | Purpose |
|----------|-----|---------|
| **Next.js Official Docs** | [https://nextjs.org/docs](https://nextjs.org/docs) | Primary documentation for all Next.js features |
| **Next.js App Router Docs** | [https://nextjs.org/docs/app](https://nextjs.org/docs/app) | App Router specific documentation |
| **Next.js Upgrade Guide (v16)** | [https://nextjs.org/docs/app/guides/upgrading/version-16](https://nextjs.org/docs/app/guides/upgrading/version-16) | Migration guide for Next.js 16 |
| **Next.js API Reference** | [https://nextjs.org/docs/app/api-reference](https://nextjs.org/docs/app/api-reference) | Complete API documentation |
| **React Official Docs** | [https://react.dev](https://react.dev) | React 19 documentation |
| **Tailwind CSS Docs** | [https://tailwindcss.com/docs](https://tailwindcss.com/docs) | Tailwind CSS v3+ documentation |
| **TypeScript Docs** | [https://www.typescriptlang.org/docs](https://www.typescriptlang.org/docs) | TypeScript documentation |
| **Jest Docs** | [https://jestjs.io/docs](https://jestjs.io/docs) | Jest testing framework documentation |
| **Testing Library Docs** | [https://testing-library.com/docs](https://testing-library.com/docs) | React Testing Library documentation |

### Workflow for AI Agents

#### Starting New Work

```bash
# 1. Always pull the latest changes first
git pull origin main

# 2. Create a feature branch (use descriptive names)
git checkout -b feature/add-login-page
# OR for vibe tasks:
git checkout -b vibe/add-login-page-a86e2e

# 3. Make your changes, commit often with clear messages
git add .
git commit -m "feat: add login page component"

# 4. Push to remote and create a draft PR
git push -u origin feature/add-login-page
gh pr create --draft --title "feat: add login page" --body "Description of changes"
```

#### Code Review Process

- **Draft PRs**: All AI-created PRs should start as **draft**
- **Human review**: Wait for human approval before merging
- **Address feedback**: Respond to all review comments and make requested changes
- **Test locally**: When possible, verify changes work before pushing

#### Important Constraints

✅ **DO:**
- Use Next.js 16.2.7+ features
- Enforce dark mode in all components
- Use TypeScript for all new code
- Add tests for new functionality
- Follow existing code patterns
- Use Tailwind CSS for styling

❌ **DON'T:**
- Add light mode support (dark mode only!)
- Use alternative frontend frameworks
- Commit secrets or sensitive data
- Push directly to `main` branch
- Merge without human review
- Use deprecated APIs (check Next.js 16 upgrade guide)

#### Verification Checklist

Before creating a PR, verify:

- [ ] Code follows Next.js 16 conventions
- [ ] Dark mode is properly implemented
- [ ] TypeScript types are correct
- [ ] No console errors or warnings
- [ ] Tests pass (if applicable)
- [ ] Documentation is updated (if applicable)
- [ ] Branch is up to date with `main`

---

---
## **📁 Project Structure**

```
virlet/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles with Tailwind CSS
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Home page with Hello World
├── __tests__/
│   └── home.test.tsx            # Jest tests for home page
├── public/                      # Static assets
├── src/                         # Source code (future)
│   ├── components/              # React components
│   └── lib/                     # Utility functions
├── .gitignore                   # Git ignore rules
├── jest.config.js               # Jest test configuration
├── jest.setup.js                # Jest setup file
├── next.config.js               # Next.js configuration
├── package.json                 # Project dependencies
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

---

---
## **⚙️ Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js**: v20.9.0 or later (LTS recommended) - *Next.js 16 requires Node.js 20.9+*
- **npm**: v9 or later (comes with Node.js)
- **Git**: v2.30 or later

### Verify Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

---

---
## **🚀 Setup**

### 1. Clone the Repository

```bash
git clone https://github.com/MarcProe/Virlet.git
cd Virlet
```

### 2. Install Dependencies

```bash
npm install
```

This will install all production and development dependencies including:
- Next.js 16.2.7
- React 19+
- Tailwind CSS
- TypeScript
- Jest and React Testing Library

---

---
## **🏃 Running the App**

### Development Mode

Start the development server with hot-reloading:

```bash
npm run dev
```

The app will be available at: [http://localhost:3000](http://localhost:3000)

Open this URL in your browser to see the Hello World page with Virlet branding.

### Production Mode

Build the app for production:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

The production app will be available at: [http://localhost:3000](http://localhost:3000)

---

---
## **🧪 Testing**

### Run All Tests

```bash
npm test
```

This runs Jest with the following:
- React Testing Library for component testing
- Jest DOM for DOM assertions
- TypeScript support via ts-jest

### Test Files Location

Tests are located in the `__tests__/` directory:
- `__tests__/home.test.tsx` - Tests for the home page

### Adding New Tests

Create new test files with the `.test.tsx` or `.spec.tsx` extension in the `__tests__/` directory or alongside the component being tested.

Example test structure:

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import MyComponent from '../app/my-component'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

---

---
## **💻 Development Workflow**

### Creating a Feature Branch

```bash
# Create and checkout a new feature branch
git checkout -b feature/your-feature-name

# Make your changes, then commit
git add .
git commit -m "feat: describe your changes"

# Push to remote
git push -u origin feature/your-feature-name
```

### Creating a Pull Request

1. Push your feature branch to GitHub
2. Visit the repository on GitHub
3. Click "Pull requests" > "New pull request"
4. Select your branch and create the PR

Or use the GitHub CLI:

```bash
gh pr create --title "Your PR title" --body "Description of changes"
```

### Code Quality

Run the linter to check for issues:

```bash
npm run lint
```

---

---
## **🎨 UI/UX Guidelines**

### Design Principles

- **Dark mode only**: All components must use dark mode colors
- **Responsive**: Design for mobile, tablet, and desktop
- **Accessible**: Follow WCAG 2.1 AA standards
- **Consistent**: Use the defined color palette and spacing

### Color Palette

The app uses a custom primary color palette defined in `tailwind.config.ts`:

```typescript
// Primary colors (blue theme)
primary-50: '#f0f9ff'
primary-100: '#e0f2fe'
primary-200: '#bae6fd'
primary-300: '#7dd3fc'
primary-400: '#38bdf8'
primary-500: '#0ea5e9'
primary-600: '#0284c7'
primary-700: '#0369a1'
primary-800: '#075985'
primary-900: '#0c4a6e'
```

### Typography

- **Font**: Inter (loaded via Next.js font optimization)
- **Headings**: Bold, use primary colors for emphasis
- **Body text**: Regular weight, use gray-300/400 for secondary text

### Spacing

Use Tailwind's spacing scale (rem-based):
- `p-4` = 1rem (16px)
- `p-8` = 2rem (32px)
- `mb-4` = 1rem bottom margin
- etc.

---

---
## **🏠 On-Premises Deployment**

### Basic Deployment

1. Build the app:
   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. The app will run on port 3000 by default

### Using PM2 (Recommended for Production)

Install PM2 globally:

```bash
npm install -g pm2
```

Start the app with PM2:

```bash
pm2 start npm --name virlet -- start
```

This will:
- Keep the app running in the background
- Auto-restart on crashes
- Auto-restart on system reboot (with `pm2 startup`)

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```bash
# Next.js port
PORT=3000

# Future: Database path
DATABASE_PATH=./data/db.json

# Future: Instagram API credentials
INSTAGRAM_CLIENT_ID=your_client_id
INSTAGRAM_CLIENT_SECRET=your_client_secret
```

**Never commit `.env.local` to Git!** It's already in `.gitignore`.

---

---
## **💾 Data Storage**

### Current Setup

The boilerplate is ready for LowDB integration. LowDB is a lightweight JSON file database that's perfect for on-premises deployment.

### Future Implementation

To add LowDB:

1. Install the package:
   ```bash
   npm install lowdb @types/lowdb
   ```

2. Create a database utility:
   ```typescript
   // src/lib/db.ts
   import { Low, JSONFile } from 'lowdb'
   
   type Data = {
     users: User[]
     posts: Post[]
     analytics: Analytics[]
   }
   
   const adapter = new JSONFile<Data>('db.json')
   const db = new Low(adapter)
   
   export default db
   ```

3. Use in API routes:
   ```typescript
   // app/api/data/route.ts
   import db from '@/lib/db'
   
   export async function GET() {
     await db.read()
     const data = db.data
     return Response.json(data)
   }
   ```

---

---
## **🔒 Security**

### Best Practices

- **Environment variables**: Never hardcode secrets
- **HTTPS**: Always use HTTPS in production
- **CORS**: Configure properly for API routes
- **Input validation**: Validate all user input
- **Rate limiting**: Implement for public APIs

### Next.js Security Features

- Automatic security headers
- Built-in CSRF protection
- Secure cookie handling
- Type-safe API routes

---

---
## **🗺️ Roadmap**

### Phase 1: Foundation (Current)
- [x] Next.js 16.2.7 boilerplate with App Router
- [x] Tailwind CSS with dark mode
- [x] TypeScript configuration
- [x] Jest testing setup
- [x] Hello World page

### Phase 2: Core Features
- [ ] Instagram OAuth integration (NextAuth.js)
- [ ] User authentication and sessions
- [ ] Dashboard layout and navigation
- [ ] LowDB database integration
- [ ] Basic analytics display

### Phase 3: Analytics
- [ ] Post performance tracking
- [ ] Audience growth charts (Chart.js)
- [ ] Engagement metrics
- [ ] Exportable reports

### Phase 4: Advanced Features
- [ ] Content scheduling
- [ ] Multi-account support
- [ ] Notifications
- [ ] Mobile PWA support

---

---
## **🤝 Contributing**

### Getting Started

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and lint
5. Submit a pull request

### Pull Request Guidelines

- Use descriptive commit messages
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Keep PRs focused and reviewable

### Commit Message Format

```
type(scope): description

body

footer
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(auth): add Instagram OAuth login

- Implement NextAuth.js with Instagram provider
- Add login button component
- Update user session management

Closes #123
```

---

---
## **🐛 Troubleshooting**

### Common Issues

#### "Module not found" errors

Run:
```bash
npm install
```

If the issue persists, try:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### Port already in use

Change the port by creating a `.env.local` file:
```
PORT=3001
```

Or kill the process using the port:
```bash
# On Linux/Mac
lsof -i :3000
kill -9 <PID>

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

#### TypeScript errors

Ensure all dependencies are installed:
```bash
npm install
```

If using VS Code, restart the TypeScript server (Ctrl+Shift+P > "Restart TS server").

#### Tailwind classes not working

Ensure you've imported the global CSS in your layout:
```typescript
import './globals.css'
```

And that your Tailwind config includes the correct content paths.

---

---
## **📝 Changelog**

### v0.1.0 (2024)
- Initial boilerplate setup
- Next.js 16.2.7 with App Router
- React 19 support
- Tailwind CSS configuration
- TypeScript support
- Jest testing setup
- Hello World landing page
- Dark mode enabled

---

---
## **📄 License**

This project is proprietary. All rights reserved.

---

---
## **🙏 Acknowledgments**

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://react.dev/) - A JavaScript library for building user interfaces
- [Jest](https://jestjs.io/) - Delightful JavaScript Testing

---

*Built with ❤️ for Instagram creators who hate light mode.*
