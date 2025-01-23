'use client'

import Image from "next/image"
import logo from "@/app/assets/LogoCompletaWhite.png"

export function Footer() {

    return (
        <>
            <div className="bg-primary mt-10 px-4 py-10">
                <div className="mb-10">
                    <Image alt="logo do site" src={logo} width={100} height={100} />
                    <p className="text-gray-300 text-sm my-3">Empoderando revendedores com ferramentas financeiras e uma loja online para alcançar novos patamares de sucesso</p>
                </div>
                <div className="grid grid-cols-2">
                    <div>
                        <p className="font-medium text-white text-sm mb-2">Empresa</p>
                        <p className="text-gray-300 text-xs mb-1">Quem somos?</p>
                        <p className="text-gray-300 text-xs mb-1">Sistema</p>
                        <p className="text-gray-300 text-xs">Preços</p>
                    </div>
                    <div>
                        <p className="font-medium text-white text-sm mb-2">Legal</p>
                        <p className="text-gray-300 text-xs mb-1">Termos de serviços</p>
                        <p className="text-gray-300 text-xs mb-1">Política de privacidade</p>
                        <p className="text-gray-300 text-xs">Licenças</p>
                    </div>
                </div>

                <div className="mt-10">
                    <p className="text-gray-300 text-xs text-center">© 2025 - Todos os direitos reservados</p>
                </div>
            </div>
        </>
    )
}