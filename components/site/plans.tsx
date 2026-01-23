import { Title } from "../title";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { PiCheckBold, PiStarFill } from "react-icons/pi";
import { MotionSection } from "./motion-section";

export function Plans() {
    const plans = [
        {
            name: "Gratuito",
            price: "0",
            period: "mês",
            description: "Perfeito para começar e explorar os recursos básicos",
            features: [
                "Até 50 produtos cadastrados",
                "1 usuário",
                "Relatórios básicos",
                "Suporte por email",
                "App mobile básico",
            ],
            buttonText: "Começar grátis",
            buttonVariant: "outline" as const,
            popular: false
        },
        {
            name: "Starter",
            price: "29",
            period: "mês",
            description: "Ideal para pequenos negócios que estão crescendo",
            features: [
                "Produtos ilimitados",
                "Até 3 usuários",
                "Relatórios avançados",
                "Controle de estoque",
                "Suporte prioritário",
                "App mobile completo",
                "Integração com redes sociais",
            ],
            buttonText: "Começar agora",
            buttonVariant: "default" as const,
            popular: true
        },
        {
            name: "Exclusive",
            price: "99",
            period: "mês",
            description: "Para negócios estabelecidos que precisam de tudo",
            features: [
                "Tudo do plano Starter",
                "Usuários ilimitados",
                "Dashboard personalizado",
                "Análise preditiva com IA",
                "API para integrações",
                "Suporte 24/7",
                "Gerente de conta dedicado",
                "Treinamento personalizado",
            ],
            buttonText: "Falar com vendas",
            buttonVariant: "outline" as const,
            popular: false
        }
    ];

    return (
        <>
            <MotionSection className="w-full bg-[#F7F7F7] py-12 md:py-24">
                <div className="max-w-[1250px] mx-auto px-4 sm:px-6">

                    <div className="flex flex-col items-center w-full justify-center text-center mb-8 md:mb-16">
                        <Badge>
                            Preços e planos
                        </Badge>
                        <div className="my-3 max-w-[500px] px-4">
                            <Title>
                                Escolha um plano que melhor se adapte às suas necessidades.
                            </Title>
                        </div>
                        <p className="text-gray-500 text-sm md:text-[14px] mb-4 max-w-[600px] px-4">
                            Planos escaláveis ​​que crescem com o seu negócio, ferramentas e suporte necessários para tornar o sucesso simples, alcançável e sustentável em todas as etapas.
                        </p>

                    </div>

                    {/* Cards de Planos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative bg-white rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${plan.popular ? 'border-2 border-primary md:scale-105' : 'border border-gray-200'
                                    }`}
                            >
                                {/* Badge Popular */}
                                {plan.popular && (
                                    <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2">
                                        <div className="bg-primary text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-semibold flex items-center gap-1">
                                            <PiStarFill className="text-yellow-300 text-xs md:text-sm" />
                                            Mais Popular
                                        </div>
                                    </div>
                                )}

                                {/* Cabeçalho do Plano */}
                                <div className="mb-4 md:mb-6">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                                        {plan.name}
                                    </h3>
                                    <p className="text-gray-500 text-xs md:text-sm">
                                        {plan.description}
                                    </p>
                                </div>

                                {/* Preço */}
                                <div className="mb-4 md:mb-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-gray-600 text-base md:text-lg">R$</span>
                                        <span className="text-4xl md:text-5xl font-bold text-gray-900">{plan.price}</span>
                                        <span className="text-gray-500 text-xs md:text-sm">/{plan.period}</span>
                                    </div>
                                </div>

                                {/* Botão de Ação */}
                                <Button
                                    variant={plan.buttonVariant}
                                    className="w-full mb-4 md:mb-6 rounded-lg py-5 md:py-6 text-sm md:text-base font-semibold"
                                >
                                    {plan.buttonText}
                                </Button>

                                {/* Features */}
                                <div className="space-y-3 md:space-y-4">
                                    <p className="text-xs md:text-sm font-semibold text-gray-900 mb-2 md:mb-3">O que está incluído:</p>
                                    <ul className="space-y-2 md:space-y-3">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 md:gap-3">
                                                <div className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                                    <PiCheckBold className="text-primary text-[10px] md:text-xs" />
                                                </div>
                                                <span className="text-gray-600 text-xs md:text-sm leading-relaxed">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </MotionSection>
        </>
    )
}