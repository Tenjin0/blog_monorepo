import { z } from "zod"

export const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Contain at least 8 characters" }).trim()
})
