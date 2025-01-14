import { backend } from "@/app/api/backend";

export async function FindNewProducts(subdomain: string | undefined) {
  const response = await backend.get("/stock/FindNewProducts", {
    params: {
      subdomain,
    },
  });

  return response.data;
}
