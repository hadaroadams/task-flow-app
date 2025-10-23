"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type MobileNavProps = {
  user?: {
    email: string;
    role: string;
  };
};

function MobileNav({ user }: MobileNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
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
    }
  };

  // ✅ Define navigation links in one place
  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/tasks", label: "Tasks" },
    { href: "/projects", label: "Projects" },
    ...(user?.role === "admin"
      ? [{ href: "/admin-panel", label: "Admin Panel" }]
      : []),
  ];

  return (
    <Sheet>
      <SheetTrigger className="md:hidden ml-auto">
        <MenuIcon className="w-6 h-6 text-gray-700" />
      </SheetTrigger>

      <SheetContent side="right" className="p-6 space-y-6">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-primary">
            TaskFlow
          </SheetTitle>
        </SheetHeader>

        {/* ✅ Navigation Links with Active Indicator */}
        <nav className="flex flex-col space-y-4 text-gray-700 font-medium">
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`transition-colors ${
                  isActive
                    ? "text-primary font-semibold underline underline-offset-4"
                    : "hover:text-primary"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* ✅ User Info */}
        {user && (
          <div className="space-y-1">
            <p className="text-sm font-medium">{user.email}</p>
            <Badge
              className={`${
                user.role === "admin"
                  ? "bg-primary/10 text-primary"
                  : "bg-gray-100 text-gray-600"
              } px-3 py-1 rounded-lg`}
            >
              {user.role === "admin" ? "Admin" : "Member"}
            </Badge>
          </div>
        )}

        {/* ✅ Logout */}
        <div className="pt-6">
          <Button onClick={handleLogout} className="w-full">
            Log out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
