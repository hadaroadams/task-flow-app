import { cookies } from "next/headers";
import { BASE_URL } from ".";

export const getAllUsers = async () => {
  const cookieHeader = (await cookies()).toString();
  try {
    const res = await fetch(`${BASE_URL}/api/user`, {
      headers: { Cookie: cookieHeader },
      credentials: "include",
    });
    const data = await res.json();
    // console.log(data);

    return data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};
