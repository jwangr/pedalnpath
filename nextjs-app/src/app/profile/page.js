import { getSession } from "@/lib/auth";

export default async function ProfilePage() {
    const user = await getSession();
    console.log(user);

    return (
        <div>ProfilePage for {user.email}</div>
    )
}
