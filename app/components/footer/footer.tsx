'use client'

import { useDomain } from "@/app/context/DomainContext"

export function Footer() {

    const { storeData } = useDomain()

    return (
        <>
            <div className="bg-primary mt-10 px-2 py-2">
                <p className="text-white font-medium text-sm text-center">{storeData?.name}, Todos os direitos reservados.</p>
            </div>
        </>
    )
}