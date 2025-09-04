"use client";
import { useState } from "react";

export default function StartEnd() {
  const [start, setStart] = useState({
    lat: -123.1814231,
    long: 49.195113,
  });
  const [end, setEnd] = useState({
    lat: -123.1814231,
    long: 49.195113,
  });

  return (
    <div>
      Plug in your start and finish destinations!
      <form>
        <div>
          <label htmlFor="start">Start</label>
          <input
            type="text"
            name="start-lat"
            value={start.lat}
            onChange={(e) => setStart(e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            name="start-long"
            value={start.long}
            onChange={(e) => setStart(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <div>
          <label htmlFor="end">Destination</label>
          <input
            type="text"
            name="end-lat"
            value={end.lat}
            onChange={(e) => setEnd(e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            name="end-long"
            value={end.long}
            onChange={(e) => setEnd(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          HEHE
        </button>
      </form>
    </div>
  );
}
