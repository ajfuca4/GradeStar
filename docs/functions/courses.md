# Course Management Functions

This document catalogs the functions supporting course creation, course fetching, task aggregation, sorting, and routing in GradeStar's courses domain.

---

## 1. Course Service Operations (`src/features/courses/course-service.js`)

### [`getCoursesForUser(userId)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L4-L15)
- **File**: [src/features/courses/course-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js) (lines 4-15)
- **Signature**: `async function getCoursesForUser(userId: string): Promise<Array<Course>>`
- **Brief Purpose**: Retrieves all course subdocuments embedded inside the specified user's document in MongoDB.
- **Where Called From**:
  - [src/features/courses/course-routes.js:38](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L38) — in Express route handler `GET /courses`.
- **What Other Functions It Calls**:
  - `User.findById(userId)` — Mongoose query method.

---

### [`getCourseForUser(userId, courseId)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L17-L28)
- **File**: [src/features/courses/course-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js) (lines 17-28)
- **Signature**: `async function getCourseForUser(userId: string, courseId: string): Promise<Course|null>`
- **Brief Purpose**: Finds and returns a specific course subdocument belonging to the user by its subdocument `_id`.
- **Where Called From**:
  - [src/features/courses/course-routes.js:75](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L75) — in `GET /courses/:courseId/calendar`.
  - [src/features/courses/course-routes.js:92](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L92) — in `GET /courses/:courseId`.
- **What Other Functions It Calls**:
  - `mongoose.Types.ObjectId.isValid(courseId)` — validates hex string format.
  - `User.findById(userId)` — loads the user document.
  - `user.courses.id(courseId)` — Mongoose subdocument array search.

---

### [`createCourse(userId, { title, code })`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L30-L48)
- **File**: [src/features/courses/course-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js) (lines 30-48)
- **Signature**: `async function createCourse(userId: string, data: { title: string, code: string }): Promise<Course|null>`
- **Brief Purpose**: Creates a new course subdocument with default properties (purple theme, 0 grade) and saves it to the user's document in MongoDB.
- **Where Called From**:
  - [src/features/courses/course-routes.js:60](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L60) — in `POST /courses` route handler.
- **What Other Functions It Calls**:
  - `User.findById(userId)` — retrieves user document.
  - `user.courses.push(...)` — appends subdocument.
  - `user.save()` — persists updated user to MongoDB.

---

### [`listCourseTasks(course)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L50-L64)
- **File**: [src/features/courses/course-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js) (lines 50-64)
- **Signature**: `function listCourseTasks(course: object): Array<{ title: string, weight: number }>`
- **Brief Purpose**: Flattens grouped tasks and unique tasks from a course object into a single array sorted by descending weight.
- **Where Called From**:
  - [src/features/courses/course-routes.js:119](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L119) — in `GET /courses/:courseId` view rendering.
  - [src/features/courses/course-service.test.js:59,64](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.test.js#L59) — unit test assertions.
- **What Other Functions It Calls**:
  - `Array.prototype.flatMap()` — flattens task groups into an array of tasks.
  - `Array.prototype.map()` — projects tasks to `{ title, weight }`.
  - `Array.prototype.sort()` — orders items by weight descending.
  - `Number.isFinite()` — guards against non-numeric weight values.

---

### [`collectDueDates(course)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L70-L80)
- **File**: [src/features/courses/course-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js) (lines 70-80)
- **Signature**: `function collectDueDates(course: object): Array<Date>`
- **Brief Purpose**: Collects and validates all dueDate values from both grouped tasks and unique tasks into a normalized array of Date instances.
- **Where Called From**:
  - [src/features/courses/course-service.js:90](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L90) (in [`buildCourseCalendar()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L89-L92)).
- **What Other Functions It Calls**:
  - `Array.prototype.flatMap()`, `map()`, `filter()`.
  - `Date.prototype.getTime()`, `Number.isNaN()`.

---

### [`buildCourseCalendar(course, targetDate, today)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L89-L92)
- **File**: [src/features/courses/course-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js) (lines 89-92)
- **Signature**: `function buildCourseCalendar(course: object, targetDate?: Date|object, today?: Date): object`
- **Brief Purpose**: Extracts course task deadlines and passes them to the shared calendar grid builder to compute month cells, indicators, and navigation links.
- **Where Called From**:
  - [src/features/courses/course-routes.js:82](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L82) — in `GET /courses/:courseId/calendar`.
  - [src/features/courses/course-routes.js:99](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L99) — in `GET /courses/:courseId`.
  - [src/features/courses/course-service.test.js:79,90,109,127,147,154,170,171](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.test.js#L79) — unit test assertions.
- **What Other Functions It Calls**:
  - [`collectDueDates(course)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L70-L80) — gathers dates from deliverables.
  - [`calendarService.buildCalendarGrid({ dueDates, targetDate, today })`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/shared/calendar/calendar-service.js#L58-L135) — builds the grid model.

---

### [`isCoursesPath(pathname)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L94-L99)
- **File**: [src/features/courses/course-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js) (lines 94-99)
- **Signature**: `function isCoursesPath(pathname: string): boolean`
- **Brief Purpose**: Tests whether a URL pathname belongs to the courses area (`/courses`, `/courses/`, or nested routes).
- **Where Called From**:
  - [src/features/courses/course-service.test.js:10,14,18,24,29,40](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.test.js#L10) — unit test assertions.
- **What Other Functions It Calls**:
  - `RegExp.prototype.test()` (`/(?:^|\/)courses(?:\/|\?|#|$)/`).

---

## 2. Course HTTP Routes (`src/features/courses/course-routes.js`)

- **`GET /courses`** ([lines 36-47](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L36-L47)): Calls [`courseService.getCoursesForUser()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L4-L15) and renders dashboard view `views/courses/courses.ejs`.
- **`POST /courses`** ([lines 50-70](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L50-L70)): Accepts `{ title, code }`, validates strings, calls [`courseService.createCourse()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L30-L48), and returns `{ id }` with HTTP status 201.
- **`GET /courses/:courseId/calendar`** ([lines 73-87](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L73-L87)): Parses query params with [`parseCalendarQuery()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/shared/calendar/calendar-service.js#L35-L49), builds grid with [`buildCourseCalendar()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L89-L92), and sends JSON for AJAX calendar navigation.
- **`GET /courses/:courseId`** ([lines 90-125](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L90-L125)): Loads course, computes calendar and sorted deliverables with [`listCourseTasks()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L50-L64), and renders individual course view `views/courses/course.ejs`.
