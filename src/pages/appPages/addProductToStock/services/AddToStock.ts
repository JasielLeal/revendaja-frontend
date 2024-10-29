import { backend } from "@/api/backend";
import { FieldValues } from "react-hook-form";
import Cookies from "universal-cookie";

export async function AddToStock(data: FieldValues) {
  const cookie = new Cookies();

  const response = await backend.post(
    "/stock/create",
    {
      productId: data.productId,
      customPrice: String(data.customPrice),
      quantity: Number(data.quantity),
    },
    {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
    }
  );

  return response.data;
}
