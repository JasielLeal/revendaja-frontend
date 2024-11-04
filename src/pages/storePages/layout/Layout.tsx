import { Outlet } from "react-router-dom";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { IoBagHandleOutline, IoChevronForwardOutline, IoReorderThreeOutline } from "react-icons/io5";
import { useDomain } from "@/context/DomainContext";
import InputWithIcon from "./components/InputWithIcon";

export function Layout() {

    const { storeData } = useDomain();

    return (
        <>
            <div>
                <div className="flex items-center justify-between px-5 mt-3">
                    <Sheet>
                        <SheetTrigger asChild>
                            <IoReorderThreeOutline size={30} className="text-text" />
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64 bg-gray-100 p-4">
                            <SheetHeader className="mb-4 text-start">
                                <h2 className="text-lg font-semibold">Navegação</h2>
                            </SheetHeader>
                            <nav className="flex flex-col space-y-4">
                                {[
                                    { name: "Home", href: "/" },
                                    { name: "Masculino", href: "/masculino" },
                                    { name: "Feminino", href: "/feminino" },
                                    { name: "Crianças", href: "/criancas" },
                                    { name: "Bebês", href: "/bebes" }
                                ].map((link, index) => (
                                    <div key={index}>
                                        <a
                                            href={link.href}
                                            className="flex items-center justify-between text-base text-gray-700 hover:text-gray-900 py-3"
                                        >
                                            <span>{link.name}</span>
                                            <IoChevronForwardOutline />
                                        </a>
                                        {index < 4 && <hr className="border-gray-300" />}
                                    </div>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="font-bold text-xl text-text">
                        <a href="/">{storeData?.name}</a>
                    </div>

                    <div>
                        <Sheet>
                            <SheetTrigger asChild>
                                <IoBagHandleOutline size={23} className="text-text" />
                            </SheetTrigger>
                            <SheetContent side={'right'}>
                                <SheetHeader>
                                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                                    <SheetDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
                <div className="px-5 my-5">
                    <InputWithIcon />
                </div>
            </div>
            <div className="px-5 pt-5 bg">
                <Outlet />
            </div>
        </>
    )
}