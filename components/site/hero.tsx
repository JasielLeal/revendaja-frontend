import Link from "next/link";
import {
    PiArrowRightBold,
} from "react-icons/pi";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-[#f7fafd] text-[#18182A] isolate">
            <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24 relative z-10 flex flex-col lg:flex-row items-center gap-14">
                <div className="flex-1 flex flex-col gap-6">

                    {/* Headline */}
                    <div className="max-w-[500px]">
                        <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold leading-tight tracking-tight text-pretty 
                        ">
                            Centralize vendas, estoque e financeiro em um só lugar.
                        </h1>

                        <p className="text-lg text-black/70 max-w-2xl">
                            O Revendaja é o app completo para quem vende. Controle produtos,
                            pedidos e financeiro com dados em tempo real.
                        </p>
                    </div>

                    {/* Prova social */}
                    <div className="flex items-center gap-3 text-sm text-black/70">
                       
                        <span className="font-semibold text-black">*Teste gratuitamente sem uso de cartão de credito*</span>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            href="#"
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition hover:shadow-xl "
                        >
                            Criar minha conta grátis
                            <PiArrowRightBold className="text-lg" />
                        </Link>

                        <Link
                            href="#"
                            className="inline-flex items-center gap-2 rounded-full border border-black/20 px-6 py-3 text-base font-semibold text-black hover:border-black/40 hover:bg-black/5 transition"
                        >
                            Ver como funciona
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
