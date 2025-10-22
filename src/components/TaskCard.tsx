"use client";
import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

type TaskProps = {
  id: number;
  title: string;
  assignedTo: string;
  status: "done" | "pending";
};

function TaskCard({ id, assignedTo, status, title }: TaskProps) {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/task?id=${id}`, {
        method: "DELETE",
        credentials: "include", // ensure cookie (JWT) is sent
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add task");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card className="bg-white p-4  mt-6 min-w-[200px] space-y-4 flex flex-row justify-between items-center">
      <div>
        <h3 className="text-md font-bold">{title}</h3>
        <p className="text-sm text-gray-500">Assigned to: {assignedTo}</p>
      </div>
      <div className="flex items-center space-x-4">
        {status === "done" ? (
          <>
            <p className="text-green-500 text-sm bg-green-100 px-3 py-1 rounded-lg">
              done
            </p>
          </>
        ) : (
          <>
            <p className="text-yellow-600 text-sm bg-yellow-100 px-3 py-1 rounded-lg">
              pending
            </p>
          </>
        )}
        <Button variant={"outline"}>Edit</Button>
        <Button variant={"destructive"} onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </Card>
  );
}

export default TaskCard;
