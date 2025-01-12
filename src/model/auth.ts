import * as z from 'zod'
import { LoginSchema } from '@/schema/auth'

export interface Authorization {
  accessToken: string
  refreshToken: string
}

export interface User {
  id: string
}

export type LoginFormRequest = z.TypeOf<typeof LoginSchema>
