import Image from "next/image";
import { Title } from "../title";
import { Badge } from "../ui/badge";
import heroImage from "@/public/hero.png"
import { Button } from "../ui/button";
import { MotionSection } from "./motion-section";

export function SignUp() {
    return (
        <MotionSection className="bg-[#F7F7F7] py-12 md:py-20">
            <div className="text-center flex flex-col items-center my-6 md:my-10 max-w-[1250px] mx-auto px-4">
                <Badge>
                    Inscreva-se agora
                </Badge>
                <div className="my-3 md:my-4 max-w-[550px]">
                    <Title>
                        Baixe nosso aplicativo e transforme sua revenda hoje
                    </Title>
                </div>
                <p className="text-gray-500 text-sm md:text-base max-w-2xl my-4 md:my-5">
                    Junte-se a milhares de profissionais que já utilizam nossa plataforma.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 mb-5 w-full justify-center">
                    <Button className="rounded-4xl w-full sm:w-auto">
                        Baixe na App Store.
                    </Button>
                    <Button className="rounded-4xl w-full sm:w-auto" variant={"outline"}>
                        Baixe na Play Store.
                    </Button>
                </div>

                <Image src={heroImage} alt="Hero Image" width={500} className="w-full max-w-[360px] sm:max-w-[420px] md:max-w-[500px] h-auto" />
            </div>
        </MotionSection>
    )
}
