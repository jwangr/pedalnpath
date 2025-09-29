import React, { useEffect, useState } from "react";
import Loading from "./loadingBikes/Loading";
import { Alert, Slide, Snackbar } from "@mui/material";

// Alerts will be used with RTK queries.
export default function Alerts({
  isLoading,
  isSuccess,
  successMsg = "Successfully loaded.",
  isError,
  errorMsg = "Error.",
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!!isSuccess || !!isError) {
      setOpen(true);
    }
  }, [isSuccess, isError]);

  return (
    <>
      {isLoading && <Loading />}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        slots={{ transition: Slide }}
        sx={{ zIndex: 1500 }}
      >
        {isError ? (
          <Alert variant="filled" color="error">
            {errorMsg}
            {" Please try again later."}
          </Alert>
        ) : isSuccess ? (
          <Alert variant="filled" color="success">
            {successMsg}
          </Alert>
        ) : null}
      </Snackbar>
    </>
  );
}
