# 📊 Mess Review System – Development & Deployment Report

## 🚀 Project Overview

The Mess Review System is a full-stack web application designed to collect, analyze, and visualize student feedback on daily mess meals. The system supports role-based access (Admin & Students), real-time menu updates, and analytics visualization.

---

## 🧩 Tech Stack

### Frontend:

* React.js
* Tailwind CSS
* Chart.js (Analytics)

### Backend:

* Node.js
* Express.js

### Database:

* MongoDB (Mongoose)

### Authentication:

* Firebase Authentication (Google Login)

### Deployment:

* Frontend → Vercel
* Backend → Render

---

## 🛠️ Development Sprint Breakdown

### 🔹 Phase 1: Core Functionality

* Built review submission form
* Implemented meal-based rating system
* Added tagging system (quality, hygiene, etc.)
* Created admin menu upload system

---

### 🔹 Phase 2: Backend API Development

* Designed REST APIs:

  * `POST /review`
  * `GET /review/today`
  * `GET /review/analytics`
  * `POST /menu`
  * `GET /menu/today`
* Implemented MongoDB schema for:

  * Reviews
  * Menu

---

### 🔹 Phase 3: Frontend Integration

* Connected APIs using Axios
* Built dashboard UI
* Added analytics charts (Bar + Doughnut)
* Implemented role-based rendering (Admin vs Student)

---

### 🔹 Phase 4: Real-Time Behavior

* Added auto-refresh using `setInterval`
* Handled UX issue during input (editing lock mechanism)

---

## 🚀 Deployment Pipeline

### Step 1: Backend Deployment (Render)

* Hosted Express server
* Connected MongoDB Atlas
* Verified API endpoints using browser & Postman

---

### Step 2: Frontend Deployment (Vercel)

* Connected GitHub repo
* Configured root directory (`client`)
* Set environment variables:

  * `REACT_APP_API_URL`

---

### Step 3: CI/CD Flow

* Code pushed → GitHub
* Vercel auto-build triggered
* Build → Deploy → Live URL generated

---

## ⚠️ Major Issues Faced & Resolutions

---

### 🔴 1. Git Submodule Issue

**Problem:**

```text
client treated as submodule → files not tracked
```

**Fix:**

* Removed `client/.git`
* Re-added client folder to main repo

---

### 🔴 2. API 404 Errors (Production)

**Problem:**

```text
/api missing in frontend requests
```

**Fix:**

* Updated `.env`:

```env
REACT_APP_API_URL=https://backend-url/api
```

---

### 🔴 3. CORS / Backend Connectivity

**Problem:**
Frontend couldn’t connect to Render backend

**Fix:**

* Enabled CORS in Express:

```js
app.use(cors({ origin: "*" }))
```

---

### 🔴 4. Vercel Build Failures

**Problems:**

* `react-scripts not found`
* `package.json not found`
* wrong root directory

**Fix:**

* Set:

```text
Root Directory = client
Build Command = npm run build
Output Directory = build
```

---

### 🔴 5. React Build Failing (Silent Error)

**Problem:**

```text
npm run build exited with 1 (no clear error)
```

**Cause:**
ESLint blocking build

**Fix:**

```json
"build": "cross-env CI=false react-scripts build"
```

---

### 🔴 6. Windows Build Issue

**Problem:**

```text
CI is not recognized
```

**Fix:**

* Installed `cross-env`

---

### 🔴 7. Output Directory Not Found

**Problem:**

```text
build folder not detected
```

**Cause:**
Build was failing internally

**Fix:**

* Debugged locally using `npm run build`
* Fixed underlying issues

---

### 🔴 8. Firebase Authentication Error

**Problem:**

```text
auth/unauthorized-domain
```

**Fix:**

* Added Vercel domain in Firebase:

```text
Authorized Domains → add vercel.app
```

---

## 📈 Final Outcome

* Fully functional full-stack application
* Live deployment with:

  * Secure authentication
  * Real-time data updates
  * Analytics visualization
* Mobile-responsive UI

---

## 💡 Key Learnings

* Real-world debugging is iterative and multi-layered
* Deployment issues are often configuration-related
* Git structure plays a crucial role in CI/CD
* Production builds behave differently from development
* Environment variables must be handled carefully

---

## 🚀 Future Enhancements

* Weekly / Monthly analytics filters
* AI-based review summarization
* Notification system
* Performance optimization
* Custom domain integration

---

## 🌍 Live System

The application is successfully deployed and accessible publicly, demonstrating a complete end-to-end development lifecycle from local development to production deployment.

---

## 🏁 Conclusion

This project showcases strong full-stack development capabilities, including frontend design, backend architecture, API integration, debugging, and production deployment. The challenges faced and resolved reflect real-world engineering scenarios, making this a production-ready and portfolio-worthy system.
