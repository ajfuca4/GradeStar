const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const classesRoutes = require('./classes');

// Mount route modules
router.use('/', authRoutes);
router.use('/classes', classesRoutes);

module.exports = router;
