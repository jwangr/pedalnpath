import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AllPathsContainer from "@/components/PathsContainer";
import { Box, Typography } from "@mui/material";

export default async function HomePage() {
  const user = await getSession();
  console.log(`Loading homepage for ${user?.email || "anon"}`);

  if (user) {
    return (
      <div>
        <Box sx={{ width: "100%", marginX: 2 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2em", sm: "4em", md: "5em" }, // responsive sizes
            }}
            gutterBottom
          >
            FIND YOUR NEXT PEDAL-VENTURE
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: { xs: "1.5.em", sm: "2em", md: "3em" }, // responsive sizes
            }}
          >
            Welcome, {user.email || "anon"}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Explore our list of bike paths.
          </Typography>
        </Box>

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
