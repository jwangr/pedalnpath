import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AllPathsContainer from "@/components/PathsContainer";
import { Box, Paper, Typography } from "@mui/material";
import HeaderBanner from "@/components/HeaderBanner";
import ReviewsGallery from "@/components/reviews/ReviewsGallery";

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

        <ReviewsGallery />
        <Box
          sx={{
            margin: 2,
          }}
        >
          <Typography variant="h3" component={"div"} gutterBottom>
            Discover More
          </Typography>
        </Box>
        <AllPathsContainer displayPaths={"AllPaths"} userId={user.id} />
      </div>
    );
  } else {
    redirect("/login");
  }
}
