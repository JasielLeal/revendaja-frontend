import { backend } from "@/app/api/backend";

export async function SearchDinamic(search: string | null, page: number, pageSize: number, subdomain: string | null) {

    const response = await backend.get(`/stock/SearchDinamic`, {
        params: {
            search,
            page,
            pageSize,
            subdomain
        }
    })

    return response.data

}