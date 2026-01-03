import { PiCheckBold } from "react-icons/pi";
import Link from "next/link";

const plans = [
    {
        name: "Free",
        description: "Tudo o que você precisa para começar.",
        price: "0",
        period: "por mês",
        cta: "Começar grátis",
        features: [
            "Até 50 produtos",
            "Controle de estoque básico",
            "Registro de vendas",
            "Relatórios simples",
            "Suporte por email",
            "App mobile",
        ],
    },
    {
        name: "Starter",
        description: "Todos os recursos extras para crescer.",
        price: "24",
        period: "por mês",
        cta: "Começar teste grátis",
        featured: true,
        features: [
            "Produtos ilimitados",
            "Controle avançado de estoque",
            "Gestão financeira completa",
            "Relatórios avançados",
            "Múltiplos usuários",
            "Integração com WhatsApp",
            "Suporte prioritário",
            "Backup automático",
        ],
    },
    {
        name: "Exclusive",
        description: "Flexibilidade para grandes operações.",
        price: "49",
        period: "por mês",
        cta: "Começar teste grátis",
        features: [
            "Tudo do Profissional",
            "API personalizada",
            "Múltiplas lojas",
            "Domínio customizado",
            "Treinamento dedicado",
            "Gerente de conta",
            "SLA garantido",
            "Customizações sob medida",
        ],
    },
];

export function Pricing() {
    return (
        <section className="relative w-full bg-gray-900 text-white py-20 overflow-hidden">

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Preços que crescem com seu negócio
                    </h2>
                    <p className="text-lg text-white/70">
                        Escolha um plano acessível com os melhores recursos para gerenciar seu negócio,
                        fidelizar clientes e aumentar suas vendas.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-3xl p-8 flex flex-col ${plan.featured
                                    ? " border-2 border-primary/40 shadow-xl shadow-primary/20"
                                    : " border border-white/10"
                                } backdrop-blur-sm transition hover:scale-[1.02]`}
                        >
                            {plan.featured && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-sm font-semibold">
                                    Mais Popular
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className="mb-6">
                                <h3 className={`text-xl font-bold mb-2 ${plan.featured ? "text-primary" : "text-white"}`}>
                                    {plan.name}
                                </h3>
                                <p className="text-white/60 text-sm">
                                    {plan.description}
                                </p>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold">${plan.price}</span>
                                    <span className="text-white/60 text-sm">BRL</span>
                                </div>
                                <span className="text-white/60 text-sm">{plan.period}</span>
                            </div>

                            {/* CTA Button */}
                            <Link
                                href="#"
                                className={`w-full py-3 px-6 rounded-full font-semibold text-center transition mb-8 ${plan.featured
                                        ? "bg-primary hover:bg-primary/90 text-white"
                                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                                    }`}
                            >
                                {plan.cta}
                            </Link>

                            {/* Features */}
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-white/80 mb-4">
                                    Começar a vender com:
                                </p>
                                <ul className="space-y-3">
                                    {plan.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-3 text-sm text-white/70"
                                        >
                                            <span className="mt-0.5 text-white/40">
                                                <PiCheckBold className="text-base" />
                                            </span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}