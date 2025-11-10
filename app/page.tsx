import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Sparkles,
  Users,
  Shield,
  Zap,
  Star,
  ArrowRight,
  BarChart3,
  Package,
  CreditCard
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Leal Perfumaria
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Recursos
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Preços
              </Link>
              <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Sobre
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/sign-in">
                <Button variant="ghost" className="font-medium">Entrar</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                  Começar agora
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-3 h-3 mr-2" />
              Plataforma completa para revendedores
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Transforme sua paixão
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
                em negócio lucrativo
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              A plataforma mais avançada para revendedores de perfumes. Gerencie estoque,
              vendas e clientes com a tecnologia que grandes empresas confiam.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-primary via-purple-600 to-blue-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300">
                Começar gratuitamente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button variant="outline" size="lg" className="text-lg px-10 py-6 border-2 hover:bg-muted/50">
                Ver demonstração
              </Button>
            </Link>
          </div>

          <div className="pt-12 space-y-6">
            <div className="flex items-center justify-center space-x-6 text-muted-foreground">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 font-medium">4.9/5</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <span className="font-medium">1000+ revendedores</span>
              <div className="h-4 w-px bg-border" />
              <span className="font-medium">R$ 2M+ processados</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 lg:py-32">
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-6 px-4 py-1.5">
            Recursos poderosos
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Tudo que você precisa para vender mais
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            Ferramentas profissionais que crescem com seu negócio. Desde o primeiro produto até milhares de vendas.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          <Card className="group border-0 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-background to-muted/30">
            <CardHeader className="pb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">Analytics Avançado</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Insights em tempo real sobre vendas, lucro e performance com dashboards interativos
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group border-0 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-background to-muted/30">
            <CardHeader className="pb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Package className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">Gestão Inteligente</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Controle de estoque automático com alertas e sincronização com catálogo completo
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group border-0 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-background to-muted/30">
            <CardHeader className="pb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">Pagamentos Seguros</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Powered by Stripe. Aceite cartões, PIX e boleto com máxima segurança
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Additional Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: "Performance Otimizada",
              description: "Interface rápida e responsiva para máxima produtividade",
              color: "from-orange-500 to-orange-600"
            },
            {
              icon: Users,
              title: "Gestão de Clientes",
              description: "CRM integrado para acompanhar histórico e preferências",
              color: "from-cyan-500 to-cyan-600"
            },
            {
              icon: Shield,
              title: "Segurança Enterprise",
              description: "Dados protegidos com criptografia de nível bancário",
              color: "from-red-500 to-red-600"
            }
          ].map((feature, index) => (
            <div key={index} className="group p-6 rounded-2xl hover:bg-muted/30 transition-all duration-300">
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20 lg:py-32 bg-muted/20">
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-6 px-4 py-1.5">
            Preços transparentes
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Escolha o plano ideal para você
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            Comece gratuitamente e escale conforme seu negócio cresce. Sem taxas ocultas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="relative border-2 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold">Gratuito</CardTitle>
                <CardDescription className="text-base">Perfeito para começar seu negócio</CardDescription>
              </div>
              <div className="pt-4">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold">R$ 0</span>
                  <span className="text-muted-foreground ml-2">/mês</span>
                </div>
                <p className="text-muted-foreground mt-2">Para sempre gratuito</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-4">
                {[
                  "Até 10 vendas por mês",
                  "Acesso básico ao catálogo",
                  "Relatórios simples",
                  "Suporte por email",
                  "Dashboard básico"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-xs font-bold">✓</span>
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="block">
                <Button variant="outline" className="w-full h-12 text-base font-medium">
                  Começar gratuitamente
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="relative border-2 border-primary shadow-xl bg-gradient-to-br from-background to-primary/5">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-1">
                Mais Popular
              </Badge>
            </div>
            <CardHeader>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold">Plano Starter</CardTitle>
                <CardDescription className="text-base">Para revendedores sérios</CardDescription>
              </div>
              <div className="pt-4">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    R$ 24,99
                  </span>
                  <span className="text-muted-foreground ml-2">/mês</span>
                </div>
                <p className="text-muted-foreground mt-2">Cancele a qualquer momento</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-4">
                {[
                  "Vendas ilimitadas",
                  "Catálogo completo de produtos",
                  "Analytics avançado",
                  "Suporte prioritário",
                  "Integrações premium",
                  "Backup automático",
                  "API access"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary text-xs font-bold">✓</span>
                    </div>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/subscription" className="block">
                <Button className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg">
                  Assinar Starter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 rounded-3xl p-12 lg:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Pronto para revolucionar seu negócio?
            </h2>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto font-light">
              Junte-se a milhares de revendedores que já transformaram sua paixão em renda extra
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Link href="/sign-up">
                <Button size="lg" variant="secondary" className="text-lg px-10 py-6 bg-white text-primary hover:bg-white/90 shadow-xl">
                  Começar gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 text-white border-white/30 hover:bg-white/10 backdrop-blur">
                  Já tenho conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Leal Perfumaria</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                A plataforma mais avançada para revendedores de perfumes crescerem seus negócios com tecnologia de ponta.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  📱
                </div>
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  📧
                </div>
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  🐦
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Produto</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Recursos</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground transition-colors">Preços</Link></li>
                <li><Link href="/sign-up" className="hover:text-foreground transition-colors">Começar</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Integrações</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Suporte</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Central de Ajuda</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contato</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Status da API</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Comunidade</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Empresa</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Sobre nós</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Carreiras</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Imprensa</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground">
              &copy; 2025 Leal Perfumaria. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Termos</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Privacidade</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
