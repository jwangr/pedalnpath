"use client";

import { useState, useEffect, useRef } from "react";
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
import TextField from "@mui/material/TextField";
import polyline from "@mapbox/polyline";
import { useGetOSRMRouteMutation } from "@/services/osrm";
import { Button, Stack } from "@mui/material";
import SaveNewNavigateModal from "./SaveNewNavigateModal";
import { useCreateBikePathMutation } from "@/services/bikePaths";
import Loading from "./loadingBikes/Loading";

const MapComponent = () => {
  const [
    getOSRMRoute,
    { data, isLoading, isError, isSuccess, error: OSRMError },
  ] = useGetOSRMRouteMutation();

  //5. Initialize local state.
  const trail = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [
        [168.6603, -45.0312], // Queenstown (lon, lat)
        [168.8097, -44.9386], // Arrowtown (lon, lat)
      ],
    },
    properties: {
      name: "Queenstown → Arrowtown Trail",
    },
  };

  const [coordinates, setCoordinates] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [start, setStart] = useState("Queenstown");
  const [end, setEnd] = useState("Frankton");
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState("");
  const [path, setPath] = useState(null);

  const clearRoute = () => {
    setCoordinates([]);
    setMarkers([]);
    setDistance(null);
    setDuration("");
    setPath(null);
  };

  async function handleSearch(e) {
    e.preventDefault();

    // empty the list of coordinates
    clearRoute();
    setLoading(true);

    // Converts query/locations to latitude/longitude
    const geocode = async (query) => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json`
      );
      const data = await res.json();
      if (data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      return null;
    };

    const startCoords = await geocode(start); // [-45.0321923,168.661]
    const endCoords = await geocode(end);
    const waypoints = [startCoords, endCoords];

    // make OSRM http call
    getOSRMRoute({ waypoints })
      .unwrap()
      .then((data) => {
        if (data?.code === "Ok") {
          console.log(JSON.stringify(data));
          setCoordinates(data.geometry);
          setDistance(data.distanceKm);
          setDuration(data.duration);

          // set the markers
          const startEnd = [
            { coordinates: data.geometry[0] },
            { coordinates: data.geometry[data.geometry.length - 1] },
          ];
          setMarkers(startEnd);

          // set the path
          setPath({
            title: `${start} to ${end}`,
            distanceKm: data.distanceKm,
            duration: data.duration,
            startCoordinate: data.geometry[0],
            endCoordinate: data.geometry[data.geometry.length - 1],
            coordinates: data.geometry,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  const ZoomHandler = () => {
    //8. Use Leaflet's useMap hook.
    const map = useMap();
    //9. Function to fly map to given coordinates.
    const flyToMarker = (coordinates) => {
      if (coordinates) {
        map.fitBounds(coordinates, {
          padding: [50, 50], // pixel padding around bounds
          maxZoom: 15, // prevent zooming in too far
          animate: true, // default true
        });
      }
    };
    useMapEvents({
      zoomend: () => {
        setLoading(false);
      },
    });

    //useEffect to trigger the map fly when markerData changes.
    useEffect(() => {
      if (coordinates?.length !== 0) {
        flyToMarker(coordinates);
      }
    }, [coordinates]);

    //Return null as we're not rendering anything in the DOM.
    return null;
  };

  return (
    <>
      {isLoading && <Loading />}
      <MapContainer
        center={[-45.0302, 168.6615]}
        zoom={12}
        style={{ height: "100vh", width: "100vw" }}
      >
        {/* 21. Set the tile layer for the map. */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* If search is successfull */}
        <Polyline positions={coordinates}>
          <Popup>See This!</Popup>
        </Polyline>

        {/*Render the markers. */}
        {markers.map((marker) => (
          <Marker
            position={marker.coordinates}
            key={marker.coordinates[0]}
          ></Marker>
        ))}

        <ZoomHandler />
      </MapContainer>
      <div className="absolute bottom-5 left-0 w-full z-[10000] p-3">
        <form className="flex justify-center w-full" onSubmit={handleSearch}>
          <Stack
            direction={"row"}
            width={"inherit"}
            justifyContent={"center"}
            spacing={3}
          >
            <TextField
              label="Start"
              name="start"
              variant="filled"
              color="secondary"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
            <TextField
              label="End"
              name="end"
              variant="filled"
              color="secondary"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
            <Button type="submit" variant="contained" color="secondary">
              GO
            </Button>
            {path && <SaveNewNavigateModal path={path} />}
          </Stack>
        </form>
      </div>
    </>
  );
};

export default MapComponent;
