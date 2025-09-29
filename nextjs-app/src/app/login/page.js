"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Loading from "@/components/loadingBikes/Loading";
import { useState } from "react";
import { useLoginUserMutation } from "@/services/Auth";
import Alerts from "@/components/Alerts";

export default function LoginPage() {
  const router = useRouter();

  const [login, { data: loginData, isSuccess, isError, isLoading }] =
    useLoginUserMutation();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await login({ email, password }).unwrap();
      console.log(JSON.stringify(response));
      router.push(response.redirectTo);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Alerts
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        successMsg="Successfully logged in"
        errorMsg="Unable to log in."
      />
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
