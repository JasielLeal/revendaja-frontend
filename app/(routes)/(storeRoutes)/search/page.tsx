'use client'

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SearchDinamic } from "./services/SearchDinamic";
import { useDomain } from "@/app/context/DomainContext";
import { DropDownMenu } from "./components/dropdownMenu";
import { Filter } from "./components/filter";
import Image from "next/image";
import { formatCurrency } from "@/app/utils/FormatCurrency";
import { calculatePercentage } from "@/app/utils/formatDiscount";

export default function Search() {

    const { subdomain } = useDomain()
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('query')
    const [page, setPage] = useState(1); // Controle de paginação
    const pageSize = 10; // Número de itens por página

    const { data, isLoading, isError } = useQuery({
        queryKey: ['SearchDinamic', query, page],
        queryFn: () => SearchDinamic(query, page, pageSize, subdomain),
        enabled: !!query, // Só executa a query se "query" não estiver vazio
    });

    if (isLoading) return <p>Carregando...</p>;
    if (isError) return <p>Ocorreu um erro ao carregar os dados.</p>;


    return (
        <div className="px-4 mt-5">
            <p className="font-medium text-text mb-4 text-lg">
                Você buscou por <span className="font-bold">{query}</span>
            </p>

            {/* Filtros e Menu */}
            <div className="flex items-center justify-between mb-6">
                <DropDownMenu />
                <Filter />
            </div>

            {/* Produtos */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.items.map((productResults: any) => {
                    const products = productResults.product || productResults.customProduct;

                    const discountPercentage = calculatePercentage(
                        Number(productResults.normalPrice),
                        Number(productResults.customPrice)
                    ).percentage;

                    return (
                        <div
                            key={products.id}
                            className="flex flex-col justify-between rounded-lg"
                            style={{ minWidth: "150px" }}
                            onClick={() => router.push(`/p/${products.name}/${products.id}`)}
                        >
                            {/* Imagem e Desconto */}
                            <div>
                                <div className="relative">
                                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                                        {discountPercentage.toFixed(0)}% OFF
                                    </div>
                                    <div className="flex items-center w-full justify-center">
                                        <Image src={products.imgUrl || '/path/to/defaultImage.jpg'} alt={products.name} className="mb-3 rounded-xl" width={170} height={170} priority />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400">{products.brand}</p>
                                <p className="font-semibold mb-2 text-text text-sm line-clamp-2">
                                    {products.name}
                                </p>
                            </div>

                            {/* Preços */}
                            <div className="flex flex-col mt-3">
                                <p className="line-through text-xs text-gray-500">
                                    R$ {formatCurrency(productResults.normalPrice)}
                                </p>
                                <p className="font-semibold text-lg text-text">
                                    R$ {formatCurrency(productResults.customPrice)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    )
}