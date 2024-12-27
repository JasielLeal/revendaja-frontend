'use client'

import { backend } from "@/app/api/backend";
import { useEffect, useState } from "react";
import { MobileNavBar } from "./components/mobileNavBar";
import { Cart } from "./components/cart";
import { Input } from "@/components/ui/input";
import { ActivesPromotions } from "./components/activesPromotions";
import { Categories } from "./components/Categories";

export default function Store() {
    const [subdomain, setSubdomain] = useState('');
    const [domain, setDomain] = useState('');

    useEffect(() => {
        const host = window.location.host;
        const subdomain = host.split('.')[0];
        setSubdomain(subdomain);

        const fetchSubdomainData = async () => {
            // Verifica se os dados da loja estão no cache
            const cachedData = localStorage.getItem(subdomain);
            if (cachedData) {
                setDomain(JSON.parse(cachedData).name);
            } else {
                // Faz a requisição ao backend para obter os dados da loja
                const response = await backend.get(`store/verifysubdomain/${subdomain}`);
                const storeData = response.data.exists;
                setDomain(storeData.name);
                // Armazena os dados no cache
                localStorage.setItem(subdomain, JSON.stringify(storeData));
            }
        };

        fetchSubdomainData();
    }, [subdomain]);

   

    return (
        <>  
            <div className="bg-primary px-4 pt-4 pb-4">
                <div className="flex items-center justify-between mb-5">
                    <MobileNavBar />
                    <h1 className="text-white font-medium">{domain}</h1>
                    <Cart />
                </div>
                <Input placeholder="Pesquisar" className="placeholder:text-white" />
            </div>
            <Categories />
            <ActivesPromotions />

            
        </>
    );
}