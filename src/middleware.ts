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
  // console.log(token);
  if (!token) {
    if (currentPath.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized1" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
  try {
    if (currentPath.startsWith("/api")) {
      // console.log("it did");
    }
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    request.user! = user;
    return NextResponse.next();
  } catch (error) {
    if (currentPath.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorize2" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/tasks/:path*", "/api/task/:path*"],
  runtime: "nodejs",
};
