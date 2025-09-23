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
import { DirectionsBikeOutlined } from "@mui/icons-material";

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

export default function ReviewModal({ path = "haha" }) {
  // Open modal toggle
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Rating Scale
  const [value, setValue] = useState(3);
  const [hover, setHover] = useState(-1);

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
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
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
          />

          {/* Save and submit button */}
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DirectionsBikeOutlined />}
          >
            Post
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
