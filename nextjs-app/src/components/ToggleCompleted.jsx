"use client";

import { Box } from "@mui/material";
import { SwitchTextTrack } from "./SwitchTextTrack";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ToggleCompleted({ bikeRoute, userId, toggleLoad }) {
  const [added, setAdded] = useState(false); // set default as false instead of null (for controlled switch)

  useEffect(() => {
    setAdded(!!bikeRoute.completed);
  }, []);

  const handleChange = async () => {
    toggleLoad(true);
    axios
      .put("/api/userpath", {
        userId,
        path: bikeRoute,
      })
      .then((response) => {
        console.log(`Response from toggle: ${JSON.stringify(response.data)}`);
        setAdded(!!response.data.completed);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        toggleLoad(false);
      });
  };

  return (
    <Box className="flex flex-row-reverse">
      <SwitchTextTrack checked={added} onChange={handleChange} />
    </Box>
  );
}
