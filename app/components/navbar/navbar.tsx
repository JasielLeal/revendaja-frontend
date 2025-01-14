'use client'

import { useDomain } from "@/app/context/DomainContext";
import { MobileNavBar } from "./components/mobileNavBar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoBagHandle } from "react-icons/io5";
import { useCart } from "@/app/context/CartContext";

export function Navbar() {

    const { storeData } = useDomain();
    const { cart } = useCart();

    const [search, setSearch] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && search.trim() !== '') {
            // Navegar para a página de resultados com a query na URL
            router.push(`/search?query=${encodeURIComponent(search.trim())}`);
            setSearch('');
        }
    };

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <div className="bg-primary px-4 pt-4 pb-4">
                <div className="flex items-center justify-between mb-5">
                    <MobileNavBar />
                    <Link href={'/'} className="text-white font-medium">{storeData?.name}</Link>
                    <div className="relative">
                        <Link href={'/cart'} className="text-white">
                            <IoBagHandle size={25} />
                        </Link>
                        {cartItemCount > 0 && (
                            <span className="absolute top-0 -right-2 bg-[#ce640e] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {cartItemCount >= 9 ?
                                    "+9"
                                    :
                                    cartItemCount
                                }
                            </span>
                        )}
                    </div>
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