import { z } from "zod"

export const SignUpFormSchema = z.object({
  name: z.string().min(3, { message: "name must contain at least 3 characters "}).trim(),
  email: z.string().email(),
  password: z.string().min(8, { message: "Contain at least 8 characters" }).trim()
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter"})
    .regex(/[0-9]/, { message: "Contain at least one number"})
    // .regex(/^a-zA-Z0-9/, {message: "Contain at least one special character"})
})
