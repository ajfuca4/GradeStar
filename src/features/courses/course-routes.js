const express = require('express');
const router = express.Router();
const courseService = require('./course-service');

const coursesLayout = {
  title: 'Courses',
  showNav: true,
  contentPartial: '../courses/courses.ejs',
  styles: [
    '/styles/shared/nav.css',
    '/styles/shared/popup.css',
    '/styles/shared/content.css',
    '/styles/courses/courses.css',
    '/styles/courses/course-card.css',
  ],
  scripts: [
    '/scripts/shared/general.js',
    '/scripts/shared/nav.js',
    '/scripts/courses/add-course.js',
  ],
};

// GET /courses - Show courses page
router.get('/', async (req, res, next) => {
  try {
    const courses = await courseService.getCoursesForUser(req.session.userId);
    res.render('layouts/app.ejs', {
      ...coursesLayout,
      email: 'Test',
      courses,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
