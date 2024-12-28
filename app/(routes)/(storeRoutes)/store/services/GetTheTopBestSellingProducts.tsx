import { backend } from "@/app/api/backend";
import Cookies from "universal-cookie";

export async function GetTheTopBestSellingProducts(subdomain: string | undefined) {

    const cookie = new Cookies()

    const response = await backend.get(`/sale/GetTheTopBestSellingProducts/?subdomain=${subdomain}`, {
        headers: {
            Authorization: `Bearer ${cookie.get("token")}`,
        }
    })

    return response.data
} 