import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(1),
  categoryId: z.optional(z.string()).or(z.nullable(z.string())),
  isPublic: z.boolean(),
  allowComment: z.boolean()
})

export const collectionSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(150)
});