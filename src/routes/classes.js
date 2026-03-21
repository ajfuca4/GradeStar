const express = require('express');
const router = express.Router();

const MONTH_YEAR_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
});

function groupClassesByStartMonthYear(classes) {
  const UNKNOWN_KEY = '__unknown__';
  const groupsMap = new Map();

  for (const cls of classes) {
    const raw = cls.startDate;
    const dt = raw instanceof Date ? raw : new Date(raw);
    if (Number.isNaN(dt.getTime())) {
      if (!groupsMap.has(UNKNOWN_KEY)) {
        groupsMap.set(UNKNOWN_KEY, {
          year: Number.NEGATIVE_INFINITY,
          month: 0,
          label: 'Unknown start',
          classes: [],
        });
      }
      groupsMap.get(UNKNOWN_KEY).classes.push(cls);
      continue;
    }
    const key = `${dt.getFullYear()}-${dt.getMonth()}`;
    if (!groupsMap.has(key)) {
      groupsMap.set(key, {
        year: dt.getFullYear(),
        month: dt.getMonth(),
        label: MONTH_YEAR_FORMAT.format(dt),
        classes: [],
      });
    }
    groupsMap.get(key).classes.push(cls);
  }

  const groups = Array.from(groupsMap.values());
  groups.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });
  for (const g of groups) {
    g.classes.sort((a, b) => {
      const da = a.startDate instanceof Date ? a.startDate : new Date(a.startDate);
      const db = b.startDate instanceof Date ? b.startDate : new Date(b.startDate);
      const ta = Number.isNaN(da.getTime()) ? 0 : da.getTime();
      const tb = Number.isNaN(db.getTime()) ? 0 : db.getTime();
      return tb - ta;
    });
  }
  return groups;
}

// GET /classes - Show classes page
router.get('/', (req, res) => {
  const title = "Classes"

  const theclass = {
    title: "Linear Algebra 2 for Honours Mathematics",
    code: "MATH235",
    colour: "orange",
    startDate: new Date(2026, 5, 4),
    grade: 96,
    taskGroups: [{
      title: "Assigments",
      weight: 5,
      isEvenWeight: true,
      tasks: [{
        title: "Assigment 1",
        pointsAchieved: 100,
        pointBasis: 100,
        dueDate: new Date(2026, 4, 20),
        completed: false,
        graded: false,
        weight: 1,
      },
      {
        title: "Assigment 2",
        pointsAchieved: 100,
        pointBasis: 100,
        dueDate: new Date(2026, 4, 20),
        completed: false,
        graded: false,
        weight: 1,
      },
      {
        title: "Assigment 3",
        pointsAchieved: 100,
        pointBasis: 100,
        dueDate: new Date(2026, 4, 20),
        completed: false,
        graded: false,
        weight: 1,
      },
      {
        title: "Assigment 4",
        pointsAchieved: 100,
        pointBasis: 100,
        dueDate: new Date(2026, 4, 20),
        completed: false,
        graded: false,
        weight: 1,
      },
      {
        title: "Assigment 5",
        pointsAchieved: 100,
        pointBasis: 100,
        dueDate: new Date(2026, 4, 20),
        completed: false,
        graded: false,
        weight: 1,
      },
      {
        title: "Assigment 6",
        pointsAchieved: 100,
        pointBasis: 100,
        dueDate: new Date(2026, 4, 20),
        completed: false,
        graded: false,
        weight: 1,
      },
      {
        title: "Assigment 7",
        pointsAchieved: 100,
        pointBasis: 100,
        dueDate: new Date(2026, 4, 20),
        completed: false,
        graded: false,
        weight: 1,
      },
      {
        title: "Assigment 8",
        pointsAchieved: 100,
        pointBasis: 100,
        dueDate: new Date(2026, 4, 20),
        completed: false,
        graded: false,
        weight: 1,
      },
      {
        title: "Assigment 9",
        pointsAchieved: 100,
        pointBasis: 100,
        dueDate: new Date(2026, 4, 20),
        completed: false,
        graded: false,
        weight: 1,
      },
      {
        title: "Assigment 10",
        pointsAchieved: 100,
        pointBasis: 100,
        dueDate: new Date(2026, 4, 20),
        completed: false,
        graded: false,
        weight: 1,
      }]
    },
    {
      title: "Mobius Assigments",
      weight: 10,
      isEvenWeight: true,
      tasks: [{
        title: "Mobius Assigment 1",
        pointsAchieved: 100,
        pointBasis: 100,
        dueDate: new Date(2026, 4, 20),
        completed: false,
        graded: false,
        weight: 1,
      },
      {
        title: "Mobius Assigment 2",
        pointsAchieved: 100,
        pointBasis: 100,
        dueDate: new Date(2026, 4, 20),
        completed: false,
        graded: false,
        weight: 1,
      }]
    }],
    uniqueTasks: [{
      title: "Midterm Exam",
      pointsAchieved: 36,
      pointBasis: 39,
        dueDate: new Date(2026, 3, 6),
      weight: 25,
      completed: true,
      graded: true
    },
    {
      title: "Final Exam",
      pointsAchieved: 0,
      pointBasis: 100,
      dueDate: new Date(2026, 4, 11),
      weight: 55,
      completed: false,
      graded: false
    }]
  }

  const classArr = []

  for (let i = 100; i >= 0; i--) {
    classArr.push({
      ...theclass,
      grade: i,
      startDate: new Date(2026, 4, i*10),
    });
  }

  res.render("classes.ejs", { 
    title: title, 
    email: "Test", 
    classes: classArr,
    startDateSeparation: true,
  });
});

module.exports = router;

