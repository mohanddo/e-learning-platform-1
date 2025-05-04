import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { extractRoleFromToken } from "./utils/validations";
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isLogged = request.cookies.get("isLogged")?.value;

  const { pathname } = request.nextUrl;

  // If the user tries to access teacher routes and he is not logged in or not a teacher, redirect to the login page
  if (pathname.startsWith("/teacher")) {
    if (!token || !isLogged) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    const role = extractRoleFromToken(token!);
    if (role !== "ROLE_TEACHER") {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  // If the user tries to access student routes and he is not logged in or is not a student, redirect to the login page
  if (pathname.startsWith("/student")) {
    if (!token || !isLogged) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    const role = extractRoleFromToken(token!);
    if (role !== "ROLE_STUDENT") {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  // If the user is logged in and tries to access the auth route, redirect to the appropriate profile page
  if (pathname.startsWith("/auth")) {
    if (token && isLogged) {
      const role = extractRoleFromToken(token!);

      if (role === "ROLE_STUDENT") {
        return NextResponse.redirect(new URL("/student/profile", request.url));
      } else if (role === "ROLE_TEACHER") {
        return NextResponse.redirect(new URL("/teacher/profile", request.url));
      }
    }
  }

  // If the user tries to access cart or profile routes and he is not logged in, redirect to the login page
  if (
    pathname.startsWith("/cart") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/changePassword")
  ) {
    if (!token || !isLogged) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  // Some routes exists for both the teacher and student, this is for redirecting to the appropriate  ones
  if (pathname == "/") {
    if (token && isLogged) {
      const role = extractRoleFromToken(token!);
      if (role === "ROLE_STUDENT") {
        return NextResponse.redirect(new URL("/student", request.url));
      } else {
        return NextResponse.redirect(new URL("/teacher", request.url));
      }
    }
  } else if (pathname.startsWith("/cart")) {
    const role = extractRoleFromToken(token!);
    if (role === "ROLE_STUDENT") {
      return NextResponse.redirect(new URL("/student/cart", request.url));
    } else {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  } else if (pathname.startsWith("/courseDetails")) {
    const match = pathname.match(/^\/courseDetails\/(\d+)/);
    const courseId = match ? match[1] : null;

    if (token && isLogged) {
      const role = extractRoleFromToken(token!);
      if (role === "ROLE_STUDENT") {
        return NextResponse.redirect(
          new URL(`/student/courseDetails/${courseId}`, request.url)
        );
      } else if (role === "ROLE_TEACHER") {
        return NextResponse.redirect(
          new URL(`/teacher/courseDetails/${courseId}`, request.url)
        );
      }
    }
  } else if (pathname.startsWith("/profile")) {
    const role = extractRoleFromToken(token!);
    if (role === "ROLE_STUDENT") {
      return NextResponse.redirect(new URL("/student/profile", request.url));
    } else if (role === "ROLE_TEACHER") {
      return NextResponse.redirect(new URL("/teacher/profile", request.url));
    }
  }

  return NextResponse.next();
}
