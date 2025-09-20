"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PathsItem from "./PathsItem";
import { useGetBikePathsQuery } from "@/services/bikePaths";
import { Alert } from "@mui/material";
import SkeletonPathsContainer from "./SkeletonPathsContainer";

export default function PathsContainer({
  displayPaths,
  userId,
  displayUserPathsToggle,
}) {
  const {
    data,
    error,
    isLoading,
    isError,
  } = useGetBikePathsQuery();

  
  
  console.log('Error' + error)
  console.log('Data' + JSON.stringify(data))

  // create query for user's bikepaths

  return (
    <Box sx={{ flexGrow: 1, margin: 3 }}>
      {isError && <Alert severity="error">Error: Unable to get all bike paths.</Alert>}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{
          alignItems: "stretch",
        }}
      >
        {isLoading && <SkeletonPathsContainer/>}
        {data?.map((path) => (
          <PathsItem
            key={path.id}
            path={path}
            userId={userId}
            displayUserPathsToggle={displayUserPathsToggle}
          />
        ))}
      </Grid>
    </Box>
  );
}
