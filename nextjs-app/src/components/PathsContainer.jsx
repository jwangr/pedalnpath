"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PathsItem from "./PathsItem";
import { useGetBikePathsQuery } from "@/services/bikePaths";
import { Alert } from "@mui/material";
import SkeletonPathsContainer from "./skeletons/SkeletonPathsContainer";
import { useGetUserPathsQuery } from "@/services/userPaths";
import { useEffect, useState } from "react";
import UserPathsFilter from "./filters/UserPathsFilter";
import AllPathsFilter from "./filters/AllPathsFilter";
import Loading from "./loadingBikes/Loading";

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

  const [max, setMax] = useState(50); // set minimum slider length

  const data = displayPaths === "user" ? userPaths : allPaths;
  const error = displayPaths === "user" ? userPathsError : allPathsError;
  const isLoading =
    displayPaths === "user" ? userPathsisLoading : allPathsisLoading;
  const isError = displayPaths === "user" ? userPathsisError : allPathsisError;

  if (isError) {
    console.log(error);
  }

  const [filteredList, setFilteredList] = useState([]);

  const [filterFunction, setFilterFunction] = useState(null);

  useEffect(() => {
    if (data) {
      // find longest distance
      const distances = data.map((route) => route.distanceKm);
      const newMax = Math.ceil(Math.max(...distances));
      setMax(newMax);

      if (filterFunction) {
        setFilteredList([...data].filter(filterFunction));
      } else {
        setFilteredList([...data]);
      }
    }
  }, [data, filterFunction]);

  const handleFilter = (applyFilters) => {
    setFilterFunction(() => applyFilters);
  };

  if (data && data.length === 0) {
    return <div>No paths found. Head to the explore page for inspiration!</div>;
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
          <AllPathsFilter handleFilter={handleFilter} max={max} />
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
