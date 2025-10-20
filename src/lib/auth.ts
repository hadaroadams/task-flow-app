import { cookies } from "next/headers";
import { verifyToken } from "./jwt";


export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return null;
  }
  try {
    return verifyToken(token) as { email: string; role: string };
  } catch (error) {
    return null;
  }
};

