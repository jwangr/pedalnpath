import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';

export default function TemporaryDrawer({markerObj}) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: "50vw" }} className="p-3 " role="presentation" onClick={toggleDrawer(false)}>
      <div>{markerObj.title || "Example"}</div>
      <div>{markerObj.distance || "100m"}</div>
      <div>{markerObj.waypoints || "No waypoints"}</div>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Expand</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
