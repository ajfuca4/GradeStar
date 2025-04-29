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