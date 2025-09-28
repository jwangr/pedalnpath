import { Card, Typography } from "@mui/material";
import AuthorReviewsEach from "./AuthorReviewsEach";
import { useGetReviewsQuery } from "@/services/reviews";
import ShakeLoading from "../loadingBikes/Shake";
import { useGetUserQuery } from "@/services/Auth";

export default function AuthorReviewsContainer({ bikePathId }) {
  const {
    data: reviews,
    error: reviewsFetchError,
    isLoading: reviewsIsLoading,
    isError: reviewsIsError,
  } = useGetReviewsQuery(bikePathId);

  const {
    data: userData,
    error: userError,
    isLoading: loadingUser,
  } = useGetUserQuery();

  if (reviewsIsLoading)
    return (
      <div>
        <p>Loading reviews...</p>
        <ShakeLoading />
      </div>
    );
  if (reviewsIsError)
    return <p>Error loading reviews: {reviewsFetchError.message}</p>;

  const NoReviews = () => (
    <Typography variant="body1" gutterBottom>
      No reviews yet. Be the first explorer!
    </Typography>
  );

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "baseline",
        justifyContent: "space-between",
        padding: "16px",
        width: "100%",
      }}
    >
      {reviews.length === 0 ? (
        <NoReviews />
      ) : (
        reviews.map((review) => (
          <AuthorReviewsEach review={review} key={review.id} userId={userData?.id || null} />
        ))
      )}
    </Card>
  );
}
