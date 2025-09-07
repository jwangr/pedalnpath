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
import Loading from "./Loading";
import polyline from "@mapbox/polyline";
import TemporaryDrawer from "./Drawer";

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
        markerData.length >= 1 &&
        typeof markerData[0].coordinates[0] !== "undefined"
      ) {
        const index = markerData.length - 2;
        flyToMarker(markerData[index].startCoordinate, 10);
      }
    }, [markerData]);

    // trigger map fly when coordinates changes
    useEffect(() => {
      if (coordinates?.[0]) {
        map.flyToBounds(coordinates, {
          padding: [80,80],
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

    try {
      //13. Set loading state and clear the input.
      setSubmittedQuestion(inputValue);
      setInputValue("");

      //14. Make the API request using fetch.
      const response = await fetch("/api/gemini", {
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

  //     {
  //   "coordinates": [
  //     [-44.9889, 168.7044],
  //     [-44.9909, 168.7070],
  //     [-44.9926, 168.7095],
  //     [-44.9938, 168.7123],
  //     [-44.9944, 168.7154],
  //     [-44.9943, 168.7187],
  //     [-44.9935, 168.7217],
  //     [-44.9920, 168.7245],
  //     [-44.9900, 168.7269],
  //     [-44.9875, 168.7287]
  //   ],
  //   "title": "Lake Hayes Loop (Partial - Northern Side)",
  //   "description": "A segment of the Lake Hayes Loop focusing on the northern portion. Mostly flat with some gentle undulations. Gravel surface.",
  //   "startCoordinate": [-44.9889, 168.7044],
  //   "endCoordinate": [-44.9875, 168.7287],
  //   "distanceKm": 2.5,
  //   "difficulty": "Easy",
  //   "surface": "Gravel",
  //   "suitableFor": ["Mountain Bikes", "Hybrid Bikes", "E-bikes"],
  //   "imageUrl": "https://example.com/lake-hayes-north.jpg"
  // }

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
