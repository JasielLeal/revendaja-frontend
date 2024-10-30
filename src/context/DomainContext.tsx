// src/contexts/DomainContext.tsx
import axios from 'axios';
import React, { createContext, useContext, useMemo, ReactNode, useEffect, useState } from 'react';

// Defina os tipos do contexto
interface StoreData {
    id: string;
    name: string;
    subdomain: string;
    status: string;
    description: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

interface DomainContextType {
    isMainDomain: boolean;
    subdomain: string | null;
    storeData: StoreData | null;
}

// Crie o contexto e defina o valor inicial
const DomainContext = createContext<DomainContextType | undefined>(undefined);

// Hook para acessar o contexto
export const useDomain = (): DomainContextType => {
    const context = useContext(DomainContext);
    if (!context) {
        throw new Error("useDomain deve ser usado dentro de um DomainProvider");
    }
    return context;
};

// Defina as props para o provedor de domínio
interface DomainProviderProps {
    children: ReactNode;
}

// Provedor do contexto
export const DomainProvider: React.FC<DomainProviderProps> = ({ children }) => {
    const hostname = window.location.hostname;

    // Verifica se é o domínio principal
    const isMainDomain = hostname === 'revendaja.com' || hostname === 'localhost';
    const subdomain = isMainDomain || hostname === 'localhost' ? null : hostname.split('.')[0];

    const [storeData, setStoreData] = useState<StoreData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubdomainData = async () => {
            if (subdomain) {
                try {
                    const response = await axios.get(`http://localhost:9999/store/verifysubdomain/${subdomain}`);
                    if (response.data.exists) {
                        setStoreData(response.data.exists);
                    } else {
                        window.location.href = `http://localhost:5173`;  // Redireciona para uma URL que não existe
                    }
                } catch (error) {
                    console.error("Erro ao verificar subdomínio:", error);
                    window.location.href = `http://localhost:5173`;  // Redireciona em caso de erro
                }
            }
            setLoading(false);
        };

        fetchSubdomainData();
    }, [subdomain]);

    // Memorizar valores
    const value = useMemo(
        () => ({ isMainDomain, subdomain, storeData }),
        [isMainDomain, subdomain, storeData]
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
};
