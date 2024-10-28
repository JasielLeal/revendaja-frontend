import product from "@/assets/Produto.jpg"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function DeatailsToProduct() {
    return (
        <div className="grid grid-cols-2">
            <div className="flex items-center justify-center">
                <img src={product} alt="imagem do produto a venda"/>
            </div>
            <div className="text-start">
                <Badge>MAIS VENDIDO</Badge>
                <p className="font-bold text-xl mt-2 mb-5">Kaiak Aventura Masculino 100ml</p>
                <p className="text-xs">R$ 179,99</p>
                <p className="text-2xl font-semibold mb-3">R$ 99,99</p>

                <p className="font-semibold">Quantidade</p>
                <div className="flex items-center gap-3 mt-3">
                    <Button size={'icon'} variant={'default'}>-</Button>
                    <p className="font-semibold">1</p>
                    <Button size={'icon'} variant={'default'}>+</Button>
                </div>
                <Button className="mt-10 w-full">
                    Adiconar ao Estoque
                </Button>
            </div>
        </div>
    )
}