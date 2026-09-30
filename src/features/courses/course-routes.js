const express = require('express');
const router = express.Router();
const courseService = require('./course-service');

// GET /courses - Show courses page
router.get('/', async (req, res, next) => {
  try {
    const courses = await courseService.getCoursesForUser(req.session.userId);
    res.render("courses/courses.ejs", {
      title: "Courses",
      email: "Test",
      courses,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
