import logo from "@/public/logo-black.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";

export function Navbar() {
    const navItems = [
        { label: "Início", href: "#" },
        { label: "Soluções", href: "#features" },
        { label: "Vantagens", href: "#pricing" },
        { label: "Dúvidas", href: "#pricing" },
        { label: "Contato", href: "#contact" },
    ];

    return (
        <header className="fixed top-0 w-full z-50 backdrop-blur  border-b">
            <nav className="max-w-[1250px] mx-auto px-6 py-4 flex items-center justify-between">
                <Image src={logo} alt="Revendaja" width={130} className="cursor-pointer" />

                <div className="flex items-center gap-4 md:gap-6">
                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="relative text-sm font-medium text-black/70 transition hover:text-black after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#F97415] after:transition-all hover:after:w-full"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <Button className="hidden md:inline-flex rounded-full bg-primary">
                        Baixar Aplicativo
                    </Button>

                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="rounded-full p-2 h-10 w-10">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <SheetHeader>
                                    <SheetTitle>Menu</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-4 p-4">
                                    {navItems.map((item) => (
                                        <SheetClose key={item.label} asChild>
                                            <Link
                                                href={item.href}
                                                className="text-base font-medium text-black/80 hover:text-black"
                                            >
                                                {item.label}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                    <SheetClose asChild>
                                        <Button className="rounded-full bg-primary w-full">
                                            Baixar Aplicativo
                                        </Button>
                                    </SheetClose>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </header>
    );
}
