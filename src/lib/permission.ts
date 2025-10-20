import { JwtPayload as TokenPayload } from "./jwt";

export type Role = "admin" | "manager" | "member";

type Action =
  | "createTask"
  | "editTask"
  | "deleteTask"
  | "viewTask"
  | "markDone"
  | "manageUsers";

type Resource = "task" | "project" | "user";

export function isAdmin(user?: TokenPayload | null) {
  return user?.role === "admin";
}

export function isManager(user?: TokenPayload | null) {
  return user?.role === "manager";
}

export function isMember(user?: TokenPayload | null) {
  return user?.role === "member";
}

/**
 * can(action, resource, user, context)
 * action: "createTask" | "editTask" | "deleteTask" | "viewTask" | "markDone" | "manageUsers"
 * resource: "task" | "project" | "user"
 * context: optional object with owners etc, e.g. {projectOwner, taskAssignedTo}
 */
export function can(
  action: Action,
  resource: Resource,
  user: TokenPayload | null,
  context: any = {}
) {
  if (!user) return false;
  if (user.role === "admin") return true;

  if (resource === "task") {
    const { projectOwner, taskAssignedTo } = context;
    if (user.role === "manager") {
        console.log("manager trying to", action);
      // manager can create/edit/delete tasks in their projects
      if (["createTask", "editTask", "deleteTask"].includes(action)) {
        console.log("projectOwner:", projectOwner, "user:", user.email);
        return projectOwner === user.email;
      }
      // manager can view tasks in their projects
      if (action === "viewTask") return projectOwner === user.email;
    }

    if (user.role === "member") {
      // member can view tasks and mark their own tasks done
      if (action === "viewTask") return true;
      if (action === "markDone") return taskAssignedTo === user.email;
    }
  }

  if (resource === "user") {
    if (action === "manageUsers") return false; // only admin
  }

  return false;
}
