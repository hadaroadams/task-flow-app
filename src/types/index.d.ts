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

declare interface AuthPayload {
  email: string;
  role: UserRole;
}

declare interface LoginCredentials {
  email: string;
  password: string;
}

declare interface CreateTaskInput {
  projectId: number;
  title: string;
  description?: string;
  assignedTo: string;
}

declare interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  assignedTo?: string;
}

declare interface CreateProjectInput {
  name: string;
  description?: string;
  owner: string;
}

declare interface UpdateProjectInput {
  name?: string;
  description?: string;
  owner?: string;
}

declare interface RoleChangeInput {
  email: string;
  newRole: UserRole;
}

// Generic state interfaces for UI
declare interface LoadingState {
  isLoading: boolean;
  error?: string;
}

declare interface EmptyState {
  title: string;
  description?: string;
}

// Token payload if using JWT
declare interface TokenPayload {
  email: string;
  role: UserRole;
  exp?: number;
  iat?: number;
}
