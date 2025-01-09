import { z } from "zod";

export const SalePendingSchema = z.object({
    customer: z.string(),
    numberPhone: z.string(),
    
});
