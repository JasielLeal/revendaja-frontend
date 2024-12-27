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
        throw new Error("useDomain deve ser usado dentro de um DomainProvider");
    }
    return context;
};

interface DomainProviderProps {
    children: ReactNode;
}

export const DomainProvider = ({ children }: DomainProviderProps) => {
    const host = window.location.host;
    const subdomain = host.split('.')[0];
    const isMainDomain = host === 'localhost:3000';
    const [storeData, setStoreData] = useState<StoreData | null>(null);

    useEffect(() => {
        const fetchSubdomainData = async () => {
            if (subdomain) {
                try {
                    const response = await axios.get(`http://localhost:9999/store/verifysubdomain/${subdomain}`);
                    console.log(response)
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
}