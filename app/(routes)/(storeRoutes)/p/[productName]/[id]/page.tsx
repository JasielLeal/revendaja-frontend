'use client';

import { useQuery } from "@tanstack/react-query";
import { FindProductInStock } from "./services/findProductInStock";
import * as React from 'react';
import Image from "next/image";
import { formatCurrency } from "@/app/utils/FormatCurrency";
import { Button } from "@/components/ui/button";
import { calculatePercentage } from "@/app/utils/formatDiscount";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);

    const [subdomain, setSubdomain] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const host = window.location.host;
            setSubdomain(host.split('.')[0]);
        }
    }, []);

    const { data } = useQuery({
        queryKey: ["findProductInStock", id],
        queryFn: () => {
            if (subdomain) {
                return FindProductInStock(subdomain, id);
            }
            return null;
        },
        enabled: !!subdomain, // Só executa a query quando `subdomain` estiver definido
    });

    const product = data?.data?.product;
    const discountPercentage = calculatePercentage(
        Number(data?.data?.discountValue),
        Number(data?.data?.customPrice)
    );

    const router = useRouter();
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product.id,
                quantity: 1,
                imgUrl: product.imgUrl,
                name: product.name,
                value: data?.data?.customPrice,
                quantityInStock: product.quantity || data?.data?.quantity,
            });
            router.push('/cart');
        }
    };

    if (!product) {
        return null; // Certifique-se de retornar algo válido
    }

    function OriginalCustomValue(numberOne: number, numberTwo: number) {
        const total = Number(numberOne) + Number(numberTwo);
        return total;
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
                    <Image
                        src={product?.imgUrl}
                        alt={product?.name}
                        className="mb-3 rounded-xl"
                        priority
                        width={100}
                        height={100}
                        layout="responsive"
                    />
                </div>
            </div>
            <p className="text-xs text-gray-400 mt-5">{product?.brand}</p>
            <p className="font-semibold mb-2 text-text line-clamp-2">{product?.name}</p>
            <p className="text-xs text-gray-400 mb-5">{product?.description}</p>

            <p className="text-sm text-text text-medium mb-3">Estoque disponivel: 
                <span className="text-text font-semibold ml-1">
                     { product.quantity || data?.data?.quantity}
                </span>

            </p>

            {
                (data?.data?.quantity > 0 || product.quantity > 0) ?
                    <>
                        <div className="flex items-center justify-between">
                            {data?.data?.discountValue ? (
                                <>
                                    <div>
                                        <p className="line-through text-xs text-gray-500">
                                            R$ {formatCurrency(String(OriginalCustomValue(data?.data?.discountValue, data?.data?.customPrice)))}
                                        </p>
                                        <p className="font-semibold text-xl text-text">
                                            R$ {formatCurrency(String(data?.data?.customPrice))}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <p className="line-through text-xs text-gray-500">
                                            R$ {formatCurrency(String(product?.normalPrice))}
                                        </p>
                                        <p className="font-semibold text-xl text-text">
                                            R$ {formatCurrency(String(data?.data?.customPrice))}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                        <Button className="w-full mt-5 mb-10" onClick={handleAddToCart}>
                            Adicionar ao carrinho
                        </Button>
                    </>
                    :

                    <>
                        <div className="flex items-center justify-between">
                            {data?.data?.discountValue ? (
                                <>
                                    <div>
                                        <p className="line-through text-xs text-gray-500">
                                            R$ {formatCurrency(String(OriginalCustomValue(data?.data?.discountValue, data?.data?.customPrice)))}
                                        </p>
                                        <p className="font-semibold text-xl text-text">
                                            R$ {formatCurrency(String(data?.data?.customPrice))}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <p className="text-red-500">
                                            Produto esgotado
                                        </p>

                                    </div>
                                </>
                            )}
                        </div>
                        <Button className="w-full mt-5 mb-10" onClick={handleAddToCart} disabled>
                            Sem estoque
                        </Button>
                    </>
            }

        </div>
    );
}
