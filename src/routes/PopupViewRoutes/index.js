const express = require('express');
const router = express.Router();
const addClassPopupRoutes = require('./add-class-popup');

router.use('/add-class', addClassPopupRoutes);

module.exports = router