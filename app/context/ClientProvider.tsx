'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AuthProvider } from "./AuthContext";
import { DomainProvider } from "./DomainContext";


export default function ClientProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions:{
            queries:{
                refetchOnWindowFocus: false,
                retry: false,
                staleTime: 1000 * 60 * 5,
            },
        }
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <DomainProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </DomainProvider>
        </QueryClientProvider>
    );
}