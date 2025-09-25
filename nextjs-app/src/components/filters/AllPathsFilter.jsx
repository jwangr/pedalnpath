import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function AllPathsFilter({ handleFilter }) {
  // handleFilter is a callback function that has props: applyFilters(path)
  const [difficulty, setDifficulty] = useState("all");
  const [distance, setDistance] = useState([0, 200]);

  // Adjust slider/distance
  const handleSliderChange = (event, newValue) => {
    setDistance(newValue);
  };

  // Filter conditions
  const filterDifficulty = (path) => {
    if (path.difficulty) {
      const matchThis = path.difficulty?.toLowerCase();
      console.log(matchThis);
      switch (difficulty) {
        case "beginner":
          return matchThis.includes("easy");
        case "intermediate":
          return matchThis.includes("moderate");
        case "advanced":
          return matchThis.includes("advanced");
        default:
          return true;
      }
    }
    return false;
  };

  const filterDistance = (path) => {
    if (path.distanceKm) {
      return path.distanceKm >= distance[0] && path.distanceKm <= distance[1];
    }
    return false;
  };

  const applyFilters = (path) => {
    return filterDistance(path) && filterDifficulty(path);
  };

  // Apply filters is called when filter values change
  useEffect(() => {
    handleFilter(applyFilters);
  }, [distance, difficulty]);

  return (
    <div>
      <Grid
        container
        spacing={4}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
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
              max={200}
              color="secondary"
            />
          </Grid>
        </Box>
      </Grid>
    </div>
  );
}
