'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProductsSchema } from "./schemas/AddProductsSchema";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AddProductsGlobals } from "./services/addProductGlobals";
import { useRef } from "react";

export default function AddProducts() {

    const imageRef = useRef<HTMLInputElement | null>(null);  // Ref para o input file

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
    });

    const onSubmit = async (data: FieldValues) => {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('brand', data.brand);
        formData.append('company', data.company);
        formData.append('normalPrice', data.normalPrice);
        formData.append('suggestedPrice', data.suggestedPrice);
        formData.append('barcode', data.barcode);
        formData.append('category', data.category);

        // Usando o ref para acessar o arquivo sem re-renderizar
        if (imageRef.current?.files && imageRef.current.files.length > 0) {
            formData.append('image', imageRef.current.files[0]);
        }

        await AddProductsGlobalsFn(formData);

    };

    return (
        <>
            <h1 className="text-white font-medium">Produtos / Adicionar Produtos</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-7">
                    <div className="flex gap-4">
                        <div className="mb-4">
                            <p className="text-[#ACACAC] ">Nome</p>
                            <Input className="bg-[#27272a] w-96 text-white" {...register("name")} id="name"/>
                        </div>
                        <div className="mb-4">
                            <p className="text-[#ACACAC]">Marca</p>
                            <Input className="bg-[#27272a] w-96 text-white" {...register("brand")} id="brand"/>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="mb-4">
                            <p className="text-[#ACACAC]">Empresa</p>
                            <Input className="bg-[#27272a] w-96 text-white" {...register("company")} id="company"/>
                        </div>
                        <div className="mb-4">
                            <p className="text-[#ACACAC]">Categoria</p>
                            <Input className="bg-[#27272a] w-96 text-white" {...register("category")} id="category"/>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="mb-4">
                            <p className="text-[#ACACAC]">Preço Normal</p>
                            <Input className="bg-[#27272a] w-96 text-white" {...register("normalPrice")} id="normalPrice"/>
                        </div>
                        <div className="mb-4">
                            <p className="text-[#ACACAC]">Preço Sugerido</p>
                            <Input className="bg-[#27272a] w-96 text-white" {...register("suggestedPrice")} id="suggestedPrice"/>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="mb-4">
                            <p className="text-[#ACACAC]">Codigo de Barras</p>
                            <Input className="bg-[#27272a] w-96 text-white" {...register("barcode")} id="barcode"/>
                        </div>
                        <div className="mb-4">
                            <p className="text-[#ACACAC]">Imagem</p>
                            <Input
                                ref={imageRef}  // Usando ref para capturar o arquivo
                                className="bg-[#27272a] w-96 text-white placeholder:text-white"
                                type="file"
                                id="file_img"
                            />
                        </div>
                    </div>

                    <Button className="w-[780px] mt-7" id="sendButton">Cadastrar</Button>
                </div>
            </form>

        </>
    );
}
