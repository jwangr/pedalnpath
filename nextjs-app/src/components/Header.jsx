"use client";

import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { usePathname, useRouter } from "next/navigation";
import {
  Alert,
  Avatar,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Slide,
  Snackbar,
  Tooltip,
} from "@mui/material";
import {
  ExitToAppOutlined,
  HomeOutlined,
  NavigationOutlined,
  Person2Outlined,
  TravelExploreOutlined,
} from "@mui/icons-material";
import { useLogoutUserMutation } from "@/services/Auth";
import Loading from "./loadingBikes/Loading";
import { deepPurple } from "@mui/material/colors";
import Alerts from "./Alerts";

const drawerWidth = 240;
const navItems = ["Home", "Explore", "Navigate"];
const navItemsIcon = [
  <HomeOutlined sx={{ color: "white" }} />,
  <TravelExploreOutlined sx={{ color: "white" }} />,
  <NavigationOutlined sx={{ color: "white" }} />,
  <Person2Outlined sx={{ color: "white" }} />,
  <ExitToAppOutlined sx={{ color: "white" }} />,
];

export default function Header(props) {
  const { window } = props;
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [logout, { data, isSuccess, isError, isLoading }] =
    useLogoutUserMutation();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      console.log("Logged out");
    } catch (error) {
      console.log("Not logged out");
    }
  };

  React.useEffect(() => {
    if (isSuccess && data) {
      router.replace("/login");
      router.refresh();
    }
  }, [isSuccess, data]);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ my: 2 }} gutterBottom>
        Pedal N' Path
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemIcon>{navItemsIcon[index]}</ListItemIcon>
              <ListItemText>
                <Link
                  color="white"
                  underline="none"
                  href={`/${item.toLowerCase()}`}
                >
                  {item}
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ color: "white" }} />
      <List>
        {props.session?.email ? (
          <>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{navItemsIcon[3]}</ListItemIcon>
                <ListItemText>
                  <Link href={`/profile`} color="white" underline="none">
                    Profile
                  </Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>{navItemsIcon[3]}</ListItemIcon>
                <ListItemText>Log Out</ListItemText>
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{navItemsIcon[4]}</ListItemIcon>
              <ListItemText>
                <Link href={`/login`}>Log In</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const userDropdown = (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Expand user">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar sx={{ bgcolor: deepPurple[300] }}>
            {props?.session?.email.slice(0, 1).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography sx={{ textAlign: "center" }}>
            <Link href={`/profile`} color="black" underline="none">
              Profile
            </Link>
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            handleLogout();
          }}
        >
          <Typography sx={{ textAlign: "center" }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );

  const logIn = (
    <Button sx={{ color: "#fff" }}>
      <Link color="white" underline="none" href={`/login`}>
        Login
      </Link>
    </Button>
  );

  const container =
    typeof window !== "undefined" ? () => window.document.body : undefined;

  const pathname = usePathname();

  return (
    <>
      <Alerts
        isLoading={isLoading}
        isSuccess={isSuccess}
        successMsg="Succesfully logged out."
        isError={isError}
        errorMsg="Unable to log out."
      />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{
            background: "linear-gradient(90deg, #261f86ff, #fa94b9ff)",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            {/* App Title */}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <Link href={`/home`} color="white" underline="none">
                Pedal N' Path
              </Link>
            </Typography>

            {/* Page Name */}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              🚴‍♂️ {decodeURI(pathname)?.toUpperCase().slice(1)}
            </Typography>

            {/* Page Links */}
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: "#fff", marginX: 2 }}>
                  <Link
                    color="white"
                    underline="none"
                    href={`/${item.toLowerCase()}`}
                  >
                    {item}
                  </Link>
                </Button>
              ))}
              {!props.session?.email && logIn}
            </Box>

            {/* Profile dropdown */}
            {props.session?.email && userDropdown}
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                background: "linear-gradient(#261f86ff, #fa94b9ff)",
                color: "rgb(255, 255, 255)",
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </>
  );
}
