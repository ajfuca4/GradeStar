# Client-Side UI & Utility Scripts

This document catalogs all client-side JavaScript functions, module exports, and event listener callbacks located in `public/scripts/`.

---

## 1. Authentication Client Scripts (`public/scripts/auth/`)

### Email Input Live Error Cleaner (`email.js`)
- **File**: [public/scripts/auth/email.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/auth/email.js) (lines 4-6)
- **Brief Purpose**: Clears the displayed email error message as soon as the user presses any key in the email input field.
- **Where Called From**: Browser DOM event (`keydown` on `#email-input`).
- **What Other Functions It Calls**: None.

---

### Password Real-Time Validation Handlers (`password.js`)
- **File**: [public/scripts/auth/password.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/auth/password.js)
- **Functions & Callbacks**:
  - **Password Click Handler** (lines 10-16): Expands requirement check boxes when clicking the password field.
    - *Called from*: Browser `click` event on `#password`.
    - *Calls*: `classList.remove("shrink")`.
  - **Password Input Live Feedback Handler** (lines 18-183): Evaluates real-time regular expressions for length (6-30 chars), lowercase letters, uppercase letters, and digits/special characters. Updates classes (`satisfied`, `shrink`, `err-text`, `fa-circle-check`, `fa-circle-xmark`).
    - *Called from*: Browser `input` event on `#password`.
    - *Calls*: `setTimeout()`, `RegExp.prototype.test()`, `classList.add()`, `classList.remove()`.
  - **Password Error Keydown Handler** (lines 185-187): Clears the global password error banner text on key press.
    - *Called from*: Browser `keydown` event on `#password`.
    - *Calls*: None.

---

### [`setVisibility(revealed)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/auth/password-toggle.js#L5-L10) (`password-toggle.js`)
- **File**: [public/scripts/auth/password-toggle.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/auth/password-toggle.js) (lines 5-10)
- **Signature**: `const setVisibility = (revealed: boolean) => void`
- **Brief Purpose**: Changes the password `<input>` element `type` between `"text"` and `"password"`, toggles icon classes (`fa-eye` vs `fa-eye-slash`), and updates the accessible `aria-label`.
- **Where Called From**:
  - [public/scripts/auth/password-toggle.js:13](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/auth/password-toggle.js#L13) — on `#passwordHide` click.
  - [public/scripts/auth/password-toggle.js:19](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/auth/password-toggle.js#L19) — on `#passwordHide` keydown (Enter / Space).
- **What Other Functions It Calls**:
  - `classList.toggle()`.
  - `Element.setAttribute()`.

---

## 2. Course & Popup Client Scripts (`public/scripts/courses/`)

### [`openPopUp(templateId)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/courses/popup.js#L1-L11)
- **File**: [public/scripts/courses/popup.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/courses/popup.js) (lines 1-11)
- **Signature**: `export function openPopUp(templateId: string): void`
- **Brief Purpose**: Finds a `<template>` element by ID, clones its content into the `#popup-contents` container, and reveals the modal overlay (`#overlay`).
- **Where Called From**:
  - [public/scripts/courses/popup.js:22](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/courses/popup.js#L22) — via global click delegation when an element matching `[data-popup-open]` is clicked.
- **What Other Functions It Calls**:
  - `document.getElementById()`.
  - `Node.prototype.cloneNode(true)`.
  - `Element.prototype.replaceChildren()`.

---

### [`closePopUp()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/courses/popup.js#L13-L17)
- **File**: [public/scripts/courses/popup.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/courses/popup.js) (lines 13-17)
- **Signature**: `export function closePopUp(): void`
- **Brief Purpose**: Hides the `#overlay` popup container by resetting its CSS visibility to `'hidden'`.
- **Where Called From**:
  - [public/scripts/courses/popup.js:27](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/courses/popup.js#L27) — via global click delegation when an element matching `[data-popup-close]` is clicked.
- **What Other Functions It Calls**:
  - `document.getElementById('overlay')`.

---

### Popup Delegated Click & AJAX Submissions (`popup.js`)
- **File**: [public/scripts/courses/popup.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/courses/popup.js)
- **Callbacks**:
  - **Popup Trigger Click Delegation** (lines 19-29): Listens for clicks on any element with `data-popup-open` or `data-popup-close`, calling [`openPopUp()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/courses/popup.js#L1-L11) or [`closePopUp()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/courses/popup.js#L13-L17).
  - **Popup Form Submit Handler** (lines 31-37): Traps form submissions on `#popup-window`, calls `event.preventDefault()`, and delegates to clicking `#create-course-btn`.
  - **Modal Input Error Clearer** (lines 39-47): Removes `inputErr` class and resets `#create-course-error` on input typing.
  - **Create Course AJAX Submission** (lines 49-97): Validates inputs, sends an asynchronous `POST /courses` JSON request, handles redirect responses or validation errors, and redirects to `/courses/:id` on success.
    - *Calls*: `fetch('/courses', { method: 'POST', ... })`, `response.json()`, `classList.toggle()`.

---

### Course Card Options & Actions (`options.js`)
- **File**: [public/scripts/courses/options.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/courses/options.js) (lines 3-112)
- **Brief Purpose**: Global delegated click handler managing course card options dropdown toggles, course deletion, and immediate course duplication in the DOM.
- **Where Called From**: Browser DOM events (`click` on `document` targeting `.options-btn`, `[data-action="delete"]`, `[data-action="duplicate"]`).
- **What Other Functions It Calls**:
  - `event.target.closest()`, `classList.toggle()`, `classList.remove()`.
  - `fetch('/courses/:courseId', { method: 'DELETE' })` — deletes course, removes card, toggles empty state, calls `updateTermList()`.
  - `fetch('/courses/:courseId/duplicate', { method: 'POST' })` — duplicates course on server, clones card into DOM, updates IDs/links/titles, calls `updateTermList()`.
  - [`updateTermList()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/courses/popup.js#L23-L71).

---

## 3. Shared Client Utilities (`public/scripts/shared/`)

### Universal Interactive Calendar (`calendar.js`)

#### [`initCalendar(calendarCard)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L1-L179)
- **File**: [public/scripts/shared/calendar.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js) (lines 1-179)
- **Brief Purpose**: Instantiates interactive behavior for a calendar card: manages in-memory caching (`Map`), handles navigation clicks, browser history (`pushState` / `popstate`), and keyboard shortcuts.
- **Where Called From**: [public/scripts/shared/calendar.js:181](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L181) for each `.calendar-card` on the page.
- **What Other Functions It Calls**:
  - Scoped helper functions:
    - [`buildCacheKey()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L16-L18)
    - [`getFetchUrl()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L20-L23)
    - [`getPageUrl()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L25-L28)
    - [`renderCalendar()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L30-L94)
    - [`fetchCalendarData()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L96-L116)
    - [`navigateCalendar()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L118-L140)

#### [`buildCacheKey(year, month)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L16-L18)
- **File**: [public/scripts/shared/calendar.js:16-18](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L16-L18)
- **Brief Purpose**: Generates key string `${endpoint}:${year}-${month}` for cache lookup.
- **Where Called From**: [`fetchCalendarData()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L96-L116).
- **What Other Functions It Calls**: None.

#### [`getFetchUrl(year, month)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L20-L23)
- **File**: [public/scripts/shared/calendar.js:20-23](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L20-L23)
- **Brief Purpose**: Constructs AJAX URL endpoint query string `.../calendar?year=...&month=...`.
- **Where Called From**: [`fetchCalendarData()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L96-L116).
- **What Other Functions It Calls**: None.

#### [`getPageUrl(year, month)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L25-L28)
- **File**: [public/scripts/shared/calendar.js:25-28](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L25-L28)
- **Brief Purpose**: Builds page URL with `?year=...&month=...` for browser history.
- **Where Called From**: [`renderCalendar()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L30-L94) and [`navigateCalendar()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L118-L140).
- **What Other Functions It Calls**: None.

#### [`renderCalendar(data)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L30-L94)
- **File**: [public/scripts/shared/calendar.js:30-94](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L30-L94)
- **Brief Purpose**: Modifies the DOM to display new month grid cells, column headers, today indicators, and aria tags.
- **Where Called From**: [`navigateCalendar()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L118-L140).
- **What Other Functions It Calls**:
  - [`getPageUrl()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L25-L28).
  - `document.createDocumentFragment()`.
  - `Element.replaceChildren()`.

#### [`fetchCalendarData(year, month)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L96-L116)
- **File**: [public/scripts/shared/calendar.js:96-116](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L96-L116)
- **Brief Purpose**: Loads calendar JSON data from cache or network via `fetch`.
- **Where Called From**: [`navigateCalendar()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L118-L140).
- **What Other Functions It Calls**:
  - [`buildCacheKey()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L16-L18).
  - [`getFetchUrl()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L20-L23).
  - `fetch()`, `response.json()`.
  - `Map.prototype.get()`, `set()`, `has()`.

#### [`navigateCalendar(year, month, shouldPushState)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L118-L140)
- **File**: [public/scripts/shared/calendar.js:118-140](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L118-L140)
- **Brief Purpose**: Coordinates fetching month data, toggling loading spinners, updating the DOM, and pushing the new state to `window.history`.
- **Where Called From**:
  - Calendar card click listener (lines 143-154) on `#calendar-prev-btn`, `#calendar-next-btn`, `#calendar-today-btn`.
  - Window `popstate` listener (lines 157-167).
- **What Other Functions It Calls**:
  - [`fetchCalendarData()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L96-L116).
  - [`renderCalendar()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L30-L94).
  - [`getPageUrl()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/calendar.js#L25-L28).
  - `window.history.pushState()`.

---

### Form Helpers (`general.js`)

#### [`removeInErrs(elem)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/general.js#L1-L3)
- **File**: [public/scripts/shared/general.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/general.js) (lines 1-3)
- **Brief Purpose**: Removes the `inputErr` class from the given element.
- **Where Called From**: Document `keydown` listener at [general.js:14](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/general.js#L14).
- **What Other Functions It Calls**: `elem.classList.remove("inputErr")`.

#### [`clearFieldError(input)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/general.js#L5-L10)
- **File**: [public/scripts/shared/general.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/general.js) (lines 5-10)
- **Brief Purpose**: Finds the ancestor `.form-group` and clears any text in its child `.err-text` element.
- **Where Called From**: Document `keydown` listener at [general.js:15](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/general.js#L15).
- **What Other Functions It Calls**: `input.closest()`, `group.querySelector()`.

#### Keydown Listener (lines 12-17)
- **Brief Purpose**: Automatically removes input errors and error text on any input keypress.
- **Where Called From**: Browser `keydown` event on `document`.
- **What Other Functions It Calls**: [`removeInErrs()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/general.js#L1-L3), [`clearFieldError()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/general.js#L5-L10).

---

### Sidebar Navigation Controller (`nav.js`)

#### [`updateActiveNav()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/nav.js#L4-L17)
- **File**: [public/scripts/shared/nav.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/nav.js) (lines 4-17)
- **Brief Purpose**: Evaluates current URL pathname; highlights the active sidebar button and sets `aria-current="page"`.
- **Where Called From**:
  - [public/scripts/shared/nav.js:20](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/nav.js#L20) on script execution.
  - [public/scripts/shared/nav.js:21](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/public/scripts/shared/nav.js#L21) on window `popstate` events.
- **What Other Functions It Calls**:
  - `RegExp.prototype.test()`.
  - `classList.add("selected")`, `classList.remove("selected")`.
  - `setAttribute("aria-current", "page")`, `removeAttribute("aria-current")`.

#### Navigation Button Click Handlers (lines 24-43)
- **Button Selection Listener** (lines 24-33): Handles clicking sidebar navigation buttons to update the active selection state.
- **Courses Button Sub-Page Redirect** (lines 36-43): Checks if the current pathname is not `/courses`; redirects to `/courses` when the courses icon is clicked from a sub-page.
