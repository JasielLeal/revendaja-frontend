import { backend } from "@/app/api/backend";

interface searchDinamicProps {
    search: string | null,
    page: number,
    pageSize: number,
    subdomain: string | null
}

export async function SearchDinamic({ search, page, pageSize, subdomain }: searchDinamicProps) {

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