import { backend } from "@/app/api/backend";

export async function FindProductsOnPromotion(subdomain: string | undefined, page: number, pageSize: number) {

    const response = await backend.get(`/stock/FindProductsOnPromotion/?subdomain=${subdomain}`, {
        params: {
            page,
            pageSize
        }
    });

    return response.data;
}