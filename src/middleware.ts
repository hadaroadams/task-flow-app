import { verifyToken } from "@/lib/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProtectedPath = (path: string) => {
  const protectedPaths = [
    "/dashboard",
    "/tasks",
    "/projects",
    "/api/projects",
    "/api/task",
  ];
  return protectedPaths.some((protectedPath) => path.startsWith(protectedPath));
};

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  // console.log("Middleware - Current Path:", currentPath);
  if (!isProtectedPath(currentPath)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  // console.log(token);
  if (!token || token === "") {
    if (currentPath.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized1" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
  try {
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (currentPath.startsWith("/admin") && user.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    if (currentPath.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorize2" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tasks/:path*",
    "/projects/:path*",
    "/api/task/:path*",
    "/api/project/:path*",
    "/admin-panel/:path*",
  ],
  runtime: "nodejs",
};
