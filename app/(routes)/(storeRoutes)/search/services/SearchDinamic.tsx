import { backend } from "@/app/api/backend";

interface searchDinamicProps {
    search: string | null,
    page: number,
    pageSize: number,
    subdomain: string | null
    orderBy?: string | null
}

export async function SearchDinamic({ search, page, pageSize, subdomain, orderBy }: searchDinamicProps) {

    const response = await backend.get(`/stock/SearchDinamic`, {
        params: {
            search,
            page,
            pageSize,
            subdomain,
            orderBy
        }
    })

    return response.data

}