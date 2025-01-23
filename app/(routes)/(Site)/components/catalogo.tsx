import { Badge } from "@/components/ui/badge";
import avon from "@/app/assets/avon.svg"
import natura from "@/app/assets/natura.svg"
import oboticario from "@/app/assets/oboticario.svg"
import eudora from "@/app/assets/eudora.svg"
import Image from "next/image";
import Marquee from "react-fast-marquee";


export function Catalogo() {
    return (
        <div className="px-4 flex items-center justify-center flex-col">
            <Badge>
                Catálogo
            </Badge>
            <p className="text-[#0A2540] font-semibold mt-1">Nosso catalogo completos e atualizados</p>
            <p className="text-sm text-center mt-2 text-[#0A2540] ">
                Uma vasta seleção de produtos prontos para facilitar sua gestão.
                Não se preocupe com nada, nós cuidamos de tudo para você
            </p>

            <Marquee className="mt-5">
                <div className="px-5">
                    <Image alt="logo da avon" src={avon} width={100} height={100}/>
                </div>
                <div className="px-5">
                    <Image alt="logo da natura" src={natura} width={100} height={100}/>
                </div>
                <div className="px-5">
                    <Image alt="logo da oboticario" src={oboticario} width={100} height={100}/>
                </div>
                <div className="px-5">
                    <Image alt="logo da eudora" src={eudora} width={100} height={100}/>
                </div>
            </Marquee>


        </div>
    )
}