import Link from "next/link";
import {
    PiFacebookLogoBold,
    PiInstagramLogoBold,
    PiTwitterLogoBold,
    PiLinkedinLogoBold,
    PiYoutubeLogoBold
} from "react-icons/pi";
import Image from "next/image";
import logo from "@/public/logo-black.png";
import logoGooglePlay from "@/public/logos/google-play.png";
import logoAppStore from "@/public/logos/app-store.png";
import { MotionSection } from "./motion-section";

export function Footer() {
    const quickLinks = [
        { name: "Início", href: "/" },
        { name: "Soluções", href: "#features" },
        { name: "Vantagens", href: "#about" },
        { name: "Planos", href: "#pricing" },
        { name: "Dúvidas", href: "#pricing" },
        { name: "Contato", href: "#contact" },
    ];

    const utilityPages = [
        { name: "Guia de Estilo", href: "/style-guide" },
        { name: "Página 404", href: "/404" },
        { name: "Protegido por senha", href: "/protected" },
        { name: "Licenças", href: "/licenses" },
        { name: "Registro de alterações", href: "/changelog" },
    ];

    const resources = [
        { name: "Baixar aplicativo", href: "/download" },
        { name: "Termos e Condições", href: "/terms" },
        { name: "Política de Privacidade", href: "/privacy" },
    ];

    return (
        <MotionSection className="w-full bg-white">
            <div className="max-w-[1250px] mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Logo e descrição */}
                    <div className="lg:col-span-2">
                        <Image src={logo} alt="Revendaja Logo" className="mb-6" width={150} />
                        <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-sm">
                            Revendaja é uma plataforma inteligente que ajuda revendedores(as) a encontrar os melhores produtos e oportunidades de venda, com informações em tempo real, promoções e ferramentas para impulsionar seus ganhos.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4">
                            <Link href="#" className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-primary hover:text-white text-gray-600 flex items-center justify-center transition-colors">
                                <PiInstagramLogoBold className="text-xl" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-primary hover:text-white text-gray-600 flex items-center justify-center transition-colors">
                                <PiLinkedinLogoBold className="text-xl" />
                            </Link>
                        </div>
                    </div>

                    {/* Links rápidos */}
                    <div>
                        <h3 className="text-gray-900 font-medium text-lg mb-4">Links rápidos</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-gray-600 hover:text-primary transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Recurso */}
                    <div>
                        <h3 className="text-gray-900 font-medium text-lg mb-4">Recurso</h3>
                        <ul className="space-y-3">
                            {resources.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-gray-600 hover:text-primary transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Páginas utilitárias */}
                    <div>
                        <h3 className="text-gray-900 font-medium text-lg mb-4">Aplicativo</h3>
                        <Link href="/download">
                            <Image src={logoGooglePlay} alt="Revendaja Logo" className="mb-6" width={150} />
                        </Link>
                        <Link href="/download">
                            <Image src={logoAppStore} alt="Revendaja Logo" className="mb-6" width={150} />
                        </Link>
                    </div>
                </div>



                {/* Bottom bar */}
                <div className="pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">

                        <p>Direitos autorais ©Revendaja. Todos os direitos reservados.</p>

                    </div>
                </div>
            </div>
        </MotionSection>
    )
}