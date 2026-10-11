const mongoose = require('mongoose');
const { User } = require('../../models');

async function getCoursesForUser(userId) {
  if (!userId) {
    return [];
  }

  const user = await User.findById(userId);
  if (!user) {
    return [];
  }

  return user.courses;
}

async function getCourseForUser(userId, courseId) {
  if (!userId || !mongoose.Types.ObjectId.isValid(courseId)) {
    return null;
  }

  const user = await User.findById(userId);
  if (!user) {
    return null;
  }

  return user.courses.id(courseId);
}

async function createCourse(userId, { title, code, term }) {
  const user = await User.findById(userId);
  if (!user) {
    return null;
  }

  user.courses.push({
    title: title.trim(),
    code: code.trim(),
    term: typeof term === 'string' ? term.trim() : '',
    colour: 'yellow',
    startDate: new Date(),
    grade: 0,
    taskGroups: [],
    uniqueTasks: [],
  });
  await user.save();

  return user.courses[user.courses.length - 1];
}

async function deleteCourse(userId, courseId) {
  const user = await User.findById(userId);

  if (!user) {
    return null;
  }

  user.courses.pull({ _id: courseId });
  await user.save();

  return getUniqueTermsForCourses(user.courses);
}

function cloneDeliverable(task) {
  if (!task) return null;
  const plain = typeof task.toObject === 'function' ? task.toObject() : { ...task };
  delete plain._id;
  return plain;
}

function cloneTaskGroup(group) {
  if (!group) return null;
  const plain = typeof group.toObject === 'function' ? group.toObject() : { ...group };
  delete plain._id;
  plain.tasks = Array.isArray(plain.tasks)
    ? plain.tasks.map(cloneDeliverable).filter(Boolean)
    : [];
  return plain;
}

async function duplicateCourse(userId, courseId) {
  if (!userId || !mongoose.Types.ObjectId.isValid(courseId)) {
    return null;
  }

  const user = await User.findById(userId);
  if (!user) {
    return null;
  }

  const course = user.courses.id(courseId);
  if (!course) {
    return null;
  }

  const newCourse = user.courses.create({
    title: `Copy of ${course.title}`,
    code: course.code,
    term: course.term,
    colour: course.colour,
    startDate: course.startDate,
    endDate: course.endDate,
    grade: course.grade,
    taskGroups: (course.taskGroups || []).map(cloneTaskGroup).filter(Boolean),
    uniqueTasks: (course.uniqueTasks || []).map(cloneDeliverable).filter(Boolean),
  });

  user.courses.push(newCourse);
  await user.save();

  return newCourse;
}

function editCourse() {
  console.log("editCourse");
}

function listCourseTasks(course) {
  const groupedTasks = (course.taskGroups || []).flatMap((group) => group.tasks || []);
  const tasks = [...groupedTasks, ...(course.uniqueTasks || [])];

  return tasks
    .map((task) => ({
      title: task.title,
      weight: task.weight,
    }))
    .sort((a, b) => {
      const weightA = Number(a.weight);
      const weightB = Number(b.weight);
      return (Number.isFinite(weightB) ? weightB : 0) - (Number.isFinite(weightA) ? weightA : 0);
    });
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const calendarService = require('../shared/calendar/calendar-service');

function collectDueDates(course) {
  if (!course) return [];
  const groupedTasks = (course.taskGroups || []).flatMap((group) => group.tasks || []);
  const tasks = [...groupedTasks, ...(course.uniqueTasks || [])];

  return tasks
    .map((task) => task.dueDate)
    .filter(Boolean)
    .map((value) => new Date(value))
    .filter((date) => !Number.isNaN(date.getTime()));
}

/**
 * Computes calendar grid cells, due date indicators, and prev/next month metadata for a course.
 * @param {object} course - Course document with task groups and unique tasks.
 * @param {Date|string|number|object} [targetDate=new Date()] - Month/year to construct.
 * @param {Date} [today=new Date()] - Reference date for today highlighting.
 * @returns {object} Calendar model with label, weekdays, cells, prev/next links, and today metadata.
 */
function buildCourseCalendar(course, targetDate = new Date(), today = new Date()) {
  const dueDates = collectDueDates(course);
  return calendarService.buildCalendarGrid({ dueDates, targetDate, today });
}

function isCoursesPath(pathname) {
  if (!pathname || typeof pathname !== 'string') {
    return false;
  }
  return /(?:^|\/)courses(?:\/|\?|#|$)/.test(pathname);
}

function getUniqueTermsForCourses(courses) {
  if (!Array.isArray(courses)) {
    return [];
  }

  const termsSet = new Set();
  for (const course of courses) {
    if (course && typeof course.term === 'string') {
      const trimmed = course.term.trim();
      if (trimmed) {
        termsSet.add(trimmed);
      }
    }
  }

  return Array.from(termsSet);
}

module.exports = {
  getCoursesForUser,
  getCourseForUser,
  createCourse,
  getUniqueTermsForCourses,
  listCourseTasks,
  buildCourseCalendar,
  parseCalendarQuery: calendarService.parseCalendarQuery,
  resolveCalendarDate: calendarService.resolveCalendarDate,
  isCoursesPath,
  deleteCourse,
  duplicateCourse,
  cloneDeliverable,
  cloneTaskGroup,
  editCourse,
};

