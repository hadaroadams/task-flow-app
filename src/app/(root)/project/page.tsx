import { getProjects } from "@/lib/task";
import Link from "next/link";
import React from "react";

async function page() {
  const { projects } = await getProjects();

  return (
    <main className="bg-[#F0F4F8] min-h-screen px-10 py-6">
      <section>
        <h1 className="text-3xl font-bold ">Projects</h1>
        <p>View All projects</p>
      </section>
      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
        {projects.map((project: any, index: number) => {
          return (
            <Link
              href={`/project/${project.id}`}
              className="bg-white p-6  hover:bg-gray-100 min-w-[200px] flex flex-col rounded-xl border py-6 shadow-sm"
            >
              <h3 className="text-md font-bold">{project.name}</h3>
              <p className="text-sm text-gray-500">{project.description}</p>
              <p className="text-sm text-gray-500 mt-6">
                Owner: {project.owner}
              </p>
            </Link>
          );
        })}
      </section>
    </main>
  );
}

export default page;
