"use client";

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import storeImg from "@/public/features/loja-online.png";
import automatizeImg from "@/public/features/automatize.png";
import stockImg from "@/public/features/estoque.png";
import financeImg from "@/public/features/financeiro.png";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const ACCESS_MESSAGE = "Olá! Ainda estamos em fase de testes, quero ter acesso ao Revendaja.";

const benefits: { title: string; description: string; image: StaticImageData; cta?: boolean }[] = [
  {
    title: "Controle de Estoque",
    description:
      "Saiba exatamente o que você tem em mãos. Estoque baixo, produtos parados e reposição, tudo em um só lugar.",
    image: stockImg,
    cta: true,
  },
  {
    title: "Controle de Finanças",
    description:
      "Acompanhe vendas, lucro e recebimentos em tempo real, sem depender de planilhas soltas.",
    image: financeImg,
  },
  {
    title: "Loja Online",
    description:
      "Uma vitrine própria para suas clientes comprarem a qualquer hora, direto do celular.",
    image: storeImg,
  },
  {
    title: "Automatize suas vendas",
    description:
      "Receba pedidos, cadastre produtos e organize tudo de forma simples e rápida.",
    image: automatizeImg,
  },
];

export function Benefits() {
  return (
    <section id="features" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <span className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            Inovação
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-4">
            Por que revendedoras escolhem a Revendaja
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Recursos pensados para o dia a dia de quem revende de verdade, sem
            planilhas e sem complicação.
          </p>
        </motion.div>

        {/* Mobile: slide horizontal com cards do mesmo tamanho */}
        <div className="md:hidden -mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-2">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="snap-center shrink-0 w-[78%] sm:w-[55%] rounded-3xl bg-muted overflow-hidden flex flex-col"
            >
              <div className="relative h-48 w-full">
                <Image src={b.image} alt={b.title} fill className="object-contain p-8" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-base font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {b.description}
                </p>
                {b.cta && (
                  <Link
                    href={getWhatsAppUrl(ACCESS_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 self-start bg-primary text-primary-foreground text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Tenha acesso
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: bento assimétrico */}
        <div className="hidden md:grid md:grid-cols-3 md:grid-rows-2 gap-5">
          {/* Card grande: Controle de Estoque */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:row-span-2 rounded-3xl bg-muted overflow-hidden flex flex-col"
          >
            <div className="relative flex-1 min-h-60">
              <Image src={benefits[0].image} alt={benefits[0].title} fill className="object-contain p-10" />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-lg font-bold text-foreground mb-2">{benefits[0].title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {benefits[0].description}
              </p>
              <Link
                href={getWhatsAppUrl(ACCESS_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
              >
                Tenha acesso
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Card médio: Controle de Finanças */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-muted overflow-hidden flex flex-col"
          >
            <div className="relative h-40 md:h-44">
              <Image src={benefits[1].image} alt={benefits[1].title} fill className="object-contain p-6" />
            </div>
            <div className="p-6">
              <p className="text-[15px] leading-snug">
                <span className="font-bold text-foreground">{benefits[1].title}.</span>{" "}
                <span className="text-muted-foreground">{benefits[1].description}</span>
              </p>
            </div>
          </motion.div>

          {/* Card pequeno: Loja Online */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-muted overflow-hidden flex flex-col"
          >
            <div className="relative h-40 md:h-44">
              <Image src={benefits[2].image} alt={benefits[2].title} fill className="object-contain p-7" />
            </div>
            <div className="p-6">
              <p className="text-[15px] leading-snug">
                <span className="font-bold text-foreground">{benefits[2].title}.</span>{" "}
                <span className="text-muted-foreground">{benefits[2].description}</span>
              </p>
            </div>
          </motion.div>

          {/* Card largo: Automatize suas vendas */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 rounded-3xl bg-muted overflow-hidden flex flex-row items-center"
          >
            <div className="flex-1 p-6 md:p-8">
              <p className="text-[15px] leading-snug">
                <span className="font-bold text-foreground">{benefits[3].title}.</span>{" "}
                <span className="text-muted-foreground">{benefits[3].description}</span>
              </p>
            </div>
            <div className="relative w-40 sm:w-52 h-40 md:h-44 shrink-0">
              <Image src={benefits[3].image} alt={benefits[3].title} fill className="object-contain p-6" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
