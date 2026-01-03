import logo from "@/public/logo-white.png"

import Image from "next/image";
import Link from "next/link";
import { PiInstagramLogoLight, PiLinkedinLogoLight, PiTriangleBold, PiPlusBold } from "react-icons/pi";
import "./icon-tilt.css";
import "./cta-section.css";

import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Brands } from "@/components/site/brands";
import { Features } from "@/components/site/features";
import { Testimonial } from "@/components/site/testimonial";
import { Pricing } from "@/components/site/pricing";
import { Anywail } from "@/components/site/anywail";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <Navbar />
      <Hero />
      <Brands />
      <Features />
      <Anywail />
      <Pricing />
      <Testimonial />
      {/* SECTION CTA */}
      <section className="relative w-full bg-[#f7fafd] py-20 flex flex-col items-center justify-center z-10">
        <div className="max-w-7xl w-full mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-12 relative z-10">
          <div className="flex-1 flex flex-col items-start justify-center text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-[#18182A] mb-3">Vamos começar?</h2>
            <p className="text-[#18182A] text-base md:text-lg mb-6 max-w-md">Comece a usar o Revendaja agora ou fale conosco para um plano personalizado.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#" className="bg-primary hover:bg-primary/70 text-white font-semibold px-6 py-2 rounded-full shadow transition flex items-center justify-center text-base">Comece agora <span className="ml-2">→</span></a>
              <a href="#" className="text-primary hover:underline font-semibold px-4 py-2 rounded-full flex items-center justify-center text-base">Fale com a nossa equipe<span className="ml-2">→</span></a>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-start">
              <div className="mb-2">
                <PiTriangleBold size={36} color="#f54900" />
              </div>
              <h3 className="font-semibold text-[#18182A] mb-1">
                Controle e transparência
              </h3>
              <p className="text-[#18182A] text-sm mb-2">
                Acompanhe estoque, vendas e resultados em tempo real, sem surpresas.
              </p>
              <a
                href="#"
                className="text-primary hover:underline font-medium text-sm"
              >
                Ver como funciona <span>→</span>
              </a>
            </div>

            <div className="flex flex-col items-start">
              <div className="mb-2">
                <PiPlusBold size={36} color="#f54900" />
              </div>
              <h3 className="font-semibold text-[#18182A] mb-1">
                Comece em minutos
              </h3>
              <p className="text-[#18182A] text-sm mb-2">
                Crie sua conta, configure seu negócio e comece a vender no mesmo dia.
              </p>
              <a
                href="#"
                className="text-primary hover:underline font-medium text-sm"
              >
                Criar conta <span>→</span>
              </a>
            </div>
          </div>

        </div>
        {/* Barras coloridas de fundo */}
        <div className="cta-section-bg w-full" aria-hidden="true">
          <div className="cta-bar-1"></div>
          <div className="cta-bar-2"></div>
          <div className="cta-bar-3"></div>
          <div className="cta-bar-4"></div>
          <div className="cta-bar-5"></div>
        </div>
      </section>
      <footer className="w-full bg-[#18182A] text-white border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
            <div className="flex flex-col gap-2 min-w-[220px]">
              <Image src={logo} alt="Logo" width={120} height={120} className="mb-2" />
              <span className="text-white/80 mt-2 max-w-[220px]">Gerencie estoque e vendas de produtos de beleza com o Revendaja, de onde estiver.</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
              <div>
                <h4 className="font-semibold mb-2">Plataforma</h4>
                <ul className="flex flex-col text-sm gap-2 text-white/70">
                  <Link href="#" className="hover:text-white">Gestão de vendas</Link>
                  <Link href="#" className="hover:text-white">Controle de estoque</Link>
                  <Link href="#" className="hover:text-white">Relatórios</Link>
                  <Link href="#" className="hover:text-white">Produtos</Link>
                  <Link href="#" className="hover:text-white">Financeiro</Link>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Eu quero...</h4>
                <ul className="flex flex-col text-sm gap-2 text-white/70">
                  <Link href="#" className="hover:text-white">Aumentar minhas vendas</Link>
                  <Link href="#" className="hover:text-white">Organizar meu negócio</Link>
                  <Link href="#" className="hover:text-white">Automatizar processos</Link>
                  <Link href="#" className="hover:text-white">Expandir minha loja</Link>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Ajuda</h4>
                <ul className="flex flex-col text-sm gap-2 text-white/70">
                  <Link href="#" className="hover:text-white">Suporte</Link>
                  <Link href="#" className="hover:text-white">Contato</Link>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Empresa</h4>
                <ul className="flex flex-col text-sm gap-2 text-white/70">
                  <Link href="#" className="hover:text-white">Sobre</Link>
                  <Link href="#" className="hover:text-white">Carreiras</Link>
                  <Link href="#" className="hover:text-white">Comprar</Link>
                  <Link href="#" className="hover:text-white">Integrações</Link>
                </ul>
              </div>
            </div>
          </div>
          <div className="my-8"></div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

            <div className="flex gap-4 text-2xl">
              {/* Ícones de redes sociais podem ser adicionados aqui */}
              <span className="hover:text-white/90 text-white/70 cursor-pointer icon-tilt-hover">
                <PiInstagramLogoLight />
              </span>
              <span className="hover:text-white/90 text-white/70 cursor-pointer icon-tilt-hover">
                <PiLinkedinLogoLight />
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-white/60">
              <Link href="#" className="hover:text-white">Termos</Link>
              <Link href="#" className="hover:text-white">Privacidade</Link>
              <Link href="#" className="hover:text-white">Política de Cookies</Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-8 text-xs text-white/60 gap-2">
            <span className="block">© 2026 revendaja. Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
