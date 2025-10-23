// Global types for TaskFlow
// This file declares types used across your app globally.
// It must be placed inside `src` (or root) and recognized by tsconfig.json.

declare type UserRole = "admin" | "manager" | "member";

declare interface User {
  email: string;
  password: string;
  role: UserRole;
}

declare type TaskStatus = "pending" | "done";

declare interface Task {
  id: number;
  projectId: number;
  title: string;
  description?: string;
  status: TaskStatus;
  assignedTo: string;
}

declare interface Project {
  id: number;
  name: string;
  description?: string;
  owner: string; // usually a manager email
}

declare interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
}


