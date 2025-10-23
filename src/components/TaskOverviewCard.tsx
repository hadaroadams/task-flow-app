import React from "react";
import Link from "next/link";
import { Card, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

type TaskOverviewCardProps = {
  tasks: Task[];
};

function TaskOverviewCard({ tasks }: TaskOverviewCardProps) {
  const recentTasks = tasks.slice(0, 3);

  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
      {/* Header */}
      <div className=" px-5 flex justify-between items-center ">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Recent Tasks</h2>
          <p className="text-sm text-gray-500">
            Showing {recentTasks.length} of {tasks.length} Task(s)
          </p>
        </div>
        <Link href="/tasks" className="text-sm text-indigo-600 hover:underline">
          View All
        </Link>
      </div>

      {/* Task List */}
      <div className="p-5 space-y-4">
        {recentTasks.length > 0 ? (
          recentTasks.map((task, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition cursor-pointer"
            >
              <h3 className="text-base font-medium text-gray-800">
                {task.title}
              </h3>
              <div className="mt-2">
                <Badge
                  className={`text-xs px-2 py-1 rounded ${
                    task.status === "done"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.status === "done" ? "Done" : "Pending"}
                </Badge>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No recent tasks available.
          </p>
        )}
      </div>
    </Card>
  );
}

export default TaskOverviewCard;
