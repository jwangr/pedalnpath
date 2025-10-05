"use client";

import { MapContainer, Polyline, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { deepPurple } from "@mui/material/colors";

export default function PathMapTiles({ coordinates, userControl = false }) {
  const CentredMap = ({ coordinates }) => {
    const map = useMap();
    if (coordinates?.length > 0) {
      // Center the map around the coordinates
      map.fitBounds(coordinates);
    }

    return null;
  };

  return (
    <MapContainer
      center={[-45.0302, 168.6615]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
      attributionControl={false} // remove footer
      keyboard={false} // disable keyboard navigation
      zoomControl={userControl} // remove zoom buttons
      dragging={userControl} // disable dragging
      scrollWheelZoom={false} // disable scroll zoom
      doubleClickZoom={false} // disable double-click zoom
      touchZoom={false} // disable touch zoom
    >
      {/* 21. Set the tile layer for the map. */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Draw the route */}
      <Polyline positions={coordinates} color={deepPurple[400]} />

      <CentredMap coordinates={coordinates} />
    </MapContainer>
  );
}
