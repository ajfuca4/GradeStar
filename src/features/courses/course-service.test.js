const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
  isCoursesPath,
  listCourseTasks,
  buildCourseCalendar,
  getUniqueTermsForCourses,
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

  it('calculates prev and next month metadata correctly for normal months', () => {
    const fixedDate = new Date(2026, 9, 1); // October 2026
    const calendar = buildCourseCalendar({}, fixedDate);

    assert.equal(calendar.year, 2026);
    assert.equal(calendar.month, 10);
    assert.deepEqual(calendar.prev, {
      year: 2026,
      month: 9,
      label: 'September 2026',
    });
    assert.deepEqual(calendar.next, {
      year: 2026,
      month: 11,
      label: 'November 2026',
    });
  });

  it('handles year boundary rollover from December to January', () => {
    const december = new Date(2026, 11, 1); // December 2026
    const calendar = buildCourseCalendar({}, december);

    assert.equal(calendar.year, 2026);
    assert.equal(calendar.month, 12);
    assert.deepEqual(calendar.prev, {
      year: 2026,
      month: 11,
      label: 'November 2026',
    });
    assert.deepEqual(calendar.next, {
      year: 2027,
      month: 1,
      label: 'January 2027',
    });
  });

  it('handles year boundary rollover from January to December', () => {
    const january = new Date(2026, 0, 1); // January 2026
    const calendar = buildCourseCalendar({}, january);

    assert.equal(calendar.year, 2026);
    assert.equal(calendar.month, 1);
    assert.deepEqual(calendar.prev, {
      year: 2025,
      month: 12,
      label: 'December 2025',
    });
    assert.deepEqual(calendar.next, {
      year: 2026,
      month: 2,
      label: 'February 2026',
    });
  });

  it('correctly sets isToday only when viewing the current month and matching day', () => {
    const today = new Date(2026, 9, 5); // October 5, 2026
    const october = new Date(2026, 9, 1);
    const november = new Date(2026, 10, 1);

    const octCalendar = buildCourseCalendar({}, october, today);
    assert.equal(octCalendar.isCurrentMonth, true);
    const day5Cell = octCalendar.cells.find((c) => c && c.day === 5);
    const day6Cell = octCalendar.cells.find((c) => c && c.day === 6);
    assert.equal(day5Cell.isToday, true);
    assert.equal(day6Cell.isToday, false);

    const novCalendar = buildCourseCalendar({}, november, today);
    assert.equal(novCalendar.isCurrentMonth, false);
    const novDay5Cell = novCalendar.cells.find((c) => c && c.day === 5);
    assert.equal(novDay5Cell.isToday, false);
  });

  it('filters due dates specifically to the target month', () => {
    const course = {
      taskGroups: [
        { tasks: [{ title: 'October Midterm', dueDate: new Date(2026, 9, 20) }] },
      ],
      uniqueTasks: [
        { title: 'November Project', dueDate: new Date(2026, 10, 10) },
      ],
    };

    const octCalendar = buildCourseCalendar(course, new Date(2026, 9, 1));
    const novCalendar = buildCourseCalendar(course, new Date(2026, 10, 1));

    const octDay20 = octCalendar.cells.find((c) => c && c.day === 20);
    const octDay10 = octCalendar.cells.find((c) => c && c.day === 10);
    assert.equal(octDay20.hasDue, true);
    assert.equal(octDay10.hasDue, false);

    const novDay20 = novCalendar.cells.find((c) => c && c.day === 20);
    const novDay10 = novCalendar.cells.find((c) => c && c.day === 10);
    assert.equal(novDay20.hasDue, false);
    assert.equal(novDay10.hasDue, true);
  });
});

describe('parseCalendarQuery', () => {
  const { parseCalendarQuery } = require('./course-service');

  it('parses valid year and month query parameters', () => {
    const date = parseCalendarQuery({ year: '2026', month: '11' });
    assert.ok(date instanceof Date);
    assert.equal(date.getFullYear(), 2026);
    assert.equal(date.getMonth(), 10); // November is 10 in 0-based indexing
    assert.equal(date.getDate(), 1);
  });

  it('accepts numeric values as well', () => {
    const date = parseCalendarQuery({ year: 2027, month: 3 });
    assert.ok(date instanceof Date);
    assert.equal(date.getFullYear(), 2027);
    assert.equal(date.getMonth(), 2);
  });

  it('returns undefined for missing or invalid query values', () => {
    assert.equal(parseCalendarQuery({}), undefined);
    assert.equal(parseCalendarQuery(null), undefined);
    assert.equal(parseCalendarQuery({ year: 'invalid', month: '5' }), undefined);
    assert.equal(parseCalendarQuery({ year: '2026', month: '0' }), undefined);
    assert.equal(parseCalendarQuery({ year: '2026', month: '13' }), undefined);
    assert.equal(parseCalendarQuery({ year: '1800', month: '5' }), undefined);
    assert.equal(parseCalendarQuery({ year: '3000', month: '5' }), undefined);
  });
});

describe('getUniqueTermsForCourses', () => {
  it('returns empty array when given non-array or empty array', () => {
    assert.deepEqual(getUniqueTermsForCourses([]), []);
    assert.deepEqual(getUniqueTermsForCourses(null), []);
    assert.deepEqual(getUniqueTermsForCourses(undefined), []);
    assert.deepEqual(getUniqueTermsForCourses('not an array'), []);
  });

  it('extracts unique trimmed terms preserving first-seen order', () => {
    const courses = [
      { title: 'Course 1', term: 'Fall 2026' },
      { title: 'Course 2', term: 'Winter 2027' },
      { title: 'Course 3', term: 'Fall 2026' },
      { title: 'Course 4', term: '  Spring 2027  ' },
    ];
    assert.deepEqual(getUniqueTermsForCourses(courses), [
      'Fall 2026',
      'Winter 2027',
      'Spring 2027',
    ]);
  });

  it('filters out empty, whitespace-only, or missing terms', () => {
    const courses = [
      { title: 'Course 1', term: '' },
      { title: 'Course 2', term: '   ' },
      { title: 'Course 3' },
      { title: 'Course 4', term: null },
      { title: 'Course 5', term: 'Summer 2026' },
    ];
    assert.deepEqual(getUniqueTermsForCourses(courses), ['Summer 2026']);
  });
});
