'use client'

import { ActivesPromotions } from "./components/activesPromotions";
import { Categories } from "./components/Categories";
import { BestSellingProducts } from "./components/bestSellingProducts";

export function Store() {

    return (
        <>
            <Categories />
            <ActivesPromotions />
            <BestSellingProducts />
        </>
    );
}