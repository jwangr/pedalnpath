"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PathsItem from "./PathsItem";
import { useGetBikePathsQuery } from "@/services/bikePaths";
import { Alert } from "@mui/material";
import SkeletonPathsContainer from "./SkeletonPathsContainer";
import { useGetUserPathsQuery } from "@/services/userPaths";

export default function PathsContainer({
  displayPaths,
  userId,
  displayUserPathsToggle,
}) {
  const {
    data: allPaths,
    error: allPathsError,
    isLoading: allPathsisLoading,
    isError: allPathsisError,
  } = useGetBikePathsQuery();

  const {
    data: userPaths,
    error: userPathsError,
    isLoading: userPathsisLoading,
    isError: userPathsisError,
  } = useGetUserPathsQuery({
    id: userId,
  });

  const data = displayPaths="user" ? userPaths : allPaths;
  const error = displayPaths="user" ? userPathsError : allPathsError;
  const isLoading = displayPaths="user" ? userPathsisLoading : allPathsisLoading;
  const isError = displayPaths="user" ? userPathsisError : allPathsisError;

  console.log("Error" + error);
  console.log("Data" + JSON.stringify(data));

  // create query for user's bikepaths

  return (
    <Box sx={{ flexGrow: 1, margin: 3 }}>
      {isError && (
        <Alert severity="error">Error: Unable to get all bike paths.</Alert>
      )}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{
          alignItems: "stretch",
        }}
      >
        {isLoading && <SkeletonPathsContainer />}
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
