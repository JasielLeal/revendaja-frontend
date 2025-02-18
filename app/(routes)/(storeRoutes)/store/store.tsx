'use client'

import { ActivesPromotions } from "./components/activesPromotions";
import { BestSellingProducts } from "./components/bestSellingProducts";

export function Store() {

    return (
        <>  
            <ActivesPromotions />
            <BestSellingProducts />
        </>
    );
}