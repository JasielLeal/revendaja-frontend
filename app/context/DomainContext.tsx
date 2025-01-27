'use client'

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

// Crie o contexto e defina o valor inicial
const DomainContext = createContext<DomainContextType | undefined>(undefined);

export const useDomain = (): DomainContextType => {
    const context = useContext(DomainContext);
    if (!context) {
        throw new Error('useDomain deve ser usado dentro de um DomainProvider');
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

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const host = window.location.host;

            const cleanHost = host.startsWith('www.') ? host.slice(4) : host;

            const mainDomain = 'revendaja.com' // 'localhost:3000' Domínio principal (ex: revendaja.vercel.app)

            if (cleanHost === mainDomain) {
                // Se o host for igual ao domínio principal, é o domínio principal
                setIsMainDomain(true);
                setSubdomain(null);
            } else {
                // Caso contrário, extrai o subdomínio
                const currentSubdomain = host.split('.')[0];
                setIsMainDomain(false);
                setSubdomain(currentSubdomain);
            }
        }
    }, []);

    useEffect(() => {
        const fetchSubdomainData = async () => {
            if (!subdomain || isMainDomain) {
                return;
            }

                const response = await axios.get(`http://localhost:9999/store/verifysubdomain/${subdomain}`);

                if (response.data.exists) {
                    // Caso o subdomínio exista, salva os dados da loja
                    setStoreData(response.data.exists);
                } else {
                    return
                }
          
        };

        fetchSubdomainData();
    }, [subdomain, isMainDomain]);

    const value = useMemo(
        () => ({ isMainDomain, subdomain, storeData}),
        [isMainDomain, subdomain, storeData]
    );

    return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
};
