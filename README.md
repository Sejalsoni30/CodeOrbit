<div align="center">

# 🪐 CodeOrbit

### **Developer Career Velocity & Engineering Intelligence Platform**

An executive growth suite empowering software engineers to benchmark technical proficiency, manage daily development sprints, navigate career milestones, and consult an AI mentor — powered by **React 18**, **Tailwind CSS**, **Node.js Express**, **Firebase Firestore**, and **Google Gemini 2.5 AI**.

<br />

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Firebase Firestore](https://img.shields.io/badge/Firebase_Firestore-Cloud_DB-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini_AI-2.5_Flash-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

<br />

[Live Demo](#-production-deployment) • [Key Features](#-core-capabilities) • [Architecture](#-system-architecture) • [Security & Secrets](#-security--secrets-hygiene) • [Getting Started](#-getting-started) • [Deployment Guide](#-production-deployment)

---

</div>

## ✨ Core Capabilities

- **📊 Personal Engineering Hub**: Real-time velocity tracking, sprint burn-down, commit contribution heatmaps, and weekly output analytics.
- **⚡ Skill Velocity Tracker**: Categorized competency mapping (Frontend, Backend, Database, Systems Architecture) with verified proficiency bars.
- **🎯 Daily Sprint & Goal System**: Micro-milestone task lists, dynamic streak counters, and instant Firestore status syncing.
- **🗺️ Leveling Roadmap**: Structured progression path across engineering tiers (L4 Associate → L5 Senior → L6 Staff → Principal Engineer).
- **💼 Executive Profile Customizer**: Live-preview customization of engineer titles, seniority levels, custom bio, and deterministic gradient avatars with zero broken image fallback.
- **🤖 Gemini AI Career Mentor**: Intelligent architectural analysis, mock interview prep, and personalized promotion roadmaps via Google Gemini 2.5.
- **🛡️ Multi-Factor Security (2FA)**: Two-Factor Authentication with Google Authenticator QR provisioning and TOTP verification codes.

---

## 🏛️ System Architecture

```text
CodeOrbit/
├── devgrowth/
│   ├── client/                  # Frontend Single Page Application (SPA)
│   │   ├── src/
│   │   │   ├── components/      # Modular UI components (Dashboard, Auth, Profile, Layout)
│   │   │   ├── context/         # AuthContext (Firebase & Demo) & ThemeContext
│   │   │   ├── pages/           # Dashboard, Skills, Goals, Roadmap, Portfolio, AI Advisor
│   │   │   ├── services/        # Axios API client with bearer token interceptors
│   │   │   └── config/          # Firebase Web client initialization
│   │   ├── vercel.json          # SPA routing rules for Vercel
│   │   └── package.json
│   │
│   └── server/                  # Backend REST API
│       ├── src/
│       │   ├── config/          # Cloud Firestore database engine & Admin SDK
│       │   ├── controllers/     # Skills, Goals, Projects, User Profile, AI handlers
│       │   ├── middleware/      # Auth verification, error logger, schema validators
│       │   ├── routes/          # Express route definitions mounted on /api/*
│       │   └── server.js        # Server bootstrap & health endpoints
│       └── package.json
│
├── .gitignore                   # Multi-tier secret isolation rules
└── README.md
```

---

## 🔒 Security & Secrets Hygiene

This repository enforces strict security practices to ensure credentials are never exposed:

1. **Zero Secret Leakage**: No `.env` files, API keys, private certificates, or `serviceAccountKey.json` files are tracked in version control.
2. **Standardized Environment Templates**: Public references exclusively utilize sanitized `.env.example` templates with generic placeholders.
3. **Multi-Tier Git Exclusion**: Root and package-level `.gitignore` configurations isolate all sensitive credentials, runtime data caches, and build artifacts.
4. **Graceful Authentication Fallback**: The client and server include resilient development adapters that permit seamless local testing without exposing live cloud keys.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v18.0.0` or higher
- **npm** `v9.0.0` or higher
- A **Firebase Project** with Firestore & Authentication enabled
- A **Google Gemini API Key** (optional, for AI features)

---

### Step 1: Clone Repository

```bash
git clone https://github.com/Sejalsoni30/CodeOrbit.git
cd CodeOrbit
```

---

### Step 2: Configure Environment Variables

#### Backend (`devgrowth/server`)
```bash
cd devgrowth/server
cp .env.example .env
```
Fill in `.env` with your project parameters:
```ini
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
GEMINI_API_KEY=your_gemini_api_key
```

#### Frontend (`devgrowth/client`)
```bash
cd ../client
cp .env.example .env
```
Fill in `.env` with your Firebase web configuration:
```ini
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

---

### Step 3: Run Locally

#### Start Backend:
```bash
cd devgrowth/server
npm install
npm run dev
# Backend runs on http://localhost:5000
```

#### Start Frontend:
```bash
cd devgrowth/client
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🌐 Production Deployment

CodeOrbit is architected for zero-friction cloud deployment using **Render** for the backend API and **Vercel** for the client application.

### 1. Deploy Backend on Render (Web Service)

1. Create an account on **[Render](https://render.com)** and connect your GitHub repository.
2. Select **New Web Service** → choose `Sejalsoni30/CodeOrbit`.
3. Set the build parameters:
   - **Root Directory**: `devgrowth/server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
4. Add Environment Variables in the Render dashboard:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `FIREBASE_PROJECT_ID`: *your_project_id*
   - `CLIENT_URL`: *your_vercel_app_url*
   - `GEMINI_API_KEY`: *your_gemini_key*
5. Click **Create Web Service** and copy your live service URL (e.g. `https://your-api.onrender.com`).

---

### 2. Deploy Frontend on Vercel

1. Create an account on **[Vercel](https://vercel.com)** and click **Add New Project**.
2. Select repository `Sejalsoni30/CodeOrbit`.
3. Configure the deployment parameters:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `devgrowth/client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variables in the Vercel dashboard:
   - `VITE_API_URL`: `https://your-api.onrender.com/api`
   - `VITE_FIREBASE_API_KEY`: *your_firebase_api_key*
   - `VITE_FIREBASE_AUTH_DOMAIN`: *your_project.firebaseapp.com*
   - `VITE_FIREBASE_PROJECT_ID`: *your_project_id*
   - `VITE_FIREBASE_STORAGE_BUCKET`: *your_project.firebasestorage.app*
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`: *your_messaging_sender_id*
   - `VITE_FIREBASE_APP_ID`: *your_firebase_app_id*
5. Click **Deploy**.

> **Note on Client Routing:** This repository includes [`devgrowth/client/vercel.json`](file:///d:/CodeOrbit/devgrowth/client/vercel.json) to handle Single Page Application rewrite rules automatically, preventing 404 errors on deep routes.

---

## 📡 API Reference Summary

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/health` | Service health & Firestore status | No |
| `POST` | `/api/auth/sync` | Synchronize Firebase user record | Yes |
| `GET` | `/api/users/:id` | Fetch developer profile & streak | No |
| `PUT` | `/api/users/profile` | Update user title, bio, and avatar | Yes |
| `GET` | `/api/skills` | List all tracked developer skills | Yes |
| `POST` | `/api/skills` | Create a new skill & proficiency | Yes |
| `GET` | `/api/goals` | List daily tasks & engineering goals | Yes |
| `POST` | `/api/goals` | Create a daily task | Yes |
| `PATCH` | `/api/goals/:id/toggle` | Toggle goal completion state | Yes |
| `GET` | `/api/projects` | Fetch developer portfolio projects | Yes |
| `POST` | `/api/ai/advice` | Query Gemini Career Advisor | Yes |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
