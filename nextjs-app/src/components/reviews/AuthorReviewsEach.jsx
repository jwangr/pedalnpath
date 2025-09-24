import { Avatar, Box, Divider, Rating, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const example = {
  id: 1,
  score: 5,
  comment: "Not bad, doable",
  userId: 4,
  bikepathId: 19,
  createdAt: "2025-09-23T23:23:24.420Z",
  user: { id: 4, email: "hulu@example.com" },
};

export default function AuthorReviewsEach({ review = example }) {
  const d = new Date(review.createdAt);

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
        <Rating name="half-rating-read" defaultValue={review.score} precision={0.5} readOnly />
      </Typography>
      <Typography variant="body1" gutterBottom>
        {review.comment ? review.comment : null}
      </Typography>
      <Divider sx={{ borderColor: "grey.400", width: "100%" }} />
    </>
  );
}
