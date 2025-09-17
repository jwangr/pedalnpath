import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import AllPathsContainer from "@/components/PathsContainer";


export default async function ProfilePage() {
    const user = await getSession();
    console.log(user);

    const AllPaths = await db.bikepath.findMany({});
    console.log(AllPaths);

    if (user) {
        return (
            <div>
                {/* <h1 className="my-5 text-xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">{user.email}</h1> */}
                <AllPathsContainer displayPaths={AllPaths} userId={user.id} displayUserPathsToggle={true} />
            </div>
        )
    } else {
        redirect('/login')
    }


}