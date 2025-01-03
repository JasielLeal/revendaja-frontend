'use client'

import { useDomain } from "@/app/context/DomainContext";
import { MobileNavBar } from "./components/mobileNavBar";
import { Cart } from "./components/cart";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {

    const { storeData } = useDomain();

    const [search, setSearch] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && search.trim() !== '') {
            // Navegar para a página de resultados com a query na URL
            router.push(`/search?query=${encodeURIComponent(search.trim())}`);
            setSearch('');
        }
    };

    return (
        <>
            <div className="bg-primary px-4 pt-4 pb-4">
                <div className="flex items-center justify-between mb-5">
                    <MobileNavBar />
                    <h1 className="text-white font-medium">{storeData?.name}</h1>
                    <Cart />
                </div>
                <Input
                    placeholder="Pesquisar"
                    className="placeholder:text-white text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} // Atualiza o estado do input
                    onKeyDown={handleSearch} // Detecta a tecla Enter
                />
            </div>
        </>
    )
}