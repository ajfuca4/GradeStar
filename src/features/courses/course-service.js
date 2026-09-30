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

module.exports = { getCoursesForUser };
