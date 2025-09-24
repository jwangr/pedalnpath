import { Box } from "@mui/material";
import AuthorReviewsEach from "./AuthorReviewsEach";

export default function AuthorReviewsContainer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "baseline",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <AuthorReviewsEach />
    </Box>
  );
}
