import produtoImg from "@/assets/Produto.jpg"; // atualize o caminho da imagem
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";

const produtos = [
    { id: 1, nome: "Kaiak Tradicional - 100ml", imagem: produtoImg, precoAntigo: "R$ 199,99", precoAtual: "R$ 99,99" },
    { id: 2, nome: "Essencial Exclusivo - 100ml", imagem: produtoImg, precoAntigo: "R$ 219,99", precoAtual: "R$ 109,99" },
    { id: 3, nome: "Luna Feminino - 75ml", imagem: produtoImg, precoAntigo: "R$ 179,99", precoAtual: "R$ 89,99" },
    { id: 4, nome: "Humor a Dois - 100ml", imagem: produtoImg, precoAntigo: "R$ 149,99", precoAtual: "R$ 79,99" },
    { id: 5, nome: "Kaiak Aventura - 100ml", imagem: produtoImg, precoAntigo: "R$ 199,99", precoAtual: "R$ 99,99" },
    { id: 6, nome: "Essencial Supreme - 100ml", imagem: produtoImg, precoAntigo: "R$ 239,99", precoAtual: "R$ 119,99" },
];

;

export function OnSale() {

    const [quantity, setQuantity] = useState<number>(0); // Estado para a quantidade

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta)); // Impede que a quantidade fique abaixo de 1
    }

    return (
        <div className="flex overflow-x-scroll space-x-4">
            {produtos.map((produto) => (
                <div
                    key={produto.id}
                    className="flex-none w-64 p-4 rounded-lg border"
                    style={{ minWidth: "250px" }} // garante que cada item tenha largura fixa no carrossel
                >
                    <img src={produto.imagem} alt={produto.nome} className="mb-3" />
                    <p className="font-semibold mb-1 text-sm">{produto.nome}</p>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="line-through text-xs text-gray-500">{produto.precoAntigo}</p>
                            <p className="font-semibold text-xl text-primary">{produto.precoAtual}</p>
                        </div>
                        <Drawer>
                            <DrawerTrigger className="text-2xl text-text">
                                <IoCartOutline />
                            </DrawerTrigger>
                            <DrawerContent className="">
                                <DrawerHeader>
                                    <DrawerTitle className="text-start">
                                        <img src={produto.imagem} alt="" />
                                        {produto?.nome}
                                    </DrawerTitle>
                                    <DrawerDescription className="text-start my-3">
                                        <p className="line-through text-xs">
                                            R$ {(Number(produto?.precoAntigo) / 100).toFixed(2)}
                                        </p>
                                        <p className="font-semibold text-xl">
                                            R$ {(Number(produto?.precoAtual) / 100).toFixed(2)}
                                        </p>
                                    </DrawerDescription>
                                    <div className="flex gap-2">
                                        <Button
                                            size={'icon'}
                                            onClick={() => handleQuantityChange(-1)}
                                            type='button'
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
                                        >
                                            +
                                        </Button>
                                    </div>
                                </DrawerHeader>
                                <DrawerFooter>
                                    <Button>Adicionar ao carrinho</Button>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </div>

                </div>
            ))}
        </div>
    );
}
