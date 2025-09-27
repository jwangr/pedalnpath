import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AllPathsContainer from "@/components/PathsContainer";
import { Box, Paper, Typography } from "@mui/material";
import HeaderBanner from "@/components/HeaderBanner";

export default async function HomePage() {
  const user = await getSession();
  console.log(`Loading homepage for ${user?.email || "anon"}`);

  if (user) {
    return (
      <div>
        <HeaderBanner
          h1={"FIND YOUR NEXT PEDAL-VENTURE"}
          h4={`Welcome, ${user.email || "anon"}`}
          subtitle1={"Explore our list of bike paths"}
        />
        <AllPathsContainer
          displayPaths={"AllPaths"}
          userId={user.id}
          displayUserPathsToggle={true}
        />
      </div>
    );
  } else {
    redirect("/login");
  }
}
