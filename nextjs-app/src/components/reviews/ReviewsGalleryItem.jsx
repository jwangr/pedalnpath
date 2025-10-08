"use client";

import {
  Box,
  Button,
  CardContent,
  Paper,
  Rating,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { deepPurple } from "@mui/material/colors";
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

  // check how often it remounts
  useEffect(() => {
    console.log("ReviewsGalleryItem mounted", review.id);
  }, []);

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

  const Rating_View = () => (
    <Rating
      name={"rating"}
      value={review.score}
      size={"medium"}
      sx={{ verticalAlign: "text-top" }}
      readOnly
    />
  );

  const Rating_Edit = () => {
    return (
      <>
        <Rating
          name="hover-feedback"
          sx={{ verticalAlign: "text-top" }}
          size="medium"
          value={score}
          precision={0.5}
          onChange={(event, newValue) => {
            setScore(newValue);
          }}
          emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
        />
      </>
    );
  };

  const Comment_View = () => {
    return (
      <Box component="p" sx={{ fontSize: 14 }}>
        {review.comment}
      </Box>
    );
  };

  const Comment_Edit = () => {
    return (
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
    );
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
      <CardContent sx={{ pr: 2, background: deepPurple[100] }}>
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
              {editingMode ? <Rating_Edit /> : <Rating_View />}
            </Box>
            <Box component="p" sx={{ fontSize: 10, textEmphasis: "italics" }}>
              {new Date(review.createdAt).toLocaleString()}
            </Box>
            {editingMode ? <Comment_Edit /> : <Comment_View />}
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
