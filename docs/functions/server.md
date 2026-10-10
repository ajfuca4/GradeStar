# Server Core & Middleware Functions

This document catalogs the functions powering application bootstrapping, database connectivity, and Express request middleware pipelines in GradeStar.

---

## 1. Core Server & Configuration

### [`start()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/app.js#L38-L45)
- **File**: [src/app.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/app.js) (lines 38-45)
- **Signature**: `async function start(): Promise<void>`
- **Brief Purpose**: Bootstraps the application by waiting for the MongoDB connection and launching the Express HTTP server on the configured port.
- **Where Called From**:
  - [src/app.js:47](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/app.js#L47) — invoked immediately at top-level script execution during `npm start` / `npm run dev`.
- **What Other Functions It Calls**:
  - [`connectDB()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/config/database.js#L3-L11) in [src/config/database.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/config/database.js) — connects to MongoDB.
  - `app.listen(port, callback)` — Express server listening method.

---

### [`connectDB()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/config/database.js#L3-L11)
- **File**: [src/config/database.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/config/database.js) (lines 3-11)
- **Signature**: `const connectDB = async (): Promise<void>`
- **Brief Purpose**: Connects Mongoose to the MongoDB database using the connection URI specified in `process.env.MONGO_URI`, exiting the process if the connection fails.
- **Where Called From**:
  - [src/app.js:39](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/app.js#L39) (inside [`start()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/app.js#L38-L45)).
- **What Other Functions It Calls**:
  - `mongoose.connect(process.env.MONGO_URI)` — Mongoose database driver connection.
  - `console.log(...)` / `console.error(...)` — output logging.
  - `process.exit(1)` — terminates the process on unrecoverable DB errors.

---

## 2. Express Middleware Pipeline

### [`requireAuth(req, res, next)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/middleware/require-auth.js#L1-L8)
- **File**: [src/middleware/require-auth.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/middleware/require-auth.js) (lines 1-8)
- **Signature**: `function requireAuth(req, res, next): void`
- **Brief Purpose**: Enforces user authentication on protected routes; checks if `req.session.userId` is present, redirecting unauthenticated clients to `/login`.
- **Where Called From**:
  - [src/app.js:33](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/app.js#L33) — mounted as route-level middleware guarding all `/courses` endpoints (`app.use('/courses', requireAuth, courseRoutes)`).
- **What Other Functions It Calls**:
  - `res.redirect('/login')` — redirects unauthenticated users.
  - `next()` — yields control to subsequent route middleware/handler.

---

### [`notFound(req, res)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/middleware/not-found.js#L1-L3)
- **File**: [src/middleware/not-found.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/middleware/not-found.js) (lines 1-3)
- **Signature**: `function notFound(req, res): void`
- **Brief Purpose**: Catch-all 404 handler that sets HTTP status to 404 and renders the not-found template.
- **Where Called From**:
  - [src/app.js:34](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/app.js#L34) — registered at the end of the Express middleware pipeline before the error handler.
- **What Other Functions It Calls**:
  - `res.status(404)`
  - `res.render('errors/404.ejs')`

---

### [`errorHandler(err, req, res, next)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/middleware/error-handler.js#L1-L10)
- **File**: [src/middleware/error-handler.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/middleware/error-handler.js) (lines 1-10)
- **Signature**: `function errorHandler(err, req, res, next): void`
- **Brief Purpose**: Global Express error handler that logs the error object to stderr and renders the sanitized 500 error page.
- **Where Called From**:
  - [src/app.js:35](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/app.js#L35) — registered as the terminal 4-parameter error handler in Express (`app.use(errorHandler)`).
- **What Other Functions It Calls**:
  - `console.error(err)`
  - `next(err)` — called if response headers have already been sent to client.
  - `res.status(500)`
  - `res.render('errors/500.ejs')`
