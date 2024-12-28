import { backend } from "@/app/api/backend";

export async function FindProductsOnPromotion(subdomain: string | undefined) {

    const response = await backend.get(`/stock/FindProductsOnPromotion/?subdomain=${subdomain}`);

    return response.data;
}