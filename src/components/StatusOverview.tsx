import React from "react";
import { Card } from "./ui/card";


type StatusOverviewProps = {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
};

function StatusOverview(statusInfo: StatusOverviewProps) {
  const { completed, pending, completionRate, total } = statusInfo;
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-10 ">
      <Card className=" p-6  min-w-[200px] space-y-4 flex flex-col">
        <p>Total Tasks</p>
        <h2 className="text-3xl font-bold">{total}</h2>
      </Card>
      <Card className=" p-6  min-w-[200px] space-y-4 flex flex-col">
        <p>Completed</p>
        <h2 className="text-3xl font-bold text-green-400">{completed}</h2>
      </Card>
      <Card className="p-6  min-w-[200px] space-y-4 flex flex-col">
        <p>Pending</p>
        <h2 className="text-3xl font-bold text-yellow-400">{pending}</h2>
      </Card>
      <Card className="p-6  min-w-[200px] space-y-4 flex flex-col">
        <p>Completion Rate</p>
        <h2 className="text-3xl font-bold text-primary">{completionRate}%</h2>
      </Card>
    </section>
  );
}

export default StatusOverview;
