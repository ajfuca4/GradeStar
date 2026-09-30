require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const connectDB = require('./config/database');
const authRoutes = require('./features/auth/auth-routes');
const courseRoutes = require('./features/courses/course-routes');
const requireAuth = require('./middleware/require-auth');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use('/', authRoutes);
app.use('/courses', requireAuth, courseRoutes);
app.use(notFound);
app.use(errorHandler);

// Server
async function start() {
  await connectDB();

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

start();
