import { api } from "@/app/backend/axios";
import { DashboardDataTypeResponse } from "../types/dashboard-data-type";

export async function FetchDashboardData(from: string, to: string) {
    const response = await api.get<DashboardDataTypeResponse>(`/dashboard`, {
        params:{
            from,
            to
        }
    })

    return response.data
}