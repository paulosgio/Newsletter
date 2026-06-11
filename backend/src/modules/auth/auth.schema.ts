import { z } from "zod"

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
})

export const registerSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
    role: z.enum(["ADMIN", "USER"])
})

export type LoginDTO = z.infer<typeof loginSchema>
export type RegisterDTO = z.infer<typeof registerSchema>