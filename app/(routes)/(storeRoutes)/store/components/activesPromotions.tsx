import Link from "next/link";
import produtoImg from "@/app/assets/Produto.jpg"; 
import Image from "next/image";

export function ActivesPromotions() {

    const produtos = [
        { id: 1, nome: "Kaiak Tradicional - 100ml", imagem: produtoImg, precoAntigo: "R$ 199,99", precoAtual: "R$ 99,99", brand: "Kaiak" },
        { id: 2, nome: "Essencial Exclusivo - 100ml", imagem: produtoImg, precoAntigo: "R$ 219,99", precoAtual: "R$ 109,99", brand: "Essencial" },
        { id: 3, nome: "Luna Feminino - 75ml", imagem: produtoImg, precoAntigo: "R$ 179,99", precoAtual: "R$ 89,99", brand: "Luna" },
        { id: 4, nome: "Humor a Dois - 100ml", imagem: produtoImg, precoAntigo: "R$ 149,99", precoAtual: "R$ 79,99", brand: "Humor" },
        { id: 5, nome: "Kaiak Aventura - 100ml", imagem: produtoImg, precoAntigo: "R$ 199,99", precoAtual: "R$ 99,99", brand: "Kaiak" },
        { id: 6, nome: "Essencial Supreme - 100ml", imagem: produtoImg, precoAntigo: "R$ 239,99", precoAtual: "R$ 119,99", brand: "Essencial" },
    ];

    return (
        <div className="px-4">
            <div className="flex items-center justify-between mb-4 mt-4">
                <p className="text-text font-medium">Promoções</p>

                <Link href={'/'} className="text-text font-medium">Ver todas</Link>
            </div>
            <div className="flex overflow-x-scroll space-x-3 ">
                {produtos.map((produto) => (
                    <div
                        key={produto.id}
                        className="flex flex-col justify-between w-36 rounded-lg"
                        style={{ minWidth: "170px" }} // garante que cada item tenha largura fixa no carrossel
                    >
                        <div>
                            <div className="flex items-center w-full justify-center">
                                <Image src={produto.imagem} alt={produto.nome} className="mb-3 rounded-xl " />
                            </div>
                            <p className="text-xs text-gray-400">{produto.brand}</p>
                            <p className="font-semibold mb-2 text-text text-sm">{produto.nome}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="line-through text-xs text-gray-500">{produto.precoAntigo}</p>
                                <p className="font-semibold text-xl text-text">{produto.precoAtual}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}