const express = require('express');
const router = express.Router();
const authService = require('./auth-service.js');

// GET / - Redirect to login
router.get('/', (req, res) => {
  res.redirect('/login');
});

// GET /login - Show login page
router.get('/login', (req, res) => {
  res.render("auth/login.ejs", { 
    title: "Login",
    emailVal: null,
    passwordVal: null,
    emailErrMsg: null,
    passwordErrMsg: null 
  });
});

// POST /login - Handle login submission
router.post("/login", async (req, res) => {
  // Get user data
  const inputData = {
    email: req.body.email,
    password: req.body.password
  }

  try {    
    // If user does not exist show an error.
    const userExists = await authService.findUserByEmail(inputData.email);
    if (!userExists) {
      res.render("auth/login.ejs", { 
        title: "Login",
        emailVal: inputData.email,
        passwordVal: inputData.password,
        emailErrMsg: "Incorrect login information.",
        passwordErrMsg: "Incorrect login information." 
      });
      return;
    }
    
    // Check if the password inputted matches the email 
    const isPasswordCorrect = await authService.isPasswordCorrect(inputData.password, userExists.password);
    if (isPasswordCorrect) {
      res.redirect("/courses");
    } else {
      res.render("auth/login.ejs", { 
        title: "Login",
        emailVal: inputData.email,
        passwordVal: inputData.password,
        emailErrMsg: "Incorrect login information.",
        passwordErrMsg: "Incorrect login information." 
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.render("auth/login.ejs", { 
      title: "Login",
      emailVal: inputData.email,
      passwordVal: inputData.password,
      emailErrMsg: "An error occurred. Please try again.",
      passwordErrMsg: null 
    });
  }
});

// GET /signup - Show signup page
router.get('/signup', (req, res) => {
  res.render("auth/signup.ejs", { 
    title: "Signup",
    emailVal: '',
    passwordVal: '',
    emailErrMsg: '',
    passwordErrMsg: '',
    initialLoad: true,
    validLength: false,
    containsUpper: false,
    containsLower: false,
    containsNumSpec: false 
  });
});

// POST /signup - Handle signup submission
router.post("/signup", async (req, res) => {
  // Get user data
  const inputData = {
    email: req.body.email,
    password: req.body.password
  }

  const result = await authService.signup(inputData.email, inputData.password);
  if (result.ok) {
    res.redirect('/login');
    return;
  }

  res.render("auth/signup.ejs", {
    title: "Signup",
    emailVal: inputData.email,
    passwordVal: inputData.password,
    emailErrMsg: result.emailErrMsg,
    passwordErrMsg: result.passwordErrMsg,
    initialLoad: false,
    validLength: result.validLength,
    containsUpper: result.containsUpper,
    containsLower: result.containsLower,
    containsNumSpec: result.containsNumSpec
  });
});

module.exports = router;
