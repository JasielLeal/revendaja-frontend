'use client'

import { useDomain } from "@/app/context/DomainContext";
import { formatCurrency } from "@/app/utils/FormatCurrency";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IoCheckmarkCircle } from "react-icons/io5";

export default function Congratulations() {

    const searchParams = useSearchParams();
    const value = searchParams.get("value")
    const store = searchParams.get("store")
    const client = searchParams.get("client")

    const {storeData} = useDomain()

    const cleanNumber = storeData?.numberPhone.replace(/[()\s-]/g, "");
  
    return (
        <div className="flex flex-col items-center mt-5 px-4">
            <p className="text-green-600 bg-green-200 p-3 rounded-full">
                <IoCheckmarkCircle size={50} />
                {}
            </p>
            <p className="text-text font-medium mt-2">Pedido Realizado</p>
            <p className="text-xl font-bold text-text">R$ {formatCurrency(String(value))}</p>

            <p className="text-sm text-gray-600 text-center">Olá, {client}. Obrigado por comprar na {store}. Em alguns minutos entraremos em contato pra confirmar seu pedido. então fique contente</p>

            <div className="flex items-center mt-5 mb-2 gap-4">
                <Link href={'/'} className="bg-primary text-white px-6 py-2 rounded-lg">Pagina inicial</Link>
                <Link href={`https://api.whatsapp.com/send?phone=55${cleanNumber}`} className="text-primary">Entrar em contato</Link>
            </div>


            <Separator className="w-full my-5" />


        </div>
    )
}