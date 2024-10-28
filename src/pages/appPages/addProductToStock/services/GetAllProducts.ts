import { backend } from "@/api/backend";
import Cookies from "universal-cookie";

export async function GetAllProducts(
  currentPage: number,
  pageSize: number,
  search: string,
  category: string
) {
  const cookie = new Cookies();
  const token = await cookie.get("token");

  const response = await backend.get(`products/getall`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: currentPage,
      pageSize,
      search,
      filter: category,
    },
  });

  return response;
}
