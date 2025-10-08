"use client";

import {
  Box,
  Button,
  CardContent,
  Paper,
  Rating,
  Stack,
  TextField,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import PathsItem from "../PathsItem";
import EditDeleteDropdown from "./EditDeleteDropdown";
import { Close, DirectionsBikeOutlined } from "@mui/icons-material";
import { useUpdateReviewMutation } from "@/services/reviews";
import Alerts from "../Alerts";

export default function ReviewsGalleryItem({ review }) {
  if (!review) return null;

  // States for editing function
  const [editingMode, setEditingMode] = useState(false);
  const [score, setScore] = useState();
  const [comment, setComment] = useState();

  // set score and comment when editing mode is changed
  useEffect(() => {
    if (editingMode) {
      setScore(review.score ?? 0);
      setComment(review.comment ?? "");
    } else {
      setScore();
      setComment("");
    }
  }, [editingMode]);

  const [editPost, { data, error, isLoading, isError, isSuccess }] =
    useUpdateReviewMutation();

  const handleEditingMode = () => {
    setEditingMode(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await editPost({
        bikepathId: review.bikepathId,
        review: {
          id: review.id,
          score,
          comment,
        },
      }).unwrap();
      console.log(response);
      setScore();
      setComment("");
      setEditingMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper height={"auto"} padding={2} elevation={3}>
      <Alerts
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        successMsg="Review updated. "
        errorMsg="Unable to update review. "
      />
      <CardContent sx={{ pr: 2, background: "#f8fbff" }}>
        <Stack
          direction={{ sm: "column", sm: "row" }}
          spacing={2}
          justifyContent={"space-between"}
        >
          <Box width={"100%"}>
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
              {editingMode ? (
                <Rating
                  name="hover-feedback"
                  sx={{ verticalAlign: "text-top" }}
                  size="medium"
                  value={score}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setScore(newValue);
                  }}
                  emptyIcon={
                    <StarIcon style={{ opacity: 1 }} fontSize="inherit" />
                  }
                />
              ) : (
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
            {editingMode ? (
              <TextField
                id="outlined-basic"
                label="Edit review"
                variant="outlined"
                color="secondary"
                placeholder="Write about your own experience doing this route."
                multiline
                minRows={3}
                sx={{ width: "100%", marginBottom: 2 }}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            ) : (
              <Box component="p" sx={{ fontSize: 14 }}>
                {review.comment}
              </Box>
            )}
          </Box>

          {/* Show dropdown when user is viewing comments, otherwise Edit button */}
          <Box>
            {editingMode ? (
              <Stack
                gap={3}
                justifyContent={"space-between"}
                justifyItems={"stretch"}
                direction={{
                  xs: "row-reverse",
                  sm: "column",
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DirectionsBikeOutlined />}
                  onClick={handleSubmit}
                  loading={isLoading}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="warning"
                  startIcon={<Close />}
                  loading={isLoading}
                  onClick={() => setEditingMode(false)}
                >
                  Cancel
                </Button>
              </Stack>
            ) : (
              <EditDeleteDropdown handleEditToggle={handleEditingMode} />
            )}
          </Box>
        </Stack>
      </CardContent>

      <Box
        sx={{
          marginBottom: 2,
          background: "#f8fbff",
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
