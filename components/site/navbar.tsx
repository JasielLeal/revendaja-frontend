import logo from "@/public/logo-black.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-[#f7fafd]/80 backdrop-blur border-b border-black/5">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Image
                    src={logo}
                    alt="Revendaja"
                    width={120}
                    height={40}
                    className="cursor-pointer"
                />

                {/* Links + CTA */}
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6">
                        {[
                            { label: "Início", href: "#" },
                            { label: "Funcionalidades", href: "#features" },
                            { label: "Planos", href: "#pricing" },
                            { label: "Contato", href: "#contact" },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="relative text-sm font-medium text-black/70 transition hover:text-black after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#F97415] after:transition-all hover:after:w-full"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <Button className="rounded-full bg-primary">
                        Começar grátis
                    </Button>
                </div>
            </nav>
        </header>
    );
}
