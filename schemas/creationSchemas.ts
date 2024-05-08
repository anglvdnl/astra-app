import {z} from "zod";

export const creationSchema = {
    "group": z.object({
        name: z.string().min(1, {
            message: "Please enter group name.",
        }),
        description: z.string(),
        image: z.string()
    }),
    "bunch": z.object({
        name: z.string().min(1, {
            message: "Please enter bunch name.",
        }),
        description: z.string(),
        language: z.string()
    })
}