import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";
import React from "react";

async function layout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  // console.log("Current User in Layout:", user);
  return (
    <>
      <Navbar user={user!} />
      {children}
    </>
  );
}

export default layout;
