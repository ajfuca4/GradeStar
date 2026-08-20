const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const classesRoutes = require('./classes');
const popupRoutes = require('./PopupViewRoutes');

// Mount route modules
router.use('/', authRoutes);
router.use('/classes', classesRoutes);
router.use('/popup', popupRoutes);

module.exports = router;
