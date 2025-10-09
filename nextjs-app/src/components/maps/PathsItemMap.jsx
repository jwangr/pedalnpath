"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { Box } from "@mui/material";
import PathMapTiles from "./PathMapTiles";

// Props: bikepath coordinates
export default function MapBoxContainer({ coordinates = null }) {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: 200 },
        height: { xs: 200, sm: "100%" },
        flexShrink: 0,
      }}
    >
      {coordinates?.length > 0 && <PathMapTiles coordinates={coordinates}/>}
    </Box>
  );
}
