# **Virlet: Instagram Creator Analytics & Management App**
*Modern, adaptive one-page web app for sports creators to track, analyze, and optimize Instagram performance.

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
| Category          | Technology          | Purpose | Justification |
|-------------------|---------------------|---------|---------------|
| **Frontend**      | **Next.js 14.2.3** | Frontend + Backend (API routes) in one | No separate server needed; built-in API routes, SSR, and static export. |
| **Database**      | LowDB | Lightweight JSON file database | Zero setup, file-based, perfect for on-premises and small-scale apps. |
| **Authentication**| NextAuth.js v4 | OAuth 2.0 (GitHub, Google, etc.) + JWT | Built for Next.js, supports multiple OAuth providers. |
| **Styling**       | Tailwind CSS | Utility-first CSS framework | Rapid UI development with pre-defined classes. |
| **TypeScript**    | TypeScript | Type safety | Better developer experience and code maintainability. |
| **Deployment**    | Vercel | Hosting platform | Optimized for Next.js applications. |
| **Version Control** | Git | Code collaboration | Branch protection, PRs, and CI/CD. |

---

## **✨ Features**

### **Core Features**
- **Authentication**: Secure login with multiple providers (GitHub, Google) and credentials
- **Dashboard**: Main dashboard with widget support
- **Account Widget**: Display user information including name, bio, followers, following, and posts
- **Responsive Design**: Works on all screen sizes
- **Dark Mode**: Automatic dark/light theme support

### **Implemented**
- ✅ Login workflow with credentials and OAuth
- ✅ Main dashboard page
- ✅ Account information widget
- ✅ Protected routes (redirects to login if not authenticated)
- ✅ Session management
- ✅ Vercel deployment configuration

### **Upcoming**
- Instagram OAuth integration
- Post analytics dashboard
- Audience growth tracking
- Content management tools
- Exportable reports
- More widgets (engagement stats, top posts, etc.)

---

## **📁 Project Structure**
```
virlet/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts      # NextAuth API routes
│   │   ├── dashboard/
│   │   │   └── page.tsx             # Main dashboard
│   │   ├── login/
│   │   │   └── page.tsx             # Login page
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Home page (redirects)
│   │   └── globals.css              # Global styles
│   ├── components/
│   │   └── AccountWidget.tsx        # Account information widget
│   └── lib/
│       ├── auth.ts                 # NextAuth exports
│       └── auth.config.ts           # NextAuth configuration
├── public/                         # Static assets
├── .env.example                    # Environment variables template
├── .eslintrc.json                 # ESLint configuration
├── .gitignore                     # Git ignore rules
├── next.config.mjs                # Next.js configuration
├── package.json                   # Dependencies and scripts
├── postcss.config.mjs             # PostCSS configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── vercel.json                    # Vercel deployment configuration
```

---

## **📋 Prerequisites**

- Node.js 18.17 or later
- npm or yarn
- Git

---

## **🚀 Setup**

### **1. Clone the repository**
```bash
git clone https://github.com/MarcProe/Virlet.git
cd Virlet
```

### **2. Install dependencies**
```bash
npm install
```

### **3. Configure environment variables**
Copy the example environment file and update with your own values:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your OAuth credentials:
```env
# NextAuth.js Configuration
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth.js Secret (generate with: openssl rand -base64 32)
AUTH_SECRET=your_auth_secret_here

# For production deployment
NEXTAUTH_URL=http://localhost:3000
```

### **4. Set up OAuth providers (optional)**

#### **GitHub OAuth**
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set the callback URL to: `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and Client Secret to your `.env.local`

#### **Google OAuth**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Set authorized redirect URI to: `http://localhost:3000/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your `.env.local`

---

## **🎯 Configuration**

### **NextAuth.js**
The authentication is configured in `src/lib/auth.config.ts`. You can:
- Add more OAuth providers
- Customize the credentials provider
- Modify session callbacks
- Adjust JWT settings

### **Tailwind CSS**
Customize the theme in `tailwind.config.ts`. The app includes a custom primary color palette.

---

## **▶️ Running the App**

### **Development mode**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### **Production build**
```bash
npm run build
npm run start
```

---

## **🔄 Development Workflow**

### **Adding new widgets**
1. Create a new component in `src/components/` (e.g., `AnalyticsWidget.tsx`)
2. Import and use it in the dashboard page
3. Style it with Tailwind CSS classes

### **Adding new pages**
1. Create a new directory in `src/app/` (e.g., `src/app/analytics/`)
2. Add a `page.tsx` file
3. The route will be automatically available at `/analytics`

### **Protected routes**
To protect a route, add it to the middleware matcher in `src/middleware.ts`:
```typescript
export const config = {
  matcher: ["/dashboard/:path*", "/analytics/:path*"],
};
```

---

## **🔗 API Integration**

### **NextAuth.js API**
The authentication API is available at `/api/auth/[...nextauth]`. Supported endpoints:
- `GET /api/auth/[...nextauth]` - Handle OAuth callbacks
- `POST /api/auth/[...nextauth]` - Handle authentication actions

### **Session management**
Access the current session on the client:
```typescript
"use client";
import { useSession } from "next-auth/react";

const { data: session, status } = useSession();
```

Access the current session on the server:
```typescript
import { auth } from "@/lib/auth";

const session = await auth();
```

---

## **🎨 UI/UX Guidelines**

### **Design Principles**
- **KISS (Keep It Simple, Stupid)**: Simple, intuitive interface
- **Mobile-first**: Works on all screen sizes
- **Dark mode support**: Automatic theme switching
- **Consistent styling**: Use Tailwind CSS classes consistently

### **Color Palette**
- Primary: `#0ea5e9` (sky-500)
- Background: `#f9fafb` (light) / `#111827` (dark)
- Text: `#1f2937` (light) / `#f9fafb` (dark)

### **Components**
- Use existing components from `src/components/`
- Create reusable, focused components
- Follow the widget pattern for dashboard elements

---

## **🚀 On-Premises Deployment**

### **Using Docker**
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t virlet .
docker run -p 3000:3000 virlet
```

### **Using Node.js directly**
1. Build the app: `npm run build`
2. Start the server: `npm run start`
3. Use a process manager like PM2 for production

---

## **💾 Data Storage**

### **LowDB**
The app uses LowDB for local JSON-based storage. To configure:
1. Install LowDB adapter if needed
2. Update the database path in the configuration

For production, consider using:
- PostgreSQL
- MongoDB
- Firebase

---

## **🔒 Security**

### **Environment Variables**
- Never commit `.env.local` to version control
- Use different secrets for development and production
- Rotate secrets regularly

### **Authentication**
- Use HTTPS in production
- Configure proper CORS settings
- Validate all user input
- Use secure session cookies

### **Dependencies**
- Keep dependencies updated
- Regularly audit for vulnerabilities
- Use `npm audit` to check for issues

---

## **🗺️ Roadmap**

### **Phase 1 (Current)**
- ✅ Basic authentication
- ✅ Dashboard layout
- ✅ Account widget

### **Phase 2**
- Instagram OAuth integration
- Post analytics
- Audience insights

### **Phase 3**
- Content scheduling
- Engagement tracking
- Exportable reports

### **Phase 4**
- Team collaboration
- Multi-platform support
- Advanced analytics

---

## **🤝 Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## **🐛 Troubleshooting**

### **Common Issues**

**Authentication not working**
- Check your `.env.local` file for correct credentials
- Ensure the callback URLs match your provider configuration
- Verify the `NEXTAUTH_URL` is set correctly

**Build errors**
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (must be 18.17 or later)
- Clear the Next.js cache: `rm -rf .next`

**Styling issues**
- Ensure Tailwind CSS is properly configured
- Check that all necessary classes are included in the purge configuration

---

## **📝 Changelog**

### **v0.1.0 (2024-XX-XX)**
- Initial release
- Added authentication with NextAuth.js
- Created dashboard with account widget
- Set up project structure
- Added Vercel deployment configuration

---

## **📜 License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
