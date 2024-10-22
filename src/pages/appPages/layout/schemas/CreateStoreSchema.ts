import { z } from "zod";

export const CreateStoreSchema = z.object({
  name: z.string().min(6),
  description: z.string().min(1, "Insira uma descriação"),
});
