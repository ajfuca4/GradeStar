# AGENTS.md — GradeStar Developer & AI Agent Guide

Welcome to **GradeStar**. This document is the primary reference manual and operational guide for AI coding assistants and software engineers working across the GradeStar codebase. It defines the project's mental model, architecture, conventions, workflows, and operational guardrails.

---

## 1. Project Overview & Mission

**GradeStar** is a modern, student-centric academic tracking web application. It empowers students to manage courses, organize assignments and examinations into weighted grading schemes, track course deadlines on a dynamic monthly calendar, and visualize their academic performance via custom visual grade indicators.

### Key Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Runtime** | Node.js (v20+ recommended) | CommonJS (`require` / `module.exports`) on server |
| **Web Framework** | [Express](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/package.json#L6) (v5.1.0) | Minimal, unopinionated routing and middleware engine |
| **Templating Engine** | [EJS](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/package.json#L5) (v4.0.1) | Dynamic server-side rendering with shared master layouts and partials |
| **Database & ODM** | [MongoDB](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/config/database.js) / [Mongoose](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/package.json#L8) (v8.14.0) | Document-oriented storage using deeply embedded subdocuments |
| **Session & Security** | [express-session](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/package.json#L7) & [bcrypt](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/package.json#L3) | Server-side session authentication with salt-hashed passwords |
| **Frontend Styling** | Vanilla CSS3 | Modular CSS, CSS custom properties, Outfit typography, no CSS frameworks |
| **Frontend Logic** | Vanilla JavaScript (ES6+) | Native browser APIs, event delegation, native `<template>` popups |
| **Testing** | Node.js native test runner (`node:test`) | Zero-dependency testing with `node:assert/strict` |

---

## 2. Repository Directory Structure

```text
GradeStar/
├── AGENTS.md                     # This file (AI and developer operational guide)
├── README.md                     # Project overview and quick start
├── package.json                  # Dependencies, scripts, and project metadata
├── package-lock.json             # Pinned dependency lockfile
├── .env                          # Local environment variables (git-ignored)
├── .gitignore                    # Git ignore specifications
├── docs/                         # Deep-dive architectural and project documentation
│   ├── ARCHITECTURE.md           # System topology, data flow, schema deep dive
│   ├── CHANGELOG.md              # Historical releases and unreleased changes
│   ├── DECISIONS.md              # Architecture Decision Records (ADRs)
│   └── ROADMAP.md                # Planned milestones and feature tracking
├── src/                          # Server-side application source code
│   ├── app.js                    # Express app initialization, middleware pipeline, server bootstrap
│   ├── config/
│   │   └── database.js           # Mongoose MongoDB connection handler
│   ├── features/                 # Domain-driven feature slices
│   │   ├── auth/                 # Authentication domain
│   │   │   ├── auth-routes.js    # /login, /signup, / endpoints
│   │   │   ├── auth-service.js   # User lookup, bcrypt hashing, session auth logic
│   │   │   ├── auth-validation.js# Pure functions for email and password validation rules
│   │   │   └── auth-validation.test.js # Unit tests for auth validation rules
│   │   └── courses/              # Course and academic management domain
│   │       ├── course-fixtures.js# Seed and sample course objects for prototyping
│   │       ├── course-routes.js  # /courses, /courses/:courseId endpoints
│   │       └── course-service.js # User-course retrieval, course creation, task sorting, calendar generation
│   ├── middleware/               # Express middleware functions
│   │   ├── error-handler.js      # Global 500 error handling middleware
│   │   ├── not-found.js          # Global 404 handler middleware
│   │   └── require-auth.js       # Route protection middleware checking req.session.userId
│   └── models/                   # Mongoose data models and schemas
│       ├── index.js              # Model exports (User)
│       ├── user-model.js         # Root User collection schema (holds embedded courses)
│       ├── course-schema.js      # Course subdocument schema
│       ├── task-group-schema.js  # TaskGroup subdocument schema (weighted categories)
│       └── task-schema.js        # Task subdocument schema (individual deliverables)
├── views/                        # EJS server-side templates
│   ├── layouts/
│   │   └── app.ejs               # Master HTML shell with dynamic partial, styles, and scripts
│   ├── auth/
│   │   ├── login.ejs             # Login form template
│   │   └── signup.ejs            # Signup form with real-time requirement indicators
│   ├── courses/
│   │   ├── courses.ejs           # Courses dashboard grid
│   │   └── course.ejs            # Individual course view (tasks + calendar + grade card)
│   ├── errors/
│   │   ├── 404.ejs               # Not found error page
│   │   └── 500.ejs               # Internal server error page
│   └── partials/                 # Reusable EJS interface partials
│       ├── course-card.ejs       # Summary card for a single course in the dashboard
│       ├── deliverables.ejs      # Single task row with weight badge
│       ├── grade-wheel.ejs       # SVG circular percentage grade display
│       ├── head.ejs              # Global HTML <head> with fonts, meta, and dynamic styles
│       ├── nav.ejs               # Left sidebar navigation with brand logo and view links
│       ├── popup.ejs             # Modal dialog container overlay
│       └── popup-views/
│           └── add-course-popup.ejs # Inline course creation modal form
└── public/                       # Static assets served at root /
    ├── images/
    │   └── Wordmark Logo White.svg # Vector brand logo
    ├── scripts/                  # Client-side JavaScript
    │   ├── auth/
    │   │   ├── email.js          # Email input live validation feedback
    │   │   ├── password.js       # Signup password criteria interactive feedback
    │   │   └── password-toggle.js# Eye toggle for showing/hiding password plaintext
    │   ├── courses/
    │   │   └── popup.js          # Course creation popup logic and AJAX POST
    │   └── shared/
    │       ├── general.js        # Shared client-side helpers
    │       └── nav.js            # Sidebar navigation active state handler
    └── styles/                   # Modular CSS stylesheets
        ├── auth/
        │   └── auth.css          # Login and signup card styles
        ├── courses/
        │   ├── course.css        # Detailed course page layout, tasks, and calendar styles
        │   ├── course-card.css   # Dashboard course card and grade wheel layout
        │   └── courses.css       # Courses dashboard grid layout
        └── shared/
            ├── content.css       # Standard page container layout and headers
            ├── general.css       # CSS reset, typography, buttons, and utility classes
            ├── nav.css           # Sidebar styles and responsive layout
            └── popup.css         # Modal dialog overlay and animation styles
```

---

## 3. Development Workflow & Commands

### Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run with auto-reload (Nodemon)
npm run dev

# 3. Run production server directly
npm start

# 4. Run test suite
npm test
```

## 4. Architectural Rules & Invariants

When creating new features, refactoring existing code, or proposing modifications, all agents must adhere to the following principles:

### 4.1 Document Tenancy & Subdocument Hierarchy
- **Single Root Collection**: GradeStar uses a single root collection: [User](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/models/user-model.js). Courses, Task Groups, and Tasks are **never** stored in separate top-level collections.
- **Data Tree**:
  $$\text{User} \longrightarrow [\text{Course}] \longrightarrow ([\text{TaskGroup} \longrightarrow [\text{Task}]] + [\text{Task}\ (\text{uniqueTasks})]))$$
- **Querying**: Always query via `User.findById(userId)`. Subdocuments are accessed via Mongoose array subdocument methods like `user.courses.id(courseId)`.
- **Do not create separate Course, TaskGroup, or Task models** in Mongoose unless a formal migration is documented in [DECISIONS.md](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/docs/DECISIONS.md).

### 4.2 Feature-Sliced Modularity
- Code is organized domain-first under `src/features/<feature-name>/`.
- Each feature slice contains:
  - `<feature>-routes.js`: HTTP request routing, input parsing, layout rendering.
  - `<feature>-service.js`: Domain operations and database queries.
  - `<feature>-validation.js`: Pure validation functions (where applicable).
  - `<feature>-validation.test.js`: Unit tests for pure domain functions.
- Routes should remain thin: delegate complex logic to services.

### 4.3 Master Layout Contract (`views/layouts/app.ejs`)
Every route rendering an HTML page must pass an object conforming to the layout contract:
```javascript
res.render('layouts/app.ejs', {
  title: 'Page Title',               // String: Displays in <title> and head
  showNav: true,                     // Boolean: Controls rendering of sidebar nav
  contentPartial: '../courses/course.ejs', // String: Relative path to content template
  styles: ['/styles/...'],           // Array<String>: Stylesheet links injected into <head>
  scripts: ['/scripts/...'],         // Array<String>: Module scripts injected before </body>
  ...viewSpecificPayload             // Object: Data consumed by the contentPartial
});
```

### 4.4 Error Handling Pipeline
- All asynchronous route handlers must be wrapped in `try { ... } catch (error) { next(error); }`.
- Route errors pass to [error-handler.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/middleware/error-handler.js), which renders [views/errors/500.ejs](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/views/errors/500.ejs).
- Missing resources or routes trigger [not-found.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/middleware/not-found.js), rendering [views/errors/404.ejs](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/views/errors/404.ejs).

### 4.5 Frontend Standards
- **No Bundlers / Transpilers**: Frontend JavaScript is executed natively in modern browsers. Use standard ES6+ syntax (`type="module"` when applicable).
- **No CSS Frameworks**: Maintain Vanilla CSS styling. Use CSS custom properties and scoped stylesheets organized in `public/styles/`.
- **Icons**: Lucide SVG icons are embedded directly inline into templates to avoid external icon font dependencies.
- **Accessibility**: Provide `aria-label`, `role="img"`, and sensible fallback content on interactive SVG elements and buttons.

---

## 5. Testing & Code Quality

- **Native Runner**: Tests run via `node --test` matching `*.test.js` files.
- **Assertion Library**: Use `node:assert/strict`.
- **Validation Isolation**: Always extract pure logic (validators, grade calculations, calendar builders) so they can be thoroughly unit tested without mocking MongoDB connections or HTTP request/response objects.
- **Running tests before completion**: Always run `npm test` after modifying logic to verify that no regressions were introduced.

---

## 6. Project Documentation Index

For exhaustive technical references, consult the dedicated guides in the `docs/` directory:

| Document | Purpose |
| :--- | :--- |
| [ARCHITECTURE.md](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/docs/ARCHITECTURE.md) | In-depth technical architecture, schema designs, component hierarchy, and data flow. |
| [DECISIONS.md](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/docs/DECISIONS.md) | Architecture Decision Records (ADRs) explaining the rationale behind design choices. |
| [ROADMAP.md](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/docs/ROADMAP.md) | Product vision, current milestone deliverables, and planned feature roadmap. |
| [CHANGELOG.md](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/docs/CHANGELOG.md) | Version history, recent updates, bug fixes, and breaking changes. |

### File by File Documentation Standards

For all documentation, follow the following guidelines:
- Documents should be kept up to date with code changes.
- Write conscisely, but thoroughly as needed.
- Tend toward using more natural, "programmer-to-programmer" language and avoiding overly formal or academic writing styles.

### 6.1 `DECISIONS.md`: Handling Architecture Decision Records

When determining whether to record an Architecture Decision Record (ADR) in [DECISIONS.md](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/docs/DECISIONS.md), all agents and developers must adhere to the following guidelines:

- **Significance Threshold**: Only **significant changes to the architecture** should be considered for inclusion in [DECISIONS.md](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/docs/DECISIONS.md).
- **What Belongs in `DECISIONS.md`**:
  - Foundational architectural shifts (e.g., changes to rendering paradigm, routing model, or communication protocols).
  - High-impact data layer changes (e.g., alterations to the document tenancy model, moving from embedded subdocuments to normalized collections, or breaking schema restructuring).
  - Additions, removals, or replacements of core platform dependencies, session mechanisms, or testing frameworks.
  - Large-scale structural pattern reorganizations (e.g., directory restructuring, domain boundary shifts).
- **What Does NOT Belong in `DECISIONS.md`**:
  - Routine bug fixes, component tweaks, or CSS styling adjustments.
  - Standard feature extensions that fit existing architectural patterns.
  - Minor dependency updates or non-architectural library additions.
  - Normal day-to-day refactorings and non-structural code cleanup.
- **ADR Format Requirements**: When a change meets the significance threshold, record it in [DECISIONS.md](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/docs/DECISIONS.md) adhering to the standard template:
  1. Sequential identifier and descriptive title: `### ADR-XXX: <Title>`
  2. Four required structured fields:
     - `**Goal**:` Clear description of the objective or problem being solved.
     - `**Options**:` List of viable architectural alternatives considered.
     - `**Decision**:` The selected architectural approach or technology.
     - `**Because**:` The technical rationale, benefits, and trade-offs justifying the decision.
  3. Ensure the **Index of Decisions** at the top of [DECISIONS.md](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/docs/DECISIONS.md) is updated with a direct anchor link to the new record.
