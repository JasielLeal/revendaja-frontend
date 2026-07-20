"use client";

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { Check, Minus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/whatsapp";

type PlanValue = boolean | string;

const plans = [
  {
    name: "Free",
    description: "Para quem está começando a organizar a revenda.",
    monthly: 0,
    yearly: 0,
    cta: "Tenha acesso",
    href: getWhatsAppUrl(
      "Olá! Ainda estamos em fase de testes, quero ter acesso ao plano Free do Revendaja."
    ),
    highlighted: false,
    features: [
      "Estoque com até 50 produtos",
      "Registro de vendas e clientes",
      "Loja online própria",
      "Relatórios básicos de vendas",
    ],
  },
  {
    name: "Pro",
    description: "Para quem já vive da revenda e quer escalar sem limites.",
    monthly: 39.9,
    yearly: 31.9,
    cta: "Tenha acesso",
    href: getWhatsAppUrl(
      "Olá! Ainda estamos em fase de testes, quero ter acesso ao plano Pro do Revendaja."
    ),
    highlighted: true,
    features: [
      "Estoque de produtos ilimitado",
      "Financeiro completo e lucro por produto",
      "Catálogo integrado com marcas parceiras",
      "Automação de pedidos e notificações",
      "Suporte prioritário via WhatsApp",
    ],
  },
  {
    name: "Enterprise",
    description: "Para redes e distribuidores com múltiplas lojas.",
    monthly: null,
    yearly: null,
    cta: "Falar com vendas",
    href: getWhatsAppUrl(
      "Olá! Ainda estamos em fase de testes, quero saber mais sobre o plano Enterprise do Revendaja."
    ),
    highlighted: false,
    features: [
      "Múltiplas lojas e gestão de rede",
      "Integrações via API e ERPs",
      "Gerente de conta dedicado",
      "Suporte dedicado 24/7",
    ],
  },
] satisfies {
  name: string;
  description: string;
  monthly: number | null;
  yearly: number | null;
  cta: string;
  href: string;
  highlighted: boolean;
  features: string[];
}[];

const compareGroups: { title: string; rows: { label: string; values: PlanValue[] }[] }[] = [
  {
    title: "Recursos principais",
    rows: [
      { label: "Limite de produtos no estoque", values: ["Até 50", "Ilimitado", "Ilimitado"] },
      { label: "Usuários da equipe", values: ["1", "Ilimitado", "Ilimitado"] },
      { label: "Loja online própria", values: [true, true, true] },
      { label: "Relatórios avançados", values: [false, true, true] },
      { label: "Notificações automáticas de pedidos", values: [false, true, true] },
    ],
  },
  {
    title: "Financeiro",
    rows: [
      { label: "Fluxo de caixa", values: [false, true, true] },
      { label: "Lucro por produto", values: [false, true, true] },
      { label: "Contas a pagar e receber", values: [false, true, true] },
      { label: "Múltiplas formas de pagamento", values: [false, true, true] },
    ],
  },
  {
    title: "Operação e rede",
    rows: [
      { label: "Catálogo integrado com marcas parceiras", values: [false, true, true] },
      { label: "Múltiplas lojas / gestão de rede", values: [false, false, true] },
      { label: "Integrações via API e ERPs", values: [false, false, true] },
      { label: "Gerente de conta dedicado", values: [false, false, true] },
    ],
  },
  {
    title: "Suporte",
    rows: [
      { label: "Suporte por e-mail", values: [true, true, true] },
      { label: "Suporte prioritário via WhatsApp", values: [false, true, true] },
      { label: "Suporte dedicado 24/7", values: [false, false, true] },
    ],
  },
];

function formatPrice(value: number) {
  return value === 0 ? "0" : value.toFixed(2).replace(".", ",");
}

export function Plans() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="plans" className="py-24 md:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            Planos
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-tight mb-4">
            Preços simples e transparentes
          </h2>
          <p className="text-muted-foreground text-lg">
            Sem contrato de fidelidade. Sem taxas escondidas. Comece grátis e migre quando a operação crescer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex justify-center mb-14"
        >
          <div className="inline-flex items-center gap-1 bg-muted rounded-full p-1 border border-border">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer",
                !yearly ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              Mensal
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={cn(
                "flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer",
                yearly ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              Anual
              <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {plans.map((plan, i) => {
            const isCustom = plan.monthly === null;
            const monthlyPrice = plan.monthly ?? 0;
            const yearlyPrice = plan.yearly ?? 0;
            const price = isCustom ? null : yearly ? yearlyPrice : monthlyPrice;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "relative rounded-2xl p-6 flex flex-col",
                  plan.highlighted
                    ? "bg-primary border border-primary shadow-2xl shadow-primary/30 lg:-translate-y-3"
                    : "bg-card border border-border shadow-sm"
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-background text-primary text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                    <Zap className="w-3 h-3" />
                    Mais escolhido
                  </div>
                )}

                <div className="mb-6">
                  <div className={cn("text-sm font-semibold mb-4", plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground")}>
                    {plan.name}
                  </div>

                  {price === null ? (
                    <div className={cn("text-3xl font-bold tracking-tight mb-2", plan.highlighted ? "text-primary-foreground" : "text-foreground")}>
                      Sob consulta
                    </div>
                  ) : (
                    <>
                      <div className="flex items-end gap-1">
                        <span className={cn("text-xs font-medium", plan.highlighted ? "text-primary-foreground/60" : "text-muted-foreground")}>
                          R$
                        </span>
                        <span className={cn("text-4xl font-bold tracking-tight", plan.highlighted ? "text-primary-foreground" : "text-foreground")}>
                          {formatPrice(price)}
                        </span>
                        <span className={cn("text-sm mb-1", plan.highlighted ? "text-primary-foreground/60" : "text-muted-foreground")}>
                          /mês
                        </span>
                      </div>
                      <div className="h-4 mb-1">
                        {yearly && monthlyPrice > 0 && (
                          <span className={cn("text-xs line-through", plan.highlighted ? "text-primary-foreground/50" : "text-muted-foreground/60")}>
                            R$ {formatPrice(monthlyPrice)} /mês
                          </span>
                        )}
                      </div>
                    </>
                  )}

                  <p className={cn("text-sm", plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground")}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={cn("w-4 h-4 mt-0.5 rounded-full flex items-center justify-center shrink-0", plan.highlighted ? "bg-primary-foreground/20" : "bg-primary/10")}>
                        <Check className={cn("w-2.5 h-2.5", plan.highlighted ? "text-primary-foreground" : "text-primary")} strokeWidth={3} />
                      </div>
                      <span className={cn("text-sm", plan.highlighted ? "text-primary-foreground/90" : "text-foreground/80")}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.href} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button
                    className={cn(
                      "w-full h-12 rounded-xl font-semibold transition-all duration-200",
                      plan.highlighted
                        ? "bg-background hover:bg-background/90 text-primary shadow-lg border-0"
                        : "bg-background border border-border text-foreground hover:border-primary/50 hover:bg-accent"
                    )}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Compare os planos
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="rounded-2xl border border-border overflow-hidden"
        >
          <Table className="min-w-[560px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[280px] text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Recursos
                </TableHead>
                {plans.map((plan) => (
                  <TableHead
                    key={plan.name}
                    className={cn(
                      "text-center font-bold",
                      plan.highlighted ? "text-primary bg-primary/5" : "text-foreground"
                    )}
                  >
                    {plan.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {compareGroups.map((group) => (
                <Fragment key={group.title}>
                  <TableRow className="hover:bg-transparent border-b-0">
                    <TableCell
                      colSpan={plans.length + 1}
                      className="pt-6 pb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted/30"
                    >
                      {group.title}
                    </TableCell>
                  </TableRow>
                  {group.rows.map((row) => (
                    <TableRow key={row.label}>
                      <TableCell className="text-sm text-foreground/80 whitespace-normal">
                        {row.label}
                      </TableCell>
                      {row.values.map((value, idx) => (
                        <TableCell
                          key={idx}
                          className={cn(
                            "text-center text-sm",
                            plans[idx].highlighted ? "bg-primary/5 font-semibold text-foreground" : "text-foreground/70"
                          )}
                        >
                          {typeof value === "boolean" ? (
                            value ? (
                              <Check className="mx-auto w-4 h-4 text-primary" strokeWidth={2.5} />
                            ) : (
                              <Minus className="mx-auto w-4 h-4 text-muted-foreground/30" />
                            )
                          ) : (
                            value
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-10"
        >
          Sem contrato de fidelidade · Cancele quando quiser · Suporte em português
        </motion.p>
      </div>
    </section>
  );
}
