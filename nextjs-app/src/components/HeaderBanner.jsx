import { Paper, Typography } from "@mui/material";
import React from "react";

export default function HeaderBanner({ h1, h4, subtitle1 }) {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        borderRadius: 0,
        backgroundImage: "linear-gradient(0deg, #4f2d2d,#060048)",
      }}
    >
      <Typography
        variant="h1"
        color="white"
        sx={{
          fontSize: { xs: "2em", sm: "4em", md: "5em" }, // responsive sizes
        }}
        gutterBottom
      >
        {h1}
      </Typography>
      <Typography
        color="white"
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: "1.5.em", sm: "2em", md: "3em" }, // responsive sizes
        }}
      >
        {h4}
      </Typography>
      <Typography variant="subtitle1" gutterBottom color="white">
        {subtitle1}
      </Typography>
    </Paper>
  );
}
