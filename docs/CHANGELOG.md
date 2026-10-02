# Changelog — GradeStar

All notable changes to the **GradeStar** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Interactive Task Group and Deliverable management modals (CRUD).
- Automated weighted grade calculation engine.
- Interactive calendar month navigation and deadline popovers.
- Term separation support (`startDateSeparation`) on the courses dashboard.
- "What-If" grade simulation tool.

---

## [0.3.0] - 2026-10-01

### Added
- **Individual Course View**: Added dedicated page route (`/courses/:courseId`) rendering comprehensive course syllabus details, grading schemes, deliverables, and calendar schedule (`0ca29a9`).
- **Dynamic Course Calendar Card**: Added monthly calendar grid component displaying current month days, weekday headers, and deadline markers for due tasks (`bff0c47`).
- **Local Brand Assets**: Migrated brand logo (`Wordmark Logo White.svg`) into `public/images/`, eliminating dependencies on external remote hosting (`b678bfe`).
- **Deliverables List**: Integrated task list sorted by weight with badges into the course view (`0ca29a9`).

### Changed
- Refined course page layout styling and responsive behavior (`9213d83`).
- Streamlined course creation flow by removing redundant secondary add-course route (`a599c4f`).

### Fixed
- Resolved UI alignment and sizing bugs between the circular grade wheel and the grading scheme summary card (`f1f2ea5`).

---

## [0.2.0] - 2026-09-29

### Added
- **Shared Master Layout**: Implemented unified master layout shell ([views/layouts/app.ejs](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/views/layouts/app.ejs)) with dynamic partial rendering and per-route stylesheet/script injection (`0a21b73`).
- **Authentication Route Guard**: Added [require-auth.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/middleware/require-auth.js) middleware to protect `/courses` endpoints and redirect unauthenticated requests (`0a21b73`).
- **Standardized Error Handling**: Added dedicated error pages for 404 Not Found ([views/errors/404.ejs](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/views/errors/404.ejs)) and 500 Internal Server Error ([views/errors/500.ejs](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/views/errors/500.ejs)) (`0a21b73`).
- **Unit Testing Suite**: Added native Node.js tests for authentication validation functions using `node:test` and `node:assert/strict` (`f5e51eb`).
- **Modal Popup Infrastructure**: Added generic popup container partial and script with template-based rendering (`8f02264`).

### Changed
- **Feature-Sliced Architecture**: Restructured application into domain modules under `src/features/` (auth, courses) (`3e83334`, `77c0a97`).
- **Database-Backed Courses**: Transitioned course dashboard away from static dummy fixtures to live MongoDB queries scoped to the authenticated user (`a93d2dd`).
- **Decoupled Auth Logic**: Split monolithic auth routines into distinct routing, service, and validation files (`f5e51eb`).
- Upgraded form input styling and client-side course creation validation (`8f02264`).

---

## [0.1.5] - 2026-04-01

### Added
- **SVG Grade Wheel Component**: Designed a zero-dependency circular SVG percentage wheel with stroke-dasharray calibration for visual grade tracking (`be49801`).
- **Course Breakdown Card**: Created modular course summary card partial displaying grade wheel, course title, and deliverable counts (`be49801`).
- **Content Header**: Added standardized page header component with title and action button (`6e543c2`).
- **Togglable Term Separators**: Added `startDateSeparation` field to user schema for future term-based course grouping (`7053925`).

### Changed
- Overhauled dashboard UI styling and card layout (`cb9d44d`).
- Reorganized public asset directories and styles (`7eb1adb`).

---

## [0.1.0] - 2025-05-01

### Added
- **Application Initialization**: Set up Express 5 application with EJS view engine and MongoDB/Mongoose connection (`cc9fb7e`).
- **User Authentication**:
  - Registration and login endpoints with bcrypt password hashing (`cc9fb7e`).
  - Real-time client-side password requirement validation indicators (`431aacc`, `f7b2c6b`).
  - Interactive password visibility toggle button (`37518ca`).
  - Form error messaging and input retention (`a3e6f4d`).
- **Navigation Sidebar**:
  - Fixed sidebar navigation with Lucide SVG icons (`86d76c8`, `8eb4496`).
  - Navigation buttons for Courses, Collections, Tasks, and Settings (`8eb4496`).
- **Shared Head Partial**: Modularized `<head>` metadata and Google Font imports into `views/partials/head.ejs` (`069ad59`).
- **Dashboard Layout**: Initial grid layout prototype for the home/courses view (`c53b443`).
