"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import MobileNav from "./MobileNav";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

type NavbarProps = {
  user: {
    email: string;
    role: string;
  };
};

function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Logout failed");

      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during logout");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/tasks", label: "Tasks" },
    { href: "/projects", label: "Projects" },
  ];

  if (user.role === "admin") {
    navLinks.push({ href: "/admin-panel", label: "Admin Panel" });
  }

  return (
    <nav className="w-full h-16 flex items-center px-10 bg-white shadow-md">
      <div className="flex items-center mr-12">
        <h1 className="text-[1.5em] text-primary font-bold">TaskFlow</h1>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex justify-between items-center w-full">
        <ul className="flex space-x-8 font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`hover:text-primary transition ${
                  pathname === link.href
                    ? "text-primary font-semibold border-b-2 border-primary pb-1"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex flex-col items-end">
            <p className="font-medium text-gray-700">{user.email}</p>
            <Badge
              className={`${
                user.role === "admin"
                  ? "bg-primary/10 text-primary"
                  : "bg-gray-100 text-gray-600"
              } px-3 py-1 rounded-lg`}
            >
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Badge>
          </div>
          <Button
            onClick={handleLogout}
            size="sm"
            disabled={isLoggingOut}
            className="disabled:opacity-60"
          >
            {isLoggingOut ? "Logging out..." : "Log out"}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <MobileNav user={user} />
    </nav>
  );
}

export default Navbar;
