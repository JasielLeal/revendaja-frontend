import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/app/services/user-info";

export function useUserInfo() {
    return useQuery({
        queryKey: ["user-info"],
        queryFn: getUserInfo,
        retry: false, // Não tentar novamente se falhar (pode ser por não estar logado)
    });
}