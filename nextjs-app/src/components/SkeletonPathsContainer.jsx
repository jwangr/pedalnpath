import { Box, Card, Grid, Skeleton } from "@mui/material";

export default function SkeletonPathsContainer() {
  const generic = [1, 2, 3, 4, 5, 6];
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      {generic.map((element) => (
        <Card
          key={element}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: 3,
          }}
        >
          <Skeleton
            variant="rounded"
            animation="wave"
            width={210}
            height={180}
          />
          <Box sx={{ width: "100%", padding: 3 }}>
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "3rem" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
          </Box>
        </Card>
      ))}
    </Grid>
  );
}
