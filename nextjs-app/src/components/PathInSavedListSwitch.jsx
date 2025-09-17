"use client";

import { FormControlLabel, FormGroup, LinearProgress } from "@mui/material";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WishlistSwitch({ bikeRoute, Loading, toggleLoad }) {
  const [added, setAdded] = useState(false); // set default as false instead of null (for controlled switch)
  const [errorMsg, setError] = useState("");

  // Load the initial value of added state
  useEffect(() => {
    async function fetchData() {
      // fetch from API route
      await axios
        .get(`/api/bikepath/findbyname`, {
          params: {
            title: bikeRoute.title,
          },
        })
        .then((response) => {
          console.log(
            `Path found in global database ${JSON.stringify(response.data)}`
          );
          setAdded(!!response.data);
        });
    }
    fetchData();
  }, [bikeRoute.title]);

  const handleChange = async () => {
    toggleLoad(true);
    // it will change the added state of the variable while updating the database
    // send complex objects via POST instead of GET
    axios
      .post("/api/bikepath/toggleadd", bikeRoute)
      .then((response) => {
        console.log(
          `Response from wishlist toggle: ${JSON.stringify(response.data)}`
        );
        setAdded(!!response.data.added);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      })
      .finally(() => {
        toggleLoad(false);
      });

    setError(error);
  };

  const label = added ? "Saved" : "Add to My List";
  const error = errorMsg ? errorMsg : "";

  return (
    <>
      {Loading && <LinearProgress color="secondary" sx={{ width: "100%" }} />}
      <FormGroup className="flex flex-row-reverse">
        <FormControlLabel
          label={label + error}
          control={
            <Switch
              color="secondary"
              checked={added}
              onChange={handleChange}
              slotProps={{ input: { "aria-label": "controlled" } }}
            />
          }
        />
        <div className="text-red-600">{error}</div>
      </FormGroup>
    </>
  );
}
