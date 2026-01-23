import { Title } from "../title";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { MotionSection } from "./motion-section";

export function Faq() {
    return (
        <MotionSection className="max-w-[1250px] mx-auto px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="col-span-1">
                    <Badge>
                        Perguntas frequentes
                    </Badge>
                    <div className="my-3">
                        <Title>
                            Tem perguntas? Nós temos as respostas.
                        </Title>
                    </div>
                    <p className="text-gray-500 text-left text-[14px] mb-4">
                        Encontre respostas claras e úteis para as perguntas mais frequentes sobre nossa plataforma, recursos e serviços.
                    </p>
                </div>
                <div className="col-span-1">
                    <Accordion type="single" collapsible defaultValue="item-1">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>O que é o Revendaja?</AccordionTrigger>
                            <AccordionContent>
                                O Revendaja é um aplicativo que ajuda revendedores(as) de cosméticos a encontrar promoções, produtos em alta e oportunidades de venda em um só lugar, de forma simples e rápida.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Para quem o Revendaja é indicado?</AccordionTrigger>
                            <AccordionContent>
                                Para revendedores(as) de cosméticos, iniciantes ou experientes, que querem vender mais, economizar tempo e aumentar seus lucros.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Como posso começar a usar o Revendaja?</AccordionTrigger>
                            <AccordionContent>
                                Basta baixar o aplicativo, criar uma conta gratuita e começar a explorar as promoções e produtos disponíveis.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>O Revendaja é gratuito?</AccordionTrigger>
                            <AccordionContent>
                                Sim, o Revendaja possui um plano gratuito. Algumas funcionalidades avançadas podem estar disponíveis em planos pagos.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>O Revendaja vende produtos?</AccordionTrigger>
                            <AccordionContent>
                                Não. O Revendaja não vende produtos. A plataforma reúne e organiza oportunidades, promoções e informações para ajudar você a comprar melhor e vender mais.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-6">
                            <AccordionTrigger>Preciso ter CNPJ para usar?</AccordionTrigger>
                            <AccordionContent>
                                Não. Você pode usar o Revendaja como pessoa física. Ter CNPJ pode trazer benefícios em alguns casos, mas não é obrigatório.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Como posso entrar em contato com o suporte?</AccordionTrigger>
                            <AccordionContent>
                                Você pode entrar em contato pelo próprio aplicativo ou pelos nossos canais oficiais de atendimento.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </MotionSection>
    )
}