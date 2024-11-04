import { backend } from "@/api/backend";
import Cookies from "universal-cookie";

export async function FindProductById(productId: string, subdomain: string) {
    const cookie = new Cookies();
    const token = await cookie.get("token");

    const response = await backend.get(`stock/findById`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            subdomain,
            productId
        },
    });

    return response;
}
