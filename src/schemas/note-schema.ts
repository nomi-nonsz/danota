import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(1),
  categoryId: z.string(),
  isPublic: z.boolean(),
  allowComment: z.boolean()
})