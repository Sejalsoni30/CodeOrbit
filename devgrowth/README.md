# DevGrowth 🚀

> **Engineering Career Intelligence Platform**  
> Full-Stack Application powered by **React 18, Vite, Tailwind CSS, Node.js Express, Firebase Firestore, and Google Gemini AI**.

---

## 📁 Architecture Overview

```text
devgrowth/
├── client/                              # Frontend (React 18 + Vite + Tailwind CSS)
│   ├── public/                          # Favicon & static public assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/                  # Reusable UI elements (UserAvatar, Buttons, Modals)
│   │   │   ├── layout/                  # Navbar, Sidebar, Footer, PageWrapper
│   │   │   ├── dashboard/               # StatCard, Heatmap, ActivityWidget
│   │   │   ├── profile/                 # ProfileModal for title, tier, & avatar management
│   │   │   └── auth/                    # AuthModal & GoogleAuthenticatorModal (2FA)
│   │   ├── context/                     # AuthContext (Firebase + Demo) & ThemeContext
│   │   ├── hooks/                       # Custom React hooks (useAuth, useFetch)
│   │   ├── pages/                       # Dashboard, SkillTracker, DailyGoals, Analytics, Roadmap, Portfolio, AIAssistant, AuthPage
│   │   ├── services/                    # API communication layer (Axios interceptors)
│   │   ├── config/                      # Firebase client configuration
│   │   └── index.css                    # Tailwind CSS directives & glassmorphism utilities
│   ├── vercel.json                      # Single Page Application rewrite rules for Vercel
│   ├── .env.example                     # Sanitized environment template
│   └── package.json
│
└── server/                              # Backend (Node.js + Express + Firebase Firestore)
    ├── src/
    │   ├── config/                      # Firestore database engine & Admin SDK initialization
    │   ├── controllers/                 # Business logic for Auth, Users, Skills, Goals, Projects, and Gemini AI
    │   ├── middleware/                  # Auth token verification & error middleware
    │   ├── routes/                      # REST API routing (/api/*)
    │   └── server.js                    # Express application entry point
    ├── .env.example                     # Sanitized environment template
    └── package.json
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide React, Recharts |
| **Backend** | Node.js, Express, Firebase Admin SDK |
| **Database** | Google Cloud Firestore (Document Collections) |
| **Authentication** | Firebase Authentication (Email/Password, Google OAuth, 2FA TOTP) |
| **AI Integration** | Google Gemini 2.5 AI SDK |
| **Deployment** | Vercel (Client SPA) & Render (Express Web Service) |

---

## 🔒 Security Policy

- All sensitive keys (`FIREBASE_API_KEY`, `GEMINI_API_KEY`, `serviceAccountKey.json`, `.env`) are **strictly excluded** from version control via `.gitignore`.
- Production credentials should be injected securely via platform environment variable dashboards (Vercel & Render).

---

## 📄 License
MIT License.
