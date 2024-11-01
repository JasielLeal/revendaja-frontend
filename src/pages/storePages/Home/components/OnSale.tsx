import { Button } from "@/components/ui/button";
import produtoImg from "@/assets/Produto.jpg"; // atualize o caminho da imagem

const produtos = [
    {
        id: 1,
        nome: "Kaiak Tradicional - 100ml",
        imagem: produtoImg,
        precoAntigo: "R$ 199,99",
        precoAtual: "R$ 99,99",
    },
    {
        id: 2,
        nome: "Essencial Exclusivo - 100ml",
        imagem: produtoImg,
        precoAntigo: "R$ 219,99",
        precoAtual: "R$ 109,99",
    },
    {
        id: 3,
        nome: "Luna Feminino - 75ml",
        imagem: produtoImg,
        precoAntigo: "R$ 179,99",
        precoAtual: "R$ 89,99",
    },
    {
        id: 4,
        nome: "Humor a Dois - 100ml",
        imagem: produtoImg,
        precoAntigo: "R$ 149,99",
        precoAtual: "R$ 79,99",
    },
    {
        id: 5,
        nome: "Kaiak Aventura - 100ml",
        imagem: produtoImg,
        precoAntigo: "R$ 199,99",
        precoAtual: "R$ 99,99",
    },
    {
        id: 6,
        nome: "Essencial Supreme - 100ml",
        imagem: produtoImg,
        precoAntigo: "R$ 239,99",
        precoAtual: "R$ 119,99",
    },
];

export function OnSale() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {produtos.map((produto) => (
                <div key={produto.id} className="border p-2 rounded-lg">
                    <img src={produto.imagem} alt={produto.nome} />
                    <p className="font-semibold mb-3 text-sm">{produto.nome}</p>
                    <p className="line-through text-xs">{produto.precoAntigo}</p>
                    <p className="font-semibold text-xl">{produto.precoAtual}</p>
                    <Button className="w-full mt-3">Adicionar</Button>
                </div>
            ))}
        </div>
    );
}

