'use client'

import { useDomain } from "@/app/context/DomainContext";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link"
import { FindNewProducts } from "../services/FindNewProducts";
import { formatCurrency } from "@/app/utils/FormatCurrency";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { calculatePercentage } from "@/app/utils/formatDiscount";

export function FindListNewProducts() {

    const { storeData } = useDomain();

    const { data: productsRecommended } = useQuery({
        queryKey: ["FindNewProducts", storeData?.subdomain],
        queryFn: async () => await FindNewProducts(storeData?.subdomain)
    })

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

    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between mb-4 mt-10">
                <p className="text-text font-medium">Produtos Recentes</p>
                <Link href={'/'} className="text-text font-medium">Ver todos</Link>
            </div>

            <div className="flex overflow-x-scroll space-x-3 no-scrollbar">
                {productsRecommended && productsRecommended.map((promotion: ProductProps) => {

                    const produto = promotion.product || promotion.customProduct;

                    function OriginalCustomValue(numberOne: number, numberTwo: number) {
                        const total = Number(numberOne) + Number(numberTwo)

                        return total
                    }

                    const newCustomPrice = Number(promotion.discountValue) + Number(promotion.customPrice)
                    console.log(newCustomPrice)
                    const discountPercentage = calculatePercentage(Number(promotion.discountValue), Number(promotion.customPrice))


                    return (
                        <div
                            key={promotion.id}
                            className="flex flex-col justify-between w-36 rounded-lg"
                            style={{ minWidth: "170px" }} // garante que cada item tenha largura fixa no carrossel
                            onClick={() => router.push(`/p/${produto.name}/${produto.id}`)}
                        >
                            <div >
                                <div className="relative">
                                    {promotion.discountValue !== null && (
                                        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                                            {discountPercentage.toFixed(0)}% OFF
                                        </div>
                                    )}
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
                    );
                })}
            </div>

        </>
    )
}