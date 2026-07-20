"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import heroBg from "@/public/bg.png";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const ACCESS_MESSAGE = "Olá! Ainda estamos em fase de testes, quero ter acesso ao Revendaja.";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-end overflow-hidden text-white">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/10 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-28">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          {/* Left: badge + headline */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 mb-5"
            >
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
                Sem planilhas. Sem complicação.
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              Seu negócio{" "}
              <span className="font-birthstone font-normal text-primary">
                organizado
              </span>
              <br />
              em um só lugar.
            </motion.h1>
          </div>

          {/* Right: description + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="max-w-sm lg:pb-2"
          >
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
              O controle absoluto do seu estoque, vendas, clientes e financeiro em um só
              lugar. Abandone de vez as planilhas complexas.
            </p>
            <div className="flex items-center gap-6">
              <Link href={getWhatsAppUrl(ACCESS_MESSAGE)} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full shadow-lg shadow-primary/30 transition-all duration-300 group border-0 text-sm cursor-pointer"
                >
                  Tenha acesso
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link
                href="#features"
                className="text-sm font-semibold text-white hover:text-white/80 underline underline-offset-4 transition-colors"
              >
                Saiba Mais
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
