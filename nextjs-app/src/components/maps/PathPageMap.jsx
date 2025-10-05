"use client";

import { MapContainer, Polyline, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { deepPurple } from "@mui/material/colors";
import PathMapTiles from "./PathMapTiles";

// Props: bikepath coordinates
export default function MapBoxContainer({ coordinates = null }) {
  return (
    <Box
      sx={{
        width: "100%",
        aspectRatio: "16/9",
        maxHeight: "50vh",
      }}
    >
      {coordinates?.length > 0 && (
        <PathMapTiles coordinates={coordinates} userControl={true} />
      )}
    </Box>
  );
}
