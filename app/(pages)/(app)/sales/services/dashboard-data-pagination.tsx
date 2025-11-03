import { api } from "@/app/backend/axios";
import { DashboardDataTypeResponse } from "../types/dashboard-data-type";

export async function FetchDashboardDataPagination(from: string, to: string, page: number, limit: number, search: string) {
    const response = await api.get<DashboardDataTypeResponse>(`/dashboard/pagination`, {
        params: {
            from,
            to,
            page,
            limit,
            search
        }
    })

    return response.data
}