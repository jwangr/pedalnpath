"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Loading from "@/components/loadingBikes/Loading";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = response.json();

    console.log(response);
    console.log(data);

    if (response.ok) {
      console.log("Login successful");
      router.push("/profile"); // add endpoint [id] for user
    } else {
      alert("Login failed");
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <Stack spacing={2} margin={10}>
        <Typography
          variant="h2"
          component="div"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              placeholder="Email"
              required
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              placeholder="Password"
              required
            />
            <Button color="secondary" variant="contained" type="submit">
              Login
            </Button>
          </Stack>
        </form>
        <Box
          sx={{
            width: "100%",
            margin: "auto",
            textAlign: "center",
          }}
        >
          <Typography variant="body1" component={"span"}>
            Not registered?
          </Typography>
          <span> </span>
          <Link href={`/register`} underline="hover">
            Sign Up Here
          </Link>
        </Box>
      </Stack>
    </>
  );
}
