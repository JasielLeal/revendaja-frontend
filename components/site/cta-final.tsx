"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const DEMO_MESSAGE = "Olá! Quero agendar uma demonstração do Revendaja.";
const ACCESS_MESSAGE = "Olá! Ainda estamos em fase de testes, quero ter acesso ao Revendaja.";

export function CtaFinal() {
  return (
    <section className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-primary/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-foreground rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center relative overflow-hidden border border-primary/10"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[300px] bg-primary/8 rounded-full blur-[80px]" />
          </div>
          <div className="absolute top-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-8"
            >
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              Pronto para escalar
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-[1.04] tracking-tight mb-6"
            >
              Escale sua rede de revenda
              <br />
              <span className="text-primary">com infraestrutura enterprise.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-muted-foreground text-lg max-w-lg mx-auto mb-10"
            >
              Agende uma sessão de demonstração técnica com nossa equipe de soluções e veja a plataforma em operação real.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            >
              <Link href={getWhatsAppUrl(DEMO_MESSAGE)} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="h-14 px-10 bg-primary hover:opacity-90 text-primary-foreground font-bold text-base rounded-xl shadow-2xl shadow-primary/40 transition-all duration-200 group border-0"
                >
                  <Calendar className="mr-2 w-5 h-5" />
                  Agendar Demonstração
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href={getWhatsAppUrl(ACCESS_MESSAGE)} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 border border-background/20 bg-transparent text-background/80 font-semibold rounded-xl hover:bg-background/10 hover:text-background transition-all duration-200"
                >
                  Tenha acesso
                </Button>
              </Link>
            </motion.div>

            <p className="text-muted-foreground/40 text-xs mt-6">
              Resposta em até 24h · Sem compromisso · Demo personalizada para sua operação
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
