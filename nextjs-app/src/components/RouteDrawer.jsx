import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

import WishlistSwitch from "./WishlistSwitch";

export default function RouteDrawer({ BikeRoute, Loading, toggleLoad }) {
  return (
    <Box sx={{ width: "50vw" }} className="p-3 " role="presentation">
      {/* Summary Card */}
      <Card
        sx={{
          borderRadius: "12px",
          // minWidth: 256,
          textAlign: "center",
          boxShadow:
            "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
        }}
      >
        <CardContent>
          {/* Title */}
          <Box
            component="h3"
            sx={{
              fontSize: 24,
              fontWeight: "bold",
              letterSpacing: "0.5px",
              marginTop: 1,
              marginBottom: 1,
            }}
          >
            {BikeRoute.title}
          </Box>
        </CardContent>
        <CardContent>
          <WishlistSwitch
            bikeRoute={BikeRoute}
            Loading={Loading}
            toggleLoad={toggleLoad}
          />
        </CardContent>
        <Divider />

        {/* Overall Rating and Comments */}
        <Box display={"flex"}>
          <Box
            p={2}
            flex={"1"}
            sx={{
              position: "relative",
              "&:not(:last-of-type)": {
                "&:after": {
                  content: '" "',
                  display: "block",
                  position: "absolute",
                  height: "50%",
                  width: "1px",
                  backgroundColor: "rgba(0 0 0 / 0.08)",
                  top: "50%",
                  right: 0,
                  transform: "translateY(-50%)",
                },
              },
            }}
          >
            <Box
              sx={{
                fontSize: 12,
                color: "grey.500",
                fontWeight: 500,
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                margin: 0,
              }}
            >
              Rating
            </Box>
            <Box
              component="p"
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 0.5,
                letterSpacing: "1px",
              }}
            >
              ⭐⭐⭐
            </Box>
          </Box>
          <Box
            p={2}
            flex={"1"}
            sx={{
              position: "relative",
              "&:not(:last-of-type)": {
                "&:after": {
                  content: '" "',
                  display: "block",
                  position: "absolute",
                  height: "50%",
                  width: "1px",
                  backgroundColor: "rgba(0 0 0 / 0.08)",
                  top: "50%",
                  right: 0,
                  transform: "translateY(-50%)",
                },
              },
            }}
          >
            <Box
              sx={{
                fontSize: 12,
                color: "grey.500",
                fontWeight: 500,
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                margin: 0,
              }}
            >
              Comments
            </Box>
            <Box
              component="p"
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 0.5,
                letterSpacing: "1px",
              }}
            >
              12
            </Box>
          </Box>
        </Box>
        <Divider light />

        {/* Distance and duration */}
        <Box display={"flex"}>
          <Box
            p={2}
            flex={"1"}
            sx={{
              position: "relative",
              "&:not(:last-of-type)": {
                "&:after": {
                  content: '" "',
                  display: "block",
                  position: "absolute",
                  height: "50%",
                  width: "1px",
                  backgroundColor: "rgba(0 0 0 / 0.08)",
                  top: "50%",
                  right: 0,
                  transform: "translateY(-50%)",
                },
              },
            }}
          >
            <Box
              sx={{
                fontSize: 12,
                color: "grey.500",
                fontWeight: 500,
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                margin: 0,
              }}
            >
              Distance
            </Box>
            <Box
              component="p"
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 0.5,
                letterSpacing: "1px",
              }}
            >
              {BikeRoute.distanceKm} km
            </Box>
          </Box>
          <Box
            p={2}
            flex={"1"}
            sx={{
              position: "relative",
              "&:not(:last-of-type)": {
                "&:after": {
                  content: '" "',
                  display: "block",
                  position: "absolute",
                  height: "50%",
                  width: "1px",
                  backgroundColor: "rgba(0 0 0 / 0.08)",
                  top: "50%",
                  right: 0,
                  transform: "translateY(-50%)",
                },
              },
            }}
          >
            <Box
              sx={{
                fontSize: 12,
                color: "grey.500",
                fontWeight: 500,
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                margin: 0,
              }}
            >
              Duration
            </Box>
            <Box
              component="p"
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 0.5,
                letterSpacing: "1px",
              }}
            >
              {BikeRoute.duration || "--"}
            </Box>
          </Box>
        </Box>
        <Divider light />

        {/* Difficulty and suitable for */}
        <Box display={"flex"}>
          <Box
            p={2}
            flex={"1"}
            sx={{
              position: "relative",
              "&:not(:last-of-type)": {
                "&:after": {
                  content: '" "',
                  display: "block",
                  position: "absolute",
                  height: "50%",
                  width: "1px",
                  backgroundColor: "rgba(0 0 0 / 0.08)",
                  top: "50%",
                  right: 0,
                  transform: "translateY(-50%)",
                },
              },
            }}
          >
            <Box
              sx={{
                fontSize: 12,
                color: "grey.500",
                fontWeight: 500,
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                margin: 0,
              }}
            >
              Difficulty
            </Box>
            <Box
              component="p"
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 0.5,
                letterSpacing: "1px",
              }}
            >
              {BikeRoute.difficulty}
            </Box>
          </Box>
          <Box
            p={2}
            flex={"1"}
            sx={{
              position: "relative",
              "&:not(:last-of-type)": {
                "&:after": {
                  content: '" "',
                  display: "block",
                  position: "absolute",
                  height: "50%",
                  width: "1px",
                  backgroundColor: "rgba(0 0 0 / 0.08)",
                  top: "50%",
                  right: 0,
                  transform: "translateY(-50%)",
                },
              },
            }}
          >
            <Box
              sx={{
                fontSize: 12,
                color: "grey.500",
                fontWeight: 500,
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                margin: 0,
              }}
            >
              Suitable for
            </Box>
            <Box
              component="p"
              sx={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 0.5,
                letterSpacing: "1px",
              }}
            >
              {BikeRoute.suitableFor?.join(", ") || "Anyone"}
            </Box>
          </Box>
        </Box>
        <Divider light />
      </Card>

      {/* Highlights Card */}
      <Card
        sx={{
          borderRadius: "12px",
          //   minWidth: 256,
          textAlign: "center",
          boxShadow:
            "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
          marginTop: 1,
          marginBottom: 1,
        }}
      >
        <CardContent>
          {/* Description */}
          <Box
            component="h4"
            sx={{
              fontSize: 18,
              fontWeight: "bold",
              letterSpacing: "0.5px",
              marginTop: 1,
              marginBottom: 1,
            }}
          >
            Highlights
            <Box
              sx={{
                fontSize: 18,
                fontWeight: 500,
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                margin: 0,
              }}
            >
              {BikeRoute.highlights?.join(", ") || "To be explored!"}
            </Box>
          </Box>
        </CardContent>
        <Divider />
      </Card>

      {/* Description Card */}
      <Card
        sx={{
          borderRadius: "12px",
          //   minWidth: 256,
          textAlign: "center",
          boxShadow:
            "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
          marginTop: 1,
          marginBottom: 1,
        }}
      >
        <CardContent>
          {/* Description */}
          <Box
            component="h4"
            sx={{
              fontSize: 18,
              fontWeight: "bold",
              letterSpacing: "0.5px",
              marginTop: 1,
              marginBottom: 1,
            }}
          >
            About
            <Box
              sx={{
                fontSize: 18,
                fontWeight: 500,
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                margin: 0,
                textAlign: "left",
              }}
            >
              {BikeRoute.description}
            </Box>
            <Box
              sx={{
                fontSize: 18,
                fontWeight: 500,
                textAlign: "left",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                margin: 0,
              }}
            >
              {BikeRoute.notes ? BikeRoute.notes : "Enjoy the trip"}
            </Box>
          </Box>
        </CardContent>
        <Divider />
      </Card>

      {/* Reviews Card */}
      <Card
        sx={{
          borderRadius: "12px",
          //   minWidth: 256,
          textAlign: "center",
          boxShadow:
            "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
          marginTop: 1,
          marginBottom: 1,
        }}
      >
        <CardContent>
          <Box
            component="h4"
            sx={{
              fontSize: 18,
              fontWeight: "bold",
              letterSpacing: "0.5px",
              marginTop: 1,
              marginBottom: 1,
            }}
          >
            Reviews
            <Box
              sx={{
                fontSize: 18,
                fontWeight: 500,
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                margin: 0,
              }}
            >
              Be the first to review!
            </Box>
          </Box>
        </CardContent>
        <Divider />
      </Card>
    </Box>
  );
}
