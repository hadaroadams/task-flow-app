import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import MobileNav from "./MobileNav";

function Navbar() {
  return (
    <nav className="w-full h-16 flex items-center px-10 bg-white shadow-2xl">
      <div className=" flex items-center mr-12">
        <h1 className=" text-[2rem] text-primary font-bold">TaskFlow</h1>
      </div>
      <div className="md:flex hidden justify-between items-center space-x-8 w-full ">
        <ul className="flex space-x-6 text-lg font-medium text-gray-700">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link href="/tasks">Task</Link>
          </li>
        </ul>
        <div className="flex items-center space-x-6 text-sm">
          <p>admin@taskflow.com</p>
          <p className="text-primary bg-primary/12 px-3 py-1 rounded-lg">
            admin
          </p>
          <Button>Log out</Button>
        </div>
      </div>
      <MobileNav />
    </nav>
  );
}

export default Navbar;
