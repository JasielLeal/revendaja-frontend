import { backend } from "@/app/api/backend";

export async function AddProductsGlobals(data: FormData) {
    const response = await backend.post("/products/create", data, {
        headers: {
            'Content-Type': 'multipart/form-data', // Garantir que o conteúdo seja enviado como multipart
        }
    });

    return response.data;
}