const express = require('express');
const session = require('express-session');
const connectDB = require('./config/database');
const authRoutes = require('./features/auth/auth-routes');
const coursesRoutes = require('./features/courses/course-routes');

const app = express();

// Connect to database FIRST
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.use('/', authRoutes);
app.use('/courses', coursesRoutes);

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



