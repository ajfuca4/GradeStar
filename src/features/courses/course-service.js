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

async function createCourse(userId, { title, code }) {
  const user = await User.findById(userId);
  if (!user) {
    return null;
  }

  user.courses.push({
    title: title.trim(),
    code: code.trim(),
    colour: 'purple',
    startDate: new Date(),
    grade: 0,
    taskGroups: [],
    uniqueTasks: [],
  });
  await user.save();

  return user.courses[user.courses.length - 1];
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

function collectDueDates(course) {
  const groupedTasks = (course.taskGroups || []).flatMap((group) => group.tasks || []);
  const tasks = [...groupedTasks, ...(course.uniqueTasks || [])];

  return tasks
    .map((task) => task.dueDate)
    .filter(Boolean)
    .map((value) => new Date(value))
    .filter((date) => !Number.isNaN(date.getTime()));
}

function buildCourseCalendar(course, now = new Date()) {
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dueDays = new Set(
    collectDueDates(course)
      .filter((date) => date.getFullYear() === year && date.getMonth() === month)
      .map((date) => date.getDate())
  );

  const cells = [];
  for (let index = 0; index < firstWeekday; index += 1) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      day,
      isToday: day === now.getDate(),
      hasDue: dueDays.has(day),
    });
  }

  return {
    label: new Date(year, month, 1).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    }),
    weekdays: WEEKDAYS,
    cells,
  };
}

module.exports = {
  getCoursesForUser,
  getCourseForUser,
  createCourse,
  listCourseTasks,
  buildCourseCalendar,
};
