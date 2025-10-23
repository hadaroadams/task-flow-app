"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Task analytics sample data
const chartData = [
  { status: "Pending", count: 12 },
  { status: "Done", count: 25 },
];

const chartConfig = {
  tasks: {
    label: "Tasks",
    color: "#2563eb",
  },
} satisfies ChartConfig;

type TaskAnalyticsProps = {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
};

export function TaskAnalytics(analyticInfo: TaskAnalyticsProps) {
  const { completed, pending, completionRate, total } = analyticInfo;
  const chartData = [
    { status: "Pending", count: pending },
    { status: "Done", count: completed },
  ];

  return (
    <Card className="w-full ">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Task Analytics</CardTitle>
        <CardDescription className="text-sm">
          Summary of tasks by status
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="max-h-[400px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={6}
              axisLine={false}
              fontSize={12}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent label="Tasks" />}
            />
            <Bar dataKey="count" fill="var(--color-tasks)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
