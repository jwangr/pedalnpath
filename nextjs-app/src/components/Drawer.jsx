import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useState } from "react";
import RouteDrawerOSRM from "./RouteDrawerOSRM";

export default function TemporaryDrawer({ markerObj, userId }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: "50vw", minWidth: 250 }}
      className="p-3 "
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <div>{markerObj.title || "Example"}</div>
      <div>{markerObj.distance || "100m"}</div>
      <div>{markerObj.waypoints || "No waypoints"}</div>
    </Box>
  );

  const tempObj = {
    title: "Queenstown Trail - Arrow River Bridges Trail",
    description:
      "A beautiful trail following the Arrow River, crossing several historic bridges. Mostly flat and easy riding.",
    difficulty: "Easy",
    distance: "12km",
    duration: "1.5-2 hours",
    surface: "Gravel",
    startCoordinate: [-44.931, 168.835],
    endCoordinate: [-44.931, 168.835],
    coordinates: [
      [-44.931, 168.835],
      [-44.94, 168.84],
      [-44.95, 168.85],
      [-44.96, 168.86],
      [-44.95, 168.85],
      [-44.94, 168.84],
      [-44.931, 168.835],
    ],
    highlights: [
      "Historic bridges",
      "Arrow River scenery",
      "Gold panning sites",
    ],
    notes: "Popular trail, expect other users.  Suitable for most bikes.",
    trackType: "Bike Trail",
    suitableFor: ["Families", "Beginners", "Casual cyclists"],
  };

  const handleLoading = (newStatus) => {
    setLoading(newStatus);
  };
  return (
    <div>
      <Button onClick={toggleDrawer(true)}>More Info</Button>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
      >
        {/* {DrawerList} */}
        {/* <RouteDrawer BikeRoute={markerObj} Loading={loading} toggleLoad={handleLoading}/> */}
        <RouteDrawerOSRM BikeRoute={markerObj} userId={userId} />
      </Drawer>
    </div>
  );
}
