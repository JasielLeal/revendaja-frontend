import { z } from "zod";

export const SalePendingSchema = z.object({
    customer: z.string().min(1),
    numberPhone: z.string().min(11)
});
