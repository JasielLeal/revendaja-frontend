'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {

    const perfumes = [
        {
            nome: "Natura Homem Essence 100 ml",
            marca: "Natura",
            precoOriginal: 250.00,
            precoPromocional: 150.00,
            codigoBarras: "7899846012239",
            validade: "19/09/2025"
        },
        {
            nome: "Malbec Club 100 ml",
            marca: "O Boticário",
            precoOriginal: 289.90,
            precoPromocional: 199.90,
            codigoBarras: "7896019605123",
            validade: "10/12/2026"
        },
        {
            nome: "Egeo Dolce 90 ml",
            marca: "O Boticário",
            precoOriginal: 199.90,
            precoPromocional: 139.90,
            codigoBarras: "7891039008123",
            validade: "05/07/2025"
        },
        {
            nome: "Kaiak Aventura 100 ml",
            marca: "Natura",
            precoOriginal: 210.00,
            precoPromocional: 159.90,
            codigoBarras: "7899846054321",
            validade: "22/03/2026"
        },
        {
            nome: "Lily Eau de Parfum 75 ml",
            marca: "O Boticário",
            precoOriginal: 299.90,
            precoPromocional: 249.90,
            codigoBarras: "7896019607456",
            validade: "30/08/2026"
        },
        {
            nome: "Zaad Vision 95 ml",
            marca: "O Boticário",
            precoOriginal: 350.00,
            precoPromocional: 299.90,
            codigoBarras: "7896019609789",
            validade: "14/01/2027"
        },
        {
            nome: "Quasar Ice 125 ml",
            marca: "O Boticário",
            precoOriginal: 180.00,
            precoPromocional: 129.90,
            codigoBarras: "7896019612345",
            validade: "15/05/2026"
        },
        {
            nome: "Essencial Oud 100 ml",
            marca: "Natura",
            precoOriginal: 350.00,
            precoPromocional: 299.90,
            codigoBarras: "7899846023456",
            validade: "18/11/2026"
        },
        {
            nome: "Egeo Spicy Vibe 90 ml",
            marca: "O Boticário",
            precoOriginal: 219.90,
            precoPromocional: 179.90,
            codigoBarras: "7891039015678",
            validade: "08/09/2026"
        },
        {
            nome: "Ilía Secreto 50 ml",
            marca: "Natura",
            precoOriginal: 239.90,
            precoPromocional: 189.90,
            codigoBarras: "7899846098765",
            validade: "27/06/2027"
        }
    ];



    return (

        <>
            <h1 className="text-white font-medium">Produtos</h1>
            <div className="flex mt-7 justify-between">
                <div className="flex gap-4">
                    <Input className="bg-[#27272a] w-96" />
                    <Button>
                        Buscar
                    </Button>
                </div>
                <Button>
                    Adicionar
                </Button>
            </div>
            <table className="mt-7 w-full">
                <thead>
                    <tr className="border-b border-[#27272a] ">
                        <th className=" text-[#ACACAC] font-medium pb-2 text-left px-5">Nome</th>
                        <th className=" text-[#ACACAC] font-medium pb-2 text-left px-5">Marca</th>
                        <th className=" text-[#ACACAC] font-medium pb-2 text-left  px-5">Valor Normal</th>
                        <th className=" text-[#ACACAC] font-medium pb-2 text-left px-5">Valor Surgestivo</th>
                        <th className=" text-[#ACACAC] font-medium pb-2 text-left px-5">Codigo de Barras</th>
                        <th className=" text-[#ACACAC] font-medium pb-2 text-left px-5">Ultima Atualização</th>
                        <th className=" text-[#ACACAC] font-medium pb-2 text-left px-5"></th>
                    </tr>
                </thead>
                <tbody>
                    {perfumes.map((perfume, index) => (
                        <tr key={index} className="border-b border-[#27272a]">
                            <td className="py-4 px-5 text-white">{perfume.nome}</td>
                            <td className="py-4 px-5 text-white">{perfume.marca}</td>
                            <td className="py-4 px-5 text-white">R$ {perfume.precoOriginal.toFixed(2)}</td>
                            <td className="py-4 px-5 text-white">R$ {perfume.precoPromocional.toFixed(2)}</td>
                            <td className="py-4 px-5 text-white">{perfume.codigoBarras}</td>
                            <td className="py-4 px-5 text-white">{perfume.validade}</td>
                            <td className="py-4 px-5 text-white">{perfume.validade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    );
}