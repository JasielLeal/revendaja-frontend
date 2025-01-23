import axios from 'axios';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

interface StoreData {
    id: string;
    name: string;
    subdomain: string;
    status: string;
    description: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    numberPhone: string;
}

interface DomainContextType {
    isMainDomain: boolean;
    subdomain: string | null;
    storeData: StoreData | null;
}

const DomainContext = createContext<DomainContextType | undefined>(undefined);

export const useDomain = (): DomainContextType => {
    const context = useContext(DomainContext);
    if (!context) {
        throw new Error("useDomain deve ser usado dentro de um DomainProvider");
    }
    return context;
};

interface DomainProviderProps {
    children: ReactNode;
}

export const DomainProvider = ({ children }: DomainProviderProps) => {
    const [subdomain, setSubdomain] = useState<string | null>(null);
    const [isMainDomain, setIsMainDomain] = useState<boolean>(true);
    const [storeData, setStoreData] = useState<StoreData | null>(null);

    console.log(process.env.NEXT_PUBLIC_FRONTEND)

    useEffect(() => {
        if (typeof window !== "undefined") {
            const host = window.location.host;
            const currentSubdomain = host.split('.')[0];
            setSubdomain(currentSubdomain);
            setIsMainDomain(host === process.env.NEXT_PUBLIC_FRONTEND);
        }
    }, []);

    useEffect(() => {
        const fetchSubdomainData = async () => {
            if (!subdomain || subdomain === process.env.NEXT_PUBLIC_FRONTEND ) {
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:9999/store/verifysubdomain/${subdomain}`
                );
                if (response.data.exists) {
                    setStoreData(response.data.exists);
                } else {
                    window.location.href = process.env.NEXT_PUBLIC_FRONTEND as string;
                }
            } catch (error) {
                console.error("Erro ao verificar subdomínio:", error);
                window.location.href = process.env.NEXT_PUBLIC_FRONTEND as string;
            }
        };

        fetchSubdomainData();
    }, [subdomain]);

    const value = useMemo(
        () => ({ isMainDomain, subdomain, storeData }),
        [isMainDomain, subdomain, storeData]
    );

    return (
        <DomainContext.Provider value={value}>
            {children}
        </DomainContext.Provider>
    );
};
