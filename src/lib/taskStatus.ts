type Task = {
  id: number;
  title: string;
  status: "pending" | "done" | "in-progress";
  assignedTo: string;
  projectId: string;
};

export function calculateTaskStats(tasks: Task[]) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "done").length;
  const pending = tasks.filter((t) => t.status === "pending").length;

  const completionRate = total > 0 ? (completed / total) * 100 : 0;

  return {
    total,
    completed,
    pending,
    completionRate: Number(completionRate.toFixed(2)), // e.g. 67.5%
  };
}
