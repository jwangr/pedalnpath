import { useDeleteReviewMutation } from "@/services/reviews";
import { Create, Delete } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Rating,
  Slide,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useEffect, useState } from "react";
import EditModal from "./EditModal";

const example = {
  id: 1,
  score: 5,
  comment: "Not bad, doable",
  userId: 4,
  bikepathId: 19,
  createdAt: "2025-09-23T23:23:24.420Z",
  user: { id: 4, email: "hulu@example.com" },
};

export default function AuthorReviewsEach({ review = example, userId = null }) {
  const d = new Date(review.createdAt);

  const [
    deleteReview,
    {
      data: deleteData,
      error: deleteError,
      isLoading: deleteLoading,
      isError: deleteIsError,
    },
  ] = useDeleteReviewMutation();

  const handleDelete = (bikepathId, userId, reviewId) => {
    deleteReview({
      bikepathId,
      userId,
      reviewId,
    })
      .unwrap()
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EditDelete = () => {
    if (userId === review.userId) {
      return (
        <Stack
          direction="row"
          spacing={3}
          width={"inherit"}
          justifyContent={"end"}
        >
          <EditModal review={review} userId={userId} />
          <Button
            color="error"
            variant="outlined"
            startIcon={<Delete color="error" />}
            loading={deleteLoading}
            onClick={() => {
              handleDelete(review.bikepathId, userId, review.id);
            }}
          >
            Delete
          </Button>
        </Stack>
      );
    } else return null;
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: deepPurple[500] }}>
          {review.user.email.slice(0, 1).toUpperCase()}
        </Avatar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "baseline",
          }}
        >
          <Typography variant="h6" component="div">
            {review.user.email}
          </Typography>
          <Typography variant="caption">{d.toLocaleString()}</Typography>
        </Box>
      </Box>
      <Typography variant="h6" component="div">
        {/* {review.score}  */}
        <Rating
          name="half-rating-read"
          defaultValue={review.score}
          precision={0.5}
          readOnly
        />
      </Typography>
      <Typography variant="body1">
        {review.comment ? review.comment : null}
      </Typography>
      <EditDelete />
      <Divider sx={{ borderColor: "grey.400", width: "100%" }} />
    </>
  );
}
