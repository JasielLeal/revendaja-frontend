import { backend } from "@/api/backend";
import Cookies from "universal-cookie";

export async function GetStockForStoreName(currentPage: number, pageSize: number, storeName: string) {
    const cookie = new Cookies();
    const token = await cookie.get("token");

    const response = await backend.get(`stock`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page: currentPage,
            pageSize,
            storeName
        },
    });

    return response;
}