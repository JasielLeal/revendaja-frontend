import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({ message: "Email invalido" }),
    password: z.string().min(6, "A não é valida"),
});
