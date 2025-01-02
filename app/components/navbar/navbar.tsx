'use client'

import { useDomain } from "@/app/context/DomainContext";
import { MobileNavBar } from "./components/mobileNavBar";
import { Cart } from "./components/cart";
import { Input } from "@/components/ui/input";

export function Navbar() {
    
    const { storeData } = useDomain();
        
    return (
        <>
            <div className="bg-primary px-4 pt-4 pb-4">
                <div className="flex items-center justify-between mb-5">
                    <MobileNavBar />
                    <h1 className="text-white font-medium">{storeData?.name}</h1>
                    <Cart />
                </div>
                <Input placeholder="Pesquisar" className="placeholder:text-white" />
            </div>
        </>
    )
}