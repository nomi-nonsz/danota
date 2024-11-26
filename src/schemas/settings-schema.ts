import { z } from "zod"

export const userSettingsSchema = z.object({
  email: z.string().email().min(2).max(50),
  username: z.string().min(2),
  displayName: z.string().min(2)
})

export const editorSettingsSchema = z.object({
  autoSave: z.boolean()
})

export const settingsSchema = userSettingsSchema.merge(editorSettingsSchema);