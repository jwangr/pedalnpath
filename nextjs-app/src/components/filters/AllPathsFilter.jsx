import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function AllPathsFilter({ handleFilter, max, handleSort }) {
  // handleFilter is a callback function that has props: applyFilters(path)
  const [difficulty, setDifficulty] = useState("all");
  const [sort, setSort] = useState("default");
  const [distance, setDistance] = useState([0, max]);

  // Adjust slider/distance
  const handleSliderChange = (event, newValue) => {
    setDistance(newValue);
  };

  // Filter conditions
  const filterDifficulty = (path) => {
    if (path.difficulty) {
      const matchThis = path.difficulty?.toLowerCase();
      switch (difficulty) {
        case "beginner":
          return matchThis.includes("easy") || matchThis.includes("beginner");
        case "intermediate":
          return (
            matchThis.includes("moderate") || matchThis.includes("intermediate")
          );
        case "advanced":
          return matchThis.includes("advanced") || matchThis.includes("expert");
        default:
          return true;
      }
    }
    return true;
  };

  const filterDistance = (path) => {
    if (path.distanceKm) {
      return path.distanceKm >= distance[0] && path.distanceKm <= distance[1];
    }
    return false;
  };

  const sortingFunction = (a, b) => {
    if (sort === "AZ") {
      const A = a.title.toUpperCase(); // ignore upper and lowercase
      const B = b.title.toUpperCase(); // ignore upper and lowercase

      if (A < B) return -1;
      else if (A > B) return 1;
      else return 0;
    } else if (sort === "distance") {
      return a.distanceKm - b.distanceKm; // numerical comparison of distance
    }
    return 0; // default sorting
  };

  const applyFilters = (path) => {
    return filterDistance(path) && filterDifficulty(path);
  };

  // Apply filters is called when filter values change
  useEffect(() => {
    handleFilter(applyFilters);
  }, [distance, difficulty]);

  // Apply sort when sort value changes
  useEffect(() => {
    handleSort(sortingFunction);
  }, [sort])

  return (
    <div>
      <Grid
        container
        spacing={4}
        sx={{ alignItems: "center", justifyContent: "end", marginBottom: 3 }}
      >
        <Grid>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            {/* Sort by */}
            <InputLabel id="sort">Sort</InputLabel>
            <Select
              labelId="sort"
              id="demo-sort"
              value={sort}
              label="Sort"
              onChange={(e) => {
                setSort(e.target.value);
              }}
            >
              <MenuItem value="default">
                <em>Default</em>
              </MenuItem>
              <MenuItem value="AZ">Alphabetical (A-Z)</MenuItem>
              <MenuItem value="distance">Distance (low to high)</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            {/* Filter by difficulty */}
            <InputLabel id="suitableFor">Difficulty</InputLabel>
            <Select
              labelId="suitableFor"
              id="demo-suitableFor"
              value={difficulty}
              label="Difficulty"
              onChange={(e) => {
                setDifficulty(e.target.value);
              }}
            >
              <MenuItem value="all">
                <em>ALL</em>
              </MenuItem>
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Box sx={{ width: 300 }}>
          <Typography id="input-slider" gutterBottom>
            Distance (km)
          </Typography>{" "}
          <Grid size="grow">
            <Slider
              value={distance}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              disableSwap
              valueLabelDisplay="auto"
              step={5}
              max={max}
              color="secondary"
            />
          </Grid>
        </Box>
      </Grid>
    </div>
  );
}
