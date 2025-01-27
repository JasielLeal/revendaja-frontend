'use client'

import { useDomain } from "@/app/context/DomainContext";
import { useQuery } from "@tanstack/react-query";
import { FindNewProducts } from "../services/FindNewProducts";
import { formatCurrency } from "@/app/utils/FormatCurrency";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { calculatePercentage } from "@/app/utils/formatDiscount";
import { Skeleton } from "@/components/ui/skeleton";

export function NewProductsList() {
    const { storeData } = useDomain();
    const router = useRouter();

    // Query para pegar os produtos recomendados
    const { data: recommendedProducts, isLoading } = useQuery({
        queryKey: ["FindNewProducts", storeData?.subdomain],
        queryFn: () => FindNewProducts(storeData?.subdomain),
        enabled: !!storeData?.subdomain,
    });

    // Tipo para os produtos
    type Product = {
        id: number;
        normalPrice: string;
        customPrice: string;
        discountValue: string;
        quantity: number;
        product: ProductDetails;
        customProduct: ProductDetails;
    };

    type ProductDetails = {
        id: number;
        name: string;
        brand: string;
        imgUrl: string;
        normalPrice: string;
    };

    // Função para renderizar o preço
    const renderPrice = (promotion: Product) => {
        const isDiscounted = promotion.discountValue && promotion.discountValue !== '0';
        const originalPrice = isDiscounted
            ? String(Number(promotion.discountValue) + Number(promotion.customPrice))
            : promotion.normalPrice;

        return (
            <div className="flex flex-col">
                <p className="line-through text-xs text-gray-500">R$ {formatCurrency(String(originalPrice))}</p>
                <p className="font-semibold text-xl text-text">R$ {formatCurrency(String(promotion?.customPrice))}</p>
            </div>
        );
    };

    // Função para renderizar a quantidade
    const renderQuantity = (promotion: Product) => {
        return promotion.quantity === 0 ? (
            <p className="text-red-500">Produto esgotado</p>
        ) : (
            renderPrice(promotion)
        );
    };

    return (
        <>
            <div className="flex items-center justify-between mb-4 mt-10">
                <p className="text-text font-medium">Produtos Recentes</p>
            </div>

            <div className="flex overflow-x-scroll space-x-3 no-scrollbar">
                {isLoading ? (
                    // Skeletons enquanto os dados estão carregando
                    <div className="flex gap-2">
                        {[...Array(3)].map((_, index) => (
                            <Skeleton key={index} className="w-[170px] h-[290px] rounded-xl" />
                        ))}
                    </div>
                ) : (
                    // Renderiza os produtos quando os dados são carregados
                    recommendedProducts?.map((promotion: Product) => {
                        const product = promotion.product || promotion.customProduct;
                        const discountPercentage = calculatePercentage(
                            Number(promotion.discountValue),
                            Number(promotion.customPrice)
                        );

                        return (
                            <div
                                key={product.id}
                                className="flex flex-col justify-between w-36 rounded-lg"
                                style={{ minWidth: "170px" }}
                                onClick={() => router.push(`/p/${product.name}/${product.id}`)}
                            >
                                <div>
                                    <div className="relative">
                                        {promotion.discountValue && (
                                            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                                                {discountPercentage.toFixed(0)}% OFF
                                            </div>
                                        )}
                                        <div className="flex items-center w-full justify-center">
                                            <Image
                                                src={product.imgUrl || '/path/to/defaultImage.jpg'}
                                                alt={product.name}
                                                className="mb-3 rounded-xl"
                                                width={170}
                                                height={170}
                                                priority
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400">{product.brand}</p>
                                    <p className="font-semibold mb-2 text-text text-sm line-clamp-2">{product.name}</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    {renderQuantity(promotion)}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
}
