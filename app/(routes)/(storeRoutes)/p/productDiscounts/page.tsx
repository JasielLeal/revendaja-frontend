'use client'

import { useInfiniteQuery } from "@tanstack/react-query";
import { FindProductsOnPromotion } from "./services/FindProductsOnPromotion";
import { useDomain } from "@/app/context/DomainContext";
import Image from "next/image";
import { calculatePercentage } from "@/app/utils/formatDiscount";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/app/utils/FormatCurrency";
import { Button } from "@/components/ui/button";


export default function ProductDiscounts() {

    const pageSize = 10;
    const { storeData } = useDomain()
    const router = useRouter();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['SearchDinamic'],
        queryFn: ({ pageParam = 0 }) =>
            FindProductsOnPromotion({ subdomain: storeData?.subdomain, page: pageParam + 1, pageSize }),
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length;

            if (currentPage < lastPage?.totalPages) {
                return currentPage;
            } else {
                return undefined; // Para a paginação quando a última página for atingida
            }
        },
        enabled: !!storeData?.subdomain,
        initialPageParam: 0
    });

    interface productsProps {
        id: number;
        name: string;
        imgUrl: string;
        brand: string;
        discountValue: number;
        normalPrice: number;
        customPrice: number;
        product: {
            id: number;
            name: string;
            imgUrl: string;
            brand: string;
            normalPrice: number;
            discountValue: number;
        }
        customProduct: {
            id: number;
            name: string;
            imgUrl: string;
            brand: string;
            normalPrice: number;
            discountValue: number;
        }
    }


    function OriginalCustomValue(numberOne: number, numberTwo: number) {
        const total = Number(numberOne) + Number(numberTwo)

        return total
    }

    return (
        <>
            <div className="px-4 mt-5">

                <p className="font-medium text-text mb-4 text-lg">
                    Promoções Ativas
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data?.pages.map((page) =>
                        page.items.map((productResults: productsProps) => {
                            const products = productResults.product || productResults.customProduct;

                            const discountPercentage = productResults.discountValue
                                ? calculatePercentage(
                                    Number(productResults.discountValue),
                                    Number(productResults.customPrice)
                                )
                                : null;

                            return (
                                <div
                                    key={products.id}
                                    className="flex flex-col justify-between rounded-lg"
                                    onClick={() => router.push(`/p/${products.name}/${products.id}`)}
                                >
                                    {/* Imagem e Desconto */}
                                    <div className="relative w-full">
                                        {discountPercentage !== null && (
                                            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                                                {discountPercentage?.toFixed(0)}% OFF
                                            </div>
                                        )}
                                        <div className="flex items-center justify-center w-full">
                                            <Image
                                                src={products.imgUrl || '/path/to/defaultImage.jpg'}
                                                alt={products.name}
                                                className="rounded-xl object-cover w-full h-auto"
                                                width={500}
                                                height={500}
                                                priority
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">{products.brand}</p>
                                    <p className="font-semibold mb-2 text-text text-sm line-clamp-2">
                                        {products.name}
                                    </p>

                                    {/* Preços */}
                                    <div className="flex flex-col mt-3">
                                        {
                                            productResults.discountValue ?

                                                <>
                                                    <p className="line-through text-xs text-gray-500">
                                                        R$ {formatCurrency(String(OriginalCustomValue(productResults.customPrice, productResults.discountValue)))}
                                                    </p>
                                                    <p className="font-semibold text-lg text-text">
                                                        R$ {formatCurrency(String(productResults.customPrice))}
                                                    </p>
                                                </>

                                                :

                                                <>
                                                    <p className="line-through text-xs text-gray-500">
                                                        R$ {formatCurrency(String(productResults.normalPrice))}

                                                    </p>
                                                    <p className="font-semibold text-lg text-text">
                                                        R$ {formatCurrency(String(productResults.customPrice))}
                                                    </p>
                                                </>
                                        }
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Botão de Carregar Mais */}
                <div className="flex justify-center my-6">
                    <Button
                        variant={'secondary'}
                        onClick={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetchingNextPage}
                    >
                        {isFetchingNextPage ? 'Carregando...' : hasNextPage ? 'Carregar mais produtos' : 'Nada mais para carregar'}
                    </Button>
                </div>
            </div>
        </>
    )
}