"use client";

import { motion } from "framer-motion";

const metrics = [
  {
    value: "R$ 100 mil+",
    label: "Em vendas realizadas",
    desc: "processadas através da plataforma",
  },
  {
    value: "+700",
    label: "Produtos cadastrados",
    desc: "em nosso catálogo",
  },
  {
    value: "100%",
    label: "Gestão integrada",
    desc: "estoque, vendas, financeiro e CRM em um só lugar",
  },
  {
    value: "24/7",
    label: "Seu negócio funcionando",
    desc: "venda e acompanhe sua operação a qualquer momento",
  },
];

export function SocialProof() {
  return (
    <section className="py-14 border-y border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border"
        >
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`flex flex-col items-start text-left py-10 px-6 ${
                i === 0 ? "pl-0" : ""
              } ${i === metrics.length - 1 ? "pr-0" : ""}`}
            >
              <div className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-1">
                {m.value}
              </div>
              <div className="text-[10px] font-bold text-primary mb-1 uppercase tracking-widest">
                {m.label}
              </div>
              <div className="text-xs text-muted-foreground">{m.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
