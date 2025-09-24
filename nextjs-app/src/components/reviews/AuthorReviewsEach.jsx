import { Avatar, Box, Divider, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function AuthorReviewsEach() {
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
        <Avatar sx={{ bgcolor: deepPurple[500] }}>A</Avatar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "baseline",
          }}
        >
          <Typography variant="h6" component="div">
            Author's Name
          </Typography>
          <Typography variant="caption">Date time</Typography>
        </Box>
      </Box>
      <Box>Comments asdfkj;laksjdfjasjdfas;dfkj;lakjsdf</Box>
      <Divider />
    </>
  );
}
