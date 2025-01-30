import { z } from "zod";

export const AddProductsSchema = z.object({
    name: z.string(),
    normalPrice: z.string(),
    suggestedPrice: z.string(),
    description: z.string(),
    barcode: z.string(),
    brand: z.string(),
    company: z.string(),
    category: z.string(),
    image: z.instanceof(File, { message: "Selecione um arquivo válido" })
        .refine((file) => file.size < 5 * 1024 * 1024, { // Máx. 5MB
            message: "O arquivo deve ter menos de 5MB",
        }),
});
