"use client";

import { useGetAllReviewsQuery } from "@/services/reviews";
import { Height } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Drawer,
  Paper,
  Rating,
  Skeleton,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useState } from "react";
import PathsItem from "../PathsItem";
import ReviewsGalleryItem from "./ReviewsGalleryItem";
import Alerts from "../Alerts";

export default function ProfilePageReviewsContainer({
  user = { id: 4, email: "user@example.com" },
}) {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [toggleDropdown, setToggleDropDown] = useState();
  // fetch all reviews corresponding to userId
  const { data, isSuccess, isError, isLoading, error } = useGetAllReviewsQuery({
    userId: user.id,
  });

  // profile banner
  const CardProfile = () => {
    return (
      <Card
        sx={{
          borderRadius: "12px",
          maxWidth: "700px",
          marginX: "auto",
          marginY: 2,
          textAlign: "center",
          boxShadow:
            "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
        }}
      >
        <CardContent>
          <Avatar sx={{ bgcolor: deepPurple[300], margin: "auto" }}>
            {user.email.slice(0, 1).toUpperCase()}
          </Avatar>
          <Box
            component="h3"
            sx={{
              fontSize: 18,
              fontWeight: "bold",
              letterSpacing: "0.5px",
              marginTop: 1,
              marginBottom: 2,
            }}
          >
            {user.email || "Who?"}
          </Box>
          <Divider sx={{ opacity: 0.6 }} />
          <Box
            sx={{
              fontSize: 12,
              color: "grey.500",
              fontWeight: 500,
              marginTop: 0.5,
            }}
          >
            Reviews
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
            {data?.response?.length || 0}
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <div>
    <Alerts 
    isLoading={isLoading}
    isSuccess={isSuccess}
    isError={isError}
    successMsg="Loaded all contributions"
    errorMsg="Unable to load contributions. "
    />
      <Button
        onClick={() => {
          setToggleDrawer(true);
        }}
        variant="text"
        color="secondary"
        size="large"
        sx={{
          width: "100%",
          marginTop: 3,
        }}
      >
        Your Contributions
      </Button>
      <Drawer
        anchor="bottom"
        open={toggleDrawer}
        onClose={() => {
          setToggleDrawer(false);
        }}
        slotProps={{
          paper: {
            sx: {
              // backgroundColor: deepPurple[400],
              background: `linear-gradient(180deg, #f4edff, #111534)`,
              overflowY: "scroll",
            },
          },
        }}
      >
        <CardProfile />
        <Box
          sx={{
            margin: "auto",
            width: "auto",
            height: "50vh",
            padding: 2,
          }}
        >
          {isLoading && (
            <Skeleton
              height={400}
              width={"100%"}
              animation="wave"
              variant="rounded"
            />
          )}
          {isSuccess &&
            !!data.response[0] &&
            data?.response?.map((review) => (
              <ReviewsGalleryItem review={review} key={review.id} />
            ))}
          {isSuccess && !data.response[0] && (
            <div className="text-white">No contributions yet.</div>
          )}
        </Box>
      </Drawer>
    </div>
  );
}
