import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { FindProductById } from "./services/FindProductById";
import { Button } from "@/components/ui/button";
import { IoChevronBackOutline } from "react-icons/io5";
import { formatCurrency } from "@/utils/FormatCurrency";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export function DetailsProduct() {
    const { produtoId } = useParams();
    const subdomain = window.location.hostname.split('.')[0];
    const navigate = useNavigate();

    // Chama os hooks de forma consistente e fora de qualquer condição
    const { data: Product, isLoading } = useQuery({
        queryKey: ["FindProductById"],
        queryFn: () => FindProductById(String(produtoId), subdomain)
    });

    const [quantity, setQuantity] = useState<number>(1); // Inicializa com 1 para evitar 0

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta)); // Impede que a quantidade fique abaixo de 1
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="mb-10">
            <Button size={'icon'} onClick={() => navigate(`/produtos`)}>
                <IoChevronBackOutline />
            </Button>
            <img src={Product?.data.product.imgUrl} alt={Product?.data.product.name} />
            <p className="text-2xl font-semibold">{Product?.data.product.name}</p>
            <p className="font-medium text-sm mb-5 text-gray-700">{Product?.data.product.description}</p>
            <p className="font-medium text-gray-400">
                De <span className="line-through">R$ {formatCurrency(Product?.data.product.normalPrice)}</span>
            </p>
            <p className="text-2xl font-semibold">R$ {formatCurrency(Product?.data.product.suggestedPrice)}</p>
            <div className="flex gap-2 my-5">
                <Button
                    size={'icon'}
                    onClick={() => handleQuantityChange(-1)}
                    type='button'
                    variant={'secondary'}
                >
                    -
                </Button>
                <Input
                    value={quantity}
                    className='w-14 text-center'
                    readOnly
                />
                <Button
                    size={'icon'}
                    onClick={() => handleQuantityChange(1)}
                    type='button'
                    variant={'secondary'}
                >
                    +
                </Button>
            </div>
            <Button className="w-full mt-5">Adicionar ao carrinho</Button>
        </div>
    );
}
