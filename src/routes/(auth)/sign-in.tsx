import * as z from 'zod'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { isTokenExpired } from '@/lib/jwt'
import SignIn from '@/features/auth/sign-in'

export const Route = createFileRoute('/(auth)/sign-in')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    const accessToken = context.auth.accessToken
    if (accessToken && !isTokenExpired(accessToken)) {
      throw redirect({ to: search.redirect || '/' })
    }
  },
  component: SignIn,
})
