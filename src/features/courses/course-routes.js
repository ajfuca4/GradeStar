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
    '/scripts/courses/popup.js',
  ],
};

const coursePageStyles = [
  '/styles/shared/nav.css',
  '/styles/shared/content.css',
  '/styles/courses/courses.css',
  '/styles/courses/course-card.css',
  '/styles/courses/course.css',
];

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

// POST /courses - Create a course and return its id
router.post('/', async (req, res, next) => {
  const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
  const code = typeof req.body.code === 'string' ? req.body.code.trim() : '';

  if (!title || !code) {
    res.status(400).json({ error: 'Enter a course code and title.' });
    return;
  }

  try {
    const course = await courseService.createCourse(req.session.userId, { title, code });
    if (!course) {
      res.status(401).json({ error: 'Sign in to create a course.' });
      return;
    }

    res.status(201).json({ id: course._id.toString() });
  } catch (error) {
    next(error);
  }
});

// GET /courses/:courseId - Show one course
router.get('/:courseId', async (req, res, next) => {
  try {
    const course = await courseService.getCourseForUser(req.session.userId, req.params.courseId);
    if (!course) {
      res.status(404).render('errors/404.ejs');
      return;
    }

    const pageTitle = course.code ? `${course.code} · ${course.title}` : course.title;
    res.render('layouts/app.ejs', {
      title: pageTitle,
      showNav: true,
      contentPartial: '../courses/course.ejs',
      styles: coursePageStyles,
      scripts: [
        '/scripts/shared/general.js',
        '/scripts/shared/nav.js',
      ],
      course,
      tasks: courseService.listCourseTasks(course),
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
