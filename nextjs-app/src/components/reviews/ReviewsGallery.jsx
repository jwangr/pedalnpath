"use client";

import { useGetAllReviewsQuery } from "@/services/reviews";
import {
  Box,
  CardContent,
  Divider,
  Paper,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import CarouselCaption from "react-bootstrap/CarouselCaption";
import CarouselItem from "react-bootstrap/CarouselItem";
import PathsItem from "../PathsItem";
import { deepPurple } from "@mui/material/colors";

export default function ReviewsGallery() {
  const { data, error, isError, isLoading, isSuccess } =
    useGetAllReviewsQuery(10);

  return (
    <Box
      sx={{
        margin: 2,
      }}
    >
      <Typography variant="h3" component={"div"} gutterBottom>
        Community Reviews
      </Typography>

      <Box
        sx={{
          margin: "auto",
          marginTop: 2,
          maxWidth: "1080px",
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

        {isSuccess && (
          <Carousel data-bs-theme="dark" controls={false} pause={"hover"}>
            {data?.response?.map((review) => (
              <CarouselItem key={review.id}>
                <Paper height={"auto"} padding={2} elevation={3}>
                  <CardContent sx={{ pr: 2, background: deepPurple[100] }}>
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
                    <Box component="p" sx={{ fontSize: 14 }}>
                      {review.comment}
                    </Box>
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
              </CarouselItem>
            ))}
          </Carousel>
        )}
      </Box>
    </Box>
  );
}
