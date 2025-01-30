import { backend } from "@/app/api/backend";
import { FieldValues } from "react-hook-form";

export async function AddProductsGlobals(data: FieldValues) {
    const response = await backend.post("/products/create", {
        name: data.name,
        normalPrice: Number(data.normalPrice),
        suggestedPrice: Number(data.suggestedPrice),
        description: data.description,
        barcode: data.barcode,
        brand: data.brand,
        company: data.company,
        image: data.image,
        category: data.category
    })

    return response.data
}