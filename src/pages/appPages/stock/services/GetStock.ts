import { backend } from "@/api/backend";
import Cookies from "universal-cookie";

export async function GetStock(
  currentPage: number,
  pageSize: number,
  search: string
) {
  const cookie = new Cookies();
  const token = await cookie.get("token");

  const response = await backend.get(`stock/getstock`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: currentPage,
      pageSize,
      search,
    },
  });

  return response;
}
