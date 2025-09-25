"use client";

import { useGetOverallStatsQuery } from "@/services/reviews";
import { CommentBank, StarOutline } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function OverallCount({ bikepathId, size }) {
  const {
    data: { count, rating } = {},
    isLoading,
    isError,
    isSuccess,
  } = useGetOverallStatsQuery(bikepathId);

  const [average, setAverage] = useState(0);

  useEffect(() => {
    if (rating) {
      const x = rating._avg.score;
      console.log(rating, count);
      if (typeof x === "number") {
        setAverage(x.toFixed(1));
      } else {
        setAverage("_");
      }
    }
  }, [rating]);

  if (isSuccess && count > 0) {
    if (size === "S") {
      return (
        <>
          <Grid item size={2}>
            <Typography gutterBottom variant="h6" component="div">
              {average || ``}
              <StarOutline />
            </Typography>
          </Grid>
          <Grid item size={2}>
            <Typography gutterBottom variant="h6" component="div">
              {count} <CommentBank />
            </Typography>
          </Grid>
        </>
      );
    }
    return (
      <>
        <Typography gutterBottom variant="h3" component="div">
          {average || ``} <StarOutline />
        </Typography>
        <Typography gutterBottom variant="h3" component="div">
          {count} <CommentBank />
        </Typography>
      </>
    );
  } else if (isSuccess && count == 0) {
    return (
      <Typography gutterBottom variant="body1" component="div">
        <em>No reviews</em>
      </Typography>
    );
  }

  return null;
}
