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

module.exports = {
  getCoursesForUser,
  getCourseForUser,
  createCourse,
  listCourseTasks,
};
