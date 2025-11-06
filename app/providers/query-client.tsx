"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false, // não refetcha só pq o usuário voltou pra aba
                refetchOnReconnect: true, // refetcha se a conexão cair e voltar
            }
        }
    }));

    return <QueryClientProvider client={queryClient} >
        {children}
    </QueryClientProvider>;
}
