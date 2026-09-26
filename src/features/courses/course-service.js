function getCourses() {
  const thecourse = {
    title: "Linear Algebra 2 for Honours Mathematics",
    code: "MATH235",
    colour: "orange",
    startDate: new Date(2026, 5, 4),
    endDate: new Date(2026, 8, 4),
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

  const courseArr = []

  for (let i = 100; i >= 0; i--) {
    const startDate = new Date(2026, 4, i * 10);
    const endDate = new Date(2026, 4, (i * 10) + 10)
    endDate.setMonth(endDate.getMonth() + 3);
    courseArr.push({
      ...thecourse,
      grade: i,
      startDate,
      endDate,
    });
  }
  return courseArr;
}

module.exports = { getCourses };
