import { db } from '@/lib/db';
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // clear browser cookies
        const cookieStore = await cookies();
        const sessionId = cookieStore.get('sessionId')?.value;
        cookieStore.set('sessionId', "", { expires: new Date(0) })
    } catch (error) {
        console.log("Unable to delete cookies")
    }

    try {
        // clear session on server database
        const deletedSession = await db.session.deleteMany({})

        console.log(deletedSession);
    } catch (error) {
        console.log('Unable to delete database session')
    }


    return NextResponse.json(
        { success: true, message: "Logout successful", redirectTo: "/profile" },
        { status: 200 });
}