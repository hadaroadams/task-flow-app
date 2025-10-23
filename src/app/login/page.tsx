"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
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
        const message = data?.message || "Invalid email or password.";
        setError(message);
        toast.error(message);
        return;
      }

      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="w-96 p-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-2 text-center text-primary">TaskFlow</h1>
        <p className="text-center text-gray-600 mb-6">
          Sign in to your account
        </p>

        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="admin@taskflow.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </Field>

            {error && (
              <FieldDescription className="text-red-500 mt-2">
                {error}
              </FieldDescription>
            )}
          </FieldGroup>

          <Button type="submit" className="w-full mt-6" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              "Log In"
            )}
          </Button>
        </FieldSet>
        <div className="">
          <h3 className=" mt-4 text-sm ">Demo Credentials</h3>
          <div></div>
          <p className="text-xs text-gray-500 ">
            Admin: admin@taskflow.com / 123456
          </p>
          <p className="text-xs text-gray-500 ">
            Manager: manager@taskflow.com / 123456
          </p>
          <p className="text-xs text-gray-500 ">
            Member: member@taskflow.com / 123456
          </p>
        </div>
      </form>
    </div>
  );
}
