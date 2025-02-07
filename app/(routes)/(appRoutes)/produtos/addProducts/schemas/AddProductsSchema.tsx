import { z } from "zod";

export const AddProductsSchema = z.object({
    name: z.string(),
    normalPrice: z.string(),
    suggestedPrice: z.string(),
    barcode: z.string(),
    brand: z.string(),
    company: z.string(),
    category: z.string(),
});
