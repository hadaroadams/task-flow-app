import { getProjects } from "@/lib/task";
import Link from "next/link";
import React from "react";

async function Page() {
  const { data: projects } = await getProjects();

  return (
    <main className="bg-[#F0F4F8] min-h-screen px-10 py-6">
      {/* Header Section */}
      <section>
        <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        <p className="text-gray-600">View all your active projects</p>
      </section>

      {/* Projects Section */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects && projects.length > 0 ? (
          projects.map((project: any, index: number) => (
            <Link
              key={index}
              href={`/project/${project.id}`}
              className="bg-white p-6 hover:bg-gray-100 rounded-xl border shadow-sm transition cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {project.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {project.description || "No description provided."}
              </p>
              <p className="text-sm text-gray-400 mt-6">
                Owner: <span className="text-gray-700">{project.owner}</span>
              </p>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-gray-500">
            <h3 className="text-lg font-medium mb-2">No Projects Found</h3>
            <p className="text-sm">
              You currently have no projects. Start by creating one.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Page;
