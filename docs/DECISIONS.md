# Architecture Decision Records (ADRs) — GradeStar

This document explains the key architectural decisions behind **GradeStar**—why the app is built the way it is, the choices considered along the way, and the reasons behind each path taken. Only significant architectural choices are documented here, structured around four core components: **Goal**, **Options**, **Decision**, and **Because**.

---

## Index of Decisions

- [ADR-001: Server-Side Rendering (SSR) with Express & EJS](#adr-001-server-side-rendering-ssr-with-express--ejs)
- [ADR-002: User-Centric Embedded Document Hierarchy in MongoDB](#adr-002-user-centric-embedded-document-hierarchy-in-mongodb)
- [ADR-003: Modular Vanilla CSS and Design Tokens over CSS Frameworks](#adr-003-modular-vanilla-css-and-design-tokens-over-css-frameworks)
- [ADR-004: Native Node.js Test Runner (`node:test`)](#adr-004-native-nodejs-test-runner-nodetest)
- [ADR-005: Stateful Session Authentication with `express-session`](#adr-005-stateful-session-authentication-with-express-session)
- [ADR-006: Feature-Sliced Directory Structure (`src/features/`)](#adr-006-feature-sliced-directory-structure-srcfeatures)
- [ADR-007: Decoupled Universal Calendar Subsystem](#adr-007-decoupled-universal-calendar-subsystem)

---

### ADR-001: Server-Side Rendering (SSR) with Express & EJS

**Goal**: Get GradeStar started on a proven foundation by following a guided web development project from start to finish.

**Options**:
- Follow the setup shown in the tutorial using Node, Express, and EJS
- Set up a separate frontend and backend using modern tools like React or Next.js
- Use a different server templating engine like Handlebars or Pug

**Decision**: Build the application using Express and EJS templates rendered directly on the server.

**Because**: When the project first started, the goal was to learn and build quickly by closely following a video tutorial. Express and EJS provided a straightforward, working setup where pages render on the server without needing complicated frontend build tools.

---

### ADR-002: User-Centric Embedded Document Hierarchy in MongoDB

**Goal**: Make sure each student's courses and assignments stay private to their account and load without delays.

**Options**:
- Keep courses, grade groups, and tasks in separate database tables linked by ID references
- Store all of a student's courses and assignments directly inside their user profile

**Decision**: Nest courses, grade categories, and tasks directly inside each student's user account in MongoDB using [user-model.js](../src/models/user-model.js).

**Because**: GradeStar is a personal organizer where every class and assignment belongs to just one person. Keeping everything inside the user document means we can load an entire semester in a single database lookup, and deleting an account or course automatically cleans up all associated assignments without leaving orphaned data behind.

---

### ADR-003: Modular Vanilla CSS and Design Tokens over CSS Frameworks

**Goal**: Create a distinct, polished visual identity without dealing with complicated styling toolchains or generic pre-built templates.

**Options**:
- Use a utility framework like Tailwind CSS
- Use a pre-packaged component library like Bootstrap
- Write standard Vanilla CSS organized by shared foundations and specific pages

**Decision**: Write modular Vanilla CSS with shared design variables, split across base styles and page-specific stylesheets in `public/styles/`.

**Because**: Avoiding CSS frameworks keeps our templates readable and eliminates the need for extra build tools running in the background. It also gave us the freedom to handcraft unique interface elements—like the animated grade wheels and custom modals—without fighting the styling opinions of a framework.

---

### ADR-004: Native Node.js Test Runner (`node:test`)

**Goal**: Have a reliable way to check that calculations and validation rules work correctly without slowing down the development experience.

**Options**:
- Install external testing libraries like Jest or Vitest
- Use the built-in test runner already included with Node.js

**Decision**: Run automated tests using Node's native `node:test` runner and strict assertion library.

**Because**: Node now includes a fast test runner out of the box, meaning I didn't have to install or configure extra third-party libraries. This application is relatively small so there is no need for external libraries (yet).

---

### ADR-005: Stateful Session Authentication with `express-session`

**Goal**: Keep student accounts securely logged in while making it simple to log out and protect against stolen credentials.

**Options**:
- Use stateless JSON Web Tokens (JWT) stored in browser storage
- Use traditional server-managed session cookies with encrypted passwords

**Decision**: Manage user logins with server-side sessions using `express-session` and bcrypt password hashing.

**Because**: Session cookies marked as HTTP-only can't be read or stolen by malicious browser scripts, making them much safer for personal accounts. They also make logging out instant and foolproof, because the server can simply delete the session on the spot.

---

### ADR-006: Feature-Sliced Directory Structure (`src/features/`)

**Goal**: Keep the codebase clean and easy to navigate so that working on one part of the app doesn't require jumping across dozens of unrelated folders.

**Options**:
- Group files by technical role into broad folders like controllers, models, and routes
- Group files by feature (like authentication or courses) so that related code stays together

**Decision**: Organize the backend into domain-specific folders under [features/](../src/features/), grouping routes, business logic, and tests for each area together.

**Because**: As the project grew beyond simple prototypes, having all course-related logic in one folder and all login-related logic in another made everything much easier to find. Developers and AI assistants can understand and edit an entire feature without touching the rest of the project.

---

### ADR-007: Decoupled Universal Calendar Subsystem

**Goal**: Enable dynamic deadline tracking and month navigation across multiple screens (individual courses, student dashboards, and future task planners) without duplicating calendar code or coupling it to specific course routes.

**Options**:
- Keep the calendar embedded directly inside the courses feature and copy-paste it when other views need a calendar
- Adopt a heavy third-party client calendar library (like FullCalendar)
- Decouple the calendar into a shared calculation engine, parameterized EJS partial, modular CSS, and route-agnostic client script

**Decision**: Extract the calendar into a standalone subsystem with pure grid math in [calendar-service.js](../src/features/shared/calendar/calendar-service.js), a reusable template in [calendar.ejs](../views/partials/calendar.ejs), a shared stylesheet in [calendar.css](../public/styles/shared/calendar.css), and a generic client script in [calendar.js](../public/scripts/shared/calendar.js) configured via `data-endpoint` and `data-page-url` attributes.

**Because**: Hardcoding the calendar inside `/courses/:courseId` made it impossible to reuse on future dashboard or schedule views without messy duplication. Separating the grid math from course models means the calendar only cares about due dates, allowing any feature to feed it deliverables. Configuring the client script via data attributes allows any page to support smooth month switching, in-memory caching, and browser history tracking without writing page-specific JavaScript.
