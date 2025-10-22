"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import MobileNav from "./MobileNav";
import { logoutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Navbar({ user }: { user: { email: string; role: string } }) {
  console.log(user);
  const route = useRouter();
  const logoutUser = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data.message);

      route.push("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };
  return (
    <nav className="w-full h-16 flex items-center px-10 bg-white shadow-2xl">
      <div className=" flex items-center mr-12">
        <h1 className=" text-[1.5em] text-primary font-bold">TaskFlow</h1>
      </div>
      <div className="md:flex hidden justify-between items-center space-x-8 w-full ">
        <ul className="flex space-x-6 text-lg font-medium text-gray-700">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link href="/tasks">Task</Link>
          </li>
          <li>
            <Link href="/project">Project</Link>
          </li>
        </ul>
        <div className="flex items-center space-x-6 text-sm">
          {user.role === "member" && (
            <>
              <p>{user.email}</p>
              <Badge className="bg-primary/10 text-primary px-3 py-1 rounded-lg">
                Admin Panel
              </Badge>
            </>
          )}
          <Button onClick={logoutUser}>Log out</Button>
        </div>
      </div>
      <MobileNav />
    </nav>
  );
}

export default Navbar;
