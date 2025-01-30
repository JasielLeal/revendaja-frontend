'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProductsSchema } from "./schemas/AddProductsSchema";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AddProductsGlobals } from "./services/addProductGlobals";
import { useState } from "react";

export default function AddProducts() {

    const [image, setImage] = useState<File | null>(null);

    const { register, handleSubmit } = useForm({
        resolver: zodResolver(AddProductsSchema),
        mode: 'onSubmit',
        criteriaMode: 'all',
    });

    const { mutateAsync: AddProductsGlobalsFn } = useMutation({
        mutationFn: AddProductsGlobals,
        onSuccess: () => {
            console.log('sucesso');
        },
        onError: () => {
            console.log('error');
        }
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const onSubmit = (data: FieldValues) => {
        const formData = new FormData();
        formData.append('suggestedPrice', data.suggestedPrice);
        formData.append('barcode', data.barcode);
        formData.append('category', data.category);
        if (image) {
            formData.append('image', image);
        }

        // Enviar formData para o backend
        console.log(formData);
    };

    return (
        <>
            <h1 className="text-white font-medium">Produtos / Adicionar Produtos</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-7">
                    <div className="flex gap-4">
                        <div className="mb-4">
                            <p className="text-[#ACACAC] ">Nome</p>
                            <Input className="bg-[#27272a] w-96 text-white" {...register("name")} />
                        </div>
                        <div className="mb-4">
                            <p className="text-[#ACACAC]">Marca</p>
                            <Input className="bg-[#27272a] w-96 text-white" {...register("brand")} />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="mb-4">
                            <p className="text-[#ACACAC]">Empresa</p>
                            <Input className="bg-[#27272a] w-96 text-white" {...register("company")} />
                        </div>
                        <div className="mb-4">
                            <p className="text-[#ACACAC]">Descrição</p>
                            <Input className="bg-[#27272a] w-96 text-white" {...register("description")} />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="mb-4">
                            <p className="text-[#ACACAC]">Preço Normal</p>
                            <Input className="bg-[#27272a] w-96 text-white" {...register("normalPrice")} />
                        </div>
                        <div className="mb-4">
                            <p className="text-[#ACACAC]">Preço Sugerido</p>
                            <Input className="bg-[#27272a] w-96 text-white" {...register("suggestedPrice")} />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="mb-4">
                            <p className="text-[#ACACAC]">Codigo de Barras</p>
                            <Input className="bg-[#27272a] w-96 text-white" {...register("barcode")} />
                        </div>
                        <div className="mb-4">
                            <p className="text-[#ACACAC]">Categoria</p>
                            <Input className="bg-[#27272a] w-96 text-white" {...register("category")} />
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="text-[#ACACAC]">Imagem</p>
                        <Input
                            className="bg-[#27272a] w-96 text-white"
                            type="file"
                            onChange={handleImageChange}
                        />
                    </div>

                    <Button className="w-[780px] mt-7" >Cadastrar</Button>
                </div>
            </form>

        </>
    )
}