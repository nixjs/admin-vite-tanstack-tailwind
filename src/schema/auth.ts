import * as z from 'zod'

export const LoginSchema = z.object({
  username: z.string().min(1, { message: 'Please enter your username' }),
  password: z.string().min(1, {
    message: 'Please enter your password',
  }),
})
