import { z } from "zod"

export const CreateCommentSchema = z.object({
  content: z.string().min(1, {
    message: "must contain at least 1 character"
  }),
  postId: z.string().transform((val) => parseInt(val)).refine((val) => !isNaN(val))
})
