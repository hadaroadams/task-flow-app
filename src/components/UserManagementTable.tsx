"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type User = {
  email: string;
  role: "admin" | "manager" | "member";
};

type UserManagementTableProps = {
  users: User[];
};

export function UserManagementTable({ users }: UserManagementTableProps) {
  const [loadingEmail, setLoadingEmail] = useState<string | null>(null);
  const router = useRouter();

  const handleRoleChange = async (email: string, newRole: string) => {
    setLoadingEmail(email);
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: newRole }),
      });

      if (!res.ok) {
        throw new Error("Failed to update user role");
      }
      router.refresh();
    } catch (error) {
      console.error("Failed to update role:", error);
    } finally {
      setLoadingEmail(null);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">User Management</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Manage user roles and permissions
        </CardDescription>
      </CardHeader>

      <CardContent className="p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">#</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Current Role</TableHead>
              <TableHead>Change Role</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.email}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onValueChange={(value) =>
                      handleRoleChange(user.email, value)
                    }
                    disabled={loadingEmail === user.email}
                  >
                    <SelectTrigger className="w-36">
                      {loadingEmail === user.email ? (
                        <div className="flex items-center gap-2 text-gray-400">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Updating...
                        </div>
                      ) : (
                        <SelectValue placeholder="Select role" />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
