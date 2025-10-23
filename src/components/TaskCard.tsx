"use client";
import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import EditTaskForm from "./EditTaskForm";
import { CheckCircle } from "lucide-react";

type TaskProps = {
  id: number;
  title: string;
  assignedTo: string;
  status: "done" | "pending";
  projectId: string;
  userRole: "admin" | "manager" | "member";
};

function TaskCard({
  id,
  assignedTo,
  status,
  title,
  projectId,
  userRole,
}: TaskProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/task?id=${id}`, {
        method: "DELETE",
        credentials: "include", // ensure cookie (JWT) is sent
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete task");

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleStatus = async () => {
    try {
      const res = await fetch(`/api/task`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          title,
          assignedTo,
          status: status === "done" ? "pending" : "done",
          projectId,
        }),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to update task status");

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="bg-white p-4 mt-6 min-w-[200px] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      {/* Task Info */}
      <div className="flex flex-col space-y-1">
        <h3 className="text-md font-bold">{title}</h3>
        <p className="text-sm text-gray-500">Assigned to: {assignedTo}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {/* Status Display */}
        <p
          className={`text-sm px-3 py-1 rounded-lg ${
            status === "done"
              ? "text-green-600 bg-green-100"
              : "text-yellow-600 bg-yellow-100"
          }`}
        >
          {status}
        </p>

        {/* Toggle Button */}
        <Button
          variant={status === "done" ? "outline" : "default"}
          onClick={handleToggleStatus}
          className="flex items-center gap-1 text-sm"
        >
          <CheckCircle className="w-4 h-4" />
          {status === "done" ? "Mark Pending" : "Mark Done"}
        </Button>

        {/* Manager/Admin Controls */}
        {(userRole === "admin" || userRole === "manager") && (
          <>
            <EditTaskForm
              projectId={projectId}
              task={{ id, assignedTo, status, title }}
            />
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="text-sm"
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}

export default TaskCard;
