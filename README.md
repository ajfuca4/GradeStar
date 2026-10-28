# GradeStar

**Anthony Fuca**

GradeStar is a personal academic dashboard for university students. A syllabus is usually a PDF, and a school grade book is rarely the place you want to check whether you are actually on track. GradeStar is the quieter view: one account, your courses, the weights from the outline, and the deadlines that matter.

## What it is for

- See a course mark at a glance, including a circular grade indicator.
- Group homework, labs, quizzes, and exams into weighted categories that match a syllabus.
- Keep due dates on a monthly calendar.
- Try hypothetical scores and see what is still required to hit a target grade.
- Gather courses into terms and roll them up into a cumulative average.

## Available now

- Create an account and sign in. Passwords are hashed with bcrypt, and the session stays on the server.
- Add a course with a title, catalog code, and term, then see it on a dashboard with a color accent and a grade wheel.
- Duplicate a course or delete it from that dashboard.
- Open a course to see its grading categories, a task list ranked by weight, and the stored course percentage.
- Move through that course’s calendar by month. Days with due dates are marked, and the month updates in place.

The percentage on the wheel is stored on the course. It is not calculated from assignment scores yet.

## Planned

- Add, edit, score, and remove assignments and exams, including major items that sit outside a category.
- Weighted categories that follow a syllabus, with the course percentage recalculated when a score changes.
- Two readings of the same course: standing on work already graded, and progress toward the full course total.
- Edit a course’s name, code, color, and dates, archive a finished course, and group the dashboard by term.
- Open a calendar day and see what is due that day.
- A target-grade calculator, plus a sandbox for scores you have not earned yet.
- A cumulative average across courses, with more than one grading scale.
- A mobile experience for checking courses, grades, and deadlines from a phone.
- Shared course outline templates, so a classmate can start from an existing syllabus instead of rebuilding every category and weight.
- An opt-in class average. After more than three students in the same course agree to contribute, GradeStar shows the class average and keeps every individual grade private.

Further out: exporting a backup, pulling courses from an LMS, deadline reminders, light and dark themes, and offline access. The full list is in [docs/ROADMAP.md](docs/ROADMAP.md).

## Stack

| Layer | Choice |
| --- | --- |
| Language | JavaScript (ES6+) |
| Server | Node.js 20+ and Express 5 |
| Pages | EJS, server-rendered |
| Data | MongoDB with Mongoose. Courses, categories, and tasks are nested on the user document |
| Auth | express-session and bcrypt |
| Client | HTML, vanilla CSS, and browser JavaScript (no frontend framework or bundler) |
| Tests | Node’s built-in test runner (`node:test`) |

## Run it locally

You need Node.js 20 or newer and a running MongoDB instance (local or Atlas).

```bash
npm install
```

Create a `.env` file in the project root:

```bash
MONGO_URI=mongodb://127.0.0.1:27017/gradestar
SESSION_SECRET=replace-with-a-long-random-string
PORT=3000
```

`PORT` is optional and defaults to `3000`.

```bash
npm run dev    # reload on file changes
npm start      # run once
npm test       # unit tests
```

Open [http://localhost:3000](http://localhost:3000), create an account, and add a course.

Design notes, architecture decisions, and the changelog live under [docs/](docs/).
