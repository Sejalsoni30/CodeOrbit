# 🚀 CodeOrbit (DevGrowth)

> **Engineering Career Velocity & Developer Growth Platform**  
> Powered by **React 18**, **Tailwind CSS**, **Node.js Express**, **Firebase Firestore**, and **Google Gemini 2.5 AI**.

---

## 📁 Repository Structure

```bash
CodeOrbit/
├── devgrowth/
│   ├── client/          # Frontend React SPA (Vite + React Router + Tailwind CSS)
│   │   ├── src/
│   │   ├── vercel.json  # Vercel SPA routing rewrites
│   │   └── package.json
│   └── server/          # Backend REST API (Express + Firebase Firestore + Gemini AI)
│       ├── src/
│       └── package.json
├── .gitignore
└── README.md
```

---

## 🛠️ Local Development Setup

### 1. Backend Server (`devgrowth/server`)
```bash
cd devgrowth/server
npm install
npm run dev
# Server runs on http://localhost:5000
```

### 2. Frontend Client (`devgrowth/client`)
```bash
cd devgrowth/client
npm install
npm run dev
# Client runs on http://localhost:5173
```

---

## 🌐 Production Deployment

### 1. Deploy Frontend on **Vercel**
1. Import repository on [Vercel](https://vercel.com).
2. Set **Root Directory** to `devgrowth/client`.
3. Set **Framework Preset** to `Vite`.
4. Configure Environment Variables:
   - `VITE_API_URL`: Your Render backend URL (e.g. `https://your-api.onrender.com/api`)
   - `VITE_FIREBASE_API_KEY`: `AIzaSyDKPpE-nIe2jDUfGjtj071LqKJHVm4JzbM`
   - `VITE_FIREBASE_AUTH_DOMAIN`: `codeorbit-70b7c.firebaseapp.com`
   - `VITE_FIREBASE_PROJECT_ID`: `codeorbit-70b7c`
   - `VITE_FIREBASE_STORAGE_BUCKET`: `codeorbit-70b7c.firebasestorage.app`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`: `331221127135`
   - `VITE_FIREBASE_APP_ID`: `1:331221127135:web:0ce3889390f9426e753e6a`
5. Click **Deploy**.

### 2. Deploy Backend on **Render**
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository `Sejalsoni30/CodeOrbit`.
3. Set **Root Directory** to `devgrowth/server`.
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `node src/server.js`
6. Add Environment Variables:
   - `PORT`: `5000` (or Render will assign `$PORT`)
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: Your Vercel frontend URL (e.g. `https://codeorbit.vercel.app`)
   - `FIREBASE_PROJECT_ID`: `codeorbit-70b7c`
   - `GEMINI_API_KEY`: Your Gemini API Key
7. Click **Deploy Web Service**.
