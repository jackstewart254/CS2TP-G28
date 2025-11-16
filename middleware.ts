import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "./lib/supabase/server";

export async function middleware(request: NextRequest) {
  // Always sync Supabase session
  const response = await updateSession(request)
  const supabase = await createClient();

  // Get the session from the updated cookies
  const { data, error } = await supabase.auth.getClaims();

  console.log("MIddle, watrer", data, error)

  const protectedRoutes = [
    "/dashboard",
    "/account",
    "/admin-dashboard",
    "/payments",
  ];

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // ❌ User not logged in → block access
  if (isProtected && data === undefined) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ Allow request to continue
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
