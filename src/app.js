const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./features/auth/auth-routes');
const coursesRoutes = require('./features/courses/course-routes');
const addCoursePopupRoutes = require('./features/courses/add-course-popup');

const app = express();

// Connect to database FIRST
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.use('/', authRoutes);
app.use('/courses', coursesRoutes);
app.use('/popup/add-courses', addCoursePopupRoutes);

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



