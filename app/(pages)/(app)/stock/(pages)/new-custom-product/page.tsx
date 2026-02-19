'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useCreateProductForCatalog } from "./services/use-create-product-for-catalog";

const productSchema = z.object({
    name: z.string().min(1, "Nome do produto é obrigatório"),
    brand: z.string().min(1, "Linha é obrigatória"),
    company: z.string().min(1, "Marca é obrigatória"),
    category: z.string().min(1, "Categoria é obrigatória"),
    normalPrice: z.string().min(1, "Preço normal é obrigatório").refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0,
        "Preço normal deve ser um valor válido maior que 0"
    ),
    suggestedPrice: z.string().min(1, "Preço sugerido é obrigatório").refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0,
        "Preço sugerido deve ser um valor válido maior que 0"
    ),
    barcode: z.string().min(1, "Código de barras é obrigatório"),
    image: z.any().refine(
        (file) => file instanceof File || (file && file.size > 0),
        "Imagem é obrigatória"
    ),
});

// Função para capitalizar o nome do produto de forma elegante
const formatarNomeProduto = (nome: string): string => {
    return nome
        .trim()
        .toLowerCase()
        .split(" ")
        .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(" ");
};

// Função para formatar valor em PT-BR
const formatarValorPTBR = (valor: string): string => {
    // Remove tudo que não é número
    const apenasNumeros = valor.replace(/\D/g, "");

    if (!apenasNumeros) return "";

    // Converte para número e formata
    const numero = parseInt(apenasNumeros, 10) / 100;
    return numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
};

// Função para remover formatação e pegar apenas o valor numérico
const removerFormatacao = (valor: string): string => {
    return valor.replace(/\D/g, "");
};

export default function NewCustomProduct() {
    const nomeRef = useRef<HTMLInputElement>(null);
    const linhaRef = useRef<HTMLInputElement>(null);
    const precoNormalRef = useRef<HTMLInputElement>(null);
    const precoSugeridoRef = useRef<HTMLInputElement>(null);
    const codigoBarrasRef = useRef<HTMLInputElement>(null);
    const imagemRef = useRef<HTMLInputElement>(null);
    const [marcaValue, setMarcaValue] = useState("");
    const [categoriaValue, setCategoriaValue] = useState("");
    const [erros, setErros] = useState<{ [key: string]: string }>({});
    const createProduct = useCreateProductForCatalog()

    const handlePriceChange = (ref: React.RefObject<HTMLInputElement | null>) => {
        if (ref.current) {
            const valor = ref.current.value;
            const formatado = formatarValorPTBR(valor);
            ref.current.value = formatado;
        }
    };

    const handleSubmit = async () => {
        const nome = nomeRef.current?.value?.trim() || "";
        const linha = linhaRef.current?.value?.trim() || "";
        const precoNormal = removerFormatacao(precoNormalRef.current?.value || "");
        const precoSugerido = removerFormatacao(precoSugeridoRef.current?.value || "");
        const codigoBarras = codigoBarrasRef.current?.value?.trim() || "";


        const formData = {
            name: formatarNomeProduto(nome),
            brand: linha,
            company: marcaValue,
            category: categoriaValue,
            normalPrice: precoNormal,
            suggestedPrice: precoSugerido,
            barcode: codigoBarras,
            image: imagemRef.current?.files?.[0],
        };

        try {
            const validatedData = productSchema.parse(formData);
            setErros({});
            console.log("✅ Dados validados com sucesso:", validatedData);

            await createProduct.mutateAsync({
                name: validatedData.name,
                brand: validatedData.brand,
                company: validatedData.company,
                barcode: validatedData.barcode,
                category: validatedData.category,
                priceNormal: validatedData.normalPrice,
                priceSuggested: validatedData.suggestedPrice,
                image: validatedData.image,
            });

            toast.success("Produto adicionado com sucesso!");
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Cria um objeto com os erros mapeados por campo
                const errosMapeados: { [key: string]: string } = {};
                error.issues.forEach((err: z.ZodIssue) => {
                    const campo = err.path.join(".");
                    errosMapeados[campo] = err.message;
                });
                setErros(errosMapeados);

                console.error("❌ Erro de validação:", error.issues);
                toast.error("Preencha todos os campos obrigatórios!");
            } else {
                console.error("❌ Erro ao criar produto:", error);
                toast.error("Erro ao criar produto. Tente novamente.");
            }
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl ">

            <Label className="mb-2">Nome do Produto</Label>
            <Input
                ref={nomeRef}
                placeholder="Produto Personalizado"
                className={`mb-3 ${erros.name ? "border-red-500 border-2" : ""}`}
            />
            {erros.name && <p className="text-red-600 text-sm mb-2">⚠️ {erros.name}</p>}
            <Label className="mb-2">Linha</Label>
            <Input
                ref={linhaRef}
                placeholder="Linha do Produto"
                className={`mb-3 ${erros.brand ? "border-red-500 border-2" : ""}`}
            />
            {erros.brand && <p className="text-red-600 text-sm mb-2">⚠️ {erros.brand}</p>}
            <Label className="mb-2">Marca</Label>
            <Select value={marcaValue} onValueChange={(value) => {
                setMarcaValue(value);
                const { company, ...rest } = erros;
                setErros(rest);
            }}>
                <SelectTrigger className={`w-full mb-3 ${erros.company ? "border-red-500 border-2" : ""}`}>
                    <SelectValue placeholder="Selecione uma marca" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Marca</SelectLabel>
                        <SelectItem value="natura">Natura</SelectItem>
                        <SelectItem value="boticario">Boticario</SelectItem>
                        <SelectItem value="eudora">Eudora</SelectItem>
                        <SelectItem value="avon">Avon</SelectItem>
                        <SelectItem value="jequiti">Jequiti</SelectItem>
                        <SelectItem value="Salon Line">Salon Line</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            {erros.company && <p className="text-red-600 text-sm mb-2">⚠️ {erros.company}</p>}
            <Label className="mb-2">Categoria</Label>
            <Select value={categoriaValue} onValueChange={(value) => {
                setCategoriaValue(value);
                const { category, ...rest } = erros;
                setErros(rest);
            }}>
                <SelectTrigger className={`w-full mb-3 ${erros.category ? "border-red-500 border-2" : ""}`}>
                    <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Categoria</SelectLabel>
                        <SelectItem value="Perfume Feminino">Perfume Feminino</SelectItem>
                        <SelectItem value="Perfume Masculino">Perfume Masculino</SelectItem>
                        <SelectItem value="Perfume Unissex">Perfume Unissex</SelectItem>
                        <SelectItem value="Oleos">Oleos</SelectItem>
                        <SelectItem value="Hidratantes e Cremes">Hidratantes e Cremes</SelectItem>
                        <SelectItem value="Corpo e Banho">Corpo e Banho</SelectItem>
                        <SelectItem value="Infantil">Infantil</SelectItem>
                        <SelectItem value="Desodorantes">Desodorantes</SelectItem>
                        <SelectItem value="Body Splash">Body Splash</SelectItem>
                        <SelectItem value="Acessórios">Acessórios</SelectItem>
                        <SelectItem value="Maquiagem">Maquiagem</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            {erros.category && <p className="text-red-600 text-sm mb-2">⚠️ {erros.category}</p>}
            <div className="flex items-center gap-4 mb-3">
                <div className="w-full">
                    <Label className="mb-2">Preço Normal</Label>
                    <Input
                        ref={precoNormalRef}
                        placeholder="R$ 0,00"
                        className={`mb-3 ${erros.normalPrice ? "border-red-500 border-2" : ""}`}
                        onChange={() => handlePriceChange(precoNormalRef)}
                    />
                    {erros.normalPrice && <p className="text-red-600 text-sm mb-2">⚠️ {erros.normalPrice}</p>}
                </div>
                <div className="w-full">
                    <Label className="mb-2">Preço Sugerido</Label>
                    <Input
                        ref={precoSugeridoRef}
                        placeholder="R$ 0,00"
                        className={`mb-3 ${erros.suggestedPrice ? "border-red-500 border-2" : ""}`}
                        onChange={() => handlePriceChange(precoSugeridoRef)}
                    />
                    {erros.suggestedPrice && <p className="text-red-600 text-sm mb-2">⚠️ {erros.suggestedPrice}</p>}
                </div>
            </div>
            <Label className="mb-2">Codigo de Barras</Label>
            <Input
                ref={codigoBarrasRef}
                placeholder="Codigo de barras"
                className={`mb-3 ${erros.barcode ? "border-red-500 border-2" : ""}`}
            />
            {erros.barcode && <p className="text-red-600 text-sm mb-2">⚠️ {erros.barcode}</p>}
            <Label className="mb-2">Escolha a imagem</Label>
            <Input ref={imagemRef} className={`mb-3 ${erros.image ? "border-red-500 border-2" : ""}`} type="file" />
            {erros.image && <p className="text-red-600 text-sm mb-2">⚠️ {erros.image}</p>}

            <Button
                onClick={handleSubmit}
                className="mt-4 w-full"
            >
                Finalizar
            </Button>
        </div>
    )
}