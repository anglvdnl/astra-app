import {z} from "zod";

export const authSchemas = {
    "login": z.object({
        email: z.string().min(0, {
            message: "Please enter your email.",
        }).email("Please enter a valid email address."),
        password: z.string().min(6, {
            message: "Password must contain at least 6 characters."
        })
    }),
    "register": z.object({
        username: z.string().min(1, {
            message: "Please enter a username"
        }),
        email: z.string().email("Please enter a valid email address."),
        password: z.string().min(6, {
            message: "Password must contain at least 6 characters."
        })
    })
}