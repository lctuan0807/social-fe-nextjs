import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  if (!isLoggedIn) {
    const loginUrl = new URL("/auth/login", nextUrl.origin);
    // Clear out any query string params completely
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth|verify|$).*)"],
};
