// app/page.tsx
import { getCurrentUser } from "@/lib/auth"; // your helper function
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }
}
