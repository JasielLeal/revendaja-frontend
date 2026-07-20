"use client";

import { motion } from "framer-motion";
import { Shield, Zap, BarChart3, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Segurança de nível empresarial com criptografia de ponta a ponta e backups automáticos.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Performance otimizada para carregar em milissegundos. Experiência instantânea garantida.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Dashboards em tempo real com insights acionáveis para tomar decisões mais inteligentes.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Equipe de suporte dedicada disponível 24/7 para ajudar você quando precisar.",
    color: "from-green-500 to-emerald-500",
  },
];

export function FeaturesSection() {
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            O Que Nos Torna
            <span className="bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {" "}
              Únicos
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Recursos poderosos construídos para impulsionar seu negócio e superar suas metas.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div
                      className={`w-14 h-14 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    {/* Glow effect */}
                    <div
                      className={`absolute inset-0 w-14 h-14 rounded-xl bg-linear-to-br ${feature.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

