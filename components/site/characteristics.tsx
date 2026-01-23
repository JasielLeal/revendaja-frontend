"use client"

import { ChartLine, ListChecks, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Title } from "@/components/title";
import characteristic1 from "@/public/characteristic-1.png"
import characteristic2 from "@/public/characteristic-2.png"
import characteristic3 from "@/public/characteristic-3.png"
import Image from "next/image";
import { useState, useEffect } from "react";
import { MotionSection, fadeUpItem } from "./motion-section";
import { motion } from "framer-motion";

export function Characteristics() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const DURATION = 10000; // 10 segundos por item

    const features = [
        {
            title: "Loja online integrada para expandir seu alcance.",
            icon: ShoppingBag,
            p: "Venda seus produtos diretamente através do aplicativo, alcançando mais clientes.",
            image: characteristic1,
        },
        {
            title: "Acompanhe suas vendas de maneira intuitiva.",
            icon: ChartLine,
            p: "Mantenha-se informado com informações em tempo real sobre suas vendas e desempenho.",
            image: characteristic2,
        },
        {
            title: "Organize seus produtos e estoque com facilidade.",
            icon: ListChecks,
            p: "Gerencie seu inventário de forma eficiente para evitar faltas ou excessos.",
            image: characteristic3,
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    setActiveIndex((current) => (current + 1) % features.length);
                    return 0;
                }
                return prev + (100 / (DURATION / 50));
            });
        }, 50);

        return () => clearInterval(interval);
    }, [features.length]);

    return (
        <>
            <MotionSection className="text-center flex flex-col items-center mb-16 md:mb-40 mt-10 md:mt-20 max-w-[1250px] mx-auto px-4">
                <Badge>
                    Principais características
                </Badge>
                <div className="my-3 md:my-4">
                    <Title>
                        Explore nossos principais recursos
                    </Title>
                </div>
                <p className="text-gray-500 text-sm md:text-base max-w-2xl">
                    Organize sua revenda com ferramentas simples, controle total e visão clara dos resultados — tudo em um único aplicativo.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-10 w-full items-center">
                    <div className="space-y-4 md:space-y-6">
                        {features.map((feature, index) => (
                            <div key={index} className="relative">
                                <motion.div 
                                    className={`flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                                        activeIndex === index ? 'bg-primary/5' : 'hover:bg-gray-50 bg-[#F7F7F7]'
                                    }`}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        setProgress(0);
                                    }}
                                    variants={fadeUpItem}
                                >
                                    <div className={`text-primary transition-all duration-300 ${
                                        activeIndex === index ? 'scale-110' : 'opacity-60'
                                    }`}>
                                        <feature.icon size={28} className="md:hidden" />
                                        <feature.icon size={40} className="hidden md:block" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className={`font-medium text-base md:text-xl mb-1 md:mb-2 transition-colors ${
                                            activeIndex === index ? 'text-primary' : 'text-gray-700'
                                        }`}>
                                            {feature.title}
                                        </p>
                                        <p className="text-xs md:text-sm text-gray-500">
                                            {feature.p}
                                        </p>
                                    </div>
                                </motion.div>
                                {/* Barra de progresso */}
                                {activeIndex === index && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-primary transition-all duration-75 ease-linear"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <motion.div variants={fadeUpItem} className="flex justify-center items-center">
                        <div className="relative w-full max-w-[360px] sm:max-w-[420px] md:max-w-[500px] h-[260px] sm:h-[320px] md:h-[400px]">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-all duration-700 ${
                                        activeIndex === index 
                                            ? 'opacity-100 translate-y-0' 
                                            : activeIndex > index 
                                                ? 'opacity-0 -translate-y-10' 
                                                : 'opacity-0 translate-y-10'
                                    }`}
                                >
                                    <Image 
                                        src={feature.image} 
                                        alt={feature.title} 
                                        width={500}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </MotionSection>
        </>
    )
}