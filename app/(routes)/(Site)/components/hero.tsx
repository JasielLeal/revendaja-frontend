import { Button } from "@/components/ui/button";
import { IoChevronForwardSharp } from "react-icons/io5";

export function Hero() {
    return (
        <div className="px-4">
            <p className="text-3xl font-bold text-[#0A2540] text-center mt-20">
                Simplificando a vida
                dos vendedores de
                cosméticos
            </p>
            <p className="text-center text-[#0A2540] mt-2">
                o sistema ideal para revendedores de
                cosméticos, com gestão de estoque, vendas
                e catálogos das melhores marcas
            </p>
            <div className="mt-5 flex items-center justify-center">
                <Button>
                    Começar Agora <IoChevronForwardSharp />
                </Button>
                <Button variant={'link'}>
                    Saiba mais
                </Button>
            </div>
        </div>
    )
}