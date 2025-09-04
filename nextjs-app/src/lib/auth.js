// lib/auth.js
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) return null;

  const session = await db.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  // Check if session expired
  if (!session || session.expiresAt < new Date()) return null;

  return session.user; // return the logged-in user
}