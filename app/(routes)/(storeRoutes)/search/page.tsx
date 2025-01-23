'use client';

import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useDomain } from "@/app/context/DomainContext";
import { DropDownMenu } from "./components/dropdownMenu";
import { Filter } from "./components/filter";
import Image from "next/image";
import { formatCurrency } from "@/app/utils/FormatCurrency";
import { calculatePercentage } from "@/app/utils/formatDiscount";
import { Button } from "@/components/ui/button";
import { SearchDinamic } from "./services/SearchDinamic";
import { useState } from "react";

export default function Search() {
    const { subdomain } = useDomain();
    const [selectedOrder, setSelectedOrder] = useState<string>('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    // Ordenação dos produtos
    const pageSize = 10; // Número de itens por página

    // Configuração do useInfiniteQuery
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['SearchDinamic', query, selectedOrder],
        queryFn: ({ pageParam = 0 }) =>
            SearchDinamic({ search: query, page: pageParam + 1, pageSize, subdomain, orderBy: selectedOrder }),
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length;

            if (currentPage < lastPage?.totalPages) {
                return currentPage;
            } else {
                return undefined; // Para a paginação quando a última página for atingida
            }
        }, // Define a próxima página com base na resposta do servidor
        enabled: !!query,
        initialPageParam: 0 // Só executa se "query" não estiver vazio
    });

    if (isLoading) return <p>Carregando...</p>;
    if (isError) return <p>Ocorreu um erro ao carregar os dados.</p>;

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

    const handleOrderChange = (value: string) => {
        setSelectedOrder(value); // Atualiza o estado do componente pai com a opção selecionada// Aqui você pode usar o valor conforme necessário
    };

    function OriginalCustomValue(numberOne: number, numberTwo: number) {
        const total = Number(numberOne) + Number(numberTwo)

        return total
    }


    //fazer pagina de produtos com desconto.

    return (
        <div className="px-4 mt-5">
            <p className="font-medium text-text mb-4 text-lg">
                Você buscou por <span className="font-bold">{query}</span>
            </p>

            {/* Filtros e Menu */}
            <div className="flex items-center justify-between mb-6">
                <DropDownMenu onOrderChange={handleOrderChange} />
                <Filter />
            </div>

            {/* Produtos */}
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
                                        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
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
    );
}
