"use client";
import { jsonrepair } from "jsonrepair";
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
import "@/lib/leafletSetup";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import TemporaryDrawer from "./Drawer";
import { TextField } from "@mui/material";
import { useGetOSRMRouteMutation } from "@/services/osrm";
import { useGetUserQuery } from "@/services/Auth";
import { useRequestGeminiMutation } from "@/services/Gemini";
import Alerts from "./Alerts";

const MapComponent = () => {
  // Initialize local state.
  const [inputValue, setInputValue] = useState("");
  const [markerData, setMarkerData] = useState([]);
  const [submittedQuestion, setSubmittedQuestion] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState("");

  // API actions for OSRM
  const [
    getOSRMRoute,
    {
      data,
      isLoading: OSRMLoading,
      isError: OSRMError,
      isSuccess: OSRMSuccess,
      error: OSRMErrorMsg,
    },
  ] = useGetOSRMRouteMutation();

  // API actions for Gemini
  const [
    askGemini,
    {
      data: geminiData,
      error: geminiErrorMsg,
      isLoading: geminiLoading,
      isError: geminiError,
      isSuccess: geminiSuccess,
    },
  ] = useRequestGeminiMutation();

  // Load user data
  const {
    data: userData,
    error: userError,
    isLoading: loadingUser,
  } = useGetUserQuery();

  // ZoomHandler component for handling map zoom events.
  const ZoomHandler = () => {
    //8. Use Leaflet's useMap hook.
    const map = useMap();

    // Trigger the map fly to bounds when markerData changes.
    useEffect(() => {
      if (
        markerData.length >= 2 &&
        typeof markerData[0].coordinates[0] !== "undefined"
      ) {
        const markerCoordinates = markerData.map(
          (marker) => marker.startCoordinate
        );

        map.flyToBounds(markerCoordinates, {
          padding: [50, 50],
          animate: true,
          duration: 1.5,
        });
      }
    }, [markerData]);

    // trigger map fly when coordinates changes
    useEffect(() => {
      if (coordinates?.[0]) {
        map.flyToBounds(coordinates, {
          padding: [80, 80],
          animate: true,
          duration: 1.5,
        });
      }
    }, [coordinates]);

    // Return null as we're not rendering anything in the DOM.
    return null;
  };

  //Function to handle Gemini form submission.
  const handleSubmit = async () => {
    console.log("Clearing marker data and coordinates");
    setMarkerData([]);
    setCoordinates([]);

    // Set loading state and clear the input.
    setSubmittedQuestion(inputValue);
    setInputValue("");

    // Make API request to Gemini
    try {
      const response = await askGemini({ value: inputValue }).unwrap();
      console.log(response);
      setMarkerData([...response]);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle OSRM routing
  const displayRoutewithRTK = (waypoints) => {
    // Clear the data from previous OSRM calls
    setCoordinates([]);
    setDistance(null);
    setDuration("");

    // make OSRM http call
    getOSRMRoute({ waypoints })
      .unwrap()
      .then((data) => {
        if (data?.code === "Ok") {
          console.log(JSON.stringify(data));
          setCoordinates(data.geometry);
          setDistance(data.distanceKm);
          setDuration(data.duration);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Alerts
        isLoading={OSRMLoading || geminiLoading}
        isSuccess={OSRMSuccess || geminiSuccess}
        isError={OSRMError || geminiError}
        successMsg={
          OSRMSuccess
            ? "Route found by OSRM"
            : geminiSuccess
            ? `Paths found by Gemini around ${submittedQuestion}`
            : null
        }
        errorMsg={
          OSRMError
            ? "Unable to find route"
            : geminiError
            ? "Unable to find paths by Gemini"
            : null
        }
      />

      {/* Add the map container. */}
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

        {/*Render the markers. */}
        {markerData.map((marker) => (
          <Marker
            position={
              marker.coordinates[0]
                ? marker.coordinates[0]
                : marker.startCoordinate
            }
            key={marker.title}
            eventHandlers={{
              click: () => displayRoutewithRTK(marker.coordinates),
            }}
          >
            <Popup>
              <h2>{marker.title}</h2>
              <p>{marker.description}</p>
              <TemporaryDrawer
                markerObj={{
                  ...marker,
                  coordinates: coordinates,
                  distanceKm: distance,
                  duration,
                }}
                userId={userData?.id || null}
              />
            </Popup>
          </Marker>
        ))}

        {/* 23. Include the ZoomHandler for zoom events. */}
        <ZoomHandler />
        {coordinates && <Polyline positions={coordinates}></Polyline>}
      </MapContainer>

      {/* 24. Include the form input, submit button and area for submitted question. */}
      <div className="absolute bottom-15 left-0 w-full z-[500] p-3">
        <div className="flex justify-center">
          <TextField
            id="filled-basic"
            label="Explore with Gemini"
            color="secondary"
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow p-2 border rounded-md bg-white/75"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <button
            onClick={handleSubmit}
            className="p-2 ml-2 bg-blue-500 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default MapComponent;
