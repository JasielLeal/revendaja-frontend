import Marquee from "react-fast-marquee";
import Image from "next/image";
import NaturaLogo from "@/public/logos/natura.png"
import AvonLogo from "@/public/logos/avon-logo.png"
import OBoticarioLogo from "@/public/logos/oboticario.png"
import JequitiLogo from "@/public/logos/jequiti.png"
import QuemDisseBerenice from "@/public/logos/qdb.png"
import OUILogo from "@/public/logos/oui.png"
import EudoraLogo from "@/public/logos/eudora.png"

const brands = [
    { name: "Natura", Logo: NaturaLogo },
    { name: "O Boticário", Logo: OBoticarioLogo },
    { name: "Avon", Logo: AvonLogo },
    { name: "Eudora", Logo: EudoraLogo },
    { name: "Jequiti", Logo: JequitiLogo },
    { name: "quem disse, berenice?", Logo: QuemDisseBerenice },
    { name: "Oui", Logo: OUILogo },
];

const marqueeBrands = [...brands, ...brands];

export function Brands() {
    return (
        <section className="relative w-full bg-[#f7fafd] text-[#18182A] overflow-hidden border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-10 relative z-10 flex flex-col items-center gap-6 text-center">
                <p className="text-xs md:text-sm font-semibold tracking-[0.2em] text-[#18182A]/70 uppercase">
                    IMPULSIONANDO AS PRINCIPAIS MARCAS DE BELEZA
                </p>

                <div className="w-full">
                    <Marquee
                        gradient
                        gradientColor="#f7fafd"
                        gradientWidth={120}
                        speed={38}
                    >
                        {marqueeBrands.map(({ name, Logo }, index) => (
                            <div
                                key={`${name}-${index}`}
                                className="flex items-center justify-center mx-10 md:mx-16 lg:mx-20 h-auto"
                            >
                                <Image className="h-20 w-auto text-[#18182A]" src={Logo} alt={name} />
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    );
}

