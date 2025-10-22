"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Project = { name: string; description: string };

function ProjectHeader({ project }: { project: Project }) {
  const route = useRouter();
  return (
    <section className="space-y-10">
      <Button variant={"outline"} onClick={route.back}>
        <ArrowLeft />
        Back
      </Button>
      <div>
        <h1 className="text-3xl font-bold ">{project.name}</h1>
        <p>{project.description}</p>
      </div>
    </section>
  );
}

export default ProjectHeader;
