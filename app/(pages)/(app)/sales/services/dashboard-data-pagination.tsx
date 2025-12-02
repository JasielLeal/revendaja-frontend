import { api } from "@/app/backend/axios";
import { DashboardDataTypeResponse } from "../types/dashboard-data-type";

interface PaginationParams {
    from: string;
    to: string;
    page: number;
    limit: number;
    search: string;
    status?: string;
}

export async function FetchDashboardDataPagination(from: string, to: string, page: number, limit: number, search: string, status?: string) {
    const params: PaginationParams = {
        from,
        to,
        page,
        limit,
        search
    };

    // Só adiciona status se for fornecido (diferente de undefined)
    if (status !== undefined) {
        params.status = status;
    }

    const response = await api.get<DashboardDataTypeResponse>(`/dashboard/pagination`, {
        params
    })

    return response.data
}