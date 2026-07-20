import Link from "next/link";
import Image from "next/image";
import { PiInstagramLogoBold, PiLinkedinLogoBold } from "react-icons/pi";
import logo from "@/public/logo-primary.png";
import { MotionSection } from "./motion-section";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const ACCESS_MESSAGE = "Olá! Ainda estamos em fase de testes, quero ter acesso ao Revendaja.";

const linkGroups = [
  {
    title: "Produto",
    links: [
      { name: "Funcionalidades", href: "#features" },
      { name: "Planos e preços", href: "#plans" },
      { name: "Loja online", href: "/store" },
      { name: "Aplicativo", href: "/download" },
    ],
  },
  {
    title: "Soluções",
    links: [
      { name: "Para revendedoras autônomas", href: getWhatsAppUrl(ACCESS_MESSAGE) },
      { name: "Para redes e distribuidores", href: "#plans" },
      { name: "Controle de estoque", href: "#features" },
      { name: "Financeiro e vendas", href: "#features" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { name: "Perguntas frequentes", href: "#faq" },
      { name: "Como funciona", href: "#" },
      { name: "Fazer login", href: "/sign-in" },
      { name: "Tenha acesso", href: getWhatsAppUrl(ACCESS_MESSAGE) },
    ],
  },
  {
    title: "Empresa",
    links: [
      { name: "Sobre nós", href: "#" },
      { name: "Contato", href: "#" },
      { name: "Termos de uso", href: "/terms" },
      { name: "Política de privacidade", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <MotionSection className="w-full bg-background ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-14">
          {/* Marca */}
          <div className="lg:col-span-2">
            <Image src={logo} alt="Revendaja" className="h-8 w-auto mb-5 invert" />
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              A Revendaja ajuda revendedoras a organizar estoque, vendas e
              financeiro em um só lugar, sem planilhas e sem complicação.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="w-9 h-9 rounded-lg bg-muted hover:bg-primary text-muted-foreground hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <PiInstagramLogoBold className="text-base" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-lg bg-muted hover:bg-primary text-muted-foreground hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <PiLinkedinLogoBold className="text-base" />
              </Link>
            </div>
          </div>

          {/* Colunas de links */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-foreground text-sm font-semibold mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="text-muted-foreground hover:text-primary text-sm transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Barra inferior */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-muted-foreground text-xs">
              © 2026 Revendaja. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-primary text-xs transition-colors"
              >
                Termos de uso
              </Link>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary text-xs transition-colors"
              >
                Política de privacidade
              </Link>
            </div>
          </div>
          <p className="text-muted-foreground text-xs text-center">
            Desenvolvido com experiência por{" "}
            <Link
              href="https://kaizestudios.com.br"
              className="text-primary font-semibold hover:opacity-80 text-xs transition-opacity"
            >
              Kaize Studios
            </Link>
          </p>
        </div>
      </div>
    </MotionSection>
  );
}
