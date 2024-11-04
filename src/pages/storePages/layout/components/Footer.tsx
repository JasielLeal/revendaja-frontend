import { useDomain } from "@/context/DomainContext";

export function Footer() {

    const { storeData } = useDomain();

    return (
        <>
            <div className="py-10 px-5 bg-[#0F0F0F] mt-10">
                <div >
                    <p className="font-semibold text-3xl text-white">{storeData?.name}</p>
                    <p className="text-sm text-zinc-200">{storeData?.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-semibold text-xl mb-2 mt-5 text-white">Atendimento</p>
                    <a href="/" className="text-sm text-zinc-200">Perguntas Frequentes</a>
                    <p className="text-sm text-zinc-200">(84) 9 9209-2241</p>
                    <p className="text-sm text-zinc-200">{storeData?.subdomain}@gmail.com</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-semibold text-xl mb-2 mt-5 text-white">Políticas</p>
                    <p className="text-sm text-zinc-200">Política de entrega</p>
                    <p className="text-sm text-zinc-200">Termos de privacidade</p>
                    <p className="text-sm text-zinc-200">Prazo e Formas de pagamentos</p>
                </div>
                <div className="border-[#ffffff2d] border-t mt-5">
                    <p className="text-sm text-zinc-200 pt-5">© 2024 {storeData?.name}. Todos os direitos reservados</p>
                </div>
            </div>
        </>
    )
}