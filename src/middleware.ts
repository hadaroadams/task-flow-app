import { verifyToken } from "@/lib/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProtectedPath = (path: string) => {
  const protectedPaths = ["/dashboard", "/tasks"];
  return protectedPaths.some((protectedPath) => path.startsWith(protectedPath));
};

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  if (!isProtectedPath(currentPath)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  try {
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/tasks/:path*"],
  runtime: "nodejs",
};
