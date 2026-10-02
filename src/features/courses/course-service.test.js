const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
  isCoursesPath,
  listCourseTasks,
  buildCourseCalendar,
} = require('./course-service');

describe('isCoursesPath', () => {
  it('returns true for /courses', () => {
    assert.equal(isCoursesPath('/courses'), true);
  });

  it('returns true for /courses/', () => {
    assert.equal(isCoursesPath('/courses/'), true);
  });

  it('returns true for sub-routes like /courses/:courseId', () => {
    assert.equal(isCoursesPath('/courses/654a1b2c3d4e5f6789012345'), true);
    assert.equal(isCoursesPath('/courses/654a1b2c3d4e5f6789012345/tasks'), true);
  });

  it('returns true when query params or hash are present', () => {
    assert.equal(isCoursesPath('/courses?sort=asc'), true);
    assert.equal(isCoursesPath('/courses#calendar'), true);
  });

  it('returns false for non-course routes', () => {
    assert.equal(isCoursesPath('/'), false);
    assert.equal(isCoursesPath('/login'), false);
    assert.equal(isCoursesPath('/signup'), false);
    assert.equal(isCoursesPath('/collections'), false);
    assert.equal(isCoursesPath('/tasks'), false);
    assert.equal(isCoursesPath('/settings'), false);
    assert.equal(isCoursesPath('/courses-archive'), false);
    assert.equal(isCoursesPath('/my-courses'), false);
  });

  it('handles empty or non-string inputs safely', () => {
    assert.equal(isCoursesPath(''), false);
    assert.equal(isCoursesPath(null), false);
    assert.equal(isCoursesPath(undefined), false);
    assert.equal(isCoursesPath(123), false);
  });
});

describe('listCourseTasks', () => {
  it('sorts deliverables by descending weight', () => {
    const course = {
      taskGroups: [
        { tasks: [{ title: 'Quiz 1', weight: 10 }, { title: 'Quiz 2', weight: 15 }] },
      ],
      uniqueTasks: [
        { title: 'Final Exam', weight: 40 },
        { title: 'Midterm', weight: 25 },
      ],
    };

    const tasks = listCourseTasks(course);
    assert.deepEqual(tasks.map((t) => t.title), ['Final Exam', 'Midterm', 'Quiz 2', 'Quiz 1']);
  });

  it('handles empty task groups and unique tasks gracefully', () => {
    const tasks = listCourseTasks({});
    assert.deepEqual(tasks, []);
  });
});

describe('buildCourseCalendar', () => {
  it('constructs month cells with weekday headers', () => {
    const fixedDate = new Date(2026, 9, 1); // October 2026
    const course = {
      taskGroups: [],
      uniqueTasks: [
        { title: 'Due task', dueDate: new Date(2026, 9, 15) },
      ],
    };

    const calendar = buildCourseCalendar(course, fixedDate);
    assert.equal(calendar.label, 'October 2026');
    assert.equal(calendar.weekdays.length, 7);

    const dueCell = calendar.cells.find((c) => c && c.day === 15);
    assert.ok(dueCell);
    assert.equal(dueCell.hasDue, true);
  });
});
