"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PathsItem from "./PathsItem";

export default function PathsContainer({ displayPaths, userId }) {
  return (
    <Box sx={{ flexGrow: 1, margin: 3 }}>
      {displayPaths.map((bikeRoute) => (
        <div key={bikeRoute.id}>{bikeRoute.title}</div>
      ))}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{
          alignItems: "stretch",
        }}
      >
        {displayPaths.map((path) => (
          <PathsItem key={path.id} path={path} userId={userId} />
        ))}
      </Grid>
    </Box>
  );
}
