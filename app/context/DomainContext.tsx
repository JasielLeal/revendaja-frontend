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
    erro404: boolean;
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

    const [erro404, setError404] = useState<boolean>(false);
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

            try {
                // Tente fazer a requisição e verificar se houve algum erro
                const response = await axios.get(`http://localhost:9999/store/verifysubdomain/${subdomain}`);

                if (response.data.exists) {
                    // Caso o subdomínio exista, salva os dados da loja
                    setStoreData(response.data.exists);
                    setError404(false);  // Resetando o erro 404, pois encontramos a loja
                } else {
                    // Caso contrário, marca que houve erro 404
                    setError404(true);
                    setStoreData(null); // Limpa os dados da loja
                }
            } catch (error) {
                // Se ocorrer algum erro na requisição, trata o erro aqui
                console.error("Erro ao buscar dados do subdomínio:", error);
                setError404(true); // Considerando erro 404 caso haja falha na requisição
                setStoreData(null);
            }
        };

        fetchSubdomainData();
    }, [subdomain, isMainDomain]);

    const value = useMemo(
        () => ({ isMainDomain, subdomain, storeData, erro404 }),
        [isMainDomain, subdomain, storeData, erro404]
    );

    return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
};
