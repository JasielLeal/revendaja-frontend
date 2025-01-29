import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddProducts() {
    return (
        <>
            <h1 className="text-white font-medium">Produtos / Adicionar Produtos</h1>

            <div className="mt-7">
                <div className="flex gap-4">
                    <div className="mb-4">
                        <p className="text-[#ACACAC] ">Nome</p>
                        <Input className="bg-[#27272a] w-96 text-white" />
                    </div>
                    <div className="mb-4">
                        <p className="text-[#ACACAC]">Marca</p>
                        <Input className="bg-[#27272a] w-96 text-white" />
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="mb-4">
                        <p className="text-[#ACACAC]">Empresa</p>
                        <Input className="bg-[#27272a] w-96 text-white" />
                    </div>
                    <div className="mb-4">
                        <p className="text-[#ACACAC]">Descrição</p>
                        <Input className="bg-[#27272a] w-96 text-white" />
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="mb-4">
                        <p className="text-[#ACACAC]">Preço Normal</p>
                        <Input className="bg-[#27272a] w-96 text-white" />
                    </div>
                    <div className="mb-4">
                        <p className="text-[#ACACAC]">Preço Sugerido</p>
                        <Input className="bg-[#27272a] w-96 text-white" />
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="mb-4">
                        <p className="text-[#ACACAC]">Codigo de Barras</p>
                        <Input className="bg-[#27272a] w-96 text-white" />
                    </div>
                    <div className="mb-4">
                        <p className="text-[#ACACAC]">Categoria</p>
                        <Input className="bg-[#27272a] w-96 text-white" />
                    </div>
                </div>
                <div className="mb-4">
                    <p className="text-[#ACACAC]">Imagem</p>
                    <Input className="bg-[#27272a] w-96 text-white" type="file" />
                </div>

                <Button className="w-[780px] mt-7">Cadastrar</Button>
            </div>

        </>
    )
}