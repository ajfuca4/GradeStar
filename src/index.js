const express = require('express');
const collection = require('./config');
//const path = require('path');
const bcrypt = require('bcrypt');
//const { name } = require('ejs');
const passwordPolicy = require('./utils/password-policy.js');
const emailValidation = require('./utils/email-validation.js');

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
    emailVal: '',
    passwordVal: '',
    emailErrMsg: '',
    passwordErrMsg: '',
    initialLoad: true,
    validLength: false,
    containsUpper: false,
    containsLower: false,
    containsNumSpec: false })
});

app.post("/signup", async (req, res) => {
  
  // Get user data
  const inputData = {
    email: req.body.email,
    password: req.body.password
  }

  // Set the default values of all the variables in the ejs page
  const renderVals = {
    emailVal: inputData.email,
    passwordVal: inputData.password,
    emailErrMsg: null,
    passwordErrMsg: null,
    initialLoad: false,
    validLength: passwordPolicy.lengthReq(inputData.password),
    containsUpper: passwordPolicy.upperReq(inputData.password),
    containsLower: passwordPolicy.lowerReq(inputData.password),
    containsNumSpec: passwordPolicy.numSpecReq(inputData.password)
  }

  // Check if user already exists
  const userExists = await collection.findOne({email: inputData.email});
  console.log(1);
  if (userExists || !passwordPolicy.isValidPassword(inputData.password) || !emailValidation.isValidEmail(inputData.email)) {
    console.log(2);
    if (!emailValidation.isValidEmail(inputData.email)) {
      console.log(3);
      console.log("this works");
      renderVals.emailErrMsg = "This is not a valid email."
    } 
    else if (userExists) {
      console.log(3);
      renderVals.emailErrMsg = "An account already exists with this email."
    }

    if (!passwordPolicy.isValidPassword(inputData.password)) {
      console.log(4);
      renderVals.passwordErrMsg = "Password does not meet all the requirements.";
    }
    console.log(5);
    res.render("signup.ejs", renderVals);
  }
  // Otherwise, create new user
  else {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(inputData.password, saltRounds);
    inputData.password = hashedPassword;

    const userdata = await collection.insertMany(inputData);
    console.log(userdata);
  }
});

// Login Route
app.post("/login", async (req, res) => {
  
  // Get user data
  const inputData = {
    email: req.body.email,
    password: req.body.password
  }

  try {

    // Check if users email exists in database
    const userExists = await collection.findOne({ email: inputData.email })
    
    // If user does not exist show an error.
    console.log(!userExists);
    if (!userExists) {
      res.render("login", { 
        emailVal: inputData.email,
        passwordVal: inputData.password,
        emailErrMsg: "Incorrect login information.",
        passwordErrMsg: "Incorrect login information." 
      });
    }
    
    // Check if the password inputted matches the email 
    const isPasswordCorrect = await bcrypt.compare(inputData.password, userExists.password);
    console.log(isPasswordCorrect);
    if (isPasswordCorrect) {

      res.render("home", { email: userExists.email });
    }
    else {
      res.render("login", { 
        emailVal: inputData.email,
        passwordVal: inputData.password,
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