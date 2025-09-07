'use client';

import { useRouter } from 'next/navigation'
import { Button, Stack, TextField } from '@mui/material';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = response.json();

    console.log(response)
    console.log(data);

    if (response.ok) {
      console.log("Login successful")
      router.push('/profile') // add endpoint [id] for user
    } else {
      alert("Login failed")
    }
  }

  return (
    <Stack spacing={2} margin={5}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField type="email" name="email" label="Email" variant="outlined" placeholder="Email" required />
          <TextField type="password" name="password" label="Password" variant="outlined" placeholder="Password" required />
          <Button type="submit">Login</Button>

        </Stack>
      </form>
      <div>Not registered?
        <Link href={`/register`} className='bg-blue-200' > Sign Up Here</Link>
      </div></Stack>
  )
}