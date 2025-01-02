'use client'

import { useQuery } from "@tanstack/react-query";
import { FindProductInStock } from "./services/findProductInStock";
import * as React from 'react'
import Image from "next/image";
import { formatCurrency } from "@/app/utils/FormatCurrency";
import { Button } from "@/components/ui/button";
import { calculatePercentage } from "@/app/utils/formatDiscount";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = React.use(params);

    const host = window.location.host;
    const subdomain = host.split('.')[0];

    const { data } = useQuery({
        queryKey: ["findProductInStock", id],
        queryFn: () => FindProductInStock(subdomain, id)

    })

    const product = data?.data.product

    const discountPercentage = calculatePercentage(Number(product?.normalPrice), Number(data?.data?.customPrice)).percentage;

    if (!product) {
        return
    }

    return (
        <div className="mt-7 px-5">

            <div className="relative">
                {data?.data?.discountValue !== null && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                        {discountPercentage.toFixed(0)}% OFF
                    </div>
                )}
                <div className="flex items-center w-full justify-center">
                    <Image src={product?.imgUrl} alt={product?.name} className="mb-3 rounded-xl" priority width={100} height={100} layout="responsive" />
                </div>
            </div>
            <p className="text-xs text-gray-400 mt-5">{product?.brand}</p>
            <p className="font-semibold mb-2 text-text line-clamp-2">{product?.name}</p>
            <p className="text-xs text-gray-400 mb-5">{product?.description}</p>
            <div className="flex items-center justify-between">
                <div>
                    <p className="line-through text-xs text-gray-500">R$ {formatCurrency(String(product?.normalPrice))}</p>
                    <p className="font-semibold text-xl text-text">R$ {formatCurrency(String(data?.data?.customPrice))}</p>
                </div>
            </div>

            <Button className="w-full mt-5 mb-10">Adicionar ao carrinho</Button>

        </div>
    );
}