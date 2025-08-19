const express = require('express');
const collection = require('./config');
const path = require('path');
const bcrypt = require('bcrypt');
const { name } = require('ejs');

const app = express();

// Convert data to JSON
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Use EJS as the view engine
app.set('view engine', 'ejs');
// Static file
app.use(express.static('public'));







app.get('/login', (req, res) => {
  res.render("login.ejs", { 
    emailVal: null,
    passwordVal: null,
    emailErrMsg: null });
});

app.get('/signup', (req, res) => {
  res.render("signup.ejs", { 
    emailVal: null,
    passwordVal: null,
    emailErrMsg: null })
});

app.post("/signup", async (req, res) => {
  
  // Get user data
  const data = {
    email: req.body.email,
    password: req.body.password
  }

  // Check if user already exists
  const userExists = await collection.findOne({email: data.email});

  // If user exists show error
  if(userExists) {
    res.render("signup", { 
      emailVal: data.email,
      passwordVal: data.password,
      emailErrMsg: "There is already an account with this email." 
    });
  }
  // Otherwise, create new user
  else {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;

    const userdata = await collection.insertMany(data);
    console.log(userdata);
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    // Check if user exists in database
    const userExists = await collection.findOne({ name: req.body.username })
    if (!userExists) {
      // If not, Show an error.
      res.render();
    }
  }
  catch {

  }
})

const port = 3000;
app.listen(port, () => {
  console.log(`Connected to port ${port}`)
})