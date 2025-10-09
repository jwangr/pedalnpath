"use client";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

import UserPathsToggle from "./UserPathsToggle";
import {
  useCreateBikePathMutation,
  useGetBikePathsQuery,
} from "@/services/bikePaths";
import { useEffect, useState } from "react";
import { Link, Typography } from "@mui/material";
import OverallCount from "./reviews/OverallCount";
import AuthorReviewsContainer from "./reviews/AuthorReviewsContainer";
import Alerts from "./Alerts";
import { deepPurple } from "@mui/material/colors";

export default function RouteDrawerOSRM({ BikeRoute, userId }) {
  const [storedPath, setStoredPath] = useState(null);

  // Search for BikeRoute in existing database
  const {
    data: getExistingPathData,
    error: getExistingPathError,
    isSuccess: getExistingPathIsSuccess,
    isError: getExistingPathIsError,
    isLoading: getExistingPathIsLoading,
    refetch: refetchBikePaths,
  } = useGetBikePathsQuery({
    title: BikeRoute.title,
  });

  const [
    createRoute,
    {
      data: newPath,
      error: newPathError,
      isSuccess: newPathIsSuccess,
      isError: newPathIsError,
      isLoading: newPathIsLoading,
    },
  ] = useCreateBikePathMutation(); // automatically causes UseGetPathsQuery to refetch

  // If route is not in database, add it to the global database.
  useEffect(() => {
    if (getExistingPathIsError && getExistingPathError.data?.message?.includes("Could not find paths")) {
      console.log(
        "Track not found in global database, creating route now." +
          JSON.stringify(BikeRoute)
      );
      createRoute({ ...BikeRoute })
        .unwrap()
        .then((response) => {
          console.log("fulfilled", JSON.stringify(response));
          setStoredPath({ ...response }); // set the stored path
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else if (getExistingPathData) {
      setStoredPath({ ...getExistingPathData });
    } else {
      setStoredPath(null);
    }
  }, [getExistingPathIsSuccess, getExistingPathIsError]);

  return (
    <Box sx={{ width: "50vw", backgroundColor: deepPurple[100] }} className="p-4" role="presentation">
      <Alerts
        isLoading={getExistingPathIsLoading || newPathIsLoading}
        isSuccess={getExistingPathIsSuccess || newPathIsSuccess}
        isError={newPathIsError}
        successMsg={
          (getExistingPathIsSuccess && getExistingPathData)
            ? "Path found in database already. "
            : newPathIsSuccess
            ? "Added new path to Pedal N' Path. "
            : ""
        }
        errorMsg={newPathIsError ? "Unable to create new path. " : null}
      />
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
            {storedPath?.title ? (
              <Link
                color="inherit"
                underline="hover"
                href={`/path/${encodeURIComponent(storedPath.title)}`}
              >
                {storedPath.title}
              </Link>
            ) : (
              BikeRoute.title
            )}
          </Box>
        </CardContent>
        <CardContent>
          {/* If added to existing paths database, then user can add / remove */}
          {storedPath?.id && userId && (
            <UserPathsToggle bikeRoute={storedPath} userId={userId} />
          )}
        </CardContent>
        <Divider />

        {/* Overall Rating and Comments */}
        {storedPath?.id ? (
          <>
            <Box
              display={"flex"}
              justifyContent={"space-evenly"}
              marginY={2}
              alignItems={"center"}
            >
              <OverallCount bikepathId={storedPath.id} />
            </Box>
            <Divider light />
          </>
        ) : (
          <Box width={"100%"} padding={2}>
            <Typography variant="subtitle1" component="div">
              Route is getting added to database. Please wait.
            </Typography>
          </Box>
        )}

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
              {storedPath?.distanceKm || BikeRoute.distanceKm} km
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
              {storedPath?.duration || BikeRoute.duration || "--"}
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
              {storedPath?.difficulty || BikeRoute.difficulty}
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
              {storedPath?.suitableFor?.join(", ") || BikeRoute.suitableFor?.join(", ") || "Anyone"}
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
              {storedPath?.highlights?.join(", ") || BikeRoute.highlights?.join(", ") || "To be explored!"}
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
              {storedPath?.description || BikeRoute.description}
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
              {storedPath?.notes || BikeRoute.notes || "Enjoy the trip"}
            </Box>
          </Box>
        </CardContent>
        <Divider />
      </Card>

      {/* Reviews Card */}
      {storedPath?.id && (
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
            {/* Reviews */}
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
              <AuthorReviewsContainer bikePathId={storedPath.id} />
            </Box>
          </CardContent>
          <Divider />
        </Card>
      )}
    </Box>
  );
}
