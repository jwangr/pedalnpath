import ExplorePage from "@/components/ExplorePage";
import { getSession } from "@/lib/auth"; // make sure this points to your next-auth options
import { redirect } from "next/navigation";

export default async function Explore() {
  const user = await getSession();
  console.log(user?.email);
  if (!user) {
    return redirect("login");
  }

  return (
    <>
      <ExplorePage />
    </>
  );
}
