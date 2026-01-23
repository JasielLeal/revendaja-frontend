import Image from "next/image";
import { Title } from "../title";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import porque1 from "@/public/porque-1.png";
import porque2 from "@/public/porque-2.png";
import { MotionSection } from "./motion-section";

export function Porque() {
    return (
        <MotionSection className="py-12 md:py-24">
            <div className="flex flex-col items-center w-full justify-center text-center mb-10 md:mb-16 px-4">
                <Badge>
                    Por que nos escolher?
                </Badge>
                <div className="my-3 max-w-[550px]">
                    <Title>
                        Descubra por que nosso aplicativo é a melhor escolha
                    </Title>
                </div>
                <p className="text-gray-500 text-sm md:text-[14px] mb-4 max-w-[600px]">
                    Explore funcionalidades essenciais, recomendações personalizadas e ferramentas intuitivas, pensadas para ajudar você a identificar promoções e produtos certos para vender mais e lucrar melhor.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 my-10 w-full max-w-[1000px]">
                    <div className="col-span-1 flex justify-center md:justify-start">
                        <Image alt="porque1" src={porque1} width={400} className="w-full max-w-[400px]" />
                    </div>
                    <div className="col-span-1">
                        <p className="text-[#0C0407] text-2xl md:text-4xl font-semibold text-left mb-3 md:mb-4 max-w-[500px]">Criado especialmente para você!</p>
                        <p className="text-gray-500 text-sm md:text-base max-w-[500px] text-left">O Revendaja foi criado especialmente para consultores, entendendo sua rotina, seus desafios e o que realmente dá resultado na hora da venda.</p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 mt-5">
                            <Button className="rounded-4xl w-full sm:w-auto">
                                Baixe na App Store.
                            </Button>
                            <Button className="rounded-4xl w-full sm:w-auto" variant={"outline"}>
                                Baixe na Play Store.
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 mt-10 w-full max-w-[1000px]">

                    <div className="col-span-1">
                        <p className="text-[#0C0407] text-2xl md:text-4xl font-semibold text-left mb-3 md:mb-4 max-w-[500px]">Menos tempo procurando, mais tempo vendendo</p>
                        <p className="text-gray-500 text-sm md:text-base max-w-[500px] text-left">Pare de perder horas em catálogos, grupos e mensagens. No Revendaja, você encontra rapidamente promoções e produtos que realmente valem a pena revender — tudo organizado em um só lugar.</p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 mt-5">
                            <Button className="rounded-4xl w-full sm:w-auto">
                                Baixe na App Store.
                            </Button>
                            <Button className="rounded-4xl w-full sm:w-auto" variant={"outline"}>
                                Baixe na Play Store.
                            </Button>
                        </div>
                    </div>
                    <div className="col-span-1 flex justify-center md:justify-end">
                        <Image alt="porque2" src={porque2} width={400} className="w-full max-w-[400px]" />
                    </div>
                </div>
            </div>
        </MotionSection>
    )
}