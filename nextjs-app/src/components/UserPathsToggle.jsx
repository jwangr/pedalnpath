"use client";

import { FormControlLabel, FormGroup, LinearProgress } from "@mui/material";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToggleAddDeleteMutation } from "@/services/userPaths";

export default function UserPathsToggle({
  bikeRoute,
  Loading,
  toggleLoad,
  userId,
}) {
  const [toggleAddDelete, { data, isLoading, isSuccess, isError }] =
    useToggleAddDeleteMutation(userId, bikeRoute);

  // Whenever the user presses the toggle, data is received as an object, with key, added
  // Whenever getUserPaths is called, we need to receive bikeRoute with userPaths?added details!!!

  const [added, setAdded] = useState(false); // set default as false instead of null (for controlled switch)
  const [errorMsg, setErrorMsg] = useState("");

  // Load the initial value of 'added'
  useEffect(() => {
    if (isSuccess && data) {
      setAdded(data.added);
    }
  }, [isSuccess, data]);

  // const handleChange = async () => {
  //   toggleLoad(true);
  //   // it will change the added state of the variable while updating the database
  //   // send complex objects via POST instead of GET
  //   axios
  //     .post("/api/userpath", {
  //       userId,
  //       path: bikeRoute,
  //     })
  //     .then((response) => {
  //       console.log(`Response from toggle: ${JSON.stringify(response.data)}`);
  //       setAdded(!!response.data.added);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       toggleLoad(false);
  //     });

  //   setError(error);
  // };

  const label = added ? "Saved" : "Add to My List";
  const error = errorMsg ? errorMsg : "";

  return (
    <>
      {Loading && <LinearProgress color="secondary" sx={{ width: "100%" }} />}
      <FormGroup className="flex flex-row-reverse">
        <FormControlLabel
          label={isError ? "Uh oh" : label}
          control={
            <Switch
              disabled={isLoading}
              color="secondary"
              checked={added}
              // onChange={handleChange}
              slotProps={{ input: { "aria-label": "controlled" } }}
            />
          }
        />
      </FormGroup>
    </>
  );
}
