const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { logger } = require('./utils/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Initialize Firebase Firestore
const { db } = require('./config/firestore');

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());
app.use(logger);

// Route Handlers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', database: 'firestore', projectId: process.env.FIREBASE_PROJECT_ID || 'codeorbit-70b7c', timestamp: new Date() });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[DevGrowth Server] running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
