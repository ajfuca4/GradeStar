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
    emailErrMsg: null,
    passwordErrMsg: null });
});

app.get('/signup', (req, res) => {
  res.render("signup.ejs", { 
    emailVal: null,
    passwordVal: null,
    emailErrMsg: null,
    passwordErrMsg: null })
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

  // Get user data
  const data = {
    email: req.body.email,
    password: req.body.password
  }

  try {

    // Check if users email exists in database
    const userExists = await collection.findOne({ email: data.email })
    
    // If user does not exist show an error.
    if (!userExists) {
      res.render("login", { 
        emailVal: data.email,
        passwordVal: data.password,
        emailErrMsg: "Incorrect login information.",
        passwordErrMsg: "Incorrect login information." 
      });
    }
    
    // Check if the password inputted matches the email 
    const isPasswordCorrect = await bcrypt.compare(req.body.password, check.password);
    if (isPasswordCorrect) {
      const username = req.body.username;
      res.render("dashboard", {username})
    }
    else {
      res.render("login", { 
        emailVal: data.email,
        passwordVal: data.password,
        emailErrMsg: "Incorrect login information.",
        passwordErrMsg: "Incorrect login information." 
      });
    }
  }
  catch {

  }
})

const port = 3000;
app.listen(port, () => {
  console.log(`Connected to port ${port}`)
})