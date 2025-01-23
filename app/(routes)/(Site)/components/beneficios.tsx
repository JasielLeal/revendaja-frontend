import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IoCloudDoneOutline, IoLockOpenOutline, IoPodiumOutline, IoRocketOutline } from "react-icons/io5";

export function Beneficios() {


    const beneficios = [
        {
            id: 1,
            name: "Gratuito",
            text: 'Desfrute do nosso plano gratuito pelo tempo que quiser! E quando sentir que é o momento certo, você pode fazer o upgrade para desbloquear ainda mais recursos incríveis.',
            icon: <IoLockOpenOutline />
        },
        {
            id: 2,
            name: "Acesse de onde quiser",
            text: 'Gerencie seu negócio de qualquer lugar, com praticidade, segurança e total controle. Tudo ao seu alcance, a qualquer momento',
            icon: <IoCloudDoneOutline />
        },
        {
            id: 3,
            name: "Sem limites",
            text: 'Expanda seus negócios sem restrições ou taxas extras.  Aproveitando um sistema completo e potencialize seu alcance e controle de forma ilimitada!',
            icon: <IoRocketOutline />
        },
        {
            id: 4,
            name: "Proposito",
            text: 'Cada funcionalidade foi pensada para te ajudar a alcançar seus objetivos de forma eficiente. Mais que um aplicativo, somos um verdadeiro parceiro na sua trajetória de sucesso',
            icon: <IoPodiumOutline />
        },

    ]

    return (
        <div className="flex flex-col items-center pt-20 px-4">
            <Badge>
                Diferenciais
            </Badge>
            <p className="text-[#0A2540] font-semibold mt-1">Por que escolher o Revendaja?</p>
            <p className="text-sm text-center mt-2 text-[#0A2540] ">
                Descubra os principais benefícios que o Renvedaja tem para você
            </p>

            {beneficios?.map((beneficio, index) => (
                <div className="mt-5" key={beneficio.id}>
                    <div className="flex items-center gap-2 mb-5">
                        <p className="text-primary text-xl">
                            {beneficio.icon}
                        </p>
                        <p className="text-[#0A2540] font-semibold">
                            {beneficio.name}
                        </p>
                    </div>
                    <p className="text-[#0A2540] mb-3">
                        {beneficio.text}
                    </p>
                    {/* Renderiza o Separator apenas se não for o último item */}
                    {index < beneficios.length - 1 && <Separator />}
                </div>
            ))}
        </div>
    )
}