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
        {/* <Box sx={{ width: "100%", marginX: 2 }}> */}

        {/* </Box> */}

        {/* <h1 className="my-5 text-xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">{user.email}</h1> */}
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
