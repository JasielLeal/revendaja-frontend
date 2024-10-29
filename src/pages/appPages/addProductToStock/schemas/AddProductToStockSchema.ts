import { z } from "zod";

export const AddProductToStockSchema = z.object({
  customPrice: z.string().optional(),
  // Aceita strings de números
  quantity: z.number().min(1, "Quantidade deve ser pelo menos 1"), // Define `quantity` como um número com valor mínimo de 1
});
