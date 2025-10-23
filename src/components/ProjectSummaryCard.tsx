import React from "react";
import Link from "next/link";
import { Card, CardDescription, CardHeader } from "./ui/card";

type ProjectSummaryCardProps = {
  projects: Project[];
};

async function ProjectSummaryCard({ projects }: ProjectSummaryCardProps) {
  return (
    <Card className="p-6 min-w-[200px]">
      <CardHeader className="flex justify-between items-center">
        <div>
         <h2 className="text-lg font-semibold text-gray-800">Your Projects</h2>
          <p className="text-sm text-gray-500">
            {projects.length} Project{projects.length !== 1 && "s"}
          </p>
        </div>
        <Link href="/project" className="text-sm text-blue-600 hover:underline">
          View All
        </Link>
      </CardHeader>

      <CardDescription>
        {projects.length === 0 ? (
          <div className="mt-6 text-center text-gray-500">
            <p>No projects yet.</p>
            {/* <Link
              href="/project/new"
              className="text-blue-600 text-sm hover:underline"
            >
              Create your first project
            </Link> */}
          </div>
        ) : (
          projects.map((project) => (
            <Link
              key={project.id}
              href={`/project/${project.id}`}
              className="mt-4 p-4 border border-gray-200 rounded-lg duration-100 hover:bg-gray-100 cursor-pointer flex flex-col"
            >
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="text-sm text-gray-600">
                {project.description || "No description provided"}
              </p>
            </Link>
          ))
        )}
      </CardDescription>
    </Card>
  );
}

export default ProjectSummaryCard;
