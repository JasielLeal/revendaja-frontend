'use client'

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { FindProductsOnPromotion } from "../services/FindProductsOnPromotion";
import { formatCurrency } from "@/app/utils/FormatCurrency";
import { calculatePercentage } from "@/app/utils/formatDiscount";
import { useDomain } from "@/app/context/DomainContext";
import { useRouter } from "next/navigation";


export function ActivesPromotions() {

    const { storeData } = useDomain();

    const { data: ProductsOnPromotion } = useQuery({
        queryKey: ['FindProductsOnPromotion', storeData?.subdomain],
        queryFn: () => FindProductsOnPromotion(storeData?.subdomain),
    })

    const router = useRouter();

    type ProductProps = {
        id: number;
        normalPrice: string;
        customPrice: string;
        product: {
            id: number;
            name: string;
            brand: string;
            imgUrl: string;
            normalPrice: string;
        };
        customProduct: {
            id: number;
            name: string;
            brand: string;
            imgUrl: string;
            normalPrice: string;
        };
    }



    return (
        <div className="px-4">
            <div className="flex items-center justify-between mb-4 mt-4 ">
                <p className="text-text font-medium">Promoções</p>

                <Link href={'/'} className="text-text font-medium">Ver todas</Link>
            </div>
            <div className="flex overflow-x-scroll space-x-3 no-scrollbar">
                {ProductsOnPromotion && ProductsOnPromotion.map((promotion: ProductProps) => {

                    const produto = promotion.product || promotion.customProduct;

                    const discountPercentage = calculatePercentage(Number(produto.normalPrice), Number(promotion.customPrice)).percentage;

                    return (
                        <div
                            key={promotion.id}
                            className="flex flex-col justify-between w-36 rounded-lg"
                            style={{ minWidth: "170px" }} // garante que cada item tenha largura fixa no carrossel
                            onClick={() => router.push(`/p/${produto.name}/${produto.id}`)}
                        >
                            <div >
                                <div className="relative">
                                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                                        {discountPercentage.toFixed(0)}% OFF
                                    </div>
                                    <div className="flex items-center w-full justify-center">
                                        <Image src={produto.imgUrl || '/path/to/defaultImage.jpg'} alt={produto.name} className="mb-3 rounded-xl" width={170} height={170} priority />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400">{produto.brand}</p>
                                <p className="font-semibold mb-2 text-text text-sm line-clamp-2">{produto.name}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="line-through text-xs text-gray-500">R$ {formatCurrency(promotion.normalPrice)}</p>
                                    <p className="font-semibold text-xl text-text">R$ {formatCurrency(promotion.customPrice)}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}