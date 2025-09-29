import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // clear browser cookies
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId")?.value;

    // Delete browser cookie for session
    if (sessionId) {
      cookieStore.set("sessionId", "", { expires: new Date(0) });

      // clear session on server database
      try {
        const db_deleted = await db.session.delete({
          where: { id: sessionId },
        });
        console.log("Logout fulfilled, ", JSON.stringify(db_deleted));
      } catch (error) {
        console.log("Unable to delete session from database");
        return NextResponse.json(
          {
            success: false,
            message: "Logout unsuccessful. Try again later",
          },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.log("Unable to delete cookies");
    return NextResponse.json(
      {
        success: false,
        message: "Logout unsuccessful. Try again later",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Logout successful",
    redirectTo: "/login",
  });
}
