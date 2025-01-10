'use client'

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { formatCurrency } from "@/app/utils/FormatCurrency";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SalePendingSchema } from "./schemas/SalePendingSchema";
import { useState } from "react";
import { CreateSalePeding } from "./services/CreateSalePending";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDomain } from "@/app/context/DomainContext";


export default function Cart() {

    interface Product {
        id: string;
        name: string
        imgUrl: string;
        value: string
        quantity: number;
    }

    const { cart, addToCart, clearCart } = useCart();
    const [transactionType, setTransactionType] = useState("");
    const router = useRouter();

    const handleIncrement = (product: Product) => {  
        addToCart({ ...product, quantity: 1 });
    };

    const handleDecrement = (product: Product) => {
       
        if (product.quantity > 1) {
            addToCart({ ...product, quantity: -1 });
        }
    };

    const totalValueOfTheProduct = (productValue: string, quantityProduct: string) => {
        const valueTotal = Number(productValue) * Number(quantityProduct)

        return valueTotal
    }

    const totalCartValue = cart.reduce((total, item) => {
        return total + totalValueOfTheProduct(item.value, String(item.quantity));
    }, 0);

    const { register, handleSubmit } = useForm({
        resolver: zodResolver(SalePendingSchema),
        mode: 'onSubmit',
        criteriaMode: 'all',
    });

    const { storeData } = useDomain()

    const { mutateAsync: createSalePedingFn } = useMutation({
        mutationFn: CreateSalePeding,
        onSuccess: (response) => {
            clearCart();
            router.push(`/congratulations?id=${response.id}&value=${response.totalPrice}&store=${storeData?.name}&client=${response.customer}`);
        },
        onError: () => {

        }
    })

    const host = window.location.host;
    const subdomain = host.split('.')[0];

    async function onSub(data: FieldValues) {

        const items = cart.map(item => ({ id: item.id, quantity: item.quantity }))

        const newData = { subdomain, customer: data.customer, numberPhone: data.numberPhone, transactionType, items }

        await createSalePedingFn(newData)
    }

    return (
        <div className="px-4 mt-5">
            <h1 className="font-semibold text-text">Meu carrinho</h1>

            {cart.map((item) => (
                <div className="flex gap-4 items-center mt-5" key={item.id}>
                    <Image src={item.imgUrl} alt="imagem do produto" width={80} height={80} className="rounded-xl" />
                    <div>
                        <p className="text-gray-600 font-medium text-sm">{item.name}</p>
                        <p className="text-text font-semibold">R$ {formatCurrency(String(totalValueOfTheProduct(item.value, String(item.quantity))))}</p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => handleDecrement(item)}
                                className="h-8 w-8 bg-gray-200 rounded-md"
                            >
                                -
                            </button>
                            <input
                                type="text"
                                value={item.quantity}
                                readOnly
                                className="w-8 text-center border-t border-b border-gray-200 h-8 rounded-md"
                            />
                            <button
                                onClick={() => handleIncrement(item)}
                                className="h-8 w-8 bg-gray-200 rounded-md"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <Separator className="my-5" />

            <div className="flex items-center justify-between">
                <p className="font-semibold text-text">Valor total</p>
                <p>R$ {formatCurrency(String(totalCartValue))}</p>
            </div>
            <form onSubmit={handleSubmit(onSub)}>
                <div className="mt-3">
                    <p className="text-gray-600 font-medium text-sm mb-1">Seu nome</p>
                    <Input placeholder="Insira seu nome" className="bg-background border mb-3" {...register("customer")} />

                    <p className=" font-medium text-sm mb-1">Seu celular</p>
                    <Input placeholder="Insira seu celular" className="bg-background border mb-3" {...register("numberPhone")} />

                    <p className="text-text font-medium text-sm mb-1">Metodo de pagamento</p>
                    <Select onValueChange={(value) => setTransactionType(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione o metodo de pagamento" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Pix">Pix</SelectItem>
                            <SelectItem value="Cartão">Cartão</SelectItem>
                            <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button className="w-full my-5">Finalizar Compra</Button>
            </form>

        </div>
    )
}