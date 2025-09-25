"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import { TextField } from "@mui/material";
import { DirectionsBikeOutlined, WindowSharp } from "@mui/icons-material";
import { useCreateReviewMutation } from "@/services/reviews";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "10px",
};

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function ReviewModal({ path, userId = 4 }) {
  // Open modal toggle
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Rating Scale
  const [score, setScore] = useState(3);
  const [hover, setHover] = useState(-1);

  // Contents
  const [comment, setComment] = useState("");

  const [createPost, { data, error, isLoading, isError }] =
    useCreateReviewMutation();

  const handleSubmit = async (event) => {
    // event.preventDefault();

    try {
      const response = await createPost({
        bikepathId: path.id,
        userId,
        score,
        comment,
      }).unwrap();
      console.log(response);

      // Close model and clear comment / score to default
      setOpen(false);
      setScore(3);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <CreateIcon />
        Write a review
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" component="div">
            {path.title || "Unknown title"}
          </Typography>

          {/* Star rating */}
          <Box
            sx={{
              width: 200,
              display: "flex",
              alignItems: "center",
              margin: 2,
            }}
          >
            <Rating
              name="hover-feedback"
              size="large"
              value={score}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setScore(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {score !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : score]}</Box>
            )}
          </Box>

          {/* Comment box */}
          <TextField
            id="outlined-basic"
            label="Write a review"
            variant="outlined"
            color="secondary"
            placeholder="Write about your own experience doing this route."
            multiline="true"
            minRows={3}
            sx={{ width: "100%", marginBottom: 2 }}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />

          {/* Save and submit button */}
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DirectionsBikeOutlined />}
            onClick={handleSubmit}
          >
            Post
          </Button>

          {/* {data && <div>Posted review: {data.comment}</div>} */}
          {/* {error && <div style={{ color: "red" }}>Something went wrong</div>} */}
        </Box>
      </Modal>
    </div>
  );
}
