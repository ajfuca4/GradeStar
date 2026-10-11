const express = require('express');
const router = express.Router();
const courseService = require('./course-service');

const coursesLayout = {
  title: 'Courses',
  showNav: true,
  activeNav: 'courses',
  contentPartial: '../courses/courses.ejs',
  styles: [
    '/styles/shared/nav.css',
    '/styles/shared/popup.css',
    '/styles/shared/content.css',
    '/styles/shared/dropdown.css',
    '/styles/courses/courses.css',
    '/styles/courses/course-card.css',
  ],
  scripts: [
    '/scripts/shared/general.js',
    '/scripts/shared/nav.js',
    '/scripts/courses/popup.js',
    '/scripts/courses/options.js',
  ],
};

const coursePageStyles = [
  '/styles/shared/nav.css',
  '/styles/shared/content.css',
  '/styles/shared/calendar.css',
  '/styles/courses/courses.css',
  '/styles/courses/course-card.css',
  '/styles/courses/course.css',
];

// GET /courses - Show courses page
router.get('/', async (req, res, next) => {
  try {
    const courses = await courseService.getCoursesForUser(req.session.userId);
    const terms = courseService.getUniqueTermsForCourses(courses);
    res.render('layouts/app.ejs', {
      ...coursesLayout,
      email: 'Test',
      courses,
      terms,
    });
  } catch (error) {
    next(error);
  }
});

// POST /courses - Create a course and return its id
router.post('/', async (req, res, next) => {
  const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
  const code = typeof req.body.code === 'string' ? req.body.code.trim() : '';
  const term = typeof req.body.term === 'string' ? req.body.term.trim() : '';

  if (!title || !code) {
    res.status(400).json({ error: 'Enter a course code and title.' });
    return;
  }

  try {
    const course = await courseService.createCourse(req.session.userId, { title, code, term });
    if (!course) {
      res.status(401).json({ error: 'Sign in to create a course.' });
      return;
    }

    res.status(201).json({ id: course._id.toString() });
  } catch (error) {
    next(error);
  }
});

// GET /courses/:courseId/calendar - Get calendar data for a specific month (JSON)
router.get('/:courseId/calendar', async (req, res, next) => {
  try {
    const course = await courseService.getCourseForUser(req.session.userId, req.params.courseId);
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    const targetDate = courseService.parseCalendarQuery(req.query);
    const calendar = courseService.buildCourseCalendar(course, targetDate);
    res.json(calendar);
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

    const targetDate = courseService.parseCalendarQuery(req.query);
    const calendar = courseService.buildCourseCalendar(course, targetDate);

    if (req.query.format === 'json' || req.headers.accept?.includes('application/json')) {
      res.json(calendar);
      return;
    }

    const pageTitle = course.code ? `${course.code} · ${course.title}` : course.title;
    res.render('layouts/app.ejs', {
      title: pageTitle,
      showNav: true,
      activeNav: 'courses',
      contentPartial: '../courses/course.ejs',
      styles: coursePageStyles,
      scripts: [
        '/scripts/shared/general.js',
        '/scripts/shared/nav.js',
        '/scripts/shared/calendar.js',
      ],
      course,
      tasks: courseService.listCourseTasks(course),
      calendar,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /courses/:courseId
router.delete('/:courseId', async (req, res, next) => {
  try {
    const terms = await courseService.deleteCourse(req.session.userId, req.params.courseId);
    if (terms === null) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json({ terms });
  } catch (err) {
    next(err);
  }
});

// POST /courses/:courseId/duplicate
router.post('/:courseId/duplicate', async (req, res, next) => {
  try {
    const course = await courseService.duplicateCourse(req.session.userId, req.params.courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    const courses = await courseService.getCoursesForUser(req.session.userId);
    const terms = courseService.getUniqueTermsForCourses(courses);
    res.status(201).json({
      id: course._id.toString(),
      course: {
        _id: course._id.toString(),
        title: course.title,
        code: course.code,
        term: course.term,
        grade: course.grade,
      },
      terms,
    });
  } catch (err) {
    next(err);
  }
});


module.exports = router;
