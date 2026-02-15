const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const passwordPolicy = require('../utils/password-policy.js');
const emailValidation = require('../utils/email-validation.js');

// GET /login - Show login page
router.get('/login', (req, res) => {
  res.render("login.ejs", { 
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
    // Check if users email exists in database
    const userExists = await User.findOne({ email: inputData.email })
    
    // If user does not exist show an error.
    if (!userExists) {
      res.render("login", { 
        title: "Login",
        emailVal: inputData.email,
        passwordVal: inputData.password,
        emailErrMsg: "Incorrect login information.",
        passwordErrMsg: "Incorrect login information." 
      });
      return;
    }
    
    // Check if the password inputted matches the email 
    const isPasswordCorrect = await bcrypt.compare(inputData.password, userExists.password);
    if (isPasswordCorrect) {
      res.render("home", { title: "Home", email: userExists.email });
    } else {
      res.render("login", { 
        title: "Login",
        emailVal: inputData.email,
        passwordVal: inputData.password,
        emailErrMsg: "Incorrect login information.",
        passwordErrMsg: "Incorrect login information." 
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.render("login", { 
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
  res.render("signup.ejs", { 
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

  // Set the default values of all the variables in the ejs page
  const renderVals = {
    title: "Signup",
    emailVal: inputData.email,
    passwordVal: inputData.password,
    emailErrMsg: null,
    passwordErrMsg: null,
    initialLoad: false,
    validLength: passwordPolicy.passwordLengthReq(inputData.password),
    containsUpper: passwordPolicy.passwordUpperReq(inputData.password),
    containsLower: passwordPolicy.passwordLowerReq(inputData.password),
    containsNumSpec: passwordPolicy.passwordSpecialReq(inputData.password)
  }

  // Check if user already exists
  const userExists = await User.findOne({email: inputData.email});
  if (userExists || !passwordPolicy.isPasswordValid(inputData.password) || !emailValidation.isValidEmail(inputData.email)) {
    if (!emailValidation.isValidEmail(inputData.email)) {
      renderVals.emailErrMsg = "This is not a valid email."
    } 
    else if (userExists) {
      renderVals.emailErrMsg = "An account already exists with this email."
    }

    if (!passwordPolicy.isPasswordValid(inputData.password)) {
      renderVals.passwordErrMsg = "Password does not meet all the requirements.";
    }
    res.render("signup.ejs", renderVals);
  }
  // Otherwise, create new user
  else {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(inputData.password, saltRounds);
    inputData.password = hashedPassword;

    const userdata = await User.insertMany(inputData);
    console.log(userdata);
    // Redirect to login after successful signup
    res.redirect('/login');
  }
});

module.exports = router;
