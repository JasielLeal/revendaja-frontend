"use client";

import { useState } from "react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import Image from "next/image";

const testimonials = [
    {
        quote: "O Revendaja transformou minha forma de trabalhar. Agora consigo acompanhar meu estoque em tempo real e nunca mais perco uma venda por falta de produto.",
        author: "Maria Silva",
        role: "Revendedora Natura",
        avatar: "/avatars/avatar-1.jpg",
        company: "Leal Perfumaria"
    },
    {
        quote: "Finalmente encontrei uma solução completa para gerenciar meu negócio. O controle financeiro ficou muito mais simples e profissional.",
        author: "Ana Costa",
        role: "Consultora O Boticário",
        avatar: "/avatars/avatar-2.jpg",
        company: "Revendaja"
    },
    {
        quote: "A facilidade de usar o app no celular me permite trabalhar de qualquer lugar. Minha produtividade aumentou significativamente.",
        author: "Juliana Santos",
        role: "Empreendedora",
        avatar: "/avatars/avatar-3.jpg",
        company: "Revendaja"
    },
];

export function Testimonial() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const current = testimonials[currentIndex];

    return (
        <section className="relative w-full bg-[#f7fafd] text-[#18182A] py-20 overflow-hidden">


            <div className="flex items-center justify-center flex-col">
                <p className="text-lg font-semibold">Nossos clientes de confiança</p>
                <p className="mb-6">Depoimentos reais de quem usa o Revendaja no dia a dia para vender
                    com mais controle e tranquilidade.</p>
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center gap-8 text-center">

                    {/* Quote */}
                    <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight max-w-3xl">
                        "{current.quote}"
                        
                    </blockquote>

                    {/* Author info */}
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-lg">{current.author}</span>
                        <span className="text-[#18182A]/60">{current.role}</span>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-4 mt-4">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full bg-[#18182A]/5 hover:bg-[#18182A]/10 flex items-center justify-center transition"
                            aria-label="Depoimento anterior"
                        >
                            <PiCaretLeftBold className="text-xl text-[#18182A]" />
                        </button>

                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition ${index === currentIndex
                                        ? "bg-primary w-8"
                                        : "bg-[#18182A]/20 hover:bg-[#18182A]/30"
                                        }`}
                                    aria-label={`Ir para depoimento ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full bg-[#18182A]/5 hover:bg-[#18182A]/10 flex items-center justify-center transition"
                            aria-label="Próximo depoimento"
                        >
                            <PiCaretRightBold className="text-xl text-[#18182A]" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}