import { FieldValues } from "react-hook-form";
import { backend } from "@/api/backend";

export async function CreateStoreFn(data: FieldValues) {
  const response = await backend.post("/store/create", {
    name: data.name,
    userId: data.userId,
    description: data.description,
  });
  return response;
}
