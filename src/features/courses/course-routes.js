const express = require('express');
const router = express.Router();
const courseService = require('./course-service');

// GET /courses - Show courses page
router.get('/', (req, res) => {
  res.render("courses/courses.ejs", {
    title: "Courses",
    email: "Test",
    courses: courseService.getCourses(),
  });
});

module.exports = router;
