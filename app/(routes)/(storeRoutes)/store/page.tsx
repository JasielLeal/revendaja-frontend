'use client'

import { MobileNavBar } from "./components/mobileNavBar";
import { Cart } from "./components/cart";
import { Input } from "@/components/ui/input";
import { ActivesPromotions } from "./components/activesPromotions";
import { Categories } from "./components/Categories";
import { useDomain } from "@/app/context/DomainContext";
import { BestSellingProducts } from "./components/bestSellingProducts";

export default function Store() {

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

            <Categories />
            <ActivesPromotions />
            <BestSellingProducts />
            
            <div className="bg-primary mt-10 px-2 py-2">
                <p className="text-white font-medium text-sm text-center">{storeData?.name}, Todos os direitos reservados.</p>
            </div>
        </>
    );
}