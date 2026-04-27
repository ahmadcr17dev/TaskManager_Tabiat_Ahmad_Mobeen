# Mini Task Manager — Full Stack Technical Assessment

## Overview

This project is a lightweight full stack task manager application built as part of a 3-hour technical assessment. It allows users to create, view, update, filter, and delete tasks with a simple and responsive interface.

The goal was to demonstrate the ability to design, implement, and ship a functional application with clean architecture and good development practices.

---

## Features

### Backend (REST API)

* Create a task
* Retrieve all tasks
* Update task status, priority, or details
* Delete a task
* Filter tasks by:

  * Status (`todo`, `in-progress`, `done`)
  * Priority (`low`, `medium`, `high`)
* Input validation with proper HTTP status codes
* Persistent storage using a database (no in-memory storage)

### Note: I did not push .env file but this project is for technical assessment so here is a .env API keys
### .env frontend
VITE_API_URL = http://localhost:8080
VITE_API_KEY = tabiat_secret_key_2026

### .env backend
MONGO_URI=mongodb+srv://chaudaryahmad1041_db_user:Tabiat123@cluster0.femjqhd.mongodb.net/Tabiat_TaskManager?retryWrites=true&w=majority&appName=Cluster0
PORT = 8080
API_KEY = tabiat_secret_key_2026

### Frontend

* Display a list of tasks with:

  * Title
  * Status
  * Priority badge
* Filter tasks dynamically without page reload
* Create task form with client-side validation
* Inline status updates (instant UI + API sync)
* Delete task with confirmation prompt
* Responsive design (mobile-friendly)

---

## Tech Stack

**Frontend**

* React.JS
* TailwindCSS

**Backend**

* Node.js + Express

**Database**

* MongoDB

---

## API Endpoints

### Get all tasks

GET /tasks
Optional query params:

* `status`
* `priority`

Example:
GET /tasks?status=todo&priority=high

---

### Create a task

POST /tasks

Request body:

```json
{
  "title": "Task title",
  "description": "Task description",
  "status": "todo",
  "priority": "medium"
}
```

---

### Update a task

PATCH /tasks/:id

---

### Delete a task

DELETE /tasks/:id

---

## Data Model

Each task contains:

* `id`
* `title`
* `description`
* `status` (todo / in-progress / done)
* `priority` (low / medium / high)
* `createdAt`

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Run the application

```bash
npm run dev
```

---

### 4. Open in browser

```
http://localhost:5173
```

---

## Project Structure

```
/backend
  /routes
  /controllers
  /models
/frontend
  /src
    /components
```

---

## Assumptions

* No user authentication required (single-user app)
* Tasks are managed independently without user accounts
* Basic validation is sufficient for this scope

---

## Trade-offs

* Used MongoDB for simplicity and quick setup
* Minimal UI styling to prioritize functionality within time constraints
* No pagination due to small dataset assumption

---

## Improvements (If given more time)

* Add authentication (API key or JWT)
* Add drag-and-drop task organization
* Add unit and integration tests
* Improve UI/UX and animations
* Add pagination and sorting
* Deploy application (e.g., Vercel + Railway)

---

## Author

Muhammad Ahmad Mobeen

---

## Notes

This project was built under time constraints (nearly 3 hours) focusing on correctness, clarity, and functionality rather than feature completeness.
