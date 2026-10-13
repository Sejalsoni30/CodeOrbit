# DevGrowth 🚀

A Developer Growth & Career Intelligence Platform built with **React, Vite, Tailwind CSS, Node.js, Express, MongoDB, Firebase Auth, and Google Gemini AI**.

---

## 📁 Project Structure

```text
devgrowth/
├── client/                              # Frontend (React + Vite + Tailwind CSS)
│   ├── public/                          # Favicon, static assets, index.html
│   ├── src/
│   │   ├── assets/                      # Images, SVG icons, logo files
│   │   ├── components/                  # Reusable UI components
│   │   │   ├── common/                  # Buttons, Badges, Modals, Inputs
│   │   │   ├── layout/                  # Navbar, Sidebar, Footer, PageWrapper
│   │   │   └── dashboard/               # StatCard, Heatmap, ActivityWidget
│   │   ├── context/                     # React Context API providers
│   │   │   ├── AuthContext.jsx          # Firebase auth state & session listener
│   │   │   └── ThemeContext.jsx         # Light/dark or platform theme state
│   │   ├── hooks/                       # Custom React hooks
│   │   │   ├── useAuth.js               # Consume AuthContext easily
│   │   │   └── useFetch.js              # Reusable API fetching hook
│   │   ├── pages/                       # Route views
│   │   │   ├── Dashboard.jsx            # Main metrics & overview
│   │   │   ├── SkillTracker.jsx         # Proficiency bars & categories
│   │   │   ├── DailyGoals.jsx           # Daily tasks checklist & streak counter
│   │   │   ├── Analytics.jsx            # Recharts graphs & progress insights
│   │   │   ├── Roadmap.jsx              # Career goal milestones
│   │   │   ├── Portfolio.jsx            # Project cards & GitHub links
│   │   │   └── AIAssistant.jsx          # Gemini AI career advice interface
│   │   ├── services/                    # API communication layer
│   │   │   ├── api.js                   # Axios instance with interceptors
│   │   │   ├── authService.js           # Auth endpoints
│   │   │   ├── skillService.js          # Skill tracker endpoints
│   │   │   ├── goalService.js           # Daily goals endpoints
│   │   │   ├── projectService.js        # Portfolio project endpoints
│   │   │   └── aiService.js             # Gemini AI query endpoints
│   │   ├── utils/                       # Helper functions & formatters
│   │   │   ├── dateHelper.js            # Streak & date formatting utils
│   │   │   └── validators.js            # Form validation helpers
│   │   ├── App.jsx                      # Main router & protected layout wrappers
│   │   ├── index.css                    # Tailwind directives & custom styles
│   │   └── main.jsx                     # React root mount
│   ├── .env                             # Frontend environment variables (Firebase config)
│   ├── tailwind.config.js               # Tailwind configuration & theme extension
│   ├── postcss.config.js                # PostCSS configuration
│   └── package.json                     # Frontend dependencies & scripts
│
├── server/                              # Backend (Node.js + Express + MongoDB)
│   ├── src/
│   │   ├── config/                      # Database & third-party initializers
│   │   │   ├── db.js                    # Mongoose MongoDB connection
│   │   │   └── firebaseAdmin.js         # Firebase Admin SDK setup
│   │   ├── controllers/                 # Request handlers & core business logic
│   │   │   ├── authController.js        # User sync & session management
│   │   │   ├── userController.js        # Profile & target role controllers
│   │   │   ├── skillController.js       # CRUD for developer skills
│   │   │   ├── goalController.js        # Daily learning goals management
│   │   │   ├── projectController.js     # Portfolio project tracking
│   │   │   └── aiController.js          # Gemini API career advice integration
│   │   ├── middleware/                  # Express middleware functions
│   │   │   ├── authMiddleware.js        # Firebase token verification
│   │   │   ├── errorMiddleware.js       # Global error handling & formatting
│   │   │   └── validationMiddleware.js  # Request body validation rules
│   │   ├── models/                      # Mongoose Schemas
│   │   │   ├── User.js                  # User schema
│   │   │   ├── Skill.js                 # Skill proficiency schema
│   │   │   ├── Goal.js                  # Daily learning goal schema
│   │   │   └── Project.js               # Project portfolio schema
│   │   ├── routes/                      # API endpoint routers
│   │   │   ├── authRoutes.js            # /api/auth routes
│   │   │   ├── userRoutes.js            # /api/users routes
│   │   │   ├── skillRoutes.js           # /api/skills routes
│   │   │   ├── goalRoutes.js            # /api/goals routes
│   │   │   ├── projectRoutes.js         # /api/projects routes
│   │   │   └── aiRoutes.js              # /api/ai routes
│   │   ├── utils/                       # Backend utility scripts
│   │   │   └── logger.js                # Morgan / Winston logging config
│   │   └── server.js                    # Express application entry point
│   ├── .env                             # Backend environment variables (MONGO_URI, GEMINI_API_KEY)
│   └── package.json                     # Backend dependencies & scripts
│
└── README.md                            # Project documentation & setup guide
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios with interceptors
- **Authentication**: Firebase Authentication
- **Visuals & Charts**: Recharts & Lucide React Icons

### Backend
- **Runtime**: Node.js & Express
- **Database**: MongoDB with Mongoose ODM
- **Auth Verification**: Firebase Admin SDK
- **AI Integration**: Google Gemini API
- **Logging**: Morgan HTTP logger

---

## ⚙️ Setup & Installation

### 1. Clone & Navigate
```bash
cd devgrowth
```

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env # Update MongoDB, Firebase, and Gemini credentials
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
cp .env.example .env # Update Firebase credentials
npm run dev
```

---

## 🛡️ License
MIT License.
