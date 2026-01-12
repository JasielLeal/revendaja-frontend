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
    normalPrice: z.string().min(1, "Preço normal é obrigatório"),
    suggestedPrice: z.string().min(1, "Preço sugerido é obrigatório"),
    barcode: z.string().min(1, "Código de barras é obrigatório"),
    image: z.any().optional(),
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
                className={`mb-3 ${erros.nome ? "border-red-500 border-2" : ""}`}
            />
            {erros.nome && <p className="text-red-600 text-sm mb-2">⚠️ {erros.nome}</p>}
            <Label className="mb-2">Linha</Label>
            <Input
                ref={linhaRef}
                placeholder="Linha do Produto"
                className={`mb-3 ${erros.linha ? "border-red-500 border-2" : ""}`}
            />
            {erros.linha && <p className="text-red-600 text-sm mb-2">⚠️ {erros.linha}</p>}
            <Label className="mb-2">Marca</Label>
            <Select value={marcaValue} onValueChange={(value) => {
                setMarcaValue(value);
            }}>
                <SelectTrigger className={`w-full mb-3 ${erros.marca ? "border-red-500 border-2" : ""}`}>
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
                    </SelectGroup>
                </SelectContent>
            </Select>
            {erros.marca && <p className="text-red-600 text-sm mb-2">⚠️ {erros.marca}</p>}
            <Label className="mb-2">Categoria</Label>
            <Select value={categoriaValue} onValueChange={(value) => {
                setCategoriaValue(value);
            }}>
                <SelectTrigger className={`w-full mb-3 ${erros.categoria ? "border-red-500 border-2" : ""}`}>
                    <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Categoria</SelectLabel>
                        <SelectItem value="perfume-feminino">Perfume Feminino</SelectItem>
                        <SelectItem value="perfume-masculino">Perfume Masculino</SelectItem>
                        <SelectItem value="perfume-unissex">Perfume Unissex</SelectItem>
                        <SelectItem value="oleos">Oleos</SelectItem>
                        <SelectItem value="hidratantes-cremes">Hidratantes e Cremes</SelectItem>
                        <SelectItem value="corpo-banho">Corpo e Banho</SelectItem>
                        <SelectItem value="infantil">Infantil</SelectItem>
                        <SelectItem value="desodorantes">Desodorantes</SelectItem>
                        <SelectItem value="body-splash">Body Splash</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            {erros.categoria && <p className="text-red-600 text-sm mb-2">⚠️ {erros.categoria}</p>}
            <div className="flex items-center gap-4 mb-3">
                <div className="w-full">
                    <Label className="mb-2">Preço Normal</Label>
                    <Input
                        ref={precoNormalRef}
                        placeholder="R$ 0,00"
                        className={`mb-3 ${erros.precoNormal ? "border-red-500 border-2" : ""}`}
                        onChange={() => handlePriceChange(precoNormalRef)}
                    />
                    {erros.precoNormal && <p className="text-red-600 text-sm mb-2">⚠️ {erros.precoNormal}</p>}
                </div>
                <div className="w-full">
                    <Label className="mb-2">Preço Sugerido</Label>
                    <Input
                        ref={precoSugeridoRef}
                        placeholder="R$ 0,00"
                        className={`mb-3 ${erros.precoSugerido ? "border-red-500 border-2" : ""}`}
                        onChange={() => handlePriceChange(precoSugeridoRef)}
                    />
                    {erros.precoSugerido && <p className="text-red-600 text-sm mb-2">⚠️ {erros.precoSugerido}</p>}
                </div>
            </div>
            <Label className="mb-2">Codigo de Barras</Label>
            <Input
                ref={codigoBarrasRef}
                placeholder="Codigo de barras"
                className={`mb-3 ${erros.codigoBarras ? "border-red-500 border-2" : ""}`}
            />
            {erros.codigoBarras && <p className="text-red-600 text-sm mb-2">⚠️ {erros.codigoBarras}</p>}
            <Label className="mb-2">Escolha a imagem</Label>
            <Input ref={imagemRef} className="mb-3" type="file" />

            <Button
                onClick={handleSubmit}
                className="mt-4 w-full"
            >
                Finalizar
            </Button>
        </div>
    )
}