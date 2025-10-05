"use client";

import { MapContainer, Polyline, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { deepPurple } from "@mui/material/colors";

// Set up constant map and center views
const MapContainerBox = ({ coordinates }) => {
  <MapContainer
    center={[-45.0302, 168.6615]}
    zoom={12}
    style={{ height: "100%", width: "100%" }}
    zoomControl={false} // remove zoom buttons
    attributionControl={false} // remove footer
    dragging={false} // disable dragging
    scrollWheelZoom={false} // disable scroll zoom
    doubleClickZoom={false} // disable double-click zoom
    touchZoom={false} // disable touch zoom
    keyboard={false} // disable keyboard navigation
  >
    {/* 21. Set the tile layer for the map. */}
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {/* Draw the route */}
    <Polyline positions={coordinates} color={deepPurple[400]} />

    <CentredMap />
  </MapContainer>;
};
const CentredMap = ({ coordinates }) => {
  const map = useMap();
  // Center the map around the coordinates
  map.fitBounds(coordinates);

  return null;
};

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
      {coordinates?.length > 0 && (
        <MapContainerBox coordinates={coordinates}>
          <CentredMap coordinates={coordinates} />
        </MapContainerBox>
      )}
    </Box>
  );
}
