import { Grid, Skeleton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export default function PathPageMainContentsSkeleton() {
  return (
    <>
      <Skeleton
        width={"100vw"}
        height={"50vh"}
        sx={{ my: 0 }}
        animation="wave"
      />
      <SyledCardContent>
        <Typography gutterBottom variant="h3" component="div">
          <Skeleton animation="wave" sx={{ my: 1 }} />
        </Typography>
        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
          <Skeleton animation="wave" sx={{ my: 1 }} />
        </StyledTypography>
        <Grid
          container
          spacing={2}
          sx={{
            marginBottom: 1,
          }}
        >
          {/* General stats */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton
              width={"98%"}
              height={200}
              sx={{ my: 1 }}
              animation="wave"
            />
          </Grid>

          {/* Highlights */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton
              width={"98%"}
              height={200}
              animation="wave"
              sx={{ my: 1 }}
            />
          </Grid>
        </Grid>
        {/* Review Panel */}
        <Skeleton width={"100%"} height={500} animation="wave" sx={{ my: 1 }} />
      </SyledCardContent>
    </>
  );
}
