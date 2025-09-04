//Authenticate user, store in server session
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { db } from "@/lib/db"; // Prisma client

export async function POST(req) {
    const { email, password, confirmpassword } = await req.json();

    // ensure new user
    const user = await db.user.findUnique({ where: { email } });
    if (user) return new Response("User already exists", { status: 401 });

    // check password
    if (password !== confirmpassword) return new Response("Passwords don't match", { status: 401 })

    const newPassword = await bcrypt.hash(password, 10);

    //   create new user
    const newUser = await db.user.create({
        data:
            { email, password: newPassword }
    })

    // create session
    const sessionId = uuid();
    const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);  // expires in 14 days
    await db.session.create({
        data: { id: sessionId, userId: newUser.id, expiresAt },
    });

    // set cookie (stored in user's browser. ON each request, browser reads the cookie, looks up session in DB and checks if valid)
    cookies().set("sessionId", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: expiresAt,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}