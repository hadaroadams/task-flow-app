# 📝 TaskFlow – Role-Based Task Management App

**TaskFlow** is a role-based task management application built with **Next.js**, **TypeScript**, and **Tailwind CSS**.  
It demonstrates **authentication**, **role-based access control (RBAC)**, and **CRUD operations** for projects and tasks in a real-world context.

---

## 🚀 Features

- **Authentication**: Login system with email/password
- **RBAC (Role-Based Access Control)**: Admin, Manager, Member roles
- **Tasks**: Create, view, edit, delete tasks according to role permissions
- **Admin Panel**: Admin can manage users and change roles
- **UI States**: Loading, empty, and error states handled gracefully
- **Responsive Design**: Mobile-friendly layout

---

## 👥 Test Credentials

| Role    | Email                | Password |
| ------- | -------------------- | -------- |
| Admin   | admin@taskflow.com   | 123456   |
| Manager | manager@taskflow.com | 123456   |
| Member  | member@taskflow.com  | 123456   |

> **Note:** Use these credentials to test different RBAC access levels.

---

## 🔑 RBAC Logic

TaskFlow implements **Role-Based Access Control (RBAC)** with **three roles**: **Admin**, **Manager**, and **Member**.  
Permissions are enforced in both the **UI** and **API endpoints**.

### 1. Admin

- Full access to all pages: `/dashboard`, `/tasks`, `/projects`, `/admin-panel`
- Can **create, edit, delete** any task
- Can **manage user roles** (change a user's role)

### 2. Manager

- Can view projects they **own**
- Can **create, edit, delete tasks** only in their projects
- Cannot access the admin panel
- Cannot manage other users’ roles

### 3. Member

- Can view **tasks assigned to them**
- Can mark their own tasks as **done**
- Cannot create, edit, delete tasks or projects
- Cannot access the admin panel

> Implementation:
>
> - **UI:** Conditional rendering based on user role
> - **API:** Middleware checks JWT and role before processing requests
> - **Route Protection:** Middleware and pages redirects unauthorized users away from restricted routes

---

## ⚙️ Project Setup

Follow these steps to run TaskFlow locally:

### 1. Clone the repository

```bash
git clone https://github.com/hadaroadams/task-flow-app.git
cd task-flow-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a .env.local file

JWT_SECRET = your_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000

Add your environment variables:

### 4. Run the development server

```bash
npm run dev

```

Your app should now be running on http://localhost:3000

---

## 📂 Seed Data

**Users**

```json
[
  { "email": "admin@taskflow.com", "password": "123456", "role": "admin" },
  { "email": "manager@taskflow.com", "password": "123456", "role": "manager" },
  { "email": "member@taskflow.com", "password": "123456", "role": "member" }
]
```

**Projects**

```json
[
  {
    "id": 1,
    "name": "Website Revamp",
    "description": "Marketing site refresh",
    "owner": "manager@taskflow.com"
  },
  {
    "id": 2,
    "name": "Mobile App",
    "description": "v1 onboarding flow",
    "owner": "manager@taskflow.com"
  }
]
```

**Tasks**

```json
[
  {
    "id": 1,
    "projectId": 1,
    "title": "Design homepage",
    "assignedTo": "member@taskflow.com",
    "status": "pending"
  },
  {
    "id": 2,
    "projectId": 1,
    "title": "Build hero section",
    "assignedTo": "member@taskflow.com",
    "status": "pending"
  },
  {
    "id": 3,
    "projectId": 2,
    "title": "Create login screen",
    "assignedTo": "manager@taskflow.com",
    "status": "done"
  }
]
```

