"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { Alert, Chip, Link, Stack, TextField } from "@mui/material";
import { DirectionsBikeOutlined, RestartAlt, Save } from "@mui/icons-material";
import { useCreateBikePathMutation } from "@/services/bikePaths";
import Loading from "./loadingBikes/Loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: "70vh",
  overflowY: "scroll",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "10px",
  scrollbarWidth: "thin",
  overflowX: "hidden"
};

export default function SaveNewNavigateModal({ path }) {
  // Open modal toggle
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Input fields
  const [title, setTitle] = useState(path.title);
  const [suitableFor, setSuitableFor] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [trackType, setTrackType] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [notes, setNotes] = useState("");
  const [chipsSuitable, setChipsSuitable] = useState([]);
  const [chipsHighlights, setChipsHighlights] = useState([]);
  const clearFields = () => {
    setTitle(path.title);
    setDescription("");
    setDifficulty("");
    setSuitableFor([]);
    setHighlights([]);
    setTrackType("");
    setNotes("");
    setChipsHighlights([]);
    setChipsSuitable([]);
  };

  const handleKeyDown = (e, type) => {
    if (
      (e.key === "Enter" || e.key === ",") &&
      (suitableFor.trim() || highlights.trim())
    ) {
      e.preventDefault(); // prevent new line in textfield
      if (type === "suitable") {
        if (!chipsSuitable.includes(suitableFor.trim())) {
          setChipsSuitable([...chipsSuitable, suitableFor.trim()]);
        }
        setSuitableFor("");
      } else if (type === "highlights") {
        if (!chipsHighlights.includes(highlights.trim())) {
          setChipsHighlights([...chipsHighlights, highlights.trim()]);
        }
        setHighlights("");
      }
    }
  };

  const handleDelete = (chipToDelete, type) => {
    if (type === "suitable") {
      setChipsSuitable(chipsSuitable.filter((chip) => chip !== chipToDelete));
    } else if (type === "highlights") {
      setChipsHighlights(
        chipsHighlights.filter((chip) => chip !== chipToDelete)
      );
    }
  };

  const [savePath, { data, isLoading, isError, isSuccess, error: OSRMError }] =
    useCreateBikePathMutation();

  const handleSubmit = () => {
    savePath({
      ...path,
      highlights: chipsHighlights,
      suitableFor: chipsSuitable,
      trackType,
      notes,
      description,
      difficulty,
    })
      .unwrap()
      .then((response) => {
        console.log(JSON.stringify(response));
        clearFields();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {isSuccess && (
        <Alert severity="success">
          New path successfully saved.
          <Link href={`/path/${encodeURI(path.title)}`}>
            Click here to view
          </Link>
        </Alert>
      )}
      {isError && (
        <Alert severity="error">Error saving new path. Try again later.</Alert>
      )}
      {isLoading && <Loading />}
      <Button
        onClick={handleOpen}
        color="secondary"
        variant="outlined"
        startIcon={<Save color="secondary" />}
      >
        Save
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component={"div"}>
            Create New Path
          </Typography>
          <Stack direction={"column"} spacing={2} width={"inherit"} padding={2}>
            <TextField
              label="Title"
              name="title"
              variant="filled"
              color="secondary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Description"
              name="description"
              variant="filled"
              color="secondary"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              label="Difficulty"
              name="difficulty"
              variant="filled"
              color="secondary"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            />

            <TextField
              label="Suitable For"
              name="suitableFor"
              variant="filled"
              color="secondary"
              placeholder="Suitable For (press <Enter> or < , > to add)"
              value={suitableFor}
              onChange={(e) => setSuitableFor(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "suitable")}
            />

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {chipsSuitable.map((chip, index) => (
                <Chip
                  key={index}
                  label={chip}
                  onDelete={() => handleDelete(chip, "suitable")}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>

            <TextField
              label="Highlights"
              name="highlights"
              variant="filled"
              color="secondary"
              placeholder="Highlights (press <Enter> or < , > to add)"
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "highlights")}
            />

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {chipsHighlights.map((chip, index) => (
                <Chip
                  key={index}
                  label={chip}
                  onDelete={() => handleDelete(chip, "highlights")}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>

            <TextField
              label="Track Type"
              name="trackType"
              variant="filled"
              color="secondary"
              placeholder="E.g. gravel, dirt road"
              value={trackType}
              onChange={(e) => setTrackType(e.target.value)}
            />
            <TextField
              label="Notes"
              name="notes"
              variant="filled"
              color="secondary"
              placeholder="Any other notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            {/* Save and submit button */}
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Button
                variant="outlined"
                color="warning"
                startIcon={<RestartAlt />}
                onClick={clearFields}
              >
                Reset
              </Button>

              <Button
                variant="contained"
                color="secondary"
                startIcon={<DirectionsBikeOutlined />}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
