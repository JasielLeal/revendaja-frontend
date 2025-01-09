import { backend } from "@/app/api/backend";
import { FieldValues } from "react-hook-form";

export async function CreateSalePeding(data: FieldValues) {
    const response = await backend.post("/sale/createSalePending", {
        subdomain: data.subdomain,
        customer: data.customer,
        transactionType: data.transactionType,
        items: data.items,
        numberPhone: data.numberPhone,
    })

    return response.data;
}