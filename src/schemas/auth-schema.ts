import { z } from "zod"

export const signupSchema = z.object({
  csrfToken: z.string(),
  email: z.string().email().min(2).max(50),
  username: z.string().min(2),
  displayName: z.string(),
  password: z.string().min(6)
})