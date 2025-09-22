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
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
// import "leaflet-defaulticon-compatibility";
import Loading from "./Loading";
import polyline from "@mapbox/polyline";
import TemporaryDrawer from "./Drawer";
import { TextField } from "@mui/material";

const MapComponent = () => {
  //5. Initialize local state.
  const [inputValue, setInputValue] = useState("");
  const [markerData, setMarkerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submittedQuestion, setSubmittedQuestion] = useState(null);
  const [coordinates, setCoordinates] = useState([]);

  //6. Declare useRef to reference map.
  const mapRef = useRef(null);

  //7. ZoomHandler component for handling map zoom events.
  const ZoomHandler = () => {
    //8. Use Leaflet's useMap hook.
    const map = useMap();
    //9. Function to fly map to given coordinates.
    const flyToMarker = (coordinates, zoom) => {
      if (coordinates && typeof coordinates[0] !== "undefined") {
        map.flyTo(coordinates, zoom, {
          animate: true,
          duration: 1.5,
        });
      }
    };
    useMapEvents({
      zoomend: () => {
        setLoading(false);
      },
    });

    //10. useEffect to trigger the map fly when markerData changes.
    useEffect(() => {
      if (
        markerData.length >= 2 &&
        typeof markerData[0].coordinates[0] !== "undefined"
      ) {
        console.log(`Flying to next markers: Note marker data is longer than 2 items long.`)
        const index = markerData.length - 2;
        flyToMarker(markerData[index].startCoordinate, 10);
      }
    }, [markerData]);

    // trigger map fly when coordinates changes
    useEffect(() => {
      if (coordinates?.[0]) {
        map.flyToBounds(coordinates, {
          padding: [80, 80],
          animate: true,
          duration: 1
        })
      }
    }, [coordinates]);

    //11. Return null as we're not rendering anything in the DOM.
    return null;
  };

  //12. Function to handle form submission.
  const handleSubmit = async () => {
    setLoading(true);
    console.log('Clearing marker data and coordinates');
    setMarkerData([]);
    setCoordinates([]);

    try {
      // Set loading state and clear the input.
      setSubmittedQuestion(inputValue);
      setInputValue("");

      // Make the API request to Gemini.
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: inputValue }),
      });

      //15. Parse and set the response data.
      const data = await response.json();

      setMarkerData([...data]);
      console.log(`MarkerData: ${markerData}`);
    } catch (error) {
      //16. Log errors.
      console.error(error + "unable to explore currently");
    } finally {
      setLoading(false);
    }
  };

  const displayRoute = async (waypoints) => {
    setCoordinates([]);
    // fetch data from api
    const response = await fetch("/api/directions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ waypoints }),
    });

    const data = await response.json();
    console.log("returned OSRM data: " + data);

    // fill the coordinates
    const encoded = data?.routes[0]?.geometry;
    const geometry = polyline.decode(encoded);
    console.log(geometry);
    setCoordinates(geometry);
  };

  //17. Return the JSX for rendering.
  return (
    <>
      {loading && <Loading />}

      {/* 20. Add the map container. */}
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
            position={marker.coordinates[0] ? marker.coordinates[0] : marker.startCoordinate}
            key={marker.title}
            eventHandlers={{
              click: () => displayRoute(marker.coordinates),
            }}
          >
            <Popup>
              <h2>{marker.title}</h2>
              <p>{marker.description}</p>
              <TemporaryDrawer markerObj={marker} />
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

          <TextField id="filled-basic" label="Explore with Gemini" color="secondary" variant="outlined"
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
