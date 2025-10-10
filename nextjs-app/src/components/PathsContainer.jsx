"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PathsItem from "./PathsItem";
import { useGetBikePathsQuery } from "@/services/bikePaths";
import { Alert } from "@mui/material";
import SkeletonPathsContainer from "./skeletons/SkeletonPathsContainer";
import { useGetUserPathsQuery } from "@/services/userPaths";
import { useEffect, useMemo, useState } from "react";
import UserPathsFilter from "./filters/UserPathsFilter";
import AllPathsFilter from "./filters/AllPathsFilter";

export default function PathsContainer({ displayPaths, userId }) {
  const {
    data: allPaths,
    error: allPathsError,
    isLoading: allPathsisLoading,
    isError: allPathsisError,
  } = useGetBikePathsQuery({
    id: userId,
  });

  const {
    data: userPaths,
    error: userPathsError,
    isLoading: userPathsisLoading,
    isError: userPathsisError,
  } = useGetUserPathsQuery({
    id: userId,
  });

  const [max, setMax] = useState(20000); // set minimum slider length

  const data = displayPaths === "user" ? userPaths : allPaths;
  const error = displayPaths === "user" ? userPathsError : allPathsError;
  const isLoading =
    displayPaths === "user" ? userPathsisLoading : allPathsisLoading;
  const isError = displayPaths === "user" ? userPathsisError : allPathsisError;

  if (isError) {
    console.log(error, userPathsisError, allPathsisError);
  }

  const [filterFunction, setFilterFunction] = useState(null);

  // calculate max distance when data is successfully attained
  useEffect(() => {
    if (data && data.length > 0) {
      const distances = data.map((route) => route.distanceKm);
      const newMax = Math.ceil(Math.max(...distances));
      setMax(newMax);
    }
  })

  // Use useMemo to calculate filtered and sorted list
  // Similar to useState - but the value here is calculated/derived from other variables
  // Better than useEffect: which requires useState; and runs after rendering (so needs 2 renders)
  const filteredList = useMemo(() => {
    if (!data) return [];

    let result = [...data]

    // Apply filter
    if (filterFunction) {
      result = result.filter(filterFunction)
    }

    return result;
  }, [data, filterFunction])

  const handleFilter = (applyFilters) => {
    setFilterFunction(() => applyFilters);
  };

  if (data && data.length === 0) {
    return <div className="m-3 italic">No paths found. Head to the explore page for inspiration!</div>;
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, margin: 3 }}>
        {isError && (
          <Alert severity="error" className="my-3">
            Error: Unable to get bike paths.
          </Alert>
        )}

        {displayPaths === "user" ? (
          <UserPathsFilter handleFilter={handleFilter} />
        ) : (
          <AllPathsFilter
            handleFilter={handleFilter}
            max={max}
          />
        )}

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{
            alignItems: "stretch",
          }}
        >
          {isLoading && <SkeletonPathsContainer />}
          {filteredList?.map((path) => (
            <PathsItem
              key={path.id}
              path={path}
              userId={userId}
              displayUserPathsToggle={!(displayPaths === "user")}
            />
          ))}
        </Grid>
      </Box>
    </>
  );
}
