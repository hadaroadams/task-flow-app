import React from "react";

function page() {
  return (
    <main className="bg-[#F0F4F8] min-h-screen px-10 py-6">
      <section>
        <h1 className="text-3xl font-bold ">Projects</h1>
        <p>View All projects</p>
      </section>
      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 min-w-[200px] flex flex-col">
          <h3 className="text-md font-bold">Website Redesign</h3>
          <p className="text-sm text-gray-500">
            Complete redesign of the company website with modern UI/UX
          </p>
          <p className="text-sm text-gray-500 mt-6">Owner:john@taskflow.com</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 min-w-[200px] flex flex-col">
          <h3 className="text-md font-bold">Website Redesign</h3>
          <p className="text-sm text-gray-500">
            Complete redesign of the company website with modern UI/UX
          </p>
          <p className="text-sm text-gray-500 mt-6">Owner:john@taskflow.com</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 min-w-[200px] flex flex-col">
          <h3 className="text-md font-bold">Website Redesign</h3>
          <p className="text-sm text-gray-500">
            Complete redesign of the company website with modern UI/UX
          </p>
          <p className="text-sm text-gray-500 mt-6">Owner:john@taskflow.com</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 min-w-[200px] flex flex-col">
          <h3 className="text-md font-bold">Website Redesign</h3>
          <p className="text-sm text-gray-500">
            Complete redesign of the company website with modern UI/UX
          </p>
          <p className="text-sm text-gray-500 mt-6">Owner:john@taskflow.com</p>
        </div>
      </section>
    </main>
  );
}

export default page;
