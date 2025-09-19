"use client";

import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import {
  Box,
  CardContent,
  Grid,
  Typography,
  Paper,
  LinearProgress,
} from "@mui/material";
import ToggleCompleted from "./ToggleCompleted";
import UserPathsToggle from "./UserPathsToggle";

export default function PathsItem({ path, userId, displayUserPathsToggle }) {
  const [loading, setLoading] = useState(false);
  const toggleLoad = (status) => {
    setLoading(status);
  };
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // column on mobile, row on desktop
          alignItems: "center",
          gap: 2, // spacing between map and content
          textAlign: "left", // remove center alignment
          height: "100%",
        }}
      >
        <Box
          sx={{ width: { xs: "100%", sm: 200 }, height: "200px", flexShrink: 0 }}
        >
          <MapContainer
            center={[-45.0302, 168.6615]}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
          >
            {/* 21. Set the tile layer for the map. */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </Box>

        <CardContent sx={{ flex: 1 }}>
          {!displayUserPathsToggle && (
            <ToggleCompleted
              bikeRoute={path}
              userId={userId}
              toggleLoad={toggleLoad}
            />
          )}

          {displayUserPathsToggle && (
            <UserPathsToggle
              bikeRoute={path}
              Loading={loading}
              toggleLoad={toggleLoad}
            />
          )}

          <Typography
            variant="h5"
            component="div"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2, // max 3 lines
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {path.bikepath?.title || path.title}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {path.bikepath?.distanceKm || path.distanceKm || "?"} km
          </Typography>

          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3, // max 3 lines
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {path.bikepath?.description || path.description}
          </Typography>
          {loading && (
            <LinearProgress color="secondary" sx={{ width: "100%" }} />
          )}
        </CardContent>
      </Paper>
    </Grid>
  );
}
