import Navbar from "@/components/Navbar";
import React from "react";

function page() {
  return (
    <main className="bg-gray-100 min-h-screen px-10 py-6">
      <div>
        <h1 className="text-3xl font-bold ">Dashboard</h1>
        <p>
          Welcome back, <span>admin@taskflow.com</span>
        </p>
      </div>

      {/* status */}
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2  ">
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 min-w-[200px] space-y-4 flex flex-col">
          <p>Total Tasks</p>
          <h2 className="text-3xl font-bold">10</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 min-w-[200px] space-y-4 flex flex-col">
          <p>Completed</p>
          <h2 className="text-3xl font-bold text-green-400">2</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 min-w-[200px] space-y-4 flex flex-col">
          <p>Pending</p>
          <h2 className="text-3xl font-bold text-yellow-400">8</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 min-w-[200px] space-y-4 flex flex-col">
          <p>Completion Rate</p>
          <h2 className="text-3xl font-bold text-primary">20%</h2>
        </div>
      </section>
      {/* Projects */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 min-w-[200px] space-y-1 flex flex-col">
          <h2 className="text-xl font-bold ">Your Projects</h2>
          <p className="text-sm">4 Projects(s)</p>
          <div>
            <div className="mt-4 p-4 border border-gray-200 rounded-lg hover:shadow-lg cursor-pointer">
              <h3 className="text-lg font-semibold">Project Alpha</h3>
              <p className="text-sm">v1 onboarding flow</p>
            </div>
            <div className="mt-4 p-4 border border-gray-200 rounded-lg hover:shadow-lg cursor-pointer">
              <h3 className="text-lg font-semibold">Project Alpha</h3>
              <p className="text-sm">v1 onboarding flow</p>
            </div>
            <div className="mt-4 p-4 border border-gray-200 rounded-lg hover:shadow-lg cursor-pointer">
              <h3 className="text-lg font-semibold">Project Alpha</h3>
              <p className="text-sm">v1 onboarding flow</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 min-w-[200px] space-y-1 flex flex-col">
          <h2 className="text-xl font-bold ">Recent Tasks</h2>
          <p>10 Task(s)</p>
          <div>
            <div className="mt-4 p-4 border border-gray-200 rounded-lg hover:shadow-lg cursor-pointer">
              <h3 className="text-lg font-semibold">Design homepage mockup</h3>
              <p className="text-sm">
                Staus: <span className="text-green-400">Done</span>
              </p>
            </div>
            <div className="mt-4 p-4 border border-gray-200 rounded-lg hover:shadow-lg cursor-pointer">
              <h3 className="text-lg font-semibold">
                Implement responsive layout
              </h3>
              <p className="text-sm">
                Staus: <span className="text-yellow-400">Pending</span>
              </p>
            </div>
            <div className="mt-4 p-4 border border-gray-200 rounded-lg hover:shadow-lg cursor-pointer">
              <h3 className="text-lg font-semibold">Setup authentication</h3>
              <p className="text-sm">
                Staus: <span className="text-yellow-400">Pending</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
