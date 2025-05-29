import { z } from "zod"


export const PostFormSchema = z.object({
  id: z.string().transform((value) => parseInt(value)).optional(),
  title: z.string().min(5, { message: "Title must contain at least 5 characters"}).max(100),
  content: z.string().min(20, { message: "Title must contain at least 20 characters"}),
  tags: z.string().min(1).refine(value => value.split(',').every(tags=>tags!=="")),
  thumbnail: z.instanceof(File).optional(),
  published: z.union([z.string(), z.undefined()]).transform((value) => value === "on")
})
