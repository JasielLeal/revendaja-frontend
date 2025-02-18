'use client'

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { FindProductsOnPromotion } from "../services/FindProductsOnPromotion";
import { formatCurrency } from "@/app/utils/FormatCurrency";
import { calculatePercentage } from "@/app/utils/formatDiscount";
import { useDomain } from "@/app/context/DomainContext";
import { useRouter } from "next/navigation";
import { NewProductsList } from "./findListNewProducts";


export function ActivesPromotions() {

    const { storeData } = useDomain();

    const page = 1
    const pageSize = 10

    const { data: ProductsOnPromotion} = useQuery({
        queryKey: ['FindProductsOnPromotion', storeData?.subdomain],
        queryFn: async () => await FindProductsOnPromotion(storeData?.subdomain, page, pageSize),
        enabled: !!storeData?.subdomain,
    })

    const router = useRouter();

    type ProductProps = {
        id: number;
        normalPrice: string;
        customPrice: string;
        discountValue: string
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
            {
                ProductsOnPromotion?.items?.length > 0 ?

                    <>
                        <div className="flex items-center justify-between mb-4 mt-4 ">
                            <p className="text-text font-medium">Promoções</p>

                            <Link href={'/'} className="text-subtext font-light text-sm">Ver todas</Link>
                        </div>
                        <div className="flex overflow-x-scroll space-x-3 no-scrollbar">
                            {ProductsOnPromotion?.items && ProductsOnPromotion?.items.map((promotion: ProductProps) => {

                                const produto = promotion.product || promotion.customProduct;

                                function OriginalCustomValue(numberOne: number, numberTwo: number) {
                                    const total = Number(numberOne) + Number(numberTwo)

                                    return total
                                }

                                const discountPercentage = calculatePercentage(Number(promotion.discountValue), Number(promotion.customPrice))


                                return (
                                    <>
                                        
                                            <div
                                                key={promotion.id}
                                                className="flex flex-col justify-between w-36 rounded-lg  bg-input p-3"
                                                style={{ minWidth: "170px" }} // garante que cada item tenha largura fixa no carrossel
                                                onClick={() => router.push(`/p/${produto.name}/${produto.id}`)}
                                            >
                                                <div >
                                                    <div className="relative">
                                                        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
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
                                                        {
                                                            promotion?.discountValue ?

                                                                <>
                                                                    <p className="line-through text-xs text-gray-500">R$ {formatCurrency(String(OriginalCustomValue(Number(promotion.discountValue), Number(promotion.customPrice))))}</p>
                                                                    <p className="font-semibold text-xl text-text">R$ {formatCurrency(String(promotion.customPrice))}</p>
                                                                </>

                                                                :

                                                                <>
                                                                    <p className="line-through text-xs text-gray-500">R$ {formatCurrency(String(promotion.normalPrice))}</p>
                                                                    <p className="font-semibold text-xl text-text">R$ {formatCurrency(String(promotion.customPrice))}</p>
                                                                </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            
                                         
                                  
                                    </>
                                );
                            })}
                        </div>
                    </>

                    :

                    <NewProductsList />
            }
        </div>
    )
}