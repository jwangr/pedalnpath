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
  Stack,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useState } from "react";
import PathsItem from "../PathsItem";
import EditDeleteDropdown from "./EditDeleteDropdown";

export default function ReviewsGalleryItem({ review }) {
  if (!review) return null;
  return (
    <Paper height={"auto"} padding={2} elevation={3}>
      <CardContent sx={{ pr: 2, background: deepPurple[100] }}>
        <Stack
          direction={{ sm: "column", sm: "row" }}
          spacing={2}
          justifyContent={"space-between"}
        >
          <Box>
            <Box mb={0}>
              <Box
                component="h3"
                sx={{
                  fontSize: 17,
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                  marginRight: 1.5,
                  display: "inline-block",
                }}
              >
                {review.user?.email} left a review.
              </Box>
              {review.score && (
                <Rating
                  name={"rating"}
                  value={review.score}
                  size={"medium"}
                  sx={{ verticalAlign: "text-top" }}
                  readOnly
                />
              )}
            </Box>
            <Box component="p" sx={{ fontSize: 10, textEmphasis: "italics" }}>
              {new Date(review.createdAt).toLocaleString()}
            </Box>
            <Box component="p" sx={{ fontSize: 14 }}>
              {review.comment}
            </Box>
          </Box>

          <Box>
            <EditDeleteDropdown review={review} />
          </Box>
        </Stack>
      </CardContent>

      <Box
        sx={{
          marginBottom: 2,
          background: deepPurple[100],
          paddingX: 3,
          paddingBottom: 2,
        }}
      >
        <PathsItem
          path={review.bikepath}
          userId={review.userId}
          displayMap={false}
        />
      </Box>
    </Paper>
  );
}
