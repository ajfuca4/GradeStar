const express = require('express');
const connectDB = require('./config/database');
const routes = require('./routes');

const app = express();

// Connect to database FIRST
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.use('/', routes);

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

