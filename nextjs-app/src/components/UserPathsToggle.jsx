"use client";

import {
  CircularProgress,
  FormControlLabel,
  FormGroup,
  LinearProgress,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import { useToggleAddDeleteMutation } from "@/services/userPaths";
import { useGetBikePathsQuery } from "@/services/bikePaths";

export default function UserPathsToggle({ bikeRoute, userId }) {
  // console.log(
  //   `UserPathsToggle received bikeRoute ${JSON.stringify(
  //     bikeRoute
  //   )} and userId ${userId}`
  // );
  const [toggleAddDelete, { data, isLoading, isSuccess, isError }] =
    useToggleAddDeleteMutation();

  const { refetch: refetchBikePaths } = useGetBikePathsQuery({ id: userId });

  // Whenever the user presses the toggle, the response contains {added: true/false}
  const [added, setAdded] = useState(!!bikeRoute?.users?.[0]); // set default as false instead of null (for controlled switch)

  const toggleChange = () => {
    toggleAddDelete({
      userId,
      path: bikeRoute,
    })
      .unwrap()
      .then((response) => {
        setAdded(response.added);
        refetchBikePaths(); // manually refetches getAllBikePaths
      })
      .catch((error) => console.error("rejected", error));
  };

  const label = added ? "Saved" : "Add to My List";

  return (
    <>
      <FormGroup className="flex flex-row-reverse">
        <FormControlLabel
          label={
            isError ? (
              "Uh oh"
            ) : isLoading ? (
              <CircularProgress color="inherit" size="1em" />
            ) : (
              label
            )
          }
          control={
            <Switch
              disabled={isLoading}
              color="secondary"
              checked={added}
              onChange={toggleChange}
              slotProps={{ input: { "aria-label": "controlled" } }}
            />
          }
        />
      </FormGroup>
    </>
  );
}
