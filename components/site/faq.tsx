"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Info, Headphones, MoreHorizontal } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "geral",
    label: "Geral",
    icon: Info,
    faqs: [
      {
        question: "Como eu crio minha conta na Revendaja?",
        answer:
          "É rápido: clique em \"Criar Conta\", preencha nome, e-mail e telefone e pronto. Você já entra direto no painel e pode começar a cadastrar seu estoque e suas vendas na hora.",
      },
      {
        question: "Preciso pagar para começar a usar?",
        answer:
          "Não. O plano Free já libera estoque, loja online própria e registro de vendas sem nenhum custo. Você só assina um plano pago quando quiser recursos avançados, como financeiro completo e catálogo com marcas parceiras.",
      },
      {
        question: "Posso usar a Revendaja em mais de uma loja?",
        answer:
          "Sim. No plano Enterprise você gerencia várias lojas e toda a sua rede de revenda em um único painel, com relatórios consolidados.",
      },
      {
        question: "Como funciona o processo de pagamento das assinaturas?",
        answer:
          "As assinaturas são cobradas mensal ou anualmente e processadas com segurança via Stripe, aceitando cartão de crédito. Você pode cancelar quando quiser, direto pelo painel.",
      },
    ],
  },
  {
    id: "suporte",
    label: "Suporte",
    icon: Headphones,
    faqs: [
      {
        question: "Como eu falo com o suporte?",
        answer:
          "Você pode chamar a gente pelo WhatsApp direto do painel ou pelo e-mail de suporte. Assinantes Pro e Enterprise contam com atendimento prioritário.",
      },
      {
        question: "Qual o prazo médio de resposta?",
        answer:
          "Respondemos em até 24h no plano Free, e em poucos minutos no suporte prioritário via WhatsApp dos planos Pro e Enterprise.",
      },
      {
        question: "Vocês ajudam a configurar minha loja no início?",
        answer:
          "Sim, nosso time te ajuda a configurar o catálogo, o estoque e a loja online logo no começo, sem nenhum custo adicional.",
      },
    ],
  },
  {
    id: "outros",
    label: "Outros",
    icon: MoreHorizontal,
    faqs: [
      {
        question: "Posso cancelar minha assinatura quando quiser?",
        answer:
          "Sim. Não existe contrato de fidelidade — você cancela quando quiser direto pelo painel, sem multa.",
      },
      {
        question: "Meus dados e os dos meus clientes estão seguros?",
        answer:
          "Sim. Seguimos boas práticas de segurança e criptografia para proteger seus dados e os dados dos seus clientes em conformidade com a LGPD.",
      },
      {
        question: "Existe aplicativo para celular?",
        answer:
          "Sim, a Revendaja tem aplicativo para Android e iOS, disponível para baixar direto na Google Play e na App Store.",
      },
    ],
  },
];

export function Faq() {
  const [active, setActive] = useState(categories[0].id);
  const current = categories.find((c) => c.id === active)!;

  return (
    <section id="faq" className="py-24 md:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
            Como começar
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Perguntas frequentes
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-16"
        >
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = cat.id === active;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActive(cat.id)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-left whitespace-nowrap shrink-0 cursor-pointer",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          <Accordion key={active} type="single" collapsible defaultValue="item-0" className="border-t border-border">
            {current.faqs.map((item, i) => (
              <AccordionItem key={item.question} value={`item-${i}`} className="border-b border-border">
                <AccordionTrigger className="text-base font-semibold text-foreground py-5 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
