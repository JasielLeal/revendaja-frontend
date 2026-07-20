"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Calendar, TrendingUp } from "lucide-react";

const workflows = [
  {
    category: "Gestão de Vendas",
    items: [
      { feature: "Pedidos Online", basic: true, pro: true, enterprise: true },
      { feature: "Carrinho Abandono", basic: false, pro: true, enterprise: true },
      { feature: "Upsell Automático", basic: false, pro: false, enterprise: true },
    ],
  },
  {
    category: "Estoque",
    items: [
      { feature: "Controle Básico", basic: true, pro: true, enterprise: true },
      { feature: "Alertas Automáticos", basic: false, pro: true, enterprise: true },
      { feature: "Previsão com IA", basic: false, pro: false, enterprise: true },
    ],
  },
  {
    category: "Relatórios",
    items: [
      { feature: "Dashboard Básico", basic: true, pro: true, enterprise: true },
      { feature: "Análise Avançada", basic: false, pro: true, enterprise: true },
      { feature: "Exportação Customizada", basic: false, pro: true, enterprise: true },
    ],
  },
];

export function WorkflowSection() {
  return (
    <section className="py-20 md:py-32 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              <span>Simplifique Seu Workflow</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Automatize e
              <span className="bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {" "}
                Acelere Seus Processos
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Escolha o plano ideal e tenha acesso a recursos poderosos que se adaptam
              ao seu crescimento. De pequenos negócios a grandes empresas.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">3x</div>
                    <div className="text-sm text-gray-600">Mais Rápido</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">95%</div>
                    <div className="text-sm text-gray-600">Satisfação</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Workflow Table */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            {/* Table Header */}
            <div className="bg-linear-to-r from-orange-600 to-red-600 p-6">
              <div className="grid grid-cols-4 gap-4 text-white text-sm font-semibold">
                <div>Recursos</div>
                <div className="text-center">Basic</div>
                <div className="text-center">Pro</div>
                <div className="text-center">Enterprise</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="p-6 space-y-6">
              {workflows.map((workflow, wIndex) => (
                <motion.div
                  key={wIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: wIndex * 0.1, duration: 0.4 }}
                >
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    {workflow.category}
                  </h4>
                  <div className="space-y-3">
                    {workflow.items.map((item, iIndex) => (
                      <div
                        key={iIndex}
                        className="grid grid-cols-4 gap-4 items-center py-2 border-b border-gray-100 last:border-0"
                      >
                        <div className="text-sm text-gray-600">{item.feature}</div>
                        <div className="flex justify-center">
                          {item.basic ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-gray-200" />
                          )}
                        </div>
                        <div className="flex justify-center">
                          {item.pro ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-gray-200" />
                          )}
                        </div>
                        <div className="flex justify-center">
                          {item.enterprise ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-gray-200" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

