"use client";

import { StarOutline } from "@mui/icons-material";
import {
  Box,
  Grid,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ReviewModal from "./reviews/ReviewModal";
import AuthorReviewsContainer from "./reviews/AuthorReviewsContainer";
import OverallCount from "./reviews/OverallCount";
import { useGetUserQuery } from "@/services/Auth";
import { useEffect, useState } from "react";
import { useGetUserPathsQuery } from "@/services/userPaths";
import ToggleCompleted from "./ToggleCompleted";
import UserPathsToggle from "./UserPathsToggle";

const cardData = [
  {
    img: "https://picsum.photos/800/450?random=1",
    tag: "Engineering",
    title: "Revolutionizing software development with cutting-edge tools",
    description:
      "Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.",
    authors: [
      { name: "Remy Sharp", avatar: "/static/images/avatar/1.jpg" },
      { name: "Travis Howard", avatar: "/static/images/avatar/2.jpg" },
    ],
  },
  {
    img: "https://picsum.photos/800/450?random=2",
    tag: "Product",
    title: "Innovative product features that drive success",
    description:
      "Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.",
    authors: [{ name: "Erica Johns", avatar: "/static/images/avatar/6.jpg" }],
  },
  {
    img: "https://picsum.photos/800/450?random=3",
    tag: "Design",
    title: "Designing for the future: trends and insights",
    description:
      "Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.",
    authors: [{ name: "Kate Morrison", avatar: "/static/images/avatar/7.jpg" }],
  },
  {
    img: "https://picsum.photos/800/450?random=4",
    tag: "Company",
    title: "Our company's journey: milestones and achievements",
    description:
      "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
    authors: [{ name: "Cindy Baker", avatar: "/static/images/avatar/3.jpg" }],
  },
  {
    img: "https://picsum.photos/800/450?random=45",
    tag: "Engineering",
    title: "Pioneering sustainable engineering solutions",
    description:
      "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
    authors: [
      { name: "Agnes Walker", avatar: "/static/images/avatar/4.jpg" },
      { name: "Trevor Henderson", avatar: "/static/images/avatar/5.jpg" },
    ],
  },
  {
    img: "https://picsum.photos/800/450?random=6",
    tag: "Product",
    title: "Maximizing efficiency with our latest product updates",
    description:
      "Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.",
    authors: [{ name: "Travis Howard", avatar: "/static/images/avatar/2.jpg" }],
  },
];

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

const examplePath = {
  id: 19,
  title: "Otago Central Rail Trail",
  description:
    "Iconic multi-day ride through Central Otago's stunning landscapes, following a former railway line.",
  difficulty: "Easy to Moderate",
  distanceKm: 152,
  duration: "4-5 days (flexible)",
  startLat: -45.2418,
  startLng: 170.1281,
  endLat: -45.0797,
  endLng: 169.3378,
  notes: null,
  trackType: null,
  highlights: [
    "Spectacular scenery",
    "Historical railway heritage",
    "Charming towns and villages",
  ],
  coordinates: [
    [-45.2418, 170.1281],
    [-45.2345, 170.1122],
    [-45.2211, 170.0987],
    [-45.0797, 169.3378],
  ],
  suitableFor: ["Families", "Beginners", "Experienced cyclists"],
};

export default function MainContent({ path = examplePath, loading = true }) {
  const [loadingToggled, setLoadingToggled] = useState(false);
  const toggleLoad = (status) => {
    setLoadingToggled(status);
  };
  const {
    data: userData,
    error: userError,
    isLoading: loadingUser,
  } = useGetUserQuery();
  useEffect(() => {
    if (userData) {
      console.log(userData);
    }
  }, [userData]);

  const {
    data: userPaths,
    error: userPathsError,
    isSuccess,
  } = useGetUserPathsQuery(
    {
      id: userData?.id,
    },
    { skip: !userData?.id } // only run when userData.id exists
  );

  const DisplayToggle = () => {
    // ensure data is loaded first

    if (userPaths && userData) {
      const matching = (element) => element.bikepathId === path.id;
      const found = userPaths.find(matching);
      console.log(found);

      return found ? (
        <ToggleCompleted
          bikeRoute={found}
          userId={userData.id}
          Loading={loadingToggled}
          toggleLoad={toggleLoad}
        />
      ) : (
        <UserPathsToggle bikeRoute={path} userId={userData.id} />
      );
    }

    return null;
  };

  return (
    <SyledCard variant="outlined" tabIndex={0}>
      {loading ? (
        <Skeleton
          animation="wave"
          width={"100%"}
          sx={{
            aspectRatio: 16 / 9,
            transform: "scale(1)",
            maxHeight: "50vh",
          }}
        />
      ) : (
        <CardMedia
          component="img"
          alt="green iguana"
          image={cardData[0].img}
          sx={{
            aspectRatio: "16 / 9",
            maxHeight: "50vh",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />
      )}

      {/* Title and Description */}
      <SyledCardContent>
        <Grid
          container
          spacing={2}
          sx={{
            alignItems: "stretch",
          }}
        >
          {loadingToggled && (
            <LinearProgress color="secondary" sx={{ width: "100%" }} />
          )}

          <Grid item size={{ xs: 12, md: 9 }}>
            <Typography gutterBottom variant="h3" component="div">
              {loading ? <Skeleton animation="wave" /> : path.title}
            </Typography>
          </Grid>
          <Grid item size={{ xs: 12, md: 3 }}>
            {isSuccess && <DisplayToggle />}
          </Grid>
        </Grid>

        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
          {loading ? <Skeleton animation="wave" /> : path.description}
        </StyledTypography>
      </SyledCardContent>

      <Grid
        container
        spacing={2}
        sx={{
          alignItems: "stretch",
          marginBottom: 3,
        }}
      >
        {/* General stats */}
        <Grid size={{ xs: 12, md: 6 }}>
          {loading ? (
            <Skeleton
              animation="wave"
              width={"98%"}
              sx={{
                aspectRatio: 16 / 9,
                maxHeight: "50vh",
                transform: "scale(1)",
                margin: "auto",
              }}
            />
          ) : (
            <Card
              sx={{
                width: "98%",
                margin: "auto",
                padding: 2,
                backgroundColor: "#fbf4ff",
                height: "100%",
              }}
            >
              <Grid container spacing={1}>
                <Grid size={{ xs: 6 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    Distance
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {path.distanceKm} km
                  </StyledTypography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    Duration
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {path.duration}
                  </StyledTypography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    Difficulty
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {path.difficulty}
                  </StyledTypography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    Suitable For
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {path.suitableFor?.join(", ") || "Not specified"}
                  </StyledTypography>
                </Grid>
              </Grid>
            </Card>
          )}
        </Grid>

        {/* Highlights */}
        <Grid size={{ xs: 12, md: 6 }}>
          {loading ? (
            <Skeleton
              animation="wave"
              width={"98%"}
              sx={{
                aspectRatio: 16 / 9,
                maxHeight: "50vh",
                transform: "scale(1)",
                margin: "auto",
              }}
            />
          ) : (
            <Card
              sx={{
                width: "98%",
                margin: "auto",
                padding: 2,
                backgroundColor: "#fbf4ff",
                height: "100%",
              }}
            >
              <Typography gutterBottom variant="h6" component="div">
                Highlights
              </Typography>
              {path.highlights ? (
                <List>
                  {path.highlights.map((highlight) => (
                    <ListItem key={highlight}>
                      <ListItemIcon>
                        <StarOutline />
                      </ListItemIcon>

                      <ListItemText primary={highlight} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                "Not specified"
              )}
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Review Panel */}
      <SyledCard>
        {loading ? (
          <Skeleton
            animation="wave"
            width={"100%"}
            sx={{
              aspectRatio: 16 / 9,
              transform: "scale(1)",
              maxHeight: "50vh",
            }}
          />
        ) : (
          <SyledCardContent>
            <Typography gutterBottom variant="h3" component="div">
              Reviews
            </Typography>

            {/* Overall count */}
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <OverallCount bikepathId={path.id} />
            </Box>

            {/* Add a review */}
            {loadingUser ? (
              "Please wait while we load..."
            ) : userData ? (
              <Box sx={{ margin: "auto" }}>
                <ReviewModal path={path} userId={userData?.id} />
              </Box>
            ) : (
              <Box sx={{ margin: "auto" }}>
                <Link href="/login" underline="hover">
                  Please sign in to write reviews.
                </Link>
              </Box>
            )}

            {/* Reviews left by authors*/}
            <AuthorReviewsContainer bikePathId={path.id} />
          </SyledCardContent>
        )}
      </SyledCard>
    </SyledCard>
  );
}
