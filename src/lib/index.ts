export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
