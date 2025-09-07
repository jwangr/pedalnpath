// Authenticates users via: POST('api/auth/login') => users.authenticate(data); // {email, password)

//Authenticate user, store in server session
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { db } from "@/lib/db"; // Prisma client
import { NextResponse } from "next/server";

export async function GET(req) {
  return new Response(JSON.stringify({ message: "GET received" }), { status: 200 });
}

export async function POST(req) {
  const { email, password } = await req.json();

  // find user
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return new Response("User not found", { status: 401 });

  // check password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return new Response("Invalid credentials", { status: 401 });

  // create session
  const sessionId = uuid();
  const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);  // expires in 14 days
  await db.session.create({
    data: { id: sessionId, userId: user.id, expiresAt },
  });

  // set cookie (stored in user's browser. ON each request, browser reads the cookie, looks up session in DB and checks if valid)
  const cookieStore = await cookies();

  cookieStore.set("sessionId", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });

  return NextResponse.json(
    { success: true, message: "Login successful", redirectTo: "/home" },
    { status: 200 });
}