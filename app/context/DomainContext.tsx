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
            const mainDomain = 'https://www.revendaja.com/'; // Domínio principal (ex: revendaja.vercel.app)

            if (host === mainDomain) {
                // Se o host for igual ao domínio principal, é o domínio principal
                setIsMainDomain(true);
                setSubdomain(null);
            } else {
                // Caso contrário, extrai o subdomínio
                const currentSubdomain = host.split('.')[1];
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

            try {
                const response = await axios.get(`http://localhost:9999/store/verifysubdomain/${subdomain}`);
                if (response.data.exists) {
                    setStoreData(response.data.exists);
                } else {
                    window.location.href = process.env.NEXT_PUBLIC_FRONTEND || '/'; // Redireciona para o domínio principal
                }
            } catch (error) {
                console.error('Erro ao verificar subdomínio:', error);
                window.location.href = process.env.NEXT_PUBLIC_FRONTEND || '/'; // Redireciona em caso de erro
            }
        };

        fetchSubdomainData();
    }, [subdomain, isMainDomain]);

    const value = useMemo(
        () => ({ isMainDomain, subdomain, storeData }),
        [isMainDomain, subdomain, storeData]
    );

    return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
};
