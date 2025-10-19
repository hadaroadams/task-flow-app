import React from "react";

function page() {
  return (
    <main className="bg-gray-100 min-h-screen px-10 py-6">
      <section>
        <h1 className="text-3xl font-bold ">Tasks</h1>
        <p>Manage all your tasks</p>
      </section>
      <section>
        <div>
          <div>
            <h3>Design homepage mockup</h3>
            <p>Assigned to: carol@taskflow.com</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
