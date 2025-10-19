````markdown
# Kaiburr Task Runner Web UI

A modern, responsive web application built with React 18, TypeScript, and Ant Design for managing and executing tasks through an intuitive user interface.

---

## Features

- Create Tasks: Add new tasks with name, owner name, and command details  
- View Tasks: Display all tasks in a clean, organized table format  
- Search Tasks: Search and filter tasks by name  
- Update Tasks: Edit existing task information  
- Delete Tasks: Remove tasks from the system with confirmation dialogs  
- Run Tasks: Execute tasks and view command output in real-time  
- Validation: Form validation ensures data integrity and rejects unsafe commands  
- Responsive Design: Optimized for desktop and mobile devices  

---

## Technology Stack

- Framework: React 18  
- Language: TypeScript  
- UI Library: Ant Design (antd)  
- HTTP Client: Axios  
- Build Tool: Vite  
- Package Manager: npm / yarn  

---

## Prerequisites

- Node.js (v18 or higher)  
- npm or yarn package manager  
- Backend API running (available at [Kaiburr Task Runner API](https://github.com/ananthu-m-01/kaiburr-task-runner-api?tab=readme-ov-file))  

---

## Installation

```bash
git clone https://github.com/ananthu-m-01/kaiburr-task-runner-ui.git
cd kaiburr-task-runner-ui
npm install
````

or

```bash
yarn install
```

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## Running the Application

### Development Mode

```bash
npm run dev
```

or

```bash
yarn dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
```

or

```bash
yarn build
```

Preview production build:

```bash
npm run preview
```

or

```bash
yarn preview
```

---

## Usage Guide

### Home Page

![Home Page](https://github.com/ananthu-m-01/kaiburr-task-runner-ui/blob/main/screenshots/home-page.png?raw=true)

### View All Tasks

![View All Tasks](https://github.com/ananthu-m-01/kaiburr-task-runner-ui/blob/main/screenshots/view-all-taks.png?raw=true)

### Create Task

![Create Task](https://github.com/ananthu-m-01/kaiburr-task-runner-ui/blob/main/screenshots/ui-create-task.png?raw=true)

### Task Validation

![Task Validation](https://github.com/ananthu-m-01/kaiburr-task-runner-ui/blob/main/screenshots/ui-validate-task.png?raw=true)

### View Task Details

![View Task](https://github.com/ananthu-m-01/kaiburr-task-runner-ui/blob/main/screenshots/view-task.png?raw=true)

### Search Tasks

![Search Task](https://github.com/ananthu-m-01/kaiburr-task-runner-ui/blob/main/screenshots/ui-search-task.png?raw=true)

### Update Task

![Update Task](https://github.com/ananthu-m-01/kaiburr-task-runner-ui/blob/main/screenshots/ui-update-task.png?raw=true)

### Run Task

![Run Task](https://github.com/ananthu-m-01/kaiburr-task-runner-ui/blob/main/screenshots/ui-run-task.png?raw=true)

### Delete Task

![Delete Task](https://github.com/ananthu-m-01/kaiburr-task-runner-ui/blob/main/screenshots/ui-delete-task.png?raw=true)

---

## Project Structure

```
kaiburr-task-runner-ui/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   └── taskApi.ts
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── CreateTask.tsx
│   │   ├── Home.tsx
│   │   ├── TaskForm.tsx
│   │   ├── ViewAllTasks.tsx
│   │   └── ViewTask.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── app.css
│   └── index.css
├── screenshots/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## UI/UX Features

* Intuitive Navigation
* Responsive Design
* Loading States for API calls
* Error Handling with user-friendly messages
* Confirmation Dialogs for destructive actions
* Toast Notifications for immediate feedback
* Keyboard Navigation and ARIA support
* Semantic HTML and color contrast compliance

---

## API Integration

The application integrates with the backend REST API:

| Method | Endpoint              | Description                        |
| ------ | --------------------- | ---------------------------------- |
| GET    | `/api/tasks`          | Retrieve all tasks                 |
| GET    | `/api/tasks/{id}`     | Retrieve task by ID                |
| POST   | `/api/tasks`          | Create a new task                  |
| PUT    | `/api/tasks/{id}`     | Update an existing task            |
| DELETE | `/api/tasks/{id}`     | Delete a task                      |
| PUT    | `/api/tasks/{id}/run` | Execute a task and retrieve output |

Backend API is available at: [Kaiburr Task Runner API](https://github.com/ananthu-m-01/kaiburr-task-runner-api?tab=readme-ov-file)

---

## Browser Support

* Chrome (latest)
* Firefox (latest)
* Safari (latest)
* Edge (latest)

---

## Submission Statement

All code and screenshots are created by me. Screenshots include the current date/time and my name. AI tools were used only for guidance. Full understanding and implementation are done by myself.

---

## Author

**Name:** Ananthu M
**Email:** [ananthu.m.utr@gmail.com](mailto:ananthu.m.utr@gmail.com)
**GitHub:** [https://github.com/ananthu-m-01](https://github.com/ananthu-m-01)

---

## Acknowledgments

Developed as part of Task #3 – Web UI Forms for the Kaiburr technical assessment.

```
```
