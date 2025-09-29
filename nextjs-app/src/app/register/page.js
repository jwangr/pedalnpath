"use client";
import Alerts from "@/components/Alerts";
import { useRegisterUserMutation } from "@/services/Auth";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { redirect, useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [register, { data, isSuccess, isError, isLoading, error:registerError }] =
    useRegisterUserMutation();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmpassword = formData.get("confirmpassword");

    try {
      const response = await register({
        email,
        password,
        confirmpassword,
      }).unwrap();
      console.log(JSON.stringify(response));
      router.replace("/home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Stack spacing={2} marginX={10} marginTop={10}>
      <Typography variant="h2" component="div" sx={{ textAlign: "center" }}>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Alerts
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          successMsg="Successfully registered"
          errorMsg={registerError?.data}
        />
        <Stack spacing={2} width={"100%"}>
          <TextField
            autoFocus
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
          <TextField
            type="password"
            name="confirmpassword"
            label="Confirm Password"
            variant="outlined"
            placeholder="Confirm Password"
            required
          />
          <Button type="submit">Login</Button>
        </Stack>
      </form>
    </Stack>
  );
}
