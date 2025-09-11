"use client";

import { FormControlLabel, FormGroup } from "@mui/material";
import Switch from "@mui/material/Switch";
import { findPathByName, toggleAddDelete } from "@/actions/bikepath";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WishlistSwitch({ bikeRoute }) {
  const [added, setAdded] = useState(true); // set default as true instead of null (for controlled switch)
  const [errorMsg, setError] = useState(""); // set default as true instead of null (for controlled switch)

  // Load the initial value of added state
  useEffect(() => {
    async function fetchData() {
      // fetch boolean from server action
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
    // it will change the added state of the variable while updating the database
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
      });
    setError(error);
  };

  const label = added ? "Saved in Database" : "Add to Database";
  const error = errorMsg ? errorMsg : "";

  return (
    <FormGroup>
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
      <div>{error}</div>
    </FormGroup>
  );
}
