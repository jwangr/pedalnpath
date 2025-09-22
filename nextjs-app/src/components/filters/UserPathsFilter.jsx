import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

export default function UserPathsFilter({ handleFilter }) {
  // handleFilter is a callback function that has props: applyFilters(path)

  const [filter, setFilter] = useState("");

  const handleChange = (event, newValue) => {
    setFilter(newValue);

    const applyFilters = (path) => {
      if (newValue === "done") {
        return !!path.completed;
      } else if (newValue === "notDone") {
        return !path.completed;
      } else {
        return true;
      }
    };

    handleFilter(applyFilters);
  };

  return (
    <Tabs
      value={filter}
      onChange={handleChange}
      textColor="secondary"
      indicatorColor="secondary"
      aria-label="secondary tabs example"
      className="my-2"
      centered
    >
      <Tab value="" label="All" />
      <Tab value="done" label="Completed" />
      <Tab value="notDone" label="Not Done" />
    </Tabs>
  );
}
