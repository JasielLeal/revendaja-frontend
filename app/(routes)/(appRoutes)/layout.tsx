'use client'


import AuthContext from "@/app/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useContext } from "react";

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {

    const { signed, user } = useContext(AuthContext)
    const router = useRouter();


    return (
        <div className="grid grid-cols-12">
            <div className="bg-[#09090b] h-screen px-5 border-r border-[#27272a] col-span-2 ">

                <div className="flex flex-col justify-between h-full">
                    <div>
                        <h1 className="text-white font-xl font-semibold mt-10 mb-5 px-5">Revendaja</h1>

                        <div className="flex flex-col gap-1">
                            <Link
                                href={'/'}
                                className="text-[#dbdbdb] font-medium hover:bg-[#27272a] h px-5 py-1 block rounded-lg"
                            >
                                Home
                            </Link>
                            <Link
                                href={'/'}
                                className="text-[#dbdbdb] font-medium hover:bg-[#27272a] px-5 py-1 block rounded-lg"
                            >
                                Lojas
                            </Link>
                            <Link
                                href={'/'}
                                className="text-[#dbdbdb] font-medium hover:bg-[#27272a] px-5 py-1 block rounded-lg"
                            >
                                Financeiro
                            </Link>
                            <Link
                                href={'/produtos'}
                                className="text-[#dbdbdb] font-medium hover:bg-[#27272a] px-5 py-1 block rounded-lg"
                            >
                                Produtos
                            </Link>
                        </div>
                    </div>

                    <div className="text-white pb-10 flex gap-4">
                        <Avatar>
                            <AvatarImage src={user?.image} alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div >
                            <div className="flex items-center gap-1">
                                <p className="text-center text-sm text-[#dbdbdb]">{user?.name}</p>
                                <p className="text-center text-sm text-[#dbdbdb]">{user?.secondName}</p>
                            </div>
                            <p className="text-sm font-medium">{user?.role}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-10 bg-[#09090b] pt-10 px-10">
                {children}
            </div>

        </div>
    );
}
