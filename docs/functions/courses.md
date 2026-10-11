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

### [`deleteCourse(userId, courseId)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L51-L62)
- **File**: [src/features/courses/course-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js) (lines 51-62)
- **Signature**: `async function deleteCourse(userId: string, courseId: string): Promise<Array<string>|null>`
- **Brief Purpose**: Pulls a course subdocument by ID from the user record, saves changes, and returns updated unique terms.
- **Where Called From**:
  - [src/features/courses/course-routes.js:133](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L133) — in `DELETE /courses/:courseId`.
- **What Other Functions It Calls**:
  - `User.findById(userId)` — retrieves user document.
  - `user.courses.pull({ _id: courseId })` — removes course subdocument.
  - `user.save()` — persists updated user to MongoDB.
  - [`getUniqueTermsForCourses(user.courses)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L156-L173) — computes remaining active terms.

---

### [`cloneDeliverable(task)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L64-L69)
- **File**: [src/features/courses/course-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js) (lines 64-69)
- **Signature**: `function cloneDeliverable(task: object): object|null`
- **Brief Purpose**: Pure helper that deep-clones a task subdocument object and strips its `_id` so Mongoose can assign a new unique ID upon duplication.
- **Where Called From**:
  - [src/features/courses/course-service.js:76,105](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L76) — in `cloneTaskGroup()` and `duplicateCourse()`.
  - [src/features/courses/course-service.test.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.test.js) — unit tests.
- **What Other Functions It Calls**:
  - `task.toObject()` (if available) or object spread.

---

### [`cloneTaskGroup(group)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L71-L79)
- **File**: [src/features/courses/course-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js) (lines 71-79)
- **Signature**: `function cloneTaskGroup(group: object): object|null`
- **Brief Purpose**: Pure helper that clones a task group and its nested tasks, stripping `_id` from all levels so new subdocument IDs are generated upon duplication.
- **Where Called From**:
  - [src/features/courses/course-service.js:104](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L104) — in `duplicateCourse()`.
  - [src/features/courses/course-service.test.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.test.js) — unit tests.
- **What Other Functions It Calls**:
  - [`cloneDeliverable(task)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L64-L69) — strips ID from each child task.

---

### [`duplicateCourse(userId, courseId)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L81-L113)
- **File**: [src/features/courses/course-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js) (lines 81-113)
- **Signature**: `async function duplicateCourse(userId: string, courseId: string): Promise<Course|null>`
- **Brief Purpose**: Duplicates an existing course, appending "(1)" to the title, cloning task groups and unique tasks with fresh IDs, and saving the new course to MongoDB.
- **Where Called From**:
  - [src/features/courses/course-routes.js:147](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L147) — in `POST /courses/:courseId/duplicate`.
- **What Other Functions It Calls**:
  - `mongoose.Types.ObjectId.isValid(courseId)` — validates hex string format.
  - `User.findById(userId)` — retrieves user document.
  - `user.courses.id(courseId)` — loads existing course.
  - [`cloneTaskGroup(group)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L71-L79), [`cloneDeliverable(task)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L64-L69) — strips `_id`s.
  - `user.courses.create(...)`, `user.courses.push(...)`, `user.save()` — creates and persists subdocument.

---

### [`listCourseTasks(course)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L119-L130)
- **File**: [src/features/courses/course-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js) (lines 119-130)
- **Signature**: `function listCourseTasks(course: object): Array<{ title: string, weight: number }>`
- **Brief Purpose**: Flattens grouped tasks and unique tasks from a course object into a single array sorted by descending weight.
- **Where Called From**:
  - [src/features/courses/course-routes.js:122](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L122) — in `GET /courses/:courseId` view rendering.
  - [src/features/courses/course-service.test.js:59,64](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.test.js#L59) — unit test assertions.
- **What Other Functions It Calls**:
  - `Array.prototype.flatMap()` — flattens task groups into an array of tasks.
  - `Array.prototype.map()` — projects tasks to `{ title, weight }`.
  - `Array.prototype.sort()` — orders items by weight descending.
  - `Number.isFinite()` — guards against non-numeric weight values.

---

### [`collectDueDates(course)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L132-L142)
- **File**: [src/features/courses/course-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js) (lines 132-142)
- **Signature**: `function collectDueDates(course: object): Array<Date>`
- **Brief Purpose**: Collects and validates all dueDate values from both grouped tasks and unique tasks into a normalized array of Date instances.
- **Where Called From**:
  - [src/features/courses/course-service.js:145](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L145) (in [`buildCourseCalendar()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L144-L147)).
- **What Other Functions It Calls**:
  - `Array.prototype.flatMap()`, `map()`, `filter()`.
  - `Date.prototype.getTime()`, `Number.isNaN()`.

---

### [`buildCourseCalendar(course, targetDate, today)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L144-L147)
- **File**: [src/features/courses/course-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js) (lines 144-147)
- **Signature**: `function buildCourseCalendar(course: object, targetDate?: Date|object, today?: Date): object`
- **Brief Purpose**: Extracts course task deadlines and passes them to the shared calendar grid builder to compute month cells, indicators, and navigation links.
- **Where Called From**:
  - [src/features/courses/course-routes.js:85](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L85) — in `GET /courses/:courseId/calendar`.
  - [src/features/courses/course-routes.js:102](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L102) — in `GET /courses/:courseId`.
  - [src/features/courses/course-service.test.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.test.js) — unit test assertions.
- **What Other Functions It Calls**:
  - [`collectDueDates(course)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L132-L142) — gathers dates from deliverables.
  - [`calendarService.buildCalendarGrid({ dueDates, targetDate, today })`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/shared/calendar/calendar-service.js#L58-L135) — builds the grid model.

---

### [`isCoursesPath(pathname)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L149-L154)
- **File**: [src/features/courses/course-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js) (lines 149-154)
- **Signature**: `function isCoursesPath(pathname: string): boolean`
- **Brief Purpose**: Tests whether a URL pathname belongs to the courses area (`/courses`, `/courses/`, or nested routes).
- **Where Called From**:
  - [src/features/courses/course-service.test.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.test.js) — unit test assertions.
- **What Other Functions It Calls**:
  - `RegExp.prototype.test()` (`/(?:^|\/)courses(?:\/|\?|#|$)/`).

---

### [`getUniqueTermsForCourses(courses)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L156-L173)
- **File**: [src/features/courses/course-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js) (lines 156-173)
- **Signature**: `function getUniqueTermsForCourses(courses: Array<object>): Array<string>`
- **Brief Purpose**: Extracts unique trimmed term strings from an array of course objects, preserving first-seen order.
- **Where Called From**:
  - [src/features/courses/course-routes.js:39](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L39) — in `GET /courses`.
  - [src/features/courses/course-service.js:61](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L61) — in `deleteCourse()`.
  - [src/features/courses/course-service.test.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.test.js) — unit test assertions.
- **What Other Functions It Calls**:
  - `Set`, `Array.from()`.

---

## 2. Course HTTP Routes (`src/features/courses/course-routes.js`)

- **`GET /courses`** ([lines 36-49](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L36-L49)): Calls [`courseService.getCoursesForUser()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L4-L15) and renders dashboard view `views/courses/courses.ejs`.
- **`POST /courses`** ([lines 52-73](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L52-L73)): Accepts `{ title, code, term }`, validates strings, calls [`courseService.createCourse()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L30-L49), and returns `{ id }` with HTTP status 201.
- **`GET /courses/:courseId/calendar`** ([lines 76-90](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L76-L90)): Parses query params with [`parseCalendarQuery()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/shared/calendar/calendar-service.js#L35-L49), builds grid with [`buildCourseCalendar()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L144-L147), and sends JSON for AJAX calendar navigation.
- **`GET /courses/:courseId`** ([lines 93-128](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L93-L128)): Loads course, computes calendar and sorted deliverables with [`listCourseTasks()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L119-L130), and renders individual course view `views/courses/course.ejs`.
- **`DELETE /courses/:courseId`** ([lines 131-142](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L131-L142)): Calls [`courseService.deleteCourse()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L51-L62) and returns JSON `{ terms }` with status 200.
- **`POST /courses/:courseId/duplicate`** ([lines 145-157](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L145-L157)): Calls [`courseService.duplicateCourse()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L81-L113) and returns JSON `{ id }` with HTTP status 201.
