"use client";

import logoPrimary from "@/public/logo-primary.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const ACCESS_MESSAGE = "Olá! Ainda estamos em fase de testes, quero ter acesso ao Revendaja.";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Início", href: "#" },
    { label: "Recursos", href: "#features" },
    { label: "Planos", href: "#plans" },
    { label: "FAQ", href: "#faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo no lado esquerdo */}
            <Link href="/" className="flex items-center">
              <Image
                src={logoPrimary}
                alt="Revendaja"
                width={160}
                height={34}
                priority
                className={`h-7 w-auto transition-all duration-300 ${
                  isScrolled ? "invert" : ""
                }`}
              />
            </Link>

            {/* Agrupamento da navegação e login no lado direito */}
            <div className="hidden md:flex items-center gap-8">
              {/* Links de navegação jogados para a direita */}
              <div className="flex items-center gap-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative text-sm font-medium transition-colors duration-300 group ${
                        isScrolled
                          ? "text-gray-700 hover:text-orange-600"
                          : "text-white/90 hover:text-white"
                      }`}
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Login + Criar Conta */}
              <div className="flex items-center gap-4">
                <Link
                  href="/sign-in"
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isScrolled
                      ? "text-gray-700 hover:text-orange-600"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  Fazer Login
                </Link>
                <Link href={getWhatsAppUrl(ACCESS_MESSAGE)} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full font-medium px-5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 border-0">
                    Tenha acesso
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
              }`}
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? "text-gray-700" : "text-white"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? "text-gray-700" : "text-white"}`} />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-0 right-0 z-40 md:hidden bg-white border-b border-gray-200 shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-base font-medium text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Link
                  href="/sign-in"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full rounded-full">
                    Fazer Login
                  </Button>
                </Link>
                <Link
                  href={getWhatsAppUrl(ACCESS_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Tenha acesso
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
