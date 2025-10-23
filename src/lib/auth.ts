import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { redirect } from "next/navigation";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return null;
  }
  try {
    return verifyToken(token) as {
      email: string;
      role: "admin" | "member" | "manager";
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const logoutUser = async () => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    console.log(data.message);

    return redirect("/login");
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};
