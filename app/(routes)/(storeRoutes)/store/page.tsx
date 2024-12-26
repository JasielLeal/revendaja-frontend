'use client'

import { backend } from "@/app/api/backend";
import { useEffect, useState } from "react";

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
        <div>
            <h1>Store {domain}</h1>
        </div>
    );
}