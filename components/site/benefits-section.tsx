"use client"

import { ChartLine } from "lucide-react"

import features1 from "@/public/features-1.png";
import features2 from "@/public/features-2.png";
import features3 from "@/public/features-3.png";
import Image from "next/image";
import { Title } from "@/components/title";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { MotionSection, fadeUpItem } from "./motion-section";
import { motion } from "framer-motion";

export function Benefits() {

    const features = [
        {
            title: "Análise de Dados",
            description: "Descubra quanto você vendeu e faturou em um período específico, ajudando você a entender melhor o desempenho do seu negócio.",
            icon: ChartLine,
            image: features1,
        },
        {
            title: "Gestão de Revendedoras",
            description: "Gerencie suas revendedoras de forma eficiente, acompanhando suas vendas, lucros e desempenho.",
            icon: ChartLine,
            image: features2 ,
        },
        {
            title: "Controle de Estoque",
            description: "Mantenha o controle do seu estoque de produtos, evitando faltas ou excessos que possam impactar suas vendas.",
            icon: ChartLine,
            image: features3,
        }
    ]

    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <>

            <MotionSection className="w-full bg-[#F7F7F7]">
                <div className="py-12 pb-40 md:py-20 grid grid-cols-1 lg:grid-cols-2 max-w-[1250px] mx-auto px-4 sm:px-6 items-start gap-8 lg:gap-12">
                    <motion.div variants={fadeUpItem} className="order-2 lg:order-1 flex items-start justify-center lg:pt-6">
                        <div className="relative w-[210px] h-[280px] sm:w-[240px] sm:h-[320px] md:w-[260px] md:h-[340px] lg:w-[280px] lg:h-[360px]">
                            {features.map((feature, index) => (
                                <Image 
                                    key={index}
                                    src={feature.image} 
                                    alt={feature.title} 
                                    width={300}
                                    className={`absolute inset-0 transition-all duration-500 ${
                                        selectedIndex === index 
                                            ? 'opacity-100 scale-100' 
                                            : 'opacity-0 scale-95'
                                    }`}
                                />
                            ))}
                        </div>
                    </motion.div>
                    <motion.div variants={fadeUpItem} className="order-1 lg:order-2">
                        <Badge>
                            As vantagens
                        </Badge>
                        <div className="my-3">
                            <Title>
                                Desbloqueie benefícios exclusivos
                            </Title>
                        </div>
                        <p className="text-gray-500 text-left text-sm md:text-[14px] mb-4">
                            Tenha acesso a vantagens e recursos premium que aprimoram sua experiência, economizam seu tempo e mantêm você à frente da concorrência.
                        </p>

                        <div>
                            {features.map((feature, index) => (
                                <motion.div 
                                    key={index} 
                                    onClick={() => setSelectedIndex(index)}
                                    className={`flex items-start mb-4 md:mb-6 gap-3 p-3 md:p-4 bg-white rounded-2xl cursor-pointer transition-all duration-300 border-2 hover:scale-[0.99] ${
                                        selectedIndex === index 
                                            ? 'border-primary border-[1px]' 
                                            : 'border-transparent '
                                    }`}
                                    variants={fadeUpItem}
                                >
                                    <div>
                                        <feature.icon size={22} className="text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-base md:text-lg font-semibold mb-1 text-[#0C0407]">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm md:text-[14px]">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </MotionSection>
        </>
    )
}