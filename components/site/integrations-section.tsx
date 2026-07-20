"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Zap } from "lucide-react";
import avonLogo from "@/public/logos/avon-logo.png";
import eudoraLogo from "@/public/logos/eudora.png";
import naturaLogo from "@/public/logos/natura.png";
import oboticarioLogo from "@/public/logos/oboticario.png";
import jequitiLogo from "@/public/logos/jequiti.png";
import ouiLogo from "@/public/logos/oui.png";

const brands = [
  { name: "Avon", logo: avonLogo },
  { name: "Natura", logo: naturaLogo },
  { name: "O Boticário", logo: oboticarioLogo },
  { name: "Eudora", logo: eudoraLogo },
  { name: "Jequiti", logo: jequitiLogo },
  { name: "Oui", logo: ouiLogo },
];

export function IntegrationsSection() {
  return (
    <section className="py-20 md:py-32 bg-linear-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>Expanda Seu Alcance com Integrações</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Parceiros e
            <span className="bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {" "}
              Marcas Integradas
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trabalhe com as principais marcas de cosméticos do Brasil. Integração simplificada
            para gerenciar todos os seus produtos em um só lugar.
          </p>
        </motion.div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 flex items-center justify-center h-32">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-auto max-h-20 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  width={120}
                  height={80}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-linear-to-r from-orange-600 to-red-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Conecte-se com Mais Fornecedores
          </h3>
          <p className="text-orange-50 mb-8 max-w-2xl mx-auto">
            Adicione novos fornecedores e amplie seu catálogo de produtos. Nossa plataforma
            suporta integração com diversos sistemas de gestão.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-orange-50 transition-colors shadow-lg"
            >
              Solicitar Integração
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              Ver Documentação
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

