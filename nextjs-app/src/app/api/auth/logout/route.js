import { db } from '@/lib/db';
import { cookies } from 'next/headers'

export async function GET(req) {
    // clear browser cookies
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('sessionId')?.value;
    cookieStore.set('sessionId', "", { expires: new Date(0) })

    // clear session on server database
    await db.session.delete({
        id: sessionId
    })

    return NextResponse.redirect(new URL("/", req.url));
}