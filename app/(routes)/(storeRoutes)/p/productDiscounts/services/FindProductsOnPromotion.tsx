import { backend } from "@/app/api/backend";

interface FindProductsOnPromotionProps {
    subdomain: string | undefined,
    page: number,
    pageSize: number
}

export async function FindProductsOnPromotion({ subdomain, page, pageSize }: FindProductsOnPromotionProps) {

    const response = await backend.get(`/stock/FindProductsOnPromotion/?subdomain=${subdomain}`, {
        params: {
            page,
            pageSize
        }
    });

    return response.data;
}