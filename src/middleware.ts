import { verifyToken } from "@/lib/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProtectedPath = (path: string) => {
  const protectedPaths = ["/dashboard", "/tasks", "/api/task"];
  return protectedPaths.some((protectedPath) => path.startsWith(protectedPath));
};

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  // console.log("Middleware - Current Path:", currentPath);
  if (!isProtectedPath(currentPath)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  if (!token) {
    if (currentPath.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
  try {
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  } catch (error) {
    if (currentPath.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/tasks/:path*", "/api/task/:path*"],
  runtime: "nodejs",
};
