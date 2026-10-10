# Authentication Functions

This document catalogs the functions supporting user registration, authentication, password hashing, and input validation within GradeStar's authentication slice.

---

## 1. Pure Validation Functions (`src/features/auth/auth-validation.js`)

### [`isValidEmail(email)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L1-L3)
- **File**: [src/features/auth/auth-validation.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js) (lines 1-3)
- **Signature**: `function isValidEmail(email: string): boolean`
- **Brief Purpose**: Tests whether an email address format is valid with non-whitespace characters, `@`, and a period.
- **Where Called From**:
  - [src/features/auth/auth-service.js:33](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L33) — during user signup validation in [`signup()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L31-L63).
  - [src/features/auth/auth-validation.test.js:11,15,19](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.test.js#L11) — unit test assertions.
- **What Other Functions It Calls**:
  - `RegExp.prototype.test()` with pattern `/\S+@\S+\.\S+/`.

---

### [`passwordLengthReq(password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L5-L7)
- **File**: [src/features/auth/auth-validation.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js) (lines 5-7)
- **Signature**: `function passwordLengthReq(password: string): boolean`
- **Brief Purpose**: Checks whether password string length is between 6 and 30 characters inclusive.
- **Where Called From**:
  - [src/features/auth/auth-validation.js:22](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L22) (in [`isPasswordValid()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L21-L23)).
  - [src/features/auth/auth-validation.js:27](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L27) (in [`passwordRequirementFlags()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L25-L32)).
- **What Other Functions It Calls**: None.

---

### [`passwordUpperReq(password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L9-L11)
- **File**: [src/features/auth/auth-validation.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js) (lines 9-11)
- **Signature**: `function passwordUpperReq(password: string): boolean`
- **Brief Purpose**: Checks whether password contains at least one uppercase letter.
- **Where Called From**:
  - [src/features/auth/auth-validation.js:22](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L22) (in [`isPasswordValid()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L21-L23)).
  - [src/features/auth/auth-validation.js:28](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L28) (in [`passwordRequirementFlags()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L25-L32)).
- **What Other Functions It Calls**:
  - `RegExp.prototype.test()` with pattern `/[A-Z]/`.

---

### [`passwordLowerReq(password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L13-L15)
- **File**: [src/features/auth/auth-validation.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js) (lines 13-15)
- **Signature**: `function passwordLowerReq(password: string): boolean`
- **Brief Purpose**: Checks whether password contains at least one lowercase letter.
- **Where Called From**:
  - [src/features/auth/auth-validation.js:22](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L22) (in [`isPasswordValid()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L21-L23)).
  - [src/features/auth/auth-validation.js:29](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L29) (in [`passwordRequirementFlags()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L25-L32)).
- **What Other Functions It Calls**:
  - `RegExp.prototype.test()` with pattern `/[a-z]/`.

---

### [`passwordSpecialReq(password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L17-L19)
- **File**: [src/features/auth/auth-validation.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js) (lines 17-19)
- **Signature**: `function passwordSpecialReq(password: string): boolean`
- **Brief Purpose**: Checks whether password contains at least one digit or ASCII symbol.
- **Where Called From**:
  - [src/features/auth/auth-validation.js:22](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L22) (in [`isPasswordValid()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L21-L23)).
  - [src/features/auth/auth-validation.js:30](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L30) (in [`passwordRequirementFlags()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L25-L32)).
- **What Other Functions It Calls**:
  - `RegExp.prototype.test()` with character class pattern.

---

### [`isPasswordValid(password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L21-L23)
- **File**: [src/features/auth/auth-validation.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js) (lines 21-23)
- **Signature**: `function isPasswordValid(password: string): boolean`
- **Brief Purpose**: Validates that all four password complexity rules pass.
- **Where Called From**:
  - [src/features/auth/auth-service.js:34](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L34) (inside [`signup()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L31-L63)).
  - [src/features/auth/auth-validation.test.js:25,29,33,37,41,45,49](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.test.js#L25) — unit tests.
- **What Other Functions It Calls**:
  - [`passwordLengthReq(password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L5-L7)
  - [`passwordUpperReq(password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L9-L11)
  - [`passwordLowerReq(password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L13-L15)
  - [`passwordSpecialReq(password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L17-L19)

---

### [`passwordRequirementFlags(password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L25-L32)
- **File**: [src/features/auth/auth-validation.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js) (lines 25-32)
- **Signature**: `function passwordRequirementFlags(password: string): object`
- **Brief Purpose**: Generates an object containing individual booleans (`validLength`, `containsUpper`, `containsLower`, `containsNumSpec`) for rendering UI feedback pills.
- **Where Called From**:
  - [src/features/auth/auth-service.js:35](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L35) (inside [`signup()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L31-L63)).
  - [src/features/auth/auth-validation.test.js:55](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.test.js#L55) — unit tests.
- **What Other Functions It Calls**:
  - [`passwordLengthReq(password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L5-L7)
  - [`passwordUpperReq(password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L9-L11)
  - [`passwordLowerReq(password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L13-L15)
  - [`passwordSpecialReq(password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L17-L19)

---

## 2. Authentication Domain Service (`src/features/auth/auth-service.js`)

### [`findUserByEmail(email)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L9-L11)
- **File**: [src/features/auth/auth-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js) (lines 9-11)
- **Signature**: `async function findUserByEmail(email: string): Promise<User|null>`
- **Brief Purpose**: Queries the MongoDB `User` collection for a document with the matching email.
- **Where Called From**:
  - [src/features/auth/auth-service.js:18](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L18) (in [`login()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L17-L29)).
  - [src/features/auth/auth-service.js:32](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L32) (in [`signup()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L31-L63)).
- **What Other Functions It Calls**:
  - `User.findOne({ email })` — Mongoose ODM query.

---

### [`isPasswordCorrect(password, hashedPassword)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L13-L15)
- **File**: [src/features/auth/auth-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js) (lines 13-15)
- **Signature**: `async function isPasswordCorrect(password: string, hashedPassword: string): Promise<boolean>`
- **Brief Purpose**: Asynchronously verifies a plaintext password against the stored bcrypt hash.
- **Where Called From**:
  - [src/features/auth/auth-service.js:23](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L23) (in [`login()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L17-L29)).
- **What Other Functions It Calls**:
  - `bcrypt.compare(password, hashedPassword)`.

---

### [`login(email, password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L17-L29)
- **File**: [src/features/auth/auth-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js) (lines 17-29)
- **Signature**: `async function login(email: string, password: string): Promise<{ ok: boolean, user?: User }>`
- **Brief Purpose**: Authenticates an existing user account using email and password.
- **Where Called From**:
  - [src/features/auth/auth-routes.js:53](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-routes.js#L53) (in Express `POST /login` route).
- **What Other Functions It Calls**:
  - [`findUserByEmail(email)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L9-L11)
  - [`isPasswordCorrect(password, user.password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L13-L15)

---

### [`signup(email, password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L31-L63)
- **File**: [src/features/auth/auth-service.js](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js) (lines 31-63)
- **Signature**: `async function signup(email: string, password: string): Promise<object>`
- **Brief Purpose**: Validates uniqueness and strength, hashes password with bcrypt, and inserts a new User into MongoDB.
- **Where Called From**:
  - [src/features/auth/auth-routes.js:96](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-routes.js#L96) (in Express `POST /signup` route).
- **What Other Functions It Calls**:
  - [`findUserByEmail(email)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L9-L11)
  - [`isValidEmail(email)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L1-L3)
  - [`isPasswordValid(password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L21-L23)
  - [`passwordRequirementFlags(password)`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-validation.js#L25-L32)
  - `bcrypt.hash(password, 10)`
  - `User.insertMany({ email, password: hashedPassword, startDateSeparation: false })`

---

## 3. Authentication HTTP Routes (`src/features/auth/auth-routes.js`)

- **`GET /`** ([lines 30-32](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-routes.js#L30-L32)): Redirects root requests to `/login`.
- **`GET /login`** ([lines 35-43](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-routes.js#L35-L43)): Renders `views/auth/login.ejs` with blank input fields.
- **`POST /login`** ([lines 46-70](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-routes.js#L46-L70)): Executes [`authService.login()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L17-L29); sets `req.session.userId` and redirects to `/courses` on success, or renders form with error messages on failure.
- **`GET /signup`** ([lines 73-86](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-routes.js#L73-L86)): Renders `views/auth/signup.ejs` with initial requirement badges.
- **`POST /signup`** ([lines 89-117](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-routes.js#L89-L117)): Executes [`authService.signup()`](file:///Users/anthonyfuca/Desktop/Programming/GradeStar/src/features/auth/auth-service.js#L31-L63); redirects to `/login` on success, or re-renders signup view with detailed field error messages and password requirement flags.
