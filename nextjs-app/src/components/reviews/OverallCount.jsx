"use client";

import { useGetOverallStatsQuery } from "@/services/reviews";
import { CommentBank, StarOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function OverallCount({ bikepathId }) {
  const {
    data: { count, rating } = {},
    isLoading,
    isError,
  } = useGetOverallStatsQuery(bikepathId);

  const [average, setAverage] = useState(0);

  useEffect(() => {
    if (rating) {
      setAverage(parseInt(rating._avg.score).toFixed(1));
    }
  }, [rating]);

  return (
    <>
      <Typography gutterBottom variant="h3" component="div">
        {average || `_`} <StarOutline />
      </Typography>
      <Typography gutterBottom variant="h3" component="div">
        {count} <CommentBank />
      </Typography>
    </>
  );
}
