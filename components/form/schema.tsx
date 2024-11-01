"use client"
import { z } from "zod"

const status = z.union([z.literal("starting"), z.literal("progress"), z.literal("done")]).default("starting")
const formSchema = z.object({
    title: z.string().min(5).max(25).default(""),
    description: z.string().min(10).max(100).optional(),
    status
})

export default formSchema
export type TaskStatus = z.infer<typeof status>
export type FormSchema = z.infer<typeof formSchema>