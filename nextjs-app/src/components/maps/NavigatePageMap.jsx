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
import SaveNewNavigateModal from "../SaveNewNavigateModal";
import { useCreateBikePathMutation } from "@/services/bikePaths";
import Loading from "../loadingBikes/Loading";
import Alerts from "../Alerts";

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
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [distance, setDistance] = useState(null);
  // const [duration, setDuration] = useState("");
  const [path, setPath] = useState(null);

  const clearRoute = () => {
    setCoordinates([]);
    setMarkers([]);
    // setDistance(null);
    // setDuration("");
    setPath(null);
  };

  async function handleSearch(e) {
    e.preventDefault();

    // empty the list of coordinates
    clearRoute();

    // make OSRM http call
    getOSRMRoute({ start, end })
      .unwrap()
      .then((data) => {
        if (data?.code === "Ok") {
          console.log(JSON.stringify(data));
          setCoordinates(data.geometry);
          // setDistance(data.distanceKm);
          // setDuration(data.duration);

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
    // useMapEvents({
    //   zoomend: () => {
    //     setLoading(false);
    //   },
    // });

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
      <Alerts
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        errorMsg={OSRMError?.data?.error}
        successMsg="Route loaded"
      />
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
      <div className="absolute bottom-5 left-0 w-full z-[1000] p-3">
        <form className="flex justify-center w-full" onSubmit={handleSearch}>
          <Stack
            justifyContent={"center"}
            alignItems={"stretch"}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            direction={{ xs: "column", sm: "row" }}
            width={'100%'}
            marginBottom={5}
          >
            <TextField
              label="Start"
              name="start"
              variant="outlined"
              color="secondary"
              placeholder="Start Here"
              className="flex-grow p-2 border rounded-md bg-white/75"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
            <TextField
              label="End"
              name="end"
              placeholder="Destination"
              variant="outlined"
              color="secondary"
              className="flex-grow p-2 border rounded-md bg-white/75"
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
