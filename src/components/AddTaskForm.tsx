"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AddTaskProps {
  projectId: string;
}

export default function AddTask({ projectId }: AddTaskProps) {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddTask = async () => {
    if (!title.trim() || !assignedTo.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/task/${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ensure cookie (JWT) is sent
        body: JSON.stringify({
          title,
          assignedTo,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to add task");

      toast.success("Task added successfully");
      setTitle("");
      setAssignedTo("");
      router.refresh(); // refresh the current page (shows new tasks)
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <Label className="text-md font-black">Add Task</Label>
      <div className="flex gap-2 md:flex-row flex-col">
        <Input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <Input
          placeholder="Assign to (email)"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          disabled={loading}
        />
        <Button onClick={handleAddTask} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </Button>
      </div>
    </Card>
  );
}
