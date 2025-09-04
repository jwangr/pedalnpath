// Session Middleware - checks for authenticated user:
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function middleware(req) {
  const sessionId = req.cookies.get("sessionId")?.value;

  if (!sessionId) {
    return NextResponse.redirect(new URL("/login", req.url)); // redirects to the req.url root (localhost:3000/) and tacks on 'login'
  }

  const session = await db.session.findUnique({ where: { id: sessionId } });

  if (!session || session.expiresAt < new Date()) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // user is valid → allow request
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*"], // protect all /profile pages
  matcher: ["/explore*"], // protect all /explore pages
};