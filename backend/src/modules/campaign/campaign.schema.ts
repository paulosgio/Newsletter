import { z } from "zod"

export const campaignSchema = z.object({
    title: z.string(),
    subject: z.string(),
    content: z.string()
})

export const updateCampaignSchema = z.object({
    title: z.string().optional(),
    subject: z.string().optional(),
    content: z.string().optional()
})

export type UpdateCampaignDTO = z.infer<typeof updateCampaignSchema>

export type CampaignDTO = z.infer<typeof campaignSchema>