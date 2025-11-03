import { api } from "@/app/backend/axios";
import { DashboardDataTypeResponse } from "../types/dashboard-data-type";

export async function OrdersMetrics(from: string, to: string) {
    const response = await api.get<DashboardDataTypeResponse>(`/dashboard/metrics`, {
        params: {
            from,
            to,
        }
    })

    return response.data
}