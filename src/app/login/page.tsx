"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isloading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Login failed");
        toast.error(data.message || "Login failed");
      } else {
        // Handle successful login (e.g., redirect to dashboard)
        console.log("Login successful:", data);
        router.push("/dashboard");
        toast.success("Logged in successfully");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex justify-center items-center h-dvh ">
      <FieldSet className="w-96 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Login to Your Account</h1>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              type="text"
              placeholder="admin@taskflow.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          {error && (
            <FieldDescription className="text-red-500 mt-2">
              {error}
            </FieldDescription>
          )}
        </FieldGroup>
        <Button
          onClick={handleLogin}
          type="submit"
          className="w-full mt-4"
          disabled={isloading}
        >
          {isloading ? "Logging in" : "Log in"}
        </Button>
      </FieldSet>
    </div>
  );
}

export default page;
