"use client";

import { motion } from "framer-motion";
import { Package, TrendingUp, Users, BarChart } from "lucide-react";
import Image from "next/image";
import feature1 from "@/public/features-1.png";
import feature2 from "@/public/features-2.png";
import feature3 from "@/public/features-3.png";

const operations = [
  {
    icon: Package,
    title: "Controle de Estoque Inteligente",
    description: "Gerencie seu inventário de cosméticos com alertas automáticos de produtos em falta e controle de validade.",
    image: feature1,
    color: "from-orange-500 to-red-500",
  },
  {
    icon: BarChart,
    title: "Análise de Vendas em Tempo Real",
    description: "Acompanhe suas vendas, produtos mais vendidos e margem de lucro com dashboards intuitivos.",
    image: feature2,
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Gestão de Clientes",
    description: "Cadastre clientes, histórico de compras e crie campanhas personalizadas para fidelização.",
    image: feature3,
    color: "from-blue-500 to-cyan-500",
  },
];

export function OperationsSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            <span>Potencialize Suas Operações</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Tudo Que Você Precisa Para
            <span className="bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {" "}
              Crescer
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ferramentas completas para gerenciar sua revenda de cosméticos de forma profissional.
          </p>
        </motion.div>

        {/* Operations Cards */}
        <div className="space-y-24">
          {operations.map((operation, index) => {
            const Icon = operation.icon;
            const isReversed = index % 2 !== 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  isReversed ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className={`relative ${isReversed ? "lg:col-start-2" : ""}`}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                    <Image
                      src={operation.image}
                      alt={operation.title}
                      className="w-full h-auto"
                      width={600}
                      height={400}
                    />
                    {/* Overlay gradient */}
                    <div className={`absolute inset-0 bg-linear-to-tr ${operation.color} opacity-10`} />
                  </div>

                  {/* Floating badge */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, delay: index * 0.5 }}
                    className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-linear-to-br ${operation.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div className={isReversed ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <motion.div
                    initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${operation.color} mb-6 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {operation.title}
                    </h3>

                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {operation.description}
                    </p>

                    {/* Feature list */}
                    <ul className="space-y-3">
                      {[
                        "Interface intuitiva e fácil de usar",
                        "Relatórios automáticos e personalizáveis",
                        "Integração com principais fornecedores",
                      ].map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                            <div className="w-2 h-2 rounded-full bg-orange-600" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

