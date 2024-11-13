import { z } from 'zod'

export const feedbackSchema = z.object({
    content: z.string().max(300, {message: 'Content must be within 300 characters'}),
    stars: z.number().max(5,{message: 'You can send atmax 5 star'}).min(1,{message: 'You need to send minimum 1 star'})
})