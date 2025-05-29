import { z } from "zod"

export const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Contain at least 1 characters" }).trim()
})
