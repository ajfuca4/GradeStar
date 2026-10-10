# Calendar Engine Functions

This document catalogs the functions powering GradeStar's universal calendar engine in `src/features/shared/calendar/calendar-service.js`.

---

## Functions

### [`resolveCalendarDate(value, fallback)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/shared/calendar/calendar-service.js#L9-L28)
- **File**: [src/features/shared/calendar/calendar-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/shared/calendar/calendar-service.js) (lines 9-28)
- **Signature**: `function resolveCalendarDate(value: any, fallback?: Date): Date`
- **Brief Purpose**: Normalizes various date input types (native `Date` instances, ISO date strings, epoch numbers, or `{ year, month }` objects) into a valid `Date` instance.
- **Where Called From**:
  - [src/features/shared/calendar/calendar-service.js:71,72](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/shared/calendar/calendar-service.js#L71) — inside [`buildCalendarGrid()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/shared/calendar/calendar-service.js#L58-L135) to resolve `targetDate` and `today`.
  - [src/features/shared/calendar/calendar-service.test.js:39,44,50,57,58](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/shared/calendar/calendar-service.test.js#L39) — unit test assertions.
  - Re-exported via `course-service.js` as [`resolveCalendarDate`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L108).
- **What Other Functions It Calls**:
  - `Date.prototype.getTime()` — verifies date timestamp validity.
  - `Number.isNaN()` — checks for invalid dates.
  - `Number.isInteger()` — validates year/month numbers.

---

### [`parseCalendarQuery(query)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/shared/calendar/calendar-service.js#L35-L49)
- **File**: [src/features/shared/calendar/calendar-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/shared/calendar/calendar-service.js) (lines 35-49)
- **Signature**: `function parseCalendarQuery(query?: object): Date|undefined`
- **Brief Purpose**: Validates 1-based `year` (1970-2100) and `month` (1-12) query parameters from a URL and converts them into a Date object representing the first day of that month.
- **Where Called From**:
  - [src/features/courses/course-routes.js:81](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L81) — in `GET /courses/:courseId/calendar`.
  - [src/features/courses/course-routes.js:98](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-routes.js#L98) — in `GET /courses/:courseId`.
  - [src/features/courses/course-service.test.js:189,197,204-210](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.test.js#L189) — unit tests.
  - [src/features/shared/calendar/calendar-service.test.js:12,20,27-33](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/shared/calendar/calendar-service.test.js#L12) — unit tests.
  - Re-exported via `course-service.js` as [`parseCalendarQuery`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L107).
- **What Other Functions It Calls**:
  - `Number.isInteger()` — range and type checks.

---

### [`buildCalendarGrid(optionsOrDueDates, maybeTargetDate, maybeToday)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/shared/calendar/calendar-service.js#L58-L135)
- **File**: [src/features/shared/calendar/calendar-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/shared/calendar/calendar-service.js) (lines 58-135)
- **Signature**: `function buildCalendarGrid(optionsOrDueDates?: Array|object, maybeTargetDate?: Date, maybeToday?: Date): CalendarViewModel`
- **Brief Purpose**: Generates complete month grid data: leading empty padding cells, numbered days, indicators for `isToday` and `hasDue` deadlines, weekday headers, and previous/next month navigation links.
- **Where Called From**:
  - [src/features/courses/course-service.js:91](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L91) — in [`buildCourseCalendar()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/courses/course-service.js#L89-L92).
  - [src/features/shared/calendar/calendar-service.test.js:67,81,92,97,107,111](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/shared/calendar/calendar-service.test.js#L67) — unit tests.
- **What Other Functions It Calls**:
  - [`resolveCalendarDate(rawTargetDate)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/shared/calendar/calendar-service.js#L9-L28) — resolves target date.
  - [`resolveCalendarDate(rawToday)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/shared/calendar/calendar-service.js#L9-L28) — resolves reference today date.
  - `Date.prototype.getFullYear()`, `getMonth()`, `getDate()`, `getDay()`, `toLocaleDateString()`
  - `Array.prototype.map()`, `filter()`, `push()`
  - `Set.prototype.has()` — $O(1)$ deadline lookup per day cell.
