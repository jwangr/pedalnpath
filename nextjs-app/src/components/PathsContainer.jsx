"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PathsItem from "./PathsItem";

export default function PathsContainer({ displayPaths, userId, displayUserPathsToggle }) {
  return (
    <Box sx={{ flexGrow: 1, margin: 3 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{
          alignItems: "stretch",
        }}
      >
        {displayPaths.map((path) => (
          <PathsItem key={path.id} path={path} userId={userId} displayUserPathsToggle={displayUserPathsToggle} />
        ))}
      </Grid>
    </Box>
  );
}
