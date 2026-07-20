"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import step1 from "@/public/steps/step-4.png";
import step2 from "@/public/steps/step-5.png";
import step3 from "@/public/steps/step-3.png";
import googlePlay from "@/public/logos/google-play.png";
import appStore from "@/public/logos/app-store.png";

const steps = [
  {
    label: "Etapa 1",
    title: "Crie sua conta",
    description: "Baixe o nosso aplicativo, cadastre-se e já comece a usar em minutos.",
    image: step1,
  },
  {
    label: "Etapa 2",
    title: "Cadastre seu estoque",
    description: "Adicione seus produtos e mantenha o controle total do que você tem.",
    image: step2,
  },
  {
    label: "Etapa 3",
    title: "Comece a vender",
    description: "Registre vendas, acompanhe resultados e organize tudo em um só lugar.",
    image: step3,
  },
];

export function StepsSection() {
  return (
    <section className="py-24 md:py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white mb-6">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Como funciona
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-8">
            Comece a vender em
            <br className="hidden sm:block" />
            menos de 3 minutos
          </h2>
          <div className="flex items-center gap-4">
            <Link href="/download">
              <Image src={googlePlay} alt="Disponível no Google Play" className="h-10 w-auto" />
            </Link>
            <Link href="/download">
              <Image src={appStore} alt="Disponível na App Store" className="h-10 w-auto" />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl bg-[#9f2f00] overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-4/5">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-[#9f2f00] to-transparent" />
              </div>
              <div className="p-6">
                <span className="inline-block text-[11px] font-bold text-primary-foreground uppercase tracking-widest bg-white/15 px-3 py-1 rounded-full mb-4">
                  {s.label}
                </span>
                <h3 className="text-xl font-bold text-primary-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-primary-foreground/70 leading-relaxed">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
