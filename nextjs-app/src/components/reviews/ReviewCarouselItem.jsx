"use client";

import {
  Avatar,
  Box,
  CardContent,
  Divider,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";
import CarouselCaption from "react-bootstrap/CarouselCaption";
import CarouselItem from "react-bootstrap/CarouselItem";
import PathsItem from "../PathsItem";
import { deepPurple } from "@mui/material/colors";

export default function ReviewCarouselItem({ review }) {
  return (
    <CarouselItem>
      <Box
        width={"100%"}
        height={300}
        bgcolor={"grey"}
        display={"flex"}
        padding={2}
        // borderRadius={"16px"}
      >
        <CardContent sx={{ pr: 2 }}>
          <Box mb={1}>
            <Box
              component="h3"
              sx={{
                fontSize: 17,
                fontWeight: "bold",
                letterSpacing: "0.5px",
                marginBottom: 0,
                marginRight: 1.5,
                display: "flex",
              }}
            >
              <Avatar sx={{ bgcolor: deepPurple[300] }}>
                {review.user?.email.slice(0, 1).toUpperCase()}
              </Avatar>
              {review.user?.email} left a review.
            </Box>
            {review.score && (
              <Rating
                name={"rating"}
                value={review.score}
                size={"small"}
                sx={{ verticalAlign: "text-top" }}
              />
            )}
          </Box>
        </CardContent>
        {review.comment && (
          <Box
            component="p"
            sx={{ fontSize: 14, color: "grey.500", mb: "1.275rem" }}
          >
            {review.comment}
          </Box>
        )}

        <PathsItem
          path={review.bikepath}
          userId={review.userId}
          displayUserPathsToggle={true}
          displayMap={false}
        />
      </Box>

      <CarouselCaption>
        <h3>Hello there, first slide</h3>
        <p>Or is it</p>
      </CarouselCaption>
    </CarouselItem>
  );
}
