const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
//const blogRoutes = require('./routes/blogRoutes.js');

// Express App
const app = express();

// Connect to MongoDB
const dbURI = process.env.MONGO_URI;

// Listenting for Requests
mongoose.connect(dbURI, {})
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// Register View Engine
app.set('view engine', 'ejs');

// Middleware & Static Files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// Routes
// Redirect '/' to 'Home'
app.get('/', (req, res) => {
  res.redirect('/home');
});

// Home page
app.get('/home', (req, res) => {
  res.render('home', { title: 'Home' });
});

// Collections page
app.get('/collections', (req, res) => {
  res.render('collections', { title: 'Collections' });
});

// Upcoming Tasks page
app.get('/assignments', (req, res) => {
  res.render('assignments', { title: 'Assignments' });
});

// Settings page
app.get('/settings', (req, res) => {
  res.render('settings', { title: 'Settings' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});