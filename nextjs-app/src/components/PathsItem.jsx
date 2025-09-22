"use client";

import { useState } from "react";
import {
  Box,
  CardContent,
  Grid,
  Typography,
  Paper,
  LinearProgress,
} from "@mui/material";
import ToggleCompleted from "./ToggleCompleted";
import UserPathsToggle from "./UserPathsToggle";
import MapBoxContainer from "./MapBoxContainer";

const MapView = MapBoxContainer(() => import("./MapBoxContainer.jsx"), {
  ssr: false,
});

export default function PathsItem({ path, userId, displayUserPathsToggle }) {
  const [loading, setLoading] = useState(false);
  const toggleLoad = (status) => {
    setLoading(status);
  };

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

        <CardContent sx={{ flex: 1, width: "100%" }}>
          {!displayUserPathsToggle && (
            <ToggleCompleted
              bikeRoute={path}
              userId={userId}
              toggleLoad={toggleLoad}
            />
          )}

          {displayUserPathsToggle && (
            <UserPathsToggle
              bikeRoute={path}
              Loading={loading}
              toggleLoad={toggleLoad}
            />
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
            {path.bikepath?.title || path.title}
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
          {loading && (
            <LinearProgress color="secondary" sx={{ width: "100%" }} />
          )}
        </CardContent>
      </Paper>
    </Grid>
  );
}
