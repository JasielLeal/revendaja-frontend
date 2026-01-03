import Link from "next/link";
import { PiAppleLogoBold, PiGooglePlayLogoBold } from "react-icons/pi";

export function Anywail() {
    return (
        <section className="relative w-full bg-white py-20 lg:py-28 overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-[#f7fafd] via-white to-[#f0f4f8]"
                aria-hidden
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                    {/* Left */}
                    <div className="flex flex-col gap-8 max-w-xl">
                        <div className="space-y-5">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#18182A] leading-tight">
                                Seu negócio no controle, onde você estiver
                            </h2>

                            <p className="text-lg text-[#18182A]/70 leading-relaxed">
                                O Revendaja é um app feito para quem vende. Registre vendas,
                                controle o estoque e acompanhe seus resultados em tempo real,
                                direto do celular.
                            </p>
                        </div>

                        {/* Stores */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="#"
                                className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl text-white bg-gradient-to-r from-[#F97415] via-[#ff9f43] to-[#ffd36a] shadow-lg shadow-[#F97415]/30 hover:shadow-xl transition"
                            >
                                <PiGooglePlayLogoBold className="text-3xl" />
                                <div className="flex flex-col items-start leading-tight">
                                    <span className="text-xs opacity-80">Disponível no</span>
                                    <span className="text-base font-semibold">Google Play</span>
                                </div>
                            </Link>

                            <Link
                                href="#"
                                className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-black text-white hover:bg-black/90 transition"
                            >
                                <PiAppleLogoBold className="text-3xl" />
                                <div className="flex flex-col items-start leading-tight">
                                    <span className="text-xs opacity-80">Baixar na</span>
                                    <span className="text-base font-semibold">App Store</span>
                                </div>
                            </Link>
                        </div>

                        {/* Trust line */}
                        <div className="flex items-center gap-2 text-sm text-[#18182A]/60">
                            <span className="font-medium">✔ Download gratuito</span>
                            <span>•</span>
                            <span>Android e iOS</span>
                        </div>
                    </div>

                    {/* Right – Mockup */}
                    
                </div>
            </div>
        </section>
    );
}
