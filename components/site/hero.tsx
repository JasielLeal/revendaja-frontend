import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import heroImage from "@/public/hero.png";
import { MotionSection } from "./motion-section";
import Link from "next/link";

export function Hero() {
  return (
    <MotionSection className="w-full flex items-center justify-center bg-[#F7F7F7] min-h-[70vh] md:min-h-screen pt-14 md:pt-0">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 py-10 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="col-span-1 text-center lg:text-left">
            <Badge className="hidden mb:block mb-2 max-w-full whitespace-normal text-center lg:text-left">
              Melhor aplicativos de gestão de revendedoras de cosméticos
            </Badge>
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0C0407]">
              Leve sua revenda ao próximo nível com gestão profissional.
            </p>
            <p className="my-4 md:my-5 text-gray-500 text-sm md:text-base">
              Gestão profissional e organizada para levar sua revenda ao próximo
              nível de crescimento, com mais controle, estratégia e resultados
            </p>
            {/* <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-5">
                            <Button className="rounded-4xl w-full sm:w-auto">
                                Baixe na App Store.
                            </Button>
                            <Button className="rounded-4xl w-full sm:w-auto" variant={"outline"}>
                                Baixe na Play Store.
                            </Button>
                        </div> */}
            <Link href="https://www.linkedin.com/company/revendaja-%E2%80%93-gest%C3%A3o-para-perfumarias/" target="_blank" className="mt-6 inline-block">
              <Button className="rounded-4xl w-full sm:w-auto">
                Garanta acesso antecipado.
              </Button>
            </Link>
          </div>
          <div className="col-span-1 flex justify-center lg:justify-end">
            <Image
              src={heroImage}
              alt="Hero Image"
              width={1200}
              className="w-full max-w-[520px] md:max-w-[650px] lg:max-w-[750px] h-auto"
            />
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
