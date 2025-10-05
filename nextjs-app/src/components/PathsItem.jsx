"use client";

import {
  Box,
  CardContent,
  Grid,
  Typography,
  Paper,
  LinearProgress,
  Link,
} from "@mui/material";
import ToggleCompleted from "./ToggleCompleted";
import UserPathsToggle from "./UserPathsToggle";
import MapBoxContainer from "./maps/PathsItemMap";
import OverallCount from "./reviews/OverallCount";
import dynamic from "next/dynamic";

// The map component will only be imported if 'windows' is defined
const DynamicMapComponent = dynamic(
  () => import("@/components/maps/PathsItemMap"),
  {
    ssr: false,
  }
);

export default function PathsItem({ path, userId, displayUserPathsToggle }) {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // column on mobile, row on desktop
          alignItems: "center",
          gap: 2, // spacing between map and content
          textAlign: "left", // remove center alignment
          height: "100%",
        }}
      >
        {/* <MapView /> */}
        <DynamicMapComponent />

        <CardContent sx={{ flex: 1, width: "100%" }}>
          {displayUserPathsToggle === false && (
            <ToggleCompleted bikeRoute={path} userId={userId} />
          )}

          {displayUserPathsToggle === true && (
            <UserPathsToggle bikeRoute={path} userId={userId} />
          )}

          <Typography
            variant="h5"
            component="div"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2, // max 3 lines
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Link
              color="inherit"
              underline="hover"
              href={`/path/${encodeURIComponent(
                path.bikepath?.title || path.title
              )}`}
            >
              {path.bikepath?.title || path.title}
            </Link>
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {path.bikepath?.distanceKm || path.distanceKm || "?"} km
          </Typography>

          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3, // max 3 lines
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {path.bikepath?.description || path.description}
          </Typography>

          <Grid container marginTop={2} gap={2}>
            <OverallCount
              bikepathId={path.bikepath?.id || path.id}
              size={"S"}
            />
          </Grid>
        </CardContent>
      </Paper>
    </Grid>
  );
}
