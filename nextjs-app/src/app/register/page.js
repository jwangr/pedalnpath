'use client';

import { useRouter } from 'next/navigation'
import { Button, Stack, TextField } from '@mui/material';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    const confirmpassword = formData.get('confirmpassword')

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, confirmpassword }),
    })

    if (response.ok) {
      router.push('/home') // add endpoint [id] for user
    } else {
      // Handle errors
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} margin={5}>
        <TextField type="email" name="email" label="Email" variant="outlined" placeholder="Email" required />
        <TextField type="password" name="password" label="Password" variant="outlined" placeholder="Password" required />
        <TextField type="password" name="confirmpassword" label="Confirm Password" variant="outlined" placeholder="Confirm Password" required />
        <Button type="submit">Login</Button>
      </Stack>

    </form>
  )
}