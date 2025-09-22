"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { Box } from "@mui/material";

export default function MapBoxContainer() {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: 200 },
        height: "200px",
        flexShrink: 0,
      }}
    >
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
      </MapContainer>
    </Box>
  );
}
