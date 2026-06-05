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
✅ **Visually striking** (big, colorful elements, interactive graphs)
✅ **Zero-setup backend** (uses Next.js API routes + LowDB)
✅ **On-premises ready** (self-hosted, no cloud dependencies)
✅ **Data-driven** (real-time analytics, exportable reports)
✅ **Instagram Authentication** (for the app itself and API access to Instagram)

**Target Users**: Sports influencers, athletes, and content creators.

---

---
## **🛠️ Tech Stack**

| Category          | Technology          | Purpose                                                                 | Justification                                                                 |
|-------------------|---------------------|-------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| **Frontend**      | **Next.js 16.2.7** | Frontend + Backend (API routes) in one                              | No separate server needed; built-in API routes, SSR, and static export.     |
| **Database**      | LowDB               | Lightweight JSON file database                                         | Zero setup, file-based, perfect for on-premises and small-scale apps.      |
| **Authentication**| NextAuth.js v5      | OAuth 2.0 (Instagram, Google, etc.) + JWT                               | Built for Next.js, supports Instagram OAuth out of the box.                 |
| **Styling**       | Tailwind CSS        | Utility-first CSS framework                                            | Rapid development, customizable, dark mode support.                         |
| **Type Safety**   | TypeScript          | Type checking and better developer experience                           | Improved code quality and maintainability.                                  |
| **Deployment**    | Vercel              | Hosting platform                                                        | Optimized for Next.js applications.                                          |
| **Version Control** | Git            | Code collaboration                                                       | Branch protection, PRs, and CI/CD.                                         |

---

## **✨ Features**

### **Implemented**
- ✅ **Instagram OAuth Login**: Secure authentication with Instagram using NextAuth.js
- ✅ **Dashboard Layout**: Responsive sidebar navigation with mobile support
- ✅ **Account Info Widget**: Display user profile, bio, followers, following, and posts count
- ✅ **Dark Mode UI**: Neumorphic design with custom dark theme
- ✅ **User Data Storage**: LowDB for persistent user data storage
- ✅ **Session Management**: JWT-based session handling

### **Planned**
- 📊 **Analytics Dashboard**: Post performance metrics and insights
- 📈 **Growth Tracking**: Follower growth charts and predictions
- 🎯 **Audience Insights**: Demographic analysis and engagement metrics
- 📱 **Content Management**: Post scheduling and management tools
- 🔍 **Competitor Analysis**: Compare performance with other creators
- 📤 **Export Reports**: Download analytics as PDF/CSV

---

## **🗂️ Project Structure**

```
virlet/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts      # NextAuth API routes
│   │   ├── dashboard/
│   │   │   └── page.tsx             # Main dashboard page
│   │   ├── login/
│   │   │   └── page.tsx             # Login page
│   │   ├── globals.css              # Global styles
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Home page (redirects)
│   ├── components/
│   │   ├── DashboardLayout.tsx      # Dashboard layout with sidebar
│   │   └── widgets/
│   │       └── AccountInfoWidget.tsx # Account information widget
│   ├── lib/
│   │   ├── auth.ts                 # NextAuth configuration
│   │   └── db.ts                   # LowDB database setup
│   └── types/
│       └── index.ts                # TypeScript interfaces
├── public/
│   └── placeholder.svg             # Placeholder image
├── .env.example                    # Environment variables template
├── .eslintrc.json                 # ESLint configuration
├── .gitignore                     # Git ignore rules
├── next.config.js                 # Next.js configuration
├── package.json                   # Dependencies and scripts
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.ts             # Tailwind CSS configuration
└── tsconfig.json                  # TypeScript configuration
```

---

## **📋 Prerequisites**

- Node.js 18.17 or later
- npm or yarn
- Instagram Developer Account (for OAuth)
- Basic knowledge of Next.js and React

---

## **⚙️ Setup**

### **1. Clone the Repository**

```bash
git clone https://github.com/MarcProe/Virlet.git
cd Virlet
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Configure Environment Variables**

Copy the example environment file and update with your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your Instagram OAuth credentials:

```env
# Instagram OAuth Configuration
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret

# NextAuth.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000
```

**To get Instagram OAuth credentials:**
1. Go to [Facebook for Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Instagram Basic Display product
4. Configure Valid OAuth Redirect URIs: `http://localhost:3000/api/auth/callback/instagram`
5. Copy Client ID and Client Secret

---

## **🚀 Running the App**

### **Development Mode**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### **Production Build**

```bash
npm run build
npm start
```

---

## **🔧 Configuration**

### **Instagram OAuth Setup**

1. **Create Instagram App**: Register your app at [Facebook Developer Portal](https://developers.facebook.com/)
2. **Add Instagram Basic Display**: Enable Instagram Basic Display API
3. **Configure Redirect URI**: Add `http://localhost:3000/api/auth/callback/instagram`
4. **Set Permissions**: Request `user_profile` and `user_media` permissions

### **Database Configuration**

The app uses LowDB with a JSON file by default. For production, you can configure a different path:

```typescript
// In src/lib/db.ts
const adapter = new JSONFile<Database>('/path/to/your/database.json');
```

---

## **💡 Development Workflow**

### **Adding New Widgets**

1. Create a new component in `src/components/widgets/`
2. Import and use it in the dashboard page
3. Follow the widget props interface from `src/types/index.ts`

### **Example Widget Structure**

```tsx
// src/components/widgets/NewWidget.tsx
'use client';

import { WidgetProps } from '@/types';

export default function NewWidget({ user }: WidgetProps) {
  return (
    <div className="neumorphic p-6">
      {/* Widget content */}
    </div>
  );
}
```

### **Adding API Routes**

Create new API endpoints in `src/app/api/` following Next.js route handlers:

```typescript
// src/app/api/example/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello World' });
}
```

---

## **🔗 API Integration**

### **Instagram Graph API**

The app uses Instagram Basic Display API for user data. For extended features, you may need:

- **Graph API Explorer**: Test API calls at [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- **User Permissions**: Request additional permissions as needed
- **Rate Limiting**: Be aware of Instagram API rate limits

### **Available Endpoints**

- `GET /api/auth/[...nextauth]` - NextAuth.js authentication endpoints
- Future API endpoints for analytics and data fetching

---

## **🎨 UI/UX Guidelines**

### **Design Principles**

- **Dark Mode Only**: All components should use dark theme colors
- **Neumorphism**: Use subtle shadows and depth for interactive elements
- **Accessibility**: Ensure proper contrast and keyboard navigation
- **Responsive**: Design for mobile, tablet, and desktop

### **Color Palette**

| Color | Usage | Hex Code |
|-------|-------|----------|
| Primary Blue | Buttons, Accents | `#3B82F6` |
| Dark Background | Main background | `#0F172A` |
| Card Background | Card surfaces | `#1E293B` |
| Text Primary | Main text | `#F8FAFC` |
| Text Secondary | Secondary text | `#94A3B8` |

### **Typography**

- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, larger font sizes
- **Body Text**: Regular weight, comfortable reading size

---

## **🏠 On-Premises Deployment**

### **Docker Deployment**

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
docker run -p 3000:3000 -v $(pwd)/db.json:/app/db.json virlet
```

### **Manual Deployment**

1. Build the application: `npm run build`
2. Copy the `.next` folder and other files to your server
3. Install dependencies: `npm install --production`
4. Start the server: `npm start`

---

## **💾 Data Storage**

### **LowDB Configuration**

- **File-based**: JSON file storage by default
- **Location**: `db.json` in the project root
- **Schema**: Users collection with profile data

### **Data Backup**

Regularly backup the `db.json` file to prevent data loss.

---

## **🔒 Security**

### **Environment Variables**

- Never commit `.env` files to version control
- Use different secrets for development and production
- Rotate secrets regularly

### **Authentication Security**

- Use HTTPS in production
- Configure proper CORS settings
- Implement rate limiting for API endpoints
- Keep NextAuth.js and dependencies updated

### **Instagram API Security**

- Store access tokens securely
- Handle token expiration and refresh properly
- Respect Instagram's terms of service

---

## **🗺️ Roadmap**

### **Short-term (1-2 months)**
- [ ] Add analytics charts and graphs
- [ ] Implement follower growth tracking
- [ ] Add post performance metrics
- [ ] Create content calendar feature

### **Medium-term (3-6 months)**
- [ ] Add competitor analysis tools
- [ ] Implement automated reporting
- [ ] Add team collaboration features
- [ ] Create mobile app companion

### **Long-term (6-12 months)**
- [ ] Add AI-powered insights
- [ ] Implement content optimization suggestions
- [ ] Add multi-platform support (TikTok, YouTube)
- [ ] Create API for third-party integrations

---

## **🤝 Contributing**

### **Getting Started**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Contribution Guidelines**

- Follow existing code style and patterns
- Add tests for new features
- Update documentation as needed
- Keep commits atomic and well-described

---

## **🐛 Troubleshooting**

### **Common Issues**

**Instagram OAuth not working:**
- Check that your Instagram app is properly configured
- Verify redirect URIs match exactly
- Ensure you have the correct permissions

**Database not persisting:**
- Check file permissions for `db.json`
- Ensure the file path is correct

**Build errors:**
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version compatibility

---

## **📝 Changelog**

### **v0.1.0 (Current)**
- Initial project setup with Next.js 16.2.7
- Instagram OAuth authentication with NextAuth.js v5
- Dashboard layout with responsive sidebar
- Account Info widget with user profile display
- LowDB integration for user data storage
- Dark mode UI with neumorphic design

---

## **📜 License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
