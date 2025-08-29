"use client";

import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import Loading from "./Loading";

const MapComponent = () => {
  //5. Initialize local state.
  const [inputValue, setInputValue] = useState("");
  const [markerData, setMarkerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submittedQuestion, setSubmittedQuestion] = useState(null);

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
        markerData.length >= 1 &&
        typeof markerData[0].coordinates[0] !== "undefined"
      ) {
        const index = markerData.length - 1;
        flyToMarker(markerData[index].coordinates, 13);
      }
    }, [markerData]);
    //11. Return null as we're not rendering anything in the DOM.
    return null;
  };

  //12. Function to handle form submission.
  const handleSubmit = async () => {
    setLoading(true);

    try {
      //13. Set loading state and clear the input.
      setSubmittedQuestion(inputValue);
      setInputValue("");

      //14. Make the API request using fetch.
      const response = await fetch("/api/coordinates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: inputValue }),
      });

      //15. Parse and set the response data.
      const data = await response.json();

      setMarkerData([...markerData, ...data]);
      console.log(data);
    } catch (error) {
      //16. Log errors.
      console.error(error);
    } finally {
      setLoading(false);
    }
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
          <Marker position={marker.coordinates} key={marker.title}>
            <Popup>
              <h2>{marker.title}</h2>
              <p>{marker.description}</p>
            </Popup>
          </Marker>
        ))}

        {/* 23. Include the ZoomHandler for zoom events. */}
        <ZoomHandler />
      </MapContainer>

      {/* 24. Include the form input, submit button and area for submitted question. */}
      <div className="absolute bottom-5 left-0 w-full z-[10000] p-3">
        <div className="flex justify-center">
          {/* {submittedQuestion && (
            <div className="flex items-center justify-center bottom-16 absolute w-full z-[100000]">
              <h1 className="text-3xl font-bold text-black p-2 bg-white rounded-md">
                {submittedQuestion}
              </h1>
            </div>
          )} */}

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow p-2 border rounded-md"
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
