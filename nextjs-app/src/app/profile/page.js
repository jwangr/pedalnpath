import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const user = await getSession();
    console.log(user);

    if (user) {
        return (
            <div>ProfilePage for {user?.email}</div>
        )
    } else {
        redirect('/login')
    }


}
