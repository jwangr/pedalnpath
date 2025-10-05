"use client";

import { Box, CircularProgress } from "@mui/material";
import { SwitchTextTrack } from "./SwitchTextTrack";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  useToggleCompletedMutation,
} from "@/services/userPaths";

export default function ToggleCompleted({ bikeRoute, userId, toggleLoad }) {
  const [added, setAdded] = useState(!!bikeRoute?.completed); // set default as false instead of null (for controlled switch)

  const [toggleCompleted, { data, isLoading, isSuccess, isError }] =
    useToggleCompletedMutation();

  const handleChangeRTK = () => {
    toggleCompleted({
      userId,
      pathId: bikeRoute.id,
    })
      .unwrap()
      .then((response) => {
        console.log(JSON.stringify(response));
        setAdded(!!response.completed);
      })
      .catch((err) => {
        consol.log(err);
      });
  };

  return (
    <Box className="flex flex-row-reverse">
      <SwitchTextTrack checked={added} onChange={handleChangeRTK} />
      {isLoading && <CircularProgress color="secondary" size="1em" />}
    </Box>
  );
}
