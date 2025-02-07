'use client';

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
    const [storeData, setStoreData] = useState<StoreData | null>(() => {
        // Recupera dados do localStorage ao carregar o componente
        if (typeof window !== 'undefined') {
            const savedData = localStorage.getItem('storeData');
            return savedData ? JSON.parse(savedData) : null;
        }
        return null;
    });
    const [lastDomain, setLastDomain] = useState<string | null>(null); // Armazenar o domínio anterior

    // Identificar o subdomínio ao carregar a página
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const host = window.location.host;
            const cleanHost = host.startsWith('www.') ? host.slice(4) : host;

            const mainDomain = process.env.NEXT_PUBLIC_MAINLOCAL; // Substitua pelo domínio principal da sua aplicação

            if (cleanHost === mainDomain) {
                setIsMainDomain(true);
                setSubdomain(null);
            } else {
                const currentSubdomain = host.split('.')[1];
                setIsMainDomain(false);
                setSubdomain(currentSubdomain);
            }
        }
    }, []);

    // Buscar dados do subdomínio apenas quando ele mudar ou o domínio for alterado
    useEffect(() => {
        if (subdomain && subdomain !== lastDomain) {
            // Se o domínio mudou, faz a requisição e limpa o localStorage
            const fetchSubdomainData = async () => {
                try {
                    const response = await axios.get(`http://${process.env.NEXT_PUBLIC_BACKEND}/store/verifysubdomain/${subdomain}`);
                    if (response.data.exists) {
                        setStoreData(response.data.exists); // Atualiza o estado com os dados da loja
                        localStorage.setItem('storeData', JSON.stringify(response.data.exists)); // Salva os dados no localStorage
                        setLastDomain(subdomain); // Atualiza o último domínio registrado
                    } else {
                        setStoreData(null); // Reseta os dados caso o subdomínio não exista
                        localStorage.removeItem('storeData'); // Remove os dados do localStorage
                        setLastDomain(null); // Limpa o domínio anterior
                    }
                } catch (error) {
                    console.error('Erro ao buscar dados do subdomínio:', error);
                    setStoreData(null);
                    localStorage.removeItem('storeData'); // Remove os dados do localStorage em caso de erro
                    setLastDomain(null); // Limpa o domínio anterior
                }
            };

            fetchSubdomainData();
        }
    }, [subdomain, lastDomain]); // Dependência do subdomínio e domínio anterior

    // Verificar se o domínio mudou após o carregamento da página
    useEffect(() => {
        if (subdomain === lastDomain) {
            // Se o subdomínio não mudou, carrega os dados do localStorage
            const savedData = localStorage.getItem('storeData');
            if (savedData) {
                setStoreData(JSON.parse(savedData)); // Recupera os dados do localStorage
            }
        }
    }, [subdomain, lastDomain]); // Dependência no subdomínio e no domínio anterior

    // Valor do contexto
    const value = useMemo(() => ({ isMainDomain, subdomain, storeData }), [isMainDomain, subdomain, storeData]);

    return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
};
