import { backend } from "@/app/api/backend";

export async function FindProductInStock(subdomain: string, productId: string) {
    const response = await backend.get(`/stock/findProductInStock?subdomain=${subdomain}&productId=${productId}`)

    return response
}