const express = require('express');
const router = express.Router();
const authService = require('./auth-service.js');

const loginLayout = {
  title: 'Login',
  showNav: false,
  contentPartial: '../auth/login.ejs',
  styles: [],
  scripts: ['/scripts/shared/general.js'],
};

const signupLayout = {
  title: 'Signup',
  showNav: false,
  contentPartial: '../auth/signup.ejs',
  styles: [],
  scripts: [
    '/scripts/shared/general.js',
    '/scripts/auth/email.js',
    '/scripts/auth/password.js',
  ],
};

// GET / - Redirect to login
router.get('/', (req, res) => {
  res.redirect('/login');
});

// GET /login - Show login page
router.get('/login', (req, res) => {
  res.render('layouts/app.ejs', {
    ...loginLayout,
    emailVal: null,
    passwordVal: null,
    emailErrMsg: null,
    passwordErrMsg: null,
  });
});

// POST /login - Handle login submission
router.post('/login', async (req, res, next) => {
  const inputData = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const result = await authService.login(inputData.email, inputData.password);
    if (result.ok) {
      req.session.userId = result.user._id.toString();
      res.redirect('/courses');
      return;
    }

    res.render('layouts/app.ejs', {
      ...loginLayout,
      emailVal: inputData.email,
      passwordVal: inputData.password,
      emailErrMsg: 'Incorrect login information.',
      passwordErrMsg: 'Incorrect login information.',
    });
  } catch (error) {
    next(error);
  }
});

// GET /signup - Show signup page
router.get('/signup', (req, res) => {
  res.render('layouts/app.ejs', {
    ...signupLayout,
    emailVal: '',
    passwordVal: '',
    emailErrMsg: '',
    passwordErrMsg: '',
    initialLoad: true,
    validLength: false,
    containsUpper: false,
    containsLower: false,
    containsNumSpec: false,
  });
});

// POST /signup - Handle signup submission
router.post('/signup', async (req, res, next) => {
  const inputData = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const result = await authService.signup(inputData.email, inputData.password);
    if (result.ok) {
      res.redirect('/login');
      return;
    }

    res.render('layouts/app.ejs', {
      ...signupLayout,
      emailVal: inputData.email,
      passwordVal: inputData.password,
      emailErrMsg: result.emailErrMsg,
      passwordErrMsg: result.passwordErrMsg,
      initialLoad: false,
      validLength: result.validLength,
      containsUpper: result.containsUpper,
      containsLower: result.containsLower,
      containsNumSpec: result.containsNumSpec,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
